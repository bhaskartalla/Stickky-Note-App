import type { NoteDataType, MousePointerPosType } from '@/types'
import { useEffect, useRef } from 'react'
import { getToastErrorMessage, setZIndex, STATUS } from '@/src/shared/utils'
import { bodyParser } from '@/src/shared/utils/bodyParser'
import styles from './Notes.module.css'
import { useNotes } from '../hooks/useNotes'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import DeleteButton from '../components/controls/DeleteButton'
import { notesService } from '../notes.service'
import { useNoteDrag } from '../hooks/useNoteDrag'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

type NoteCardProps = {
  note: NoteDataType
}

const NoteCard = ({ note }: NoteCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const keyUpTimer = useRef<number>(0)

  const colors = bodyParser(note.colors)

  const { setSelectedNote, setStatus, setToast } = useNotes()
  const { user } = useAuth()

  // ── Save helper ────────────────────────────────────────────────────────────
  const saveData = async (key: string, value: string) => {
    try {
      await notesService.updateNote(user?.uid ?? '', note.id, { [key]: value })
    } catch (error) {
      setToast(getToastErrorMessage(error))
    }
    setStatus('')
  }

  const handleDragEnd = async (position: MousePointerPosType) => {
    setStatus(STATUS.SAVING)
    await saveData('position', JSON.stringify(position))
  }

  const { position, handlePointerDown } = useNoteDrag(
    cardRef,
    bodyParser(note.position),
    handleDragEnd
  )

  // ── TipTap editor (inlined from NoteEditor.tsx) ────────────────────────────
  const editor = useEditor({
    extensions: [StarterKit],
    content: note.body,
    onUpdate: ({ editor }) => {
      setStatus(STATUS.SAVING)
      if (keyUpTimer.current) clearTimeout(keyUpTimer.current)
      keyUpTimer.current = window.setTimeout(() => {
        saveData('body', editor.getHTML())
      }, 1000)
    },
  })

  // Keep editor in sync if note.body changes externally (e.g. real-time update
  // from another device) without overwriting content the user is actively typing.
  useEffect(() => {
    if (!editor) return
    if (note.body !== editor.getHTML()) {
      editor.commands.setContent(note.body)
    }
  }, [note.body, editor])

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (keyUpTimer.current) clearTimeout(keyUpTimer.current)
    }
  }, [])

  useEffect(() => {
    setZIndex(cardRef)
  }, [])

  if (!editor) return null

  return (
    <div
      data-card
      ref={cardRef}
      className={styles.card}
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* ── Drag handle + delete ─────────────────────────────────────────── */}
      <div
        id='card-header'
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        className={styles.card_header}
        style={{
          backgroundColor: colors.colorHeader,
          touchAction: 'none',
          cursor: 'grab',
        }}
      >
        <DeleteButton noteId={note.id} />
      </div>

      {/* ── Card body ────────────────────────────────────────────────────── */}
      <div
        className={styles.card_body}
        style={{ color: colors.colorText }}
      >
        {/* ── Toolbar (inlined from NoteEditor.tsx) ───────────────────── */}
        <div className={styles.note_editor_toolbar}>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? styles.active_button : ''}
          >
            B
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? styles.active_button : ''}
          >
            I
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? styles.active_button : ''}
          >
            S
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive('heading', { level: 1 })
                ? styles.active_button
                : ''
            }
          >
            H1
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive('heading', { level: 2 })
                ? styles.active_button
                : ''
            }
          >
            H2
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={
              editor.isActive('bulletList') ? styles.active_button : ''
            }
          >
            • List
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editor.isActive('orderedList') ? styles.active_button : ''
            }
          >
            1. List
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={
              editor.isActive('blockquote') ? styles.active_button : ''
            }
          >
            "
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? styles.active_button : ''}
          >
            {'</>'}
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().undo().run()}
          >
            Undo
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().redo().run()}
          >
            Redo
          </button>
        </div>

        {/* ── Editor content ───────────────────────────────────────────── */}
        <EditorContent
          editor={editor}
          className={styles.note_editor_content}
          onFocus={() => {
            setZIndex(cardRef)
            setSelectedNote(note)
          }}
        />
      </div>
    </div>
  )
}

export default NoteCard

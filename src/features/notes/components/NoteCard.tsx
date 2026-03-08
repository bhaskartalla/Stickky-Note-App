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

  // ── TipTap ─────────────────────────────────────────────────────────────────
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

  // Sync if note.body changes externally (real-time update from another device)
  useEffect(() => {
    if (!editor) return
    if (note.body !== editor.getHTML()) {
      editor.commands.setContent(note.body)
    }
  }, [note.body, editor])

  useEffect(() => {
    setZIndex(cardRef)
    return () => {
      if (keyUpTimer.current) clearTimeout(keyUpTimer.current)
    }
  }, [])

  if (!editor) return null

  const active = (format: string, attrs?: Record<string, unknown>) =>
    editor.isActive(format, attrs) ? styles.active_button : ''

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

      <div
        id='card-body'
        className={styles.card_body}
        style={{ color: colors.colorText }}
      >
        <div
          id='formatting-controls'
          className={styles.note_editor_toolbar}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={active('bold')}
          >
            B
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={active('italic')}
          >
            I
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={active('strike')}
          >
            S
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={active('heading', { level: 1 })}
          >
            H1
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={active('heading', { level: 2 })}
          >
            H2
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={active('bulletList')}
          >
            • List
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={active('orderedList')}
          >
            1. List
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={active('blockquote')}
          >
            "
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={active('codeBlock')}
          >
            {'</>'}
          </button>
        </div>

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

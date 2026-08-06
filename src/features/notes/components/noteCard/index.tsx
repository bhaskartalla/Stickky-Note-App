import type { NoteDataType, MousePointerPosType } from '@/types'
import { useEffect, useMemo, useRef } from 'react'
import { bodyParser, getToastErrorMessage, setZIndex } from '@/src/shared/utils'
import styles from './NoteCard.module.css'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { notesService } from '@/src/features/notes/notes.service'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import NoteToolbar from './NoteToolBar'
import { useNoteDrag, useNotes } from '@/src/features/notes/hooks'
import { DeleteButton } from '..'

type NoteCardProps = {
  note: NoteDataType
}

const NoteCard = ({ note }: NoteCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const keyUpTimer = useRef<number>(0)
  const isLocallyEditing = useRef(false)
  const localEditingTimer = useRef<number>(0)

  const colors = bodyParser(note.colors)

  const { setSelectedNote, setIsNoteSaving, triggerNotification } = useNotes()
  const { user } = useAuth()

  const saveData = async (key: string, value: string) => {
    try {
      await notesService.updateNote(user?.uid ?? '', note.id, { [key]: value })
    } catch (error) {
      triggerNotification(getToastErrorMessage(error))
    } finally {
      setIsNoteSaving(false)
    }
  }

  const handleDragEnd = async (position: MousePointerPosType) => {
    setIsNoteSaving(true)
    await saveData('position', JSON.stringify(position))
  }

  const notePosition = useMemo(() => bodyParser(note.position), [note.position])

  const { position, handlePointerDown } = useNoteDrag(
    cardRef,
    notePosition,
    handleDragEnd
  )

  const editor = useEditor({
    extensions: [StarterKit],
    content: note.body,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setIsNoteSaving(true)

      isLocallyEditing.current = true

      if (keyUpTimer.current) clearTimeout(keyUpTimer.current)
      keyUpTimer.current = window.setTimeout(async () => {
        await saveData('body', editor.getHTML())
        if (localEditingTimer.current) clearTimeout(localEditingTimer.current)
        localEditingTimer.current = window.setTimeout(() => {
          isLocallyEditing.current = false
        }, 2000)
      }, 2000)
    },
  })

  useEffect(() => {
    if (!editor || editor.isDestroyed) return
    if (isLocallyEditing.current) return
    if (note.body !== editor.getHTML()) {
      editor.commands.setContent(note.body)
    }
  }, [note.body, editor])

  useEffect(() => {
    setZIndex(cardRef)
    return () => {
      if (keyUpTimer.current) clearTimeout(keyUpTimer.current)
      if (localEditingTimer.current) clearTimeout(localEditingTimer.current)
    }
  }, [])

  if (!editor) return null

  // const isEncrypted = !user?.isAnonymous

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
      {/* ── Card header: drag handle + enc badge + delete ── */}
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
        {/* Drag handle dots */}
        {/* <div className={styles.note_drag_handle}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} />
          ))}
        </div> */}

        {/* Encryption badge */}
        {/* {isEncrypted && <span className={styles.enc_badge}>🔒 encrypted</span>} */}

        <DeleteButton noteId={note.id} />
      </div>

      <div
        id='card-body'
        className={styles.card_body}
        style={{ color: colors.colorText }}
      >
        <NoteToolbar editor={editor} />

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

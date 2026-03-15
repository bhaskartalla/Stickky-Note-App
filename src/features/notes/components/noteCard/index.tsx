import type { NoteDataType, MousePointerPosType } from '@/types'
import { useEffect, useMemo, useRef } from 'react'
import {
  bodyParser,
  getToastErrorMessage,
  setZIndex,
  STATUS,
} from '@/src/shared/utils'
import styles from './NoteCard.module.css'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { notesService } from '@/src/features/notes/notes.service'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import NoteToolbar from './NoteToolBar'
import { useNoteDrag, useNotes } from '../../hooks'
import { DeleteButton } from '..'

type NoteCardProps = {
  note: NoteDataType
}

const NoteCard = ({ note }: NoteCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const keyUpTimer = useRef<number>(0)

  const colors = bodyParser(note.colors)

  const { setSelectedNote, setStatus, setToast } = useNotes()
  const { user } = useAuth()

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

  const notePosition = useMemo(() => bodyParser(note.position), [note.position])

  const { position, handlePointerDown } = useNoteDrag(
    cardRef,
    notePosition,
    handleDragEnd
  )

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

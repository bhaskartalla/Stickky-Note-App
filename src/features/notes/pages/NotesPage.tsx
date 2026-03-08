import type { NoteDataType } from '@/types'
import styles from '@/src/features/notes/components/noteCard/NoteCard.module.css'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import NoteCard from '@/src/features/notes/components/noteCard'
import NoteControls from '@/src/features/notes/components/controls/NoteControls'

const NotesPage = () => {
  const { notes } = useNotes()

  return (
    <div
      id='note-canvas'
      className={styles.notes_canvas}
    >
      {notes.map((note: NoteDataType, index: number) => (
        <NoteCard
          key={`${note.id}_${index}`}
          note={note}
        />
      ))}
      <NoteControls />
    </div>
  )
}

export default NotesPage

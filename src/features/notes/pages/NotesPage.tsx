import type { NoteDataType } from '@/types'
import styles from '../components/Notes.module.css'
import { useNotes } from '../hooks/useNotes'
import NoteCard from '../components/NoteCard'
import NoteControls from '../components/NoteControls'

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

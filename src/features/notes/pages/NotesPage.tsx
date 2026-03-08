import type { NoteDataType } from '@/types'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import { NoteCard, NoteControls, styles } from '../components'

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

import type { NoteDataType } from '@/types'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { NoteCard, NoteControls } from '../components'
import { GuestBanner } from '@/src/features/ui/header/GuestBanner'
import styles from '../components/noteCard/NoteCard.module.css'
import EmptyCanvas from '../../ui/empty-canvas'

const NotesPage = () => {
  const { notes } = useNotes()
  const { user } = useAuth()

  const isGuest = user?.isAnonymous ?? false

  return (
    <div
      id='note-canvas'
      className={styles.notes_canvas}
    >
      {notes.length ? (
        <>
          {notes.map((note: NoteDataType, index: number) => (
            <NoteCard
              key={`${note.id}_${index}`}
              note={note}
            />
          ))}
        </>
      ) : (
        <EmptyCanvas />
      )}
      <NoteControls />

      {isGuest && notes.length && <GuestBanner />}
    </div>
  )
}

export default NotesPage

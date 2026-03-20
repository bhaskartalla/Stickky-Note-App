import type { NoteDataType } from '@/types'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { NoteCard, NoteControls } from '../components'
import { GuestBanner } from '@/src/features/ui/header/GuestBanner'
import styles from '../components/noteCard/NoteCard.module.css'
import EmptyCanvas from '@/src/features/ui/empty-canvas'
import Spinner from '@/src/features/ui/Spinner'

const NotesPage = () => {
  const { notes, isNotesLoading } = useNotes()
  const { user, isLoading } = useAuth()

  const isGuest = user?.isAnonymous ?? false

  if (isLoading || isNotesLoading) return <Spinner />

  return (
    <div
      id='note-canvas'
      className={`${styles.notes_canvas} grid_bg`}
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

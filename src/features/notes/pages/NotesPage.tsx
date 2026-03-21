import type { NoteDataType } from '@/types'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { NoteControls } from '../components'
import { GuestBanner } from '@/src/features/ui/header/GuestBanner'
import styles from '../components/noteCard/NoteCard.module.css'
import EmptyCanvas from '@/src/features/ui/empty-canvas'
import Spinner from '@/src/shared/components/uikit/spinner'
import { lazy, Suspense } from 'react'

const NoteCard = lazy(() => import('../components/noteCard'))

const NotesPage = () => {
  const { notes, isNotesLoading } = useNotes()
  const { user, isAuthLoading } = useAuth()

  const isGuest = user?.isAnonymous ?? false

  if (isAuthLoading || isNotesLoading) return <Spinner />

  return (
    <div
      id='note-canvas'
      className={`${styles.notes_canvas} grid_bg`}
    >
      {notes.length ? (
        notes.map((note: NoteDataType, index: number) => (
          <Suspense
            key={`${note.id}_${index}`}
            fallback={null}
          >
            <NoteCard note={note} />
          </Suspense>
        ))
      ) : (
        <EmptyCanvas />
      )}
      <NoteControls />
      {isGuest && notes.length > 0 && <GuestBanner />}
    </div>
  )
}

export default NotesPage

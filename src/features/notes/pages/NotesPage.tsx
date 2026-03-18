import type { NoteDataType } from '@/types'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { NoteCard, NoteControls } from '../components'
import styles from '../components/noteCard/NoteCard.module.css'

const NotesPage = () => {
  const { notes } = useNotes()
  const { user } = useAuth()
  const navigate = useNavigate()

  const isGuest = user?.isAnonymous ?? false

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

      {/* Guest sync banner */}
      {isGuest && (
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(24, 24, 28, 0.9)',
            border: '1px solid rgba(245, 200, 66, 0.3)',
            borderRadius: 12,
            padding: '12px 20px',
            fontSize: 12.5,
            color: 'var(--muted)',
            backdropFilter: 'blur(8px)',
            zIndex: 20,
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          ⚠️ Guest notes are{' '}
          <strong style={{ color: 'var(--accent)' }}>not synced</strong>
          {' — '}
          <button
            type='button'
            onClick={() => navigate('/signin')}
            style={{
              color: 'var(--accent)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: 'inherit',
              padding: 0,
              fontFamily: 'inherit',
            }}
          >
            sign in to save permanently
          </button>
        </div>
      )}
    </div>
  )
}

export default NotesPage

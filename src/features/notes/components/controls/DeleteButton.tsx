import Trash from '@/src/shared/components/icons/TrashIcon'
import { getToastErrorMessage, STATUS } from '@/src/shared/utils'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { notesService } from '@/src/features/notes/notes.service'
import styles from '../noteCard/NoteCard.module.css'

type DeleteButtonProps = {
  noteId: string
}

const DeleteButton = ({ noteId }: DeleteButtonProps) => {
  const { setStatus, setToast } = useNotes()
  const { user } = useAuth()

  const handleDelete = async () => {
    try {
      setStatus(STATUS.DELETING)
      await notesService.deleteNote(user?.uid ?? '', noteId)
    } catch (error) {
      setToast(getToastErrorMessage(error))
    }
    setStatus('')
  }

  return (
    <button
      type='button'
      className={styles.note_delete}
      onClick={handleDelete}
      aria-label='Delete note'
      /* stop drag from firing when clicking delete */
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <Trash />
    </button>
  )
}

export default DeleteButton

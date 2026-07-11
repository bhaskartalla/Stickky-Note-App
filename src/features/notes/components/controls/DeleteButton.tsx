import Trash from '@/src/shared/components/icons/TrashIcon'
import { getToastErrorMessage } from '@/src/shared/utils'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { notesService } from '@/src/features/notes/notes.service'
import styles from '../noteCard/NoteCard.module.css'

type DeleteButtonProps = {
  noteId: string
}

const DeleteButton = ({ noteId }: DeleteButtonProps) => {
  const { setIsNoteSaving, triggerNotification } = useNotes()
  const { user } = useAuth()

  const handleDelete = async () => {
    try {
      setIsNoteSaving(true)
      await notesService.deleteNote(user?.uid ?? '', noteId)
    } catch (error) {
      triggerNotification(getToastErrorMessage(error))
    }
    setIsNoteSaving(false)
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

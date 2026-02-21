import Trash from '@/src/shared/components/icons/TrashIcon'
import { getToastErrorMessage, STATUS } from '@/src/shared/utils/index'
import { useNotes } from '../hooks/useNotes'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { notesService } from '../notes.service'

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
    <div onClick={handleDelete}>
      <Trash />
    </div>
  )
}
export default DeleteButton

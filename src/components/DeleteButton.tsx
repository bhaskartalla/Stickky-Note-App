import { useContext } from 'react'
import Trash from '@/src/assets/icons/Trash'
import { NotesContext } from '@/src/context/NotesContext'
import { STATUS } from '@/src/utils'
import { deleteNote } from '../firebaseConfig/firestore'
// import { dbFunctions } from '@/src/firebaseConfig/dbFunctions'

type DeleteButtonProps = {
  noteId: string
}

const DeleteButton = ({ noteId }: DeleteButtonProps) => {
  const { setNotes, setStatus, user } = useContext(NotesContext)

  const handleDelete = async () => {
    try {
      setStatus(STATUS.DELETING)
      await deleteNote(user?.uid ?? '', noteId)
      // await dbFunctions.notes.deleteDocument(noteId)
      setNotes((prev) => prev.filter(({ $id }) => $id !== noteId))
    } catch (error) {
      // TODO: show toast message
      console.error('🚀 ~ handleDelete ~ error:', error)
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

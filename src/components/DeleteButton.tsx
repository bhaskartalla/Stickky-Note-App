import Trash from '../icons/Trash'
// import { db } from '../apppwrite/databases'
import { useContext } from 'react'
import { NotesContext } from '../context/NotesContext'
import { dbFunctions } from '../firebaseCloudStore/dbfunctions'
import { STATUS } from '../utils'

type DeleteButtonProps = {
  noteId: string
}

const DeleteButton = ({ noteId }: DeleteButtonProps) => {
  const { setNotes, setStatus } = useContext(NotesContext)

  const handleDelete = async () => {
    try {
      setStatus(STATUS.DELETING)
      await dbFunctions.notes.deleteDocument(noteId)
      // await db.notes.deleteRow(noteId)
      setNotes((prev) => prev.filter(({ $id }) => $id !== noteId))
    } catch (error) {
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

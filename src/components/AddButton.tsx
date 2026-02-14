import { useContext, useRef } from 'react'
// import { db } from '../apppwrite/databases'
import Plus from '../icons/Plus'
import colors from '@/src/assets/colors.json'
import { NotesContext } from '../context/NotesContext'
import { dbFunctions } from '../firebaseCloudStore/dbFunctions'
import { STATUS } from '../utils'

const AddButton = () => {
  const startingPos = useRef(10)

  const { setNotes, setSelectedNote, setStatus } = useContext(NotesContext)

  const addNote = async () => {
    setStatus(STATUS.CREATING)

    try {
      const payload = {
        body: '',
        position: JSON.stringify({
          x: startingPos.current,
          y: startingPos.current,
        }),
        colors: JSON.stringify(colors[0]),
      }
      startingPos.current += 10
      const response = await dbFunctions.notes.createDocument(payload)
      // const response = await db.notes.createRow(payload)
      setNotes((prev) => [...prev, response])
      setSelectedNote(response)
    } catch (error) {
      console.error('🚀 ~ addNote ~ error:', error)
    }
    setStatus('')
  }

  return (
    <div
      id='add-btn'
      onClick={addNote}
    >
      <Plus />
    </div>
  )
}
export default AddButton

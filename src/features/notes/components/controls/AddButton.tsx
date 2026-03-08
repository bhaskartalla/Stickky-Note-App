import { useRef } from 'react'
import colors from '@/src/shared/utils/colors.json'
import {
  getRandomInt,
  getToastErrorMessage,
  STATUS,
} from '@/src/shared/utils/index'
import Plus from '@/src/shared/components/icons/PlusIcon'
import styles from './Controls.module.css'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { notesService } from '@/src/features/notes/notes.service'

const AddButton = () => {
  const startingPos = useRef(20)
  const ind = getRandomInt()
  const { setStatus, setToast, setSelectedNote } = useNotes()
  const { user } = useAuth()

  const addNote = async () => {
    setStatus(STATUS.CREATING)

    try {
      const payload = {
        body: '',
        position: JSON.stringify({
          x: startingPos.current,
          y: startingPos.current,
        }),
        colors: JSON.stringify(colors[ind]),
      }
      startingPos.current += 10
      const response = await notesService.createNote(user?.uid ?? '', payload)
      setSelectedNote(response)
    } catch (error) {
      setToast(getToastErrorMessage(error))
    }
    setStatus('')
  }

  return (
    <div
      className={styles.add_btn}
      onClick={addNote}
    >
      <Plus />
    </div>
  )
}
export default AddButton

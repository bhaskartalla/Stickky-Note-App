import { useRef } from 'react'
import { colors, getRandomInt, getToastErrorMessage } from '@/src/shared/utils'
import Plus from '@/src/shared/components/icons/PlusIcon'
import styles from './Controls.module.css'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { notesService } from '@/src/features/notes/notes.service'

const AddButton = () => {
  const startingPos = useRef(20)
  const ind = getRandomInt()
  const { setIsNoteSaving, triggerNotification, setSelectedNote } = useNotes()
  const { user } = useAuth()

  const addNote = async () => {
    setIsNoteSaving(true)
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
      triggerNotification(getToastErrorMessage(error))
    }
    setIsNoteSaving(false)
  }

  return (
    <button
      type='button'
      className={styles.add_btn}
      onClick={addNote}
      aria-label='Add note'
    >
      <Plus />
    </button>
  )
}

export default AddButton

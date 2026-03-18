import type { ColorType } from '@/types'
import styles from './Controls.module.css'
import { getToastErrorMessage } from '@/src/shared/utils'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { notesService } from '@/src/features/notes/notes.service'

const Color = ({ color }: { color: ColorType }) => {
  const { selectedNote, setIsNoteSaving, setToast } = useNotes()

  const { user } = useAuth()

  const changeColor = async () => {
    if (selectedNote === null) return
    try {
      setIsNoteSaving(true)
      const payload = { colors: JSON.stringify(color) }
      await notesService.updateNote(user?.uid ?? '', selectedNote.id, payload)
    } catch (error) {
      setToast(getToastErrorMessage(error))
    }
    setIsNoteSaving(false)
  }

  return (
    <div
      className={styles.color}
      onClick={changeColor}
      style={{ backgroundColor: color.colorBody }}
    ></div>
  )
}

export default Color

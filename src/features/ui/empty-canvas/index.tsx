import { useRef } from 'react'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { useNotes } from '@/src/features/notes/hooks'
import styles from './Styles.module.css'
import { colors, getRandomInt, getToastErrorMessage } from '@/src/shared/utils'
import { notesService } from '@/src/features/notes/notes.service'
import { NoteIcon, PlusIcon } from '@/src/shared/components/icons'

const EmptyCanvas = () => {
  const startingPos = useRef(20)
  const ind = getRandomInt()
  const { setIsNoteSaving, setToast, setSelectedNote } = useNotes()
  const { user } = useAuth()

  const handleAddNote = async () => {
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
      setToast(getToastErrorMessage(error))
    }
    setIsNoteSaving(false)
  }

  return (
    <div className={styles.container}>
      {/* Icon */}
      <div className={styles.icon_box}>
        <NoteIcon />
      </div>

      {/* Text */}
      <div className={styles.text_block}>
        <h3 className={styles.heading}>
          {user?.isAnonymous ? 'Your guest canvas is empty' : 'No notes yet'}
        </h3>
        <p className={styles.body}>
          {user?.isAnonymous
            ? 'Pick a color and add your first note. Sign in to save your notes permanently.'
            : 'Choose a color from the sidebar and click + to create your first sticky note.'}
        </p>
      </div>

      {/* CTA */}
      <button
        className={`btn btn_primary ${styles.add_btn}`}
        onClick={handleAddNote}
      >
        <PlusIcon />
        Add your first note
      </button>
    </div>
  )
}

export default EmptyCanvas

import { useRef } from 'react'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { useNotes } from '@/src/features/notes/hooks'
import styles from './styles.module.css'
import { colors, getRandomInt, getToastErrorMessage } from '@/src/shared/utils'
import { notesService } from '@/src/features/notes/notes.service'
import { NoteIcon, PlusIcon } from '@/src/shared/components/icons'
import { Button, Typography } from '@/src/shared/components/uikit'

const EmptyCanvas = () => {
  const startingPos = useRef(20)
  const ind = getRandomInt()
  const { setIsNoteSaving, triggerNotification, setSelectedNote } = useNotes()
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
      triggerNotification(getToastErrorMessage(error))
    }
    setIsNoteSaving(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.icon_box}>
        <NoteIcon />
      </div>

      <div className={styles.text_block}>
        <Typography
          variant='heading'
          as='h3'
        >
          {user?.isAnonymous ? 'Your guest canvas is empty' : 'No notes yet'}
        </Typography>
        <Typography
          variant='muted'
          as='p'
        >
          {user?.isAnonymous
            ? 'Pick a color and add your first note. Sign in to save your notes permanently.'
            : 'Choose a color from the sidebar and click + to create your first sticky note.'}
        </Typography>
      </div>

      <Button
        variant='primary'
        leftIcon={<PlusIcon />}
        className={styles.add_btn}
        onClick={handleAddNote}
      >
        Add your first note
      </Button>
    </div>
  )
}

export default EmptyCanvas

import type { NoteDataType, MousePointerPosType } from '@/types'
import { useContext, useEffect, useRef, useState } from 'react'
import { autoGrow, bodyParser, setNewOffset, setZIndex, STATUS } from '../utils'
// import { db } from '../apppwrite/databases'
import DeleteButton from './DeleteButton'
import { NotesContext } from '../context/NotesContext'
import { dbFunctions } from '../firebaseCloudStore/dbfunctions'

type NoteCardProps = {
  note: NoteDataType
}

const NoteCard = ({ note }: NoteCardProps) => {
  const body = bodyParser(note.body)
  const colors = bodyParser(note.colors)
  const mouseStartPos = useRef<MousePointerPosType>({ x: 0, y: 0 })
  const { setSelectedNote, setStatus } = useContext(NotesContext)

  const [position, setPosition] = useState<MousePointerPosType>(
    bodyParser(note.position)
  )
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const keyUpTimer = useRef<number>(0)

  useEffect(() => {
    autoGrow(textAreaRef)
    setZIndex(cardRef)
  }, [])

  const mouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (target.className !== 'card-header') return

    mouseStartPos.current.x = event.clientX
    mouseStartPos.current.y = event.clientY

    setZIndex(cardRef)
    setSelectedNote(note)

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
  }

  const mouseMove = (event: MouseEvent) => {
    const mouseMoveDir = {
      x: mouseStartPos.current.x - event.clientX,
      y: mouseStartPos.current.y - event.clientY,
    }

    mouseStartPos.current.x = event.clientX
    mouseStartPos.current.y = event.clientY

    if (!cardRef.current) return

    const boundedOffset: MousePointerPosType = setNewOffset(
      cardRef.current,
      mouseMoveDir
    )

    setPosition(boundedOffset)
  }

  const mouseUp = async () => {
    document.removeEventListener('mousemove', mouseMove)
    document.removeEventListener('mouseup', mouseUp)

    if (!cardRef.current) return
    setStatus(STATUS.SAVING)
    saveData('position', JSON.stringify(setNewOffset(cardRef.current)))
  }

  const saveData = async (key: string, value: string) => {
    const payload = { [key]: value }
    try {
      await dbFunctions.notes.updateDocument(note.$id, payload)
      // await db.notes.updateRow(note.$id, payload)
    } catch (error) {
      console.error('🚀 ~ saveData ~ error:', error)
    }
    setStatus('')
  }

  const handleOnKeyUp = () => {
    setStatus(STATUS.SAVING)

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current)
    }

    keyUpTimer.current = setTimeout(() => {
      saveData('body', textAreaRef.current?.value ?? '')
    }, 1000)
  }

  return (
    <div
      ref={cardRef}
      className='card'
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        onMouseDown={mouseDown}
        className='card-header'
        style={{ backgroundColor: colors.colorHeader }}
      >
        <DeleteButton noteId={note.$id} />
      </div>
      <div className='card-body'>
        <textarea
          onKeyUp={handleOnKeyUp}
          onFocus={() => {
            setZIndex(cardRef)
            setSelectedNote(note)
          }}
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => autoGrow(textAreaRef)}
        ></textarea>
      </div>
    </div>
  )
}
export default NoteCard

import type { NoteDataType, MousePointerPosType } from '@/types'
import Trash from '@/src/icons/Trash'
import { useEffect, useRef, useState } from 'react'
import { autoGrow, setNewOffset, setZIndex } from '../utils'

const NoteCard = ({ note }: { note: NoteDataType }) => {
  const body = JSON.parse(note.body)
  const colors = JSON.parse(note.colors)
  const mouseStartPos = useRef<MousePointerPosType>({ x: 0, y: 0 })

  const [position, setPosition] = useState<MousePointerPosType>(
    JSON.parse(note.position)
  )
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    autoGrow(textAreaRef)
  }, [])

  const mouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    mouseStartPos.current.x = event.clientX
    mouseStartPos.current.y = event.clientY

    setZIndex(cardRef)

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

  const mouseUp = () => {
    document.removeEventListener('mousemove', mouseMove)
    document.removeEventListener('mouseup', mouseUp)
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
        <Trash />
      </div>
      <div className='card-body'>
        <textarea
          onFocus={() => setZIndex(cardRef)}
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

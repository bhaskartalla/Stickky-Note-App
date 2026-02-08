import type { FakeDataType } from '@/types'
import Trash from '@/src/icons/Trash'
import { useEffect, useRef, useState } from 'react'

const NoteCard = ({ note }: { note: FakeDataType }) => {
  // console.log('🚀 ~ NoteCard ~ note:', note)
  const body = JSON.parse(note.body)
  const colors = JSON.parse(note.colors)
  const mouseStartPos = { x: 0, y: 0 }

  const [position, setPosition] = useState<{ x: number; y: number }>(
    JSON.parse(note.position)
  )
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)

  const autoGrow = (
    textareaRef: React.RefObject<HTMLTextAreaElement | null>
  ) => {
    const { current } = textareaRef
    if (!current) return
    current.style.height = 'auto'
    current.style.height = current.scrollHeight + 'px'
  }

  const mouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    mouseStartPos.x = event.clientX
    mouseStartPos.y = event.clientY

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
  }

  const mouseMove = (event: MouseEvent) => {
    let mouseMoveDir = {
      x: mouseStartPos.x - event.clientX,
      y: mouseStartPos.y - event.clientY,
    }

    mouseStartPos.x = event.clientX
    mouseStartPos.y = event.clientY

    if (!cardRef.current) return

    setPosition({
      x: cardRef.current.offsetLeft - mouseMoveDir.x,
      y: cardRef.current.offsetTop - mouseMoveDir.y,
    })
  }

  const mouseUp = (event: MouseEvent) => {
    document.removeEventListener('mousemove', mouseMove)
    document.removeEventListener('mouseup', mouseUp)
  }

  useEffect(() => {
    autoGrow(textAreaRef)
  }, [])

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

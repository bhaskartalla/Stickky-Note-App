import type { MousePointerPosType } from '@/types'
import type { RefObject } from 'react'

export const setNewOffset = (
  card: HTMLDivElement,
  mouseMoveDir: MousePointerPosType = { x: 0, y: 0 }
) => {
  return {
    x: Math.min(
      window.innerWidth - card.clientWidth,
      Math.max(0, card.offsetLeft - mouseMoveDir.x)
    ),
    y: Math.min(
      window.innerHeight - 60 - card.clientHeight, // 60 value comes from the height of the header
      Math.max(0, card.offsetTop - mouseMoveDir.y)
    ),
  }
}

export const setZIndex = (
  selectedCardRef: RefObject<HTMLDivElement | null>
) => {
  if (!selectedCardRef.current) return
  const selectedCard = selectedCardRef.current

  const highestZIndex = 999
  selectedCard.style.zIndex = `${highestZIndex}`

  Array.from(document.querySelectorAll('[data-card]')).forEach((card) => {
    if (selectedCard === card) return
    const htmlCard = card as HTMLElement
    htmlCard.style.zIndex = `${highestZIndex - 1}`
  })
}

export const STATUS = Object.freeze({
  SAVING: 'Saving',
  DELETING: 'Deleting',
  CREATING: 'Creating',
})

export const getRandomInt = (max = 4) => {
  return Math.floor(Math.random() * max)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const bodyParser = (value: any) => {
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

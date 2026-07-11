import type { CSSProperties } from 'react'
import type { PositionType } from './types'

export const POSITION_CSS: Record<PositionType, CSSProperties> = {
  'top-left': { position: 'fixed', top: '20px', left: '20px' },
  'top-right': { position: 'fixed', top: '20px', right: '20px' },
  'bottom-left': { position: 'fixed', bottom: '20px', left: '20px' },
  'bottom-right': { position: 'fixed', bottom: '20px', right: '20px' },
}

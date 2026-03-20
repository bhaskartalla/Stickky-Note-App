import type { ElementType, ReactNode } from 'react'

export type TypographyVariant =
  | 'display_lg' // 20px Syne 800 — profile page name
  | 'display_md' // 17px Syne 800 — header logo
  | 'display_sm' // 15px Syne 700 — popup name
  | 'heading' // 18px Syne 700 — empty canvas heading
  | 'body' // 13.5px DM Sans — general body
  | 'body_sm' // 13px DM Sans   — labels, rows
  | 'caption' // 11.5px DM Sans — saving indicator, email tag
  | 'label' // 10px DM Sans uppercase — section labels, stat labels
  | 'muted' // body_sm + var(--muted) colour

export type TypographyProps = {
  variant?: TypographyVariant
  as?: ElementType
  children: ReactNode
  className?: string
}

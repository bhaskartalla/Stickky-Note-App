import type { Editor } from '@tiptap/react'
import type { ReactNode } from 'react'

export type ToolbarItem =
  | {
      type: 'button'
      label: ReactNode
      format: string
      attrs?: Record<string, unknown>
      action: (editor: Editor) => void
    }
  | { type: 'separator' }

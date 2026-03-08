import type { Editor } from '@tiptap/react'
import styles from './NoteCard.module.css'
import type { ToolbarItem } from '@/src/features/notes/types'

type NoteToolbarProps = {
  editor: Editor
}

const TOOLBAR_ITEMS: ToolbarItem[] = [
  {
    type: 'button',
    label: <b>B</b>,
    format: 'bold',
    action: (editor) => editor.chain().focus().toggleBold().run(),
  },
  {
    type: 'button',
    label: <i>I</i>,
    format: 'italic',
    action: (editor) => editor.chain().focus().toggleItalic().run(),
  },
  {
    type: 'button',
    label: <s>S</s>,
    format: 'strike',
    action: (editor) => editor.chain().focus().toggleStrike().run(),
  },
  {
    type: 'button',
    label: <u>U</u>,
    format: 'underline',
    action: (editor) => editor.chain().focus().toggleUnderline().run(),
  },
  { type: 'separator' },
  {
    type: 'button',
    label: <b>H1</b>,
    format: 'heading',
    attrs: { level: 1 },
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    type: 'button',
    label: <b>H2</b>,
    format: 'heading',
    attrs: { level: 2 },
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  { type: 'separator' },
  {
    type: 'button',
    label: '• List',
    format: 'bulletList',
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    type: 'button',
    label: '1. List',
    format: 'orderedList',
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
  },
  { type: 'separator' },
  {
    type: 'button',
    label: <code>{'</>'}</code>,
    format: 'codeBlock',
    action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
]

const NoteToolbar = ({ editor }: NoteToolbarProps) => {
  const active = (format: string, attrs?: Record<string, unknown>) =>
    editor.isActive(format, attrs) ? styles.active_button : ''

  return (
    <div
      id='formatting-controls'
      className={styles.note_editor_toolbar}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {TOOLBAR_ITEMS.map((item, index) => {
        if (item.type === 'separator') {
          return (
            <span
              key={`sep-${index}`}
              className={styles.toolbar_separator}
            >
              |
            </span>
          )
        }

        return (
          <button
            key={item.format + (item.attrs ? JSON.stringify(item.attrs) : '')}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => item.action(editor)}
            className={active(item.format, item.attrs)}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

export default NoteToolbar

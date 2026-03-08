import type { Editor } from '@tiptap/react'
import styles from './NoteCard.module.css'

type NoteToolbarProps = {
  editor: Editor
}

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
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={active('bold')}
      >
        B
      </button>

      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={active('italic')}
      >
        I
      </button>

      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={active('strike')}
      >
        S
      </button>

      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={active('heading', { level: 1 })}
      >
        H1
      </button>

      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={active('heading', { level: 2 })}
      >
        H2
      </button>

      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={active('bulletList')}
      >
        • List
      </button>

      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={active('orderedList')}
      >
        1. List
      </button>

      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={active('blockquote')}
      >
        "
      </button>

      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={active('codeBlock')}
      >
        {'</>'}
      </button>
    </div>
  )
}

export default NoteToolbar

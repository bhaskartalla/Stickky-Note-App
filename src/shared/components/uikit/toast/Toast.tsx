import { useEffect, useState } from 'react'
import styles from './Toast.module.css'

interface ToastProps {
  message: string
  type?: 'success' | 'error'
  onClose: () => void
}

const ICONS = { success: '✓', error: '✕' }

const Toast = ({ message, type = 'success', onClose }: ToastProps) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setVisible(false)
      const removeTimer = setTimeout(onClose, 300)
      return () => clearTimeout(removeTimer)
    }, 2500)

    return () => clearTimeout(exitTimer)
  }, [onClose])

  return (
    <div
      className={`${styles.toast} ${
        type === 'error' ? styles.error : styles.success
      } ${!visible ? styles.hide : ''}`}
    >
      <span style={{ fontSize: 15, flexShrink: 0 }}>{ICONS[type]}</span>
      <span>{message}</span>
    </div>
  )
}

export default Toast

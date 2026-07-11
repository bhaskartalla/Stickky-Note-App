import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from 'react-icons/ai'
import styles from './Toast.module.css'
import type { AnimationType, NotificationTypesType } from './types'

type ToastProps = {
  type: NotificationTypesType
  text: string
  onClose: () => void
  animation: AnimationType
}

const icons = {
  success: <AiOutlineCheckCircle className={styles.toastIcon} />,
  info: <AiOutlineInfoCircle className={styles.toastIcon} />,
  warning: <AiOutlineWarning className={styles.toastIcon} />,
  error: <AiOutlineCloseCircle className={styles.toastIcon} />,
}

const Toast = ({ type = 'info', text, onClose, animation }: ToastProps) => {
  return (
    <div className={`${styles.toast} ${styles[type]} ${styles[animation]}`}>
      <div className={styles.toastContent}>
        {icons[type]}
        <span>{text}</span>
      </div>
      <AiOutlineClose
        className={styles.closeBtn}
        onClick={onClose}
      />
    </div>
  )
}

export default Toast

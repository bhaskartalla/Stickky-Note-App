import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

export const GuestBanner = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.guest_banner}>
      ⚠️ Guest notes are{' '}
      <strong className={styles.guest_banner_accent}>not synced</strong>
      {' — '}
      <button
        type='button'
        className={styles.guest_banner_btn}
        onClick={() => navigate('/signin')}
      >
        Sign up for free and access from anywhere
      </button>
    </div>
  )
}

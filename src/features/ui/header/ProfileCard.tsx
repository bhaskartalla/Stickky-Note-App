import styles from './Header.module.css'
import { getToastErrorMessage } from '@/src/shared/utils'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import { authService } from '@/src/features/auth/auth.service'
import type { User } from 'firebase/auth'
import { useState } from 'react'

type ProfileCardProps = {
  isPopUpOpen: boolean
  user: User | null
}

const ProfileCard = ({ isPopUpOpen, user }: ProfileCardProps) => {
  const { setToast } = useNotes()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (isLoggingOut) return
    try {
      setIsLoggingOut(true)
      await authService.logOut()
    } catch (error) {
      setToast(getToastErrorMessage(error))
    } finally {
      setIsLoggingOut(false)
    }
  }

  if (!user) return null

  const initials = (user.displayName ?? '')
    .split(' ')
    .map((n: string) => n[0]?.toUpperCase())
    .join('')

  return (
    <div className={`${styles.user_popup} ${isPopUpOpen ? styles.active : ''}`}>
      {/* Hero */}
      <div className={styles.popup_header}>
        <div className={styles.profile_avatar}>
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt='User Profile'
              referrerPolicy='no-referrer'
              loading='lazy'
            />
          ) : (
            initials || '👤'
          )}
        </div>
        <div className={styles.profile_name}>{user.displayName}</div>
        <div className={styles.profile_email_tag}>{user.email}</div>
      </div>

      {/* Stats row */}
      <div className={styles.profile_stats}>
        <div className={styles.stat}>
          <div className={styles.stat_val}>🔒</div>
          <div className={styles.stat_label}>Encrypted</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.stat_val}>
            {user.providerData[0]?.providerId === 'google.com' ? 'G' : '✉'}
          </div>
          <div className={styles.stat_label}>Provider</div>
        </div>
      </div>

      {/* Action rows */}
      <div className={styles.profile_actions}>
        <button className={styles.profile_row}>
          <span style={{ fontSize: 15 }}>🔑</span> Change password
        </button>
        <button className={styles.profile_row}>
          <span style={{ fontSize: 15 }}>⚙️</span> Preferences
        </button>
      </div>

      {/* Logout */}
      <button
        className={`${styles.logout_btn} ${
          isLoggingOut ? styles.disabled : ''
        }`}
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? 'Logging out…' : 'Log Out'}
      </button>
    </div>
  )
}

export default ProfileCard

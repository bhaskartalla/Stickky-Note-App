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

  return (
    <div className={`${styles.user_popup} ${isPopUpOpen ? styles.active : ''}`}>
      <div className={styles.popup_header}>
        {user.photoURL ? (
          <img
            className={styles.profile_avatar}
            src={user.photoURL}
            alt='User Profile'
            referrerPolicy='no-referrer'
            loading='lazy'
          />
        ) : (
          <span className={styles.profile_avatar}>
            {(user.displayName ?? '')
              .split(' ')
              .map((name: string) => name[0]?.toUpperCase())
              .join('')}
          </span>
        )}
        <div className={styles.profile_name}>{user.displayName}</div>
      </div>

      <div className={styles.popup_body}>
        <div className={styles.user_detail}>
          <span className={styles.detail_label}>Email:</span>
          <span className={styles.detail_value}>{user.email}</span>
        </div>

        <div className={styles.popup_divider}></div>

        <button
          className={styles.logout_btn}
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  )
}
export default ProfileCard

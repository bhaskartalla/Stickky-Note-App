import styles from './Header.module.css'
import type { User } from 'firebase/auth'

type ProfileCardProps = {
  isPopUpOpen: boolean
  isLoggingOut: boolean
  onLogout: () => void
  user: User | null
}

const ProfileCard = ({
  isPopUpOpen,
  isLoggingOut,
  onLogout,
  user,
}: ProfileCardProps) => {
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
          <div className={styles.stat_val}>6</div>
          <div className={styles.stat_label}>Notes</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.stat_val}>3</div>
          <div className={styles.stat_label}>Colors</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.stat_val}>
            {user.providerData[0]?.providerId === 'google.com' ? 'G' : '✉'}
          </div>
          <div className={styles.stat_label}>Provider</div>
        </div>
      </div>

      {/* Action rows — dimmed while logging out */}
      <div
        className={styles.profile_actions}
        style={
          isLoggingOut ? { opacity: 0.4, pointerEvents: 'none' } : undefined
        }
      >
        <button className={styles.profile_row}>
          <span style={{ fontSize: 15 }}>👤</span> View full profile
        </button>
        <button className={styles.profile_row}>
          <span style={{ fontSize: 15 }}>🔑</span> Change password
        </button>
        <button className={styles.profile_row}>
          <span style={{ fontSize: 15 }}>⚙️</span> Preferences
        </button>
      </div>

      {/* Logout button with inline spinner */}
      <button
        className={`${styles.logout_btn} ${
          isLoggingOut ? styles.logout_btn_loading : ''
        }`}
        onClick={onLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? (
          <span className={styles.logout_loading_content}>
            <span
              className={styles.logout_spinner}
              aria-hidden='true'
            />
            Logging out…
          </span>
        ) : (
          'Log Out'
        )}
      </button>
    </div>
  )
}

export default ProfileCard

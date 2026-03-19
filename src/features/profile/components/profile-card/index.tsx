import { forwardRef } from 'react'
import styles from './style.module.css'
import { useTheme } from '@/src/app/theme'
import type { ThemeName } from '@/src/app/theme'
import { useNavigate } from 'react-router-dom'
import { useNotes } from '@/src/features/notes/hooks'
import type { ProfileCardProps } from '../../types'

const THEME_OPTIONS: { value: ThemeName; label: string; icon: string }[] = [
  { value: 'default', label: 'Dark', icon: '🌙' },
  { value: 'light', label: 'Light', icon: '☀️' },
  { value: 'high-contrast', label: 'HC', icon: '◑' },
]

const ProfileCard = forwardRef<HTMLDivElement, ProfileCardProps>(
  ({ isPopUpOpen, isLoggingOut, onLogout, onClose, user }, ref) => {
    const navigate = useNavigate()
    const { currentTheme, setTheme } = useTheme()
    const { notes } = useNotes()

    if (!user) return null

    const initials = (user.displayName ?? '')
      .split(' ')
      .map((n: string) => n[0]?.toUpperCase())
      .join('')

    const handleViewProfile = () => {
      onClose()
      navigate('/profile')
    }

    return (
      <div
        ref={ref}
        className={`${styles.user_popup} ${isPopUpOpen ? styles.active : ''}`}
      >
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
            <div className={styles.stat_val}>{notes.length}</div>
            <div className={styles.stat_label}>Notes</div>
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
          <button
            onClick={handleViewProfile}
            className={styles.profile_row}
          >
            <span style={{ fontSize: 15 }}>👤</span> View full profile
          </button>
          <button className={styles.profile_row}>
            <span style={{ fontSize: 15 }}>🔑</span>
            Change password
            <span className={styles.coming_soon_badge}>Coming soon</span>
          </button>
          <button className={styles.profile_row}>
            <span style={{ fontSize: 15 }}>⚙️</span> Preferences
            <span className={styles.coming_soon_badge}>Coming soon</span>
          </button>
        </div>

        {/* Theme switcher */}
        <div className={styles.theme_section}>
          <div className={styles.theme_label}>Theme</div>
          <div className={styles.theme_tabs}>
            {THEME_OPTIONS.map(({ value, label, icon }) => (
              <button
                key={value}
                className={`${styles.theme_tab} ${
                  currentTheme === value ? styles.theme_tab_active : ''
                }`}
                onClick={() => setTheme(value)}
                aria-pressed={currentTheme === value}
                aria-label={`Switch to ${label} theme`}
              >
                <span className={styles.theme_tab_icon}>{icon}</span>
                {label}
              </button>
            ))}
          </div>
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
)

ProfileCard.displayName = 'ProfileCard'

export default ProfileCard

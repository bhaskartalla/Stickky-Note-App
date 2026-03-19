import { useState } from 'react'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import styles from '../components/Profile.module.css'
import {
  formatDate,
  getMemberDays,
  getToastErrorMessage,
} from '@/src/shared/utils'
import { authService } from '@/src/features/auth/auth.service'
import { useNotes } from '@/src/features/notes/hooks'
import { useNavigate } from 'react-router-dom'
import ConfirmDeletePopup from '../components/delete-confirmation'

const ProfilePage = () => {
  const { user } = useAuth()
  const { setToast } = useNotes()
  const navigate = useNavigate()

  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  if (!user) return null

  const isGoogleAuth = user.providerData[0]?.providerId === 'google.com'

  const initials = (user.displayName ?? '')
    .split(' ')
    .map((n: string) => n[0]?.toUpperCase())
    .join('')

  const handleOnLogout = async () => {
    setIsLoggingOut(true)
    try {
      await authService.logOut()
    } catch (error) {
      setToast(getToastErrorMessage(error))
      setIsLoggingOut(false)
    }
  }

  const handleDeleteConfirmed = async () => {
    setIsDeleting(true)
    try {
      await authService.deleteAccount()
    } catch (error) {
      setToast(getToastErrorMessage(error))
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  return (
    <>
      <div className={styles.profile_page}>
        <div className={styles.profile_page_card}>
          {/* ── Hero ── */}
          <div className={styles.profile_page_hero}>
            <div className={styles.profile_page_avatar}>
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
            <div className={styles.profile_page_info}>
              <div className={styles.profile_page_name}>{user.displayName}</div>
              <div className={styles.profile_page_email}>{user.email}</div>
              <div
                className={
                  user.emailVerified
                    ? styles.profile_badge
                    : styles.profile_badge_unverified
                }
              >
                {user.emailVerified
                  ? '✓ Email verified'
                  : '✕ Email not verified'}
              </div>
            </div>
          </div>

          {/* ── Stats ── */}
          <div className={styles.profile_page_stats}>
            <div className={styles.pstat}>
              <div className={styles.pstat_val}>🔒</div>
              <div className={styles.coming_soon_badge}>
                Encryption Coming soon
              </div>
            </div>
            <div className={styles.pstat}>
              <div className={styles.pstat_val}>{isGoogleAuth ? 'G' : '✉'}</div>
              <div className={styles.pstat_label}>Provider</div>
            </div>
            <div className={styles.pstat}>
              <div className={styles.pstat_val}>
                {getMemberDays(user.metadata.creationTime ?? '')}d
              </div>
              <div className={styles.pstat_label}>Member</div>
            </div>
          </div>

          {/* ── Account Details ── */}
          <div className={styles.profile_page_section}>
            <div className={styles.section_label}>Account Details</div>
            <div className={styles.info_row}>
              <span className={styles.info_key}>Email</span>
              <span className={styles.info_val}>{user.email}</span>
            </div>
            <div className={styles.info_row}>
              <span className={styles.info_key}>Auth Provider</span>
              <span className={styles.info_val}>
                {isGoogleAuth ? 'Google' : 'Email / password'}
              </span>
            </div>
            <div className={styles.info_row}>
              <span className={styles.info_key}>Member since</span>
              <span className={styles.info_val}>
                {formatDate(user.metadata.creationTime ?? '')}
              </span>
            </div>
          </div>

          {/* ── Security ── */}
          <div className={styles.profile_page_section}>
            <div className={styles.section_label}>Security</div>
            <div className={styles.info_row}>
              <span className={styles.info_key}>End-to-end encryption</span>
              <span className={styles.coming_soon_badge}>Coming soon</span>
            </div>
            <div className={styles.info_row}>
              <span className={styles.info_key}>Change Password </span>
              <span className={styles.coming_soon_badge}>Coming soon</span>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className={styles.profile_page_footer}>
            <button
              type='button'
              className={`btn btn_danger ${styles.footer_btn} ${
                isLoggingOut ? styles.logout_btn_loading : ''
              }`}
              onClick={handleOnLogout}
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
            <button
              type='button'
              className={`btn btn_ghost ${styles.footer_btn}`}
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isLoggingOut}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* ── Delete confirmation popup — rendered outside card ── */}
      {showDeleteConfirm && (
        <ConfirmDeletePopup
          isDeleting={isDeleting}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => !isDeleting && setShowDeleteConfirm(false)}
        />
      )}
    </>
  )
}

export default ProfilePage

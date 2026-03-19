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
import ConfirmDeletePopup from '../components/delete-confirmation'
import {
  Avatar,
  Badge,
  Button,
  InfoRow,
  Typography,
} from '@/src/shared/components/ui'

const ProfilePage = () => {
  const { user } = useAuth()
  const { setToast } = useNotes()

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
      <div className={`${styles.profile_page} grid_bg`}>
        <div className={styles.profile_page_card}>
          {/* ── Hero ── */}
          <div className={styles.profile_page_hero}>
            <Avatar
              photoURL={user.photoURL}
              initials={initials}
              size='lg'
            />
            <div className={styles.profile_page_info}>
              <Typography
                variant='display_lg'
                as='div'
              >
                {user.displayName}
              </Typography>
              <div className={styles.profile_page_email}>{user.email}</div>
              <Badge variant={user.emailVerified ? 'success' : 'error'}>
                {user.emailVerified
                  ? '✓ Email verified'
                  : '✕ Email not verified'}
              </Badge>
            </div>
          </div>

          {/* ── Stats ── */}
          <div className={styles.profile_page_stats}>
            <div className={styles.pstat}>
              <div className={styles.pstat_val}>🔒</div>
              <Badge variant='muted'>Coming soon</Badge>
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
            <InfoRow
              label='Email'
              value={user.email ?? ''}
            />
            <InfoRow
              label='Auth Provider'
              value={isGoogleAuth ? 'Google' : 'Email / password'}
            />
            <InfoRow
              label='Member since'
              value={formatDate(user.metadata.creationTime ?? '')}
            />
          </div>

          {/* ── Security ── */}
          <div className={styles.profile_page_section}>
            <div className={styles.section_label}>Security</div>
            <InfoRow
              label='End-to-end encryption'
              value={<Badge variant='muted'>Coming soon</Badge>}
            />
            <InfoRow
              label='Change Password'
              value={<Badge variant='muted'>Coming soon</Badge>}
            />
          </div>

          {/* ── Footer ── */}
          <div className={styles.profile_page_footer}>
            <Button
              variant='danger'
              size='sm'
              className={styles.footer_btn}
              isLoading={isLoggingOut}
              loadingText='Logging out…'
              onClick={handleOnLogout}
            >
              Log Out
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className={styles.footer_btn}
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isLoggingOut}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>

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

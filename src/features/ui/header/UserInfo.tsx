import styles from './Header.module.css'
import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import { authService } from '@/src/features/auth/auth.service'
import { getToastErrorMessage } from '@/src/shared/utils'
import { useNavigate } from 'react-router-dom'
import ProfileCard from '@/src/features/profile/components/profile-card'

const UserInfo = () => {
  const navigate = useNavigate()

  const { user } = useAuth()
  const { setToast } = useNotes()
  const isProfilePage = location.pathname === '/profile'

  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const profileCardRef = useRef<HTMLDivElement | null>(null)
  const isLoggingOutRef = useRef(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isLoggingOutRef.current) return

      const clickedInsideAvatar = wrapperRef.current?.contains(
        event.target as Node
      )
      const clickedInsideProfileCard = profileCardRef.current?.contains(
        event.target as Node
      )

      if (!clickedInsideAvatar && !clickedInsideProfileCard) {
        setIsPopUpOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = useCallback(async () => {
    if (isLoggingOutRef.current) return

    isLoggingOutRef.current = true
    setIsLoggingOut(true)

    try {
      await authService.logOut()
    } catch (error) {
      setToast(getToastErrorMessage(error))
      isLoggingOutRef.current = false
      setIsLoggingOut(false)
    }
  }, [setToast])

  const handleNotePageRedirection = () => navigate('/')
  const initials = (user?.displayName ?? '')
    .split(' ')
    .map((n: string) => n[0]?.toUpperCase())
    .join('')

  return (
    <div ref={wrapperRef}>
      {isProfilePage ? (
        <button
          onClick={handleNotePageRedirection}
          className='btn btn_ghost btn_sm'
        >
          ← Back to Notes
        </button>
      ) : (
        <button
          className={styles.user_icon}
          onClick={() => !isLoggingOut && setIsPopUpOpen((prev) => !prev)}
          aria-label='Open profile menu'
          aria-haspopup='true'
          data-avatar-btn
          style={
            isLoggingOut ? { opacity: 0.5, pointerEvents: 'none' } : undefined
          }
        >
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt='User Profile'
              referrerPolicy='no-referrer'
              loading='lazy'
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          ) : (
            initials || '👤'
          )}
        </button>
      )}
      {createPortal(
        <ProfileCard
          ref={profileCardRef}
          isPopUpOpen={isPopUpOpen}
          isLoggingOut={isLoggingOut}
          onLogout={handleLogout}
          onClose={() => setIsPopUpOpen(false)}
          user={user}
        />,
        document.body
      )}
    </div>
  )
}

export default UserInfo

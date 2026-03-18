import styles from './Header.module.css'
import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import { authService } from '@/src/features/auth/auth.service'
import { getToastErrorMessage } from '@/src/shared/utils'
import ProfileCard from './ProfileCard'

const UserInfo = () => {
  const { user } = useAuth()
  const { setToast } = useNotes()

  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const isLoggingOutRef = useRef(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isLoggingOutRef.current) return
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
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

  const initials = (user?.displayName ?? '')
    .split(' ')
    .map((n: string) => n[0]?.toUpperCase())
    .join('')

  return (
    <div ref={wrapperRef}>
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

      {createPortal(
        <ProfileCard
          isPopUpOpen={isPopUpOpen}
          isLoggingOut={isLoggingOut}
          onLogout={handleLogout}
          user={user}
        />,
        document.body
      )}
    </div>
  )
}

export default UserInfo

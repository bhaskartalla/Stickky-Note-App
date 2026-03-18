import styles from './Header.module.css'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useAuth } from '@/src/features/auth/hooks/useAuth'

const ProfileCard = lazy(() => import('./ProfileCard'))

const UserInfo = () => {
  const { user } = useAuth()
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

  /* Derive initials for the avatar button */
  const initials = (user?.displayName ?? '')
    .split(' ')
    .map((n: string) => n[0]?.toUpperCase())
    .join('')

  return (
    <div ref={wrapperRef}>
      {/* Avatar button — now accent-yellow pill */}
      <button
        className={styles.user_icon}
        onClick={() => setIsPopUpOpen((prev) => !prev)}
        aria-label='Open profile menu'
        aria-haspopup='true'
        data-avatar-btn
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

      {isPopUpOpen && (
        <Suspense fallback={null}>
          <ProfileCard
            isPopUpOpen={isPopUpOpen}
            user={user}
          />
        </Suspense>
      )}
    </div>
  )
}

export default UserInfo

import styles from './Header.module.css'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'

const ProfileCard = lazy(() => import('./ProfileCard'))

const UserInfo = () => {
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={wrapperRef}>
      <div
        className={styles.user_icon}
        onClick={() => setIsPopUpOpen((prev) => !prev)}
      >
        👤
      </div>

      {isPopUpOpen && (
        <Suspense fallback={<></>}>
          <ProfileCard isPopUpOpen={isPopUpOpen} />
        </Suspense>
      )}
    </div>
  )
}

export default UserInfo

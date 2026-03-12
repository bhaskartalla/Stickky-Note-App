import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { useLocation } from 'react-router-dom'

export const GuestBadge = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isSignInPage = location.pathname === '/signin'

  const handleAuthRedirect = () => {
    navigate(isSignInPage ? '/' : '/signin')
  }

  return (
    <div className={styles.guest_badge}>
      <div onClick={handleAuthRedirect}>
        {isSignInPage ? 'Try as Guest' : 'Sign Up / Sign In'}
      </div>
    </div>
  )
}

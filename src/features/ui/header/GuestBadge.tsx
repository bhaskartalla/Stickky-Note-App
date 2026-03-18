import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

export const GuestBadge = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isSignInPage = location.pathname === '/signin'

  const handleAuthRedirect = () => {
    navigate(isSignInPage ? '/' : '/signin')
  }

  return (
    <div
      className={styles.guest_badge}
      onClick={handleAuthRedirect}
    >
      <div className={styles.guest_chip_dot} />
      {isSignInPage ? 'Try as Guest' : 'Sign Up / Sign In'}
    </div>
  )
}

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
    <>
      {!isSignInPage && (
        <div className={styles.guest_badge}>
          <div className={styles.guest_chip_dot} />
          Guest Session
        </div>
      )}
      <button
        onClick={handleAuthRedirect}
        className={`btn ${isSignInPage ? 'btn_outline' : 'btn_primary'}`}
      >
        {isSignInPage ? 'Try as Guest' : 'Sign Up / Sign In'}
      </button>
    </>
  )
}

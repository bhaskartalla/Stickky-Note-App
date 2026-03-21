import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.css'
import { Button } from '@/src/shared/components/uikit'

export const GuestBadge = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isSignInPage = location.pathname === '/signin'

  const handleAuthRedirect = () => navigate(isSignInPage ? '/' : '/signin')

  return (
    <>
      {!isSignInPage && (
        <div className={styles.guest_badge}>
          <div className={styles.guest_chip_dot} />
          Guest Session
        </div>
      )}
      <Button
        variant={isSignInPage ? 'outline' : 'primary'}
        onClick={handleAuthRedirect}
      >
        {isSignInPage ? 'Try as Guest' : 'Sign Up / Sign In'}
      </Button>
    </>
  )
}

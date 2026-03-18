import { lazy, useEffect, useState, type ChangeEvent } from 'react'
import styles from '../components/AuthForm.module.css'
import { authService } from '../auth.service'
import { getToastErrorMessage } from '@/src/shared/utils'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const SignIn = lazy(() => import('../components/SignIn'))
const SignUp = lazy(() => import('../components/SignUp'))

/* Decorative background notes shown on the auth screen */
const DECO_NOTES = [
  {
    bg: 'var(--note-green)',
    rot: '-6deg',
    top: '12%',
    left: '5%',
    text: 'Buy groceries\n🥑 avocados\n🍅 tomatoes',
  },
  {
    bg: 'var(--note-yellow)',
    rot: '4deg',
    top: '18%',
    right: '6%',
    text: 'Meeting @ 3pm\nReview Q3 goals',
  },
  {
    bg: 'var(--note-pink)',
    rot: '-3deg',
    bottom: '16%',
    left: '8%',
    text: 'Call dentist\nFriday appt.',
  },
  {
    bg: 'var(--note-blue)',
    rot: '5deg',
    bottom: '20%',
    right: '7%',
    text: 'Read: Atomic Habits\nCh. 4 → 7',
  },
]

const AuthenticationPage = () => {
  const { setAuthLoading } = useAuth()
  const navigate = useNavigate()

  const [isSignInView, setIsSignInView] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const toggleLoginView = () => setIsSignInView((prev) => !prev)

  const [{ fullName, email, password, confirmPassword }, setCredentials] =
    useState({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    })

  useEffect(() => {
    setErrorMessage('')
  }, [isSignInView])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async () => {
    try {
      setAuthLoading(true)
      await authService.signIn(email, password)
    } catch (error) {
      setErrorMessage(getToastErrorMessage(error).message)
    } finally {
      setAuthLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    try {
      setAuthLoading(true)
      await authService.signInWithGoogle()
    } catch (error) {
      setErrorMessage(getToastErrorMessage(error).message)
    } finally {
      setAuthLoading(false)
    }
  }

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters')
      return
    }
    try {
      setAuthLoading(true)
      await authService.signUp(email, password)
    } catch (error) {
      setErrorMessage(getToastErrorMessage(error).message)
    } finally {
      setAuthLoading(false)
    }
  }

  return (
    <div
      className={styles.modal_overlay}
      onMouseDown={() => navigate('/')}
    >
      {/* Decorative floating notes */}
      {DECO_NOTES.map((n, i) => (
        <div
          key={i}
          className={styles.deco_note}
          style={{
            background: n.bg,
            transform: `rotate(${n.rot})`,
            top: n.top,
            left: n.left,
            right: (n as { right?: string }).right,
            bottom: (n as { bottom?: string }).bottom,
          }}
        >
          {n.text}
        </div>
      ))}

      <div
        className={styles.auth_card}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Tab switcher */}
        <div className={styles.auth_tabs}>
          <button
            className={`${styles.auth_tab} ${
              !isSignInView ? styles.auth_tab_active : ''
            }`}
            onClick={() => setIsSignInView(false)}
          >
            Create Account
          </button>
          <button
            className={`${styles.auth_tab} ${
              isSignInView ? styles.auth_tab_active : ''
            }`}
            onClick={() => setIsSignInView(true)}
          >
            Sign In
          </button>
        </div>

        {/* Error */}
        <div
          className={styles.error_message}
          style={{ display: errorMessage ? 'block' : 'none' }}
        >
          {errorMessage}
        </div>

        {isSignInView ? (
          <SignIn
            credentials={{ fullName, email, password, confirmPassword }}
            handleChange={handleChange}
            handleSignInView={toggleLoginView}
            handleGoogleSignIn={handleGoogleAuth}
            handleLogin={handleLogin}
          />
        ) : (
          <SignUp
            credentials={{ fullName, email, password, confirmPassword }}
            handleChange={handleChange}
            handleSignUpView={toggleLoginView}
            handleGoogleSignUp={handleGoogleAuth}
            handleRegister={handleRegister}
          />
        )}
      </div>
    </div>
  )
}

export default AuthenticationPage

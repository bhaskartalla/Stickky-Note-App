import { lazy, useEffect, useState, type ChangeEvent } from 'react'
import styles from '../components/AuthForm.module.css'
import { authService } from '../auth.service'
import { getToastErrorMessage } from '@/src/shared/utils'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const SignIn = lazy(() => import('../components/SignIn'))
const SignUp = lazy(() => import('../components/SignUp'))

const AuthenticationPage = () => {
  const { setAuthLoading } = useAuth()
  const navigate = useNavigate()

  const [isSignInView, setIsSignInView] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const toggleLoginView = () => setIsSignInView((prev) => !prev)

  const [{ email, password, confirmPassword }, setCredentials] = useState({
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
      <div
        className={styles.auth_card}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          className={styles.error_message}
          style={{ display: errorMessage ? 'block' : 'none' }}
        >
          {errorMessage}
        </div>

        {isSignInView ? (
          <SignIn
            credentials={{ email, password, confirmPassword }}
            handleChange={handleChange}
            handleSignInView={toggleLoginView}
            handleGoogleSignIn={handleGoogleAuth}
            handleLogin={handleLogin}
          />
        ) : (
          <SignUp
            credentials={{ email, password, confirmPassword }}
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

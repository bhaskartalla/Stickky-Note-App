import styles from './AuthForm.module.css'
import type { CredentialsType } from '@/types'
import { useState, type ChangeEvent } from 'react'
import { useAuth } from '../hooks/useAuth'
import GoogleIcon from '@/src/shared/components/icons/GoogleIcon'
import { AUTHENTICATION_TYPES } from '@/src/shared/utils'

type SignUpProps = {
  credentials: CredentialsType
  handleSignUpView: () => void
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleGoogleSignUp: () => void
  handleRegister: () => Promise<void>
}

const SignUp = ({
  credentials,
  handleSignUpView,
  handleChange,
  handleGoogleSignUp,
  handleRegister,
}: SignUpProps) => {
  const { fullName, email, password, confirmPassword } = credentials
  const { authLoading } = useAuth()

  const [authType, setAuthType] = useState('')

  const handleCreateAccount = (authType: string) => {
    setAuthType(authType)
    if (authType === AUTHENTICATION_TYPES.GOOGLE) {
      handleGoogleSignUp()
    } else if (authType === AUTHENTICATION_TYPES.EMAIL) {
      handleRegister()
    }
  }

  return (
    <div id='registerForm'>
      <div className={styles.form_group}>
        <label htmlFor='fullName'>Full Name</label>
        <input
          type='text'
          name='fullName'
          id='fullName'
          placeholder='John Doe'
          required
          value={fullName}
          onChange={handleChange}
        />
      </div>

      <div className={styles.form_group}>
        <label htmlFor='registerEmail'>Email Address</label>
        <input
          type='email'
          name='email'
          id='registerEmail'
          placeholder='you@example.com'
          required
          value={email}
          onChange={handleChange}
        />
      </div>

      <div className={styles.form_group}>
        <label htmlFor='registerPassword'>Password</label>
        <input
          type='password'
          name='password'
          id='registerPassword'
          placeholder='••••••••'
          required
          value={password}
          onChange={handleChange}
        />
      </div>

      <div className={styles.form_group}>
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          type='password'
          name='confirmPassword'
          id='confirmPassword'
          placeholder='••••••••'
          required
          value={confirmPassword}
          onChange={handleChange}
        />
      </div>

      <button
        className={styles.submit_btn}
        onClick={() => handleCreateAccount(AUTHENTICATION_TYPES.EMAIL)}
        disabled={!email || !password || !confirmPassword || authLoading}
      >
        {authLoading && authType === AUTHENTICATION_TYPES.EMAIL
          ? 'Creating account…'
          : 'Create Account'}
      </button>

      <div className={styles.divider}>
        <span className={styles.divider_text}>or</span>
      </div>

      <button
        className={styles.google_btn}
        onClick={() => handleCreateAccount(AUTHENTICATION_TYPES.GOOGLE)}
      >
        <span className={styles.google_icon}>
          <GoogleIcon />
        </span>
        {authLoading && authType === AUTHENTICATION_TYPES.GOOGLE
          ? 'Creating account…'
          : ' Continue with Google'}
      </button>

      <div className={styles.toggle_section}>
        Already have an account?{' '}
        <button
          type='button'
          onClick={handleSignUpView}
        >
          Sign in
        </button>
      </div>
    </div>
  )
}

export default SignUp

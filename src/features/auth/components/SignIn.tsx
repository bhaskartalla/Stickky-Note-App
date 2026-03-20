import styles from './AuthForm.module.css'
import type { CredentialsType } from '@/types'
import { useState, type ChangeEvent } from 'react'
import GoogleIcon from '@/src/shared/components/icons/GoogleIcon'
import { AUTHENTICATION_TYPES } from '@/src/shared/utils'

type SignInProps = {
  credentials: CredentialsType
  handleSignInView: () => void
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleGoogleSignIn: () => void
  handleLogin: () => Promise<void>
  isLoading: boolean
}

const SignIn = ({
  credentials,
  handleSignInView,
  handleChange,
  handleGoogleSignIn,
  handleLogin,
  isLoading,
}: SignInProps) => {
  const { email, password } = credentials

  const [authType, setAuthType] = useState('')

  const handleLoginAccount = (authType: string) => {
    setAuthType(authType)
    if (authType === AUTHENTICATION_TYPES.GOOGLE) {
      handleGoogleSignIn()
    } else if (authType === AUTHENTICATION_TYPES.EMAIL) {
      handleLogin()
    }
  }

  return (
    <div id='loginForm'>
      <div className={styles.form_group}>
        <label htmlFor='loginEmail'>Email Address</label>
        <input
          type='email'
          name='email'
          id='loginEmail'
          placeholder='you@example.com'
          required
          value={email}
          onChange={handleChange}
        />
      </div>

      <div className={styles.form_group}>
        <label htmlFor='loginPassword'>Password</label>
        <input
          type='password'
          name='password'
          id='loginPassword'
          placeholder='••••••••'
          required
          value={password}
          onChange={handleChange}
        />
      </div>

      <button
        className={styles.submit_btn}
        onClick={() => handleLoginAccount(AUTHENTICATION_TYPES.EMAIL)}
        disabled={!email || !password || isLoading}
      >
        {isLoading && authType === AUTHENTICATION_TYPES.EMAIL
          ? 'Signing in…'
          : 'Sign In'}
      </button>

      <div className={styles.divider}>
        <span className={styles.divider_text}>or</span>
      </div>

      <button
        className={styles.google_btn}
        onClick={() => handleLoginAccount(AUTHENTICATION_TYPES.GOOGLE)}
      >
        <span className={styles.google_icon}>
          <GoogleIcon />
        </span>
        {isLoading && authType === AUTHENTICATION_TYPES.GOOGLE
          ? 'Signing in…'
          : 'Continue with Google'}
      </button>

      <div className={styles.toggle_section}>
        Don&apos;t have an account?{' '}
        <button
          type='button'
          onClick={handleSignInView}
        >
          Create one
        </button>
      </div>
    </div>
  )
}

export default SignIn

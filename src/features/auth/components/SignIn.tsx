import styles from './AuthForm.module.css'
import type { CredentialsType } from '@/types'
import { type ChangeEvent } from 'react'
import { useAuth } from '../hooks/useAuth'
import GoogleIcon from '@/src/shared/components/icons/GoogleIcon'

type SignInProps = {
  credentials: CredentialsType
  handleSignInView: () => void
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleGoogleSignIn: () => void
  handleLogin: () => Promise<void>
}

const SignIn = ({
  credentials,
  handleSignInView,
  handleChange,
  handleGoogleSignIn,
  handleLogin,
}: SignInProps) => {
  const { email, password } = credentials
  const { authLoading } = useAuth()

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
        onClick={handleLogin}
        disabled={!email || !password || authLoading}
      >
        {authLoading ? 'Signing in…' : 'Sign In'}
      </button>

      <div className={styles.divider}>
        <span className={styles.divider_text}>or</span>
      </div>

      <button
        className={styles.google_btn}
        onClick={handleGoogleSignIn}
      >
        <span className={styles.google_icon}>
          <GoogleIcon />
        </span>
        Continue with Google
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

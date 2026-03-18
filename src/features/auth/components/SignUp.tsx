import styles from './AuthForm.module.css'
import type { CredentialsType } from '@/types'
import type { ChangeEvent } from 'react'
import { useAuth } from '../hooks/useAuth'
import GoogleIcon from '@/src/shared/components/icons/GoogleIcon'

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
  const { email, password, confirmPassword } = credentials
  const { authLoading } = useAuth()

  return (
    <div id='registerForm'>
      <div className={styles.form_group}>
        <label htmlFor='fullName'>Full Name</label>
        <input
          type='text'
          name='password'
          id='fullName'
          placeholder='John Doe'
          required
          value={password}
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
        onClick={handleRegister}
        disabled={!email || !password || !confirmPassword || authLoading}
      >
        {authLoading ? 'Creating account…' : 'Create Account'}
      </button>

      <div className={styles.divider}>
        <span className={styles.divider_text}>or</span>
      </div>

      <button
        className={styles.google_btn}
        onClick={handleGoogleSignUp}
      >
        <span className={styles.google_icon}>
          <GoogleIcon />
        </span>
        Continue with Google
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

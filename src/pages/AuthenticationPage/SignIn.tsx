import styles from './styles.module.css'
import GoogleIcon from '@/src/assets/google.ico'
import type { CredentialsType } from '@/types'
import { type ChangeEvent } from 'react'

type SignInProps = {
  credentials: CredentialsType
  handleSignUpView: () => void
  handleChange: (event: ChangeEvent<HTMLInputElement, Element>) => void
  handleGoogleSignIn: () => void
  handleLogin: () => Promise<void>
}

const SignIn = ({
  credentials,
  handleSignUpView,
  handleChange,
  handleGoogleSignIn,
  handleLogin,
}: SignInProps) => {
  const { email, password } = credentials

  return (
    <div id='loginForm'>
      <div className={styles.form_title}>Welcome Back</div>

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
        disabled={!email || !password}
      >
        Sign In
      </button>

      <div className={styles.divider}>
        <div className={styles.divider_text}>OR</div>
      </div>

      <button
        className={styles.google_btn}
        onClick={handleGoogleSignIn}
      >
        <div className={styles.google_icon}>
          <img
            src={GoogleIcon}
            alt='Google'
            width={20}
            height={20}
          />
        </div>
        Sign in with Google
      </button>

      <div className={styles.toggle_section}>
        Don't have an account?
        <a onClick={handleSignUpView}>Create one</a>
      </div>
    </div>
  )
}

export default SignIn

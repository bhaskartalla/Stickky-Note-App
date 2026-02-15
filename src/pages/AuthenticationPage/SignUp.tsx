import styles from './styles.module.css'
import GoogleIcon from '@/src/assets/google.ico'
import type { CredentialsType } from '@/types'
import type { ChangeEvent } from 'react'

type SignUpProps = {
  credentials: CredentialsType
  handleSignInView: () => void
  handleChange: (event: ChangeEvent<HTMLInputElement, Element>) => void
  handleGoogleSignUp: () => void
  handleRegister: () => Promise<void>
}

const SignUp = ({
  credentials,
  handleSignInView,
  handleChange,
  handleGoogleSignUp,
  handleRegister,
}: SignUpProps) => {
  const { email, password, confirmPassword } = credentials

  return (
    <div id='registerForm'>
      <div className={styles.form_title}>Create Account</div>

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
        disabled={!email || !password || !confirmPassword}
      >
        Create Account
      </button>

      <div className={styles.divider}>
        <div className={styles.divider_text}>OR</div>
      </div>

      <button
        className={styles.google_btn}
        onClick={handleGoogleSignUp}
      >
        <div className={styles.google_icon}>
          <img
            src={GoogleIcon}
            alt='Google'
            width={20}
            height={20}
          />
        </div>
        Sign up with Google
      </button>

      <div className={styles.toggle_section}>
        Already have an account?
        <a onClick={handleSignInView}>Sign in</a>
      </div>
    </div>
  )
}

export default SignUp

import { Outlet } from 'react-router-dom'
import styles from './Header.module.css'
import Toast from '../toast/Toast'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import Saving from './SavingIndicator'
import UserInfo from './UserInfo'

const HeaderLayout = () => {
  const { status, toast, setToast } = useNotes()
  const { user } = useAuth()

  return (
    <>
      <header
        id='header'
        className={styles.header_main}
      >
        <div className={styles.header_title}>
          <span className={styles.logo_emoji}>📝</span>
          <h1>Sticky Notes</h1>
        </div>
        <div className={styles.header_content}>
          {status && <Saving status={status} />}
          {user && <UserInfo />}
        </div>
      </header>
      <Outlet />
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '' })}
        />
      )}
    </>
  )
}

export default HeaderLayout

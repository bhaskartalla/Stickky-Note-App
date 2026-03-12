import styles from './Header.module.css'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import Saving from './SavingIndicator'
import UserInfo from './UserInfo'
import { GuestBadge } from './GuestBadge'

const HeaderLayout = () => {
  const { status } = useNotes()
  const { user } = useAuth()

  return (
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
        {user && user.isAnonymous && <GuestBadge />}
        {user && !user.isAnonymous && <UserInfo />}
      </div>
    </header>
  )
}

export default HeaderLayout

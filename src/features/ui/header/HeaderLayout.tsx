import styles from './styles.module.css'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import SavingIndicator from './SavingIndicator'
import UserInfo from './UserInfo'
import { GuestBadge } from './GuestBadge'
import { NoteIcon } from '@/src/shared/components/icons'

const HeaderLayout = () => {
  const { isNoteSaving } = useNotes()
  const { user } = useAuth()

  return (
    <header
      id='header'
      className={styles.header_main}
    >
      <div className={styles.logo}>
        <div className={styles.icon_box}>
          <NoteIcon />
        </div>
        Sticky Notes
      </div>
      <div className={styles.header_content}>
        {<SavingIndicator isNoteSaving={isNoteSaving} />}
        {user && user.isAnonymous && <GuestBadge />}
        {user && !user.isAnonymous && <UserInfo />}
      </div>
    </header>
  )
}

export default HeaderLayout

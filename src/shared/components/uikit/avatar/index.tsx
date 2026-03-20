import styles from './Avatar.module.css'

type AvatarSize = 'sm' | 'md' | 'lg'

interface AvatarProps {
  photoURL?: string | null
  initials?: string
  size?: AvatarSize
}

/**
 * Shared avatar used in:
 *  - ProfileCard popup  (size="md" 64px)
 *  - ProfilePage hero   (size="lg" 72px)
 */
const Avatar = ({ photoURL, initials, size = 'md' }: AvatarProps) => (
  <div className={`${styles.avatar} ${styles[`avatar_${size}`]}`}>
    {photoURL ? (
      <img
        src={photoURL}
        alt='User Profile'
        referrerPolicy='no-referrer'
        loading='lazy'
      />
    ) : (
      initials || '👤'
    )}
  </div>
)

export default Avatar

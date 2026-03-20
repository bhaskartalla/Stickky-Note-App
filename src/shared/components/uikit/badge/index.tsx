import type { ReactNode } from 'react'
import styles from './Badge.module.css'

type BadgeVariant = 'success' | 'error' | 'muted'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

/**
 * Pill badge used for:
 *  - Email verified / unverified  (success / error)
 *  - "Coming soon"               (muted)
 *  - Encryption badge on notes   (success)
 */
const Badge = ({ variant = 'muted', children, className = '' }: BadgeProps) => (
  <span
    className={`${styles.badge} ${styles[`badge_${variant}`]} ${className}`}
  >
    {children}
  </span>
)

export default Badge

import type { ReactNode } from 'react'
import styles from './InfoRow.module.css'

interface InfoRowProps {
  label: string
  value: ReactNode
}

/**
 * Key/value row used in ProfilePage sections and ProfileCard details.
 * Automatically removes the bottom border on the last child via CSS.
 */
const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className={styles.info_row}>
    <span className={styles.info_key}>{label}</span>
    <span className={styles.info_val}>{value}</span>
  </div>
)

export default InfoRow

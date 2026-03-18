import styles from './Header.module.css'

const SavingIndicator = () => (
  <div
    id='saving-indicator'
    className={styles.saving_indicator}
  >
    <div className={styles.card_saving}>
      <div className={styles.saving_dot} />
      <span>All changes saved</span>
    </div>
  </div>
)

export default SavingIndicator

import styles from './Header.module.css'

const SavingIndicator = ({ isNoteSaving }: { isNoteSaving: boolean }) => (
  <div
    id='saving-indicator'
    className={`${
      isNoteSaving
        ? styles.saving_indicator_visible
        : styles.saving_indicator_invisible
    }`}
  >
    <div className={styles.card_saving}>
      <div className={styles.saving_dot} />
      <span className={styles.saving_text}>All changes saved</span>
    </div>
  </div>
)

export default SavingIndicator

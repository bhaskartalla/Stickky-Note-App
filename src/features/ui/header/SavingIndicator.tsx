import styles from './Header.module.css'

const Saving = ({ status }: { status: string }) => (
  <div
    id='saving-indicator'
    className={styles.saving_indicator}
  >
    <div className={styles.card_saving}>
      {/* Pulsing dot replaces the spinning SpinnerIcon */}
      <div className={styles.saving_dot} />
      <span>{status}…</span>
    </div>
  </div>
)

export default Saving

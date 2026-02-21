import Spinner from '@/src/shared/components/Spinner'
import styles from './Header.module.css'

const Saving = ({ status }: { status: string }) => {
  return (
    <>
      <div
        id='saving-indicator'
        className={styles.saving_indicator}
      >
        <div className={styles.card_saving}>
          <Spinner
            color='#9bd1de'
            size='20'
          />
          <span>{status}...</span>
        </div>
      </div>

      <div className={styles.card_saving}></div>
    </>
  )
}
export default Saving

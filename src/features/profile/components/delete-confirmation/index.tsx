import type { ConfirmDeletePopupProps } from '../../types'
import styles from './asdf.module.css'

const ConfirmDeletePopup = ({
  isDeleting,
  onConfirm,
  onCancel,
}: ConfirmDeletePopupProps) => (
  <div
    className={styles.confirm_overlay}
    onMouseDown={onCancel}
  >
    <div
      className={styles.confirm_card}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Icon */}
      <div className={styles.confirm_icon_wrap}>
        <div className={styles.confirm_icon}>🗑️</div>
      </div>

      {/* Text */}
      <div className={styles.confirm_body}>
        <div className={styles.confirm_title}>Delete Account?</div>
        <p className={styles.confirm_description}>
          Your account and all associated data will be permanently removed. This
          action cannot be undone.
        </p>
        <p className={styles.confirm_warning}>
          ⚠️ All your notes will also be deleted.
        </p>
      </div>

      {/* Actions */}
      <div className={styles.confirm_actions}>
        <button
          type='button'
          className={`btn btn_ghost ${styles.confirm_btn}`}
          onClick={onCancel}
          disabled={isDeleting}
        >
          Cancel
        </button>
        <button
          type='button'
          className={`btn btn_danger ${styles.confirm_btn}`}
          onClick={onConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <span className={styles.logout_loading_content}>
              <span
                className={styles.logout_spinner}
                aria-hidden='true'
              />
              Deleting…
            </span>
          ) : (
            'Delete Account'
          )}
        </button>
      </div>
    </div>
  </div>
)

export default ConfirmDeletePopup

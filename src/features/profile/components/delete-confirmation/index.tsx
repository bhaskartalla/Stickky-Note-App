import type { ConfirmDeletePopupProps } from '../../types'
import styles from './styles.module.css'
import { Button, Typography } from '@/src/shared/components/uikit'

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
      <div className={styles.confirm_icon_wrap}>
        <div className={styles.confirm_icon}>🗑️</div>
      </div>

      <div className={styles.confirm_body}>
        <Typography
          variant='display_sm'
          as='div'
          className={styles.confirm_title}
        >
          Delete Account?
        </Typography>
        <Typography
          variant='muted'
          as='p'
          className={styles.confirm_description}
        >
          Your account and all associated data will be permanently removed. This
          action cannot be undone.
        </Typography>
        <Typography
          variant='muted'
          as='p'
          className={styles.confirm_warning}
        >
          ⚠️ All your notes will also be deleted.
        </Typography>
      </div>

      <div className={styles.confirm_actions}>
        <Button
          variant='ghost'
          size='sm'
          className={styles.confirm_btn}
          onClick={onCancel}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          variant='danger'
          size='sm'
          className={styles.confirm_btn}
          isLoading={isDeleting}
          loadingText='Deleting…'
          onClick={onConfirm}
        >
          Delete Account
        </Button>
      </div>
    </div>
  </div>
)

export default ConfirmDeletePopup

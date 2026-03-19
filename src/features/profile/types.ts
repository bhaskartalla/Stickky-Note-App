import type { User } from 'firebase/auth'

export type InfoRow = {
  label: string
  value: string
}

export type Stat = {
  value: string | number
  label: string
}

export type ProfileCardProps = {
  isPopUpOpen: boolean
  isLoggingOut: boolean
  onLogout: () => void
  onClose: () => void
  user: User | null
}

export type ConfirmDeletePopupProps = {
  isDeleting: boolean
  onConfirm: () => void
  onCancel: () => void
}

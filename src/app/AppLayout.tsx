import { Outlet } from 'react-router-dom'
import Toast from '../features/ui/toast/Toast'
import { useNotes } from '@/src/features/notes/hooks/useNotes'

import HeaderLayout from '../features/ui/header/HeaderLayout'

const AppLayout = () => {
  const { toast, setToast } = useNotes()

  return (
    <>
      <HeaderLayout />

      <Outlet />

      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '' })}
        />
      )}
    </>
  )
}

export default AppLayout

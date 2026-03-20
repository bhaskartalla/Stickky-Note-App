import { Outlet } from 'react-router-dom'
import Toast from '../shared/components/uikit/toast/Toast'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import HeaderLayout from '../features/ui/header/HeaderLayout'

const AppLayout = () => {
  const { toast, setToast } = useNotes()

  return (
    <>
      <HeaderLayout />

      <main
        style={{
          position: 'relative',
          height: 'calc(100vh - 60px)',
          overflow: 'hidden',
        }}
      >
        <Outlet />
      </main>

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

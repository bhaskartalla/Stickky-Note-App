import { Outlet } from 'react-router-dom'
import { useNotes } from '@/src/features/notes/hooks/useNotes'
import HeaderLayout from '../features/ui/header/HeaderLayout'
import OfflineBanner from '../features/ui/offline-banner'

const AppLayout = () => {
  const { NotificationComp } = useNotes()

  return (
    <>
      <OfflineBanner />

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

      {NotificationComp}
    </>
  )
}

export default AppLayout

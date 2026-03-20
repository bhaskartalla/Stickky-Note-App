import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import Spinner from '@/src/shared/components/uikit/spinner'
import { useNotes } from '../features/notes/hooks'

const AuthGate = () => {
  const { isAuthLoading } = useAuth()
  const { isNotesLoading } = useNotes()

  return (
    <>
      {(isAuthLoading || isNotesLoading) && <Spinner />}
      <RouterProvider router={router} />
    </>
  )
}

export default AuthGate

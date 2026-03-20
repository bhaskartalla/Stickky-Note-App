import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import Spinner from '@/src/features/ui/Spinner'
import { useNotes } from '../features/notes/hooks'

const AuthGate = () => {
  const { isLoading } = useAuth()
  const { isNotesLoading } = useNotes()

  return (
    <>
      {(isLoading || isNotesLoading) && <Spinner />}
      <RouterProvider router={router} />
    </>
  )
}

export default AuthGate

import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import Spinner from '@/src/shared/components/Spinner'
import { NotesProvider } from '@/src/features/notes/notes.context'

const AuthGate = () => {
  const { isLoading } = useAuth()

  if (isLoading) return <Spinner />

  return (
    <NotesProvider>
      <RouterProvider router={router} />
    </NotesProvider>
  )
}

export default AuthGate

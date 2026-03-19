import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import Spinner from '@/src/features/ui/Spinner'
import { NotesProvider } from '@/src/features/notes/notes.context'

const AuthGate = () => {
  const { isLoading } = useAuth()

  return (
    <>
      {isLoading && <Spinner />}
      <NotesProvider>
        <RouterProvider router={router} />
      </NotesProvider>
    </>
  )
}

export default AuthGate

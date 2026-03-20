import { Navigate } from 'react-router-dom'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import Spinner from '@/src/features/ui/Spinner'
import { useNotes } from '@/src/features/notes/hooks'

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth()
  const { isNotesLoading } = useNotes()

  if (user && !user.isAnonymous) {
    return (
      <Navigate
        to='/'
        replace
      />
    )
  }

  return (
    <>
      {(isLoading || isNotesLoading) && <Spinner />}
      {children}
    </>
  )
}

export default PublicRoute

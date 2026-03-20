import { Navigate } from 'react-router-dom'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import Spinner from '@/src/shared/components/uikit/spinner'
import { useNotes } from '@/src/features/notes/hooks'

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthLoading } = useAuth()
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
      {(isAuthLoading || isNotesLoading) && <Spinner />}
      {children}
    </>
  )
}

export default PublicRoute

import { Navigate } from 'react-router-dom'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import Spinner from '@/src/features/ui/Spinner'

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth()

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
      {isLoading && <Spinner />}
      {children}
    </>
  )
}

export default PublicRoute

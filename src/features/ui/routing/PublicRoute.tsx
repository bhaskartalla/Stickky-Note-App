import { Navigate } from 'react-router-dom'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import Spinner from '@/src/features/ui/Spinner'

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) return <Spinner />

  return user && !user.isAnonymous ? (
    <Navigate
      to='/'
      replace
    />
  ) : (
    <>{children}</>
  )
}

export default PublicRoute

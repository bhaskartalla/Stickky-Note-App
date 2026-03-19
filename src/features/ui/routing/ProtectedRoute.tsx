import { Navigate } from 'react-router-dom'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import Spinner from '@/src/features/ui/Spinner'

type ProtectedRouteProps = {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth()

  if (isLoading) return <Spinner />

  return user && !user.isAnonymous ? (
    <>{children}</>
  ) : (
    <Navigate
      to='/'
      replace
    />
  )
}

export default ProtectedRoute

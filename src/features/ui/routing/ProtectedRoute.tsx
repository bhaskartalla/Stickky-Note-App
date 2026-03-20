import { Navigate } from 'react-router-dom'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import Spinner from '@/src/shared/components/uikit/spinner'

type ProtectedRouteProps = {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isAuthLoading } = useAuth()

  if (isAuthLoading) return <Spinner />

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

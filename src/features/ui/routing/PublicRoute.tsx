import { Navigate } from 'react-router-dom'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import Spinner from '@/src/shared/components/Spinner'

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) return <Spinner />

  return user ? (
    <Navigate
      to='/'
      replace
    />
  ) : (
    <>{children}</>
  )
}

export default PublicRoute

import { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  useRouteError,
} from 'react-router-dom'

import PublicRoute from '@/src/features/ui/routing/PublicRoute'
import ProtectedRoute from '@/src/features/ui/routing/ProtectedRoute'
import Spinner from '@/src/shared/components/uikit/spinner'
import AppLayout from '@/src/app/AppLayout'
import ProfilePage from '@/src/features/profile/pages/ProfilePage'
import ErrorBoundary from '@/src/shared/components/uikit/error-boundary'

const NotesPage = lazy(() => import('@/src/features/notes/pages/NotesPage'))
const AuthenticationPage = lazy(
  () => import('@/src/features/auth/pages/AuthenticationPage')
)

// eslint-disable-next-line react-refresh/only-export-components
const RouteErrorFallback = () => {
  const error = useRouteError() as Error
  return <ErrorBoundary.Fallback error={error} />
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<AppLayout />}
      errorElement={<RouteErrorFallback />}
    >
      <Route
        index
        element={
          <Suspense fallback={<Spinner />}>
            <NotesPage />
          </Suspense>
        }
      />
      <Route
        path='signin'
        element={
          <PublicRoute>
            <Suspense fallback={<Spinner />}>
              <AuthenticationPage />
            </Suspense>
          </PublicRoute>
        }
      />
      <Route
        path='profile'
        element={
          <ProtectedRoute>
            <Suspense fallback={<Spinner />}>
              <ProfilePage />
            </Suspense>
          </ProtectedRoute>
        }
      />
    </Route>
  )
)

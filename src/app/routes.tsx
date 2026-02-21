import { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import ProtectedRoute from '@/src/features/ui/routing/ProtectedRoute'
import PublicRoute from '@/src/features/ui/routing/PublicRoute'
import HeaderLayout from '@/src/features/ui/header/Header'
import Spinner from '@/src/shared/components/Spinner'

const NotesPage = lazy(() => import('@/src/features/notes/pages/NotesPage'))

const AuthenticationPage = lazy(
  () => import('@/src/features/auth/pages/AuthenticationPage')
)

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<HeaderLayout />}
    >
      <Route
        index
        element={
          <ProtectedRoute>
            <Suspense fallback={<Spinner />}>
              <NotesPage />
            </Suspense>
          </ProtectedRoute>
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
    </Route>
  )
)

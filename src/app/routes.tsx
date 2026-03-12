import { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import PublicRoute from '@/src/features/ui/routing/PublicRoute'
import Spinner from '@/src/features/ui/Spinner'
import AppLayout from '@/src/app/AppLayout'

const NotesPage = lazy(() => import('@/src/features/notes/pages/NotesPage'))

const AuthenticationPage = lazy(
  () => import('@/src/features/auth/pages/AuthenticationPage')
)

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<AppLayout />}
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
    </Route>
  )
)

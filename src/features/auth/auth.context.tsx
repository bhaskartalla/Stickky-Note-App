import { createContext } from 'react'
import type { User } from 'firebase/auth'
import { useState, useEffect, type ReactNode } from 'react'
import { observeAuthState } from '@/src/lib/firebase/auth'
import { authService } from '@/src/features/auth/auth.service'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAuthLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAuthLoading: true,
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = observeAuthState((authUser: User | null) => {
      if (authUser) {
        setUser(authUser)
        if (authUser.isAnonymous)
          localStorage.setItem('anonymous_uid', authUser.uid)
      } else {
        authService.signInAnonymously().catch((error) => {
          // TODO: handle this case in UI by showing appropriate error screen
          console.error('Anonymous login failed:', error)
        })
      }
      setIsAuthLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }

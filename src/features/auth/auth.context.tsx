import { createContext } from 'react'
import type { User } from 'firebase/auth'
import { useState, useEffect, type ReactNode } from 'react'
import { observeAuthState } from '@/src/lib/firebase/auth'
import { authService } from '@/src/features/auth/auth.service'
import { auth } from '@/src/lib/firebase'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAuthLoading: boolean
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAuthLoading: true,
  refreshUser: async () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = observeAuthState(async (authUser: User | null) => {
      if (authUser) {
        setUser(authUser)
        if (authUser.isAnonymous) {
          localStorage.setItem('anonymous_uid', authUser.uid)
        }
        setIsAuthLoading(false)
      } else {
        try {
          await authService.signInAnonymously()
        } catch (error) {
          console.error('Anonymous login failed:', error)
          setIsAuthLoading(false)
        }
      }
    })

    return () => unsubscribe()
  }, [])

  const refreshUser = async () => {
    const currentUser = auth.currentUser
    if (!currentUser) return
    await currentUser.reload()
    setUser({ ...currentUser })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthLoading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }

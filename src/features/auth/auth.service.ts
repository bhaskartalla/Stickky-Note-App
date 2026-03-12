import {
  signIn,
  signUp,
  signInWithGoogle,
  logOut,
  createGuestUser,
} from '@/src/lib/firebase'
import { createUser } from '@/src/lib/firebase'

export const authService = {
  async signIn(email: string, password: string) {
    return await signIn(email, password)
  },

  async signUp(email: string, password: string) {
    const user = await signUp(email, password)
    await createUser(user.uid, {
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      provider: 'email',
    })
    return user
  },

  async signInWithGoogle() {
    const user = await signInWithGoogle()
    await createUser(user.uid, {
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      provider: 'google',
    })
    return user
  },

  async logOut() {
    return await logOut()
  },

  async signInAnonymously() {
    return createGuestUser()
  },
}

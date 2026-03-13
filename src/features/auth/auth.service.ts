import {
  signIn,
  signUp,
  signInWithGoogle,
  logOut,
  createGuestUser,
  auth,
} from '@/src/lib/firebase'

import { notesService } from '../notes/notes.service'

export const authService = {
  async signIn(email: string, password: string) {
    return await signIn(email, password)
  },

  async signUp(email: string, password: string) {
    return await signUp(email, password)
  },

  async signInWithGoogle() {
    try {
      const anonymousUser = auth.currentUser
      const anonymousUid = localStorage.getItem('anonymous_uid')

      const googleUser = await signInWithGoogle()
      const existingUid = googleUser.uid
      // debugger
      if (
        anonymousUser &&
        anonymousUser.isAnonymous &&
        anonymousUid &&
        anonymousUid !== existingUid
      ) {
        await notesService.migrateAnonymousNotes(anonymousUid, existingUid)
        localStorage.removeItem('anonymous_uid')
      }
      return googleUser
    } catch (error) {
      console.error('Anonymous notes merge failed:', error)

      //TODO: Handle Anonymous notes merge failed
      //TODO: Handle signInWithGoogle failed
      //TODO: Handle deleteUser failed
      // captureException(error)
    }
  },

  async logOut() {
    return await logOut()
  },

  async signInAnonymously() {
    return createGuestUser()
  },
}

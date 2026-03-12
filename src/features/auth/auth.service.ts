import {
  signIn,
  signUp,
  signInWithGoogle,
  logOut,
  createGuestUser,
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
    const googleUser = await signInWithGoogle()

    const anonymousUid = localStorage.getItem('anonymous_uid')
    const existingUid = googleUser.uid

    if (anonymousUid && anonymousUid !== existingUid) {
      try {
        await notesService.migrateAnonymousNotes(anonymousUid, existingUid)
        localStorage.removeItem('anonymous_uid')
      } catch (error) {
        console.error('Anonymous notes merge failed:', error)

        //TODO: Optional monitoring
        // captureException(error)
      }
    }

    return googleUser
  },

  async logOut() {
    return await logOut()
  },

  async signInAnonymously() {
    return createGuestUser()
  },
}

/* eslint-disable no-useless-catch */
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
  async handleAnonymousMigration(newUserUid: string) {
    const anonymousUid = localStorage.getItem('anonymous_uid')

    if (!anonymousUid) return

    try {
      await notesService.migrateAnonymousNotes(anonymousUid, newUserUid)
      localStorage.removeItem('anonymous_uid')
    } catch (error) {
      console.error('Anonymous notes merge failed:', error)
      throw error
    }
  },
  async signIn(email: string, password: string) {
    try {
      const existingUser = await signIn(email, password)
      await this.handleAnonymousMigration(existingUser.uid)
      return existingUser
    } catch (error) {
      console.error('signIn with email password failed :', error)
      //TODO: Handle signInWithGoogle failed
      throw error
    }
  },

  async signUp(email: string, password: string) {
    try {
      const newUser = await signUp(email, password)
      await this.handleAnonymousMigration(newUser.uid)
      return newUser
    } catch (error) {
      console.error('signUp with email password failed :', error)
      //TODO: Handle signInWithGoogle failed
      throw error
    }
  },

  async signInWithGoogle() {
    try {
      const googleUser = await signInWithGoogle()
      await this.handleAnonymousMigration(googleUser.uid)
      return googleUser
    } catch (error) {
      console.error('signInWithGoogle failed :', error)
      //TODO: Handle signInWithGoogle failed
      throw error
    }
  },

  async logOut() {
    return await logOut()
  },

  async signInAnonymously() {
    if (!auth.currentUser) {
      return createGuestUser()
    }
  },
}

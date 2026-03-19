/* eslint-disable no-useless-catch */
import {
  signIn,
  signUp,
  signInWithGoogle,
  logOut,
  createGuestUser,
  auth,
  deleteUser,
} from '@/src/lib/firebase'

import { notesService } from '@/src/features/notes/notes.service'

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

  async signUp(displayName: string, email: string, password: string) {
    try {
      const newUser = await signUp(displayName, email, password)
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

  async deleteAccount() {
    const user = auth.currentUser
    if (!user) throw new Error('No authenticated user')

    try {
      await notesService.deleteAllUserNotes(user.uid)
      await deleteUser(user)
      localStorage.removeItem('anonymous_uid')
    } catch (error) {
      throw error
    }
  },
}

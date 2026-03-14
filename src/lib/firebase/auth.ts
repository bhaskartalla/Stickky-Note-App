/* eslint-disable no-useless-catch */
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
  type User,
  linkWithPopup,
  signInWithCredential,
  deleteUser as firebaseDeleteUser,
  EmailAuthProvider,
  linkWithCredential,
} from 'firebase/auth'
import { auth } from './config'
import { FirebaseError } from 'firebase/app'
import { getAuthErrorMessage } from '@/src/shared/utils'

export const observeAuthState = (
  callback: (user: User | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, callback)
}

export const signIn = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  } catch (error) {
    throw new Error(getAuthErrorMessage(error))
  }
}

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()

  const user = auth.currentUser
  if (!user) throw new Error('No authenticated user found')

  try {
    const result = await linkWithPopup(user, provider)
    return result.user
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/credential-already-in-use') {
        const credential = GoogleAuthProvider.credentialFromError(error)
        if (!credential) throw new Error(getAuthErrorMessage(error))

        const result = await signInWithCredential(auth, credential)
        return result.user
      }
    }
    throw new Error(getAuthErrorMessage(error))
  }
}

export const signUp = async (email: string, password: string) => {
  const currentUser = auth.currentUser
  if (!currentUser) throw new Error('No authenticated user found')

  try {
    const credential = EmailAuthProvider.credential(email, password)
    const result = await linkWithCredential(currentUser, credential)
    return result.user
  } catch (error) {
    throw new Error(getAuthErrorMessage(error))
  }
}

export const logOut = async () => {
  try {
    return await signOut(auth)
  } catch (error) {
    throw error
  }
}

export const createGuestUser = async () => {
  try {
    const result = await signInAnonymously(auth)
    return result.user
  } catch (error) {
    throw new Error(getAuthErrorMessage(error))
  }
}

export const deleteUser = async (user: User) => {
  if (!user) return
  try {
    await firebaseDeleteUser(user)
  } catch (error) {
    throw error
  }
}

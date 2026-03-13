/* eslint-disable no-useless-catch */
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
  type User,
  linkWithPopup,
  signInWithCredential,
  deleteUser as firebaseDeleteUser,
} from 'firebase/auth'
import { auth } from './config'
import { FirebaseError } from 'firebase/app'

export const observeAuthState = (
  callback: (user: User | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, callback)
}

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    return userCredential.user
  } catch (error) {
    throw error
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
        if (!credential) throw error

        const result = await signInWithCredential(auth, credential)
        return result.user
      }
    }
    throw error
  }
}

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    return userCredential.user
  } catch (error) {
    throw error
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
    throw error
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

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
} from 'firebase/auth'
import { auth } from './config'
import { FirebaseError } from 'firebase/app'
import { notesService } from '@/src/features/notes/notes.service'

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
    if (error instanceof FirebaseError) {
      // Email exists but with another provider
      // if (error.code === 'auth/account-exists-with-different-credential') {
      //   const email = error.customData?.email
      //   const methods = await fetchSignInMethodsForEmail(auth, email)
      //   throw new Error(
      //     `Account already exists using ${methods[0]}. Please sign in using that provider first.`
      //   )
      // }
    }
    throw new Error('Error signing in')
  }
}

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()

    const user = auth.currentUser
    if (!user) throw new Error('No authenticated user found')

    const result = await linkWithPopup(user, provider)
    return result.user
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/credential-already-in-use') {
        const credential = GoogleAuthProvider.credentialFromError(error)
        if (!credential) throw new Error('Unable to retrieve Google credential')

        const anonymousUid = auth.currentUser?.uid

        const result = await signInWithCredential(auth, credential)

        const existingUid = result.user.uid

        // Attempt merge safely
        if (anonymousUid && anonymousUid !== existingUid) {
          try {
            await notesService.mergeAnonymousNotes(anonymousUid, existingUid)
          } catch (mergeError) {
            console.error('Anonymous notes merge failed:', mergeError)

            // Optional: send to monitoring service
            // captureException(mergeError)

            // Do NOT block login
          }
        }

        return result.user
      }
    }

    throw new Error('Error signing in with Google')
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
    throw new Error('Error signing up')
  }
}

export const logOut = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    throw new Error('Error signing out')
  }
}

export const createGuestUser = async () => {
  try {
    await signInAnonymously(auth)
  } catch (error) {
    throw new Error('Error signing in signInAnonymously')
  }
}

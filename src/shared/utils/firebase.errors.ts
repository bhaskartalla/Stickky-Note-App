import type { ToastType } from '@/types'
import { FirebaseError } from 'firebase/app'

export const getToastErrorMessage = (error: unknown): ToastType => {
  if (error instanceof FirebaseError) {
    return { message: error.message, type: 'error' }
  } else if (error instanceof Error) {
    return { message: error.message, type: 'error' }
  } else {
    return { message: 'Unknown error occurred', type: 'error' }
  }
}

export const getAuthErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      // sign-in specific
      case 'auth/wrong-password':
        return 'Incorrect password.'
      case 'auth/user-not-found':
        return 'No account exists for this email.'
      case 'auth/user-disabled':
        return 'This account has been disabled.'

      // sign-up specific
      case 'auth/email-already-in-use':
        return 'An account with this email already exists. Please sign in instead.'
      case 'auth/weak-password':
        return 'Password must be at least 6 characters.'

      // google popup specific
      case 'auth/popup-closed-by-user':
      case 'auth/cancelled-popup-request':
        return 'Sign-in popup was closed. Please try again.'
      case 'auth/popup-blocked':
        return 'Popup was blocked by your browser. Please allow popups and try again.'

      // anonymous specific
      case 'auth/operation-not-allowed':
        return 'Guest sign-in is not enabled. Please contact support.'

      // shared
      case 'auth/invalid-email':
        return 'Invalid email format.'
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.'
      case 'auth/network-request-failed':
        return 'Network error. Check your internet connection.'
      case 'auth/invalid-credential':
        return 'Invalid email or password.'

      default:
        return 'Something went wrong. Please try again.'
    }
  }

  return 'An unexpected error occurred.'
}

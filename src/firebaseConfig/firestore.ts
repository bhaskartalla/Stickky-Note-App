import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from './config'
import type { NoteDataType, UserDataType } from '@/types'

export const createUser = async (userId: string, userData: UserDataType) => {
  try {
    const userRef = doc(db, 'users', userId)
    await setDoc(
      userRef,
      {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )
    return userId
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const getUser = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() }
    } else {
      throw new Error('User not found')
    }
  } catch (error) {
    console.error('Error getting user:', error)
    throw error
  }
}

export const updateUser = async (userId: string, updates: UserDataType) => {
  try {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    })
    console.log('User updated successfully')
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

export const deleteUser = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId)
    await deleteDoc(userRef)
    console.log('User deleted successfully')
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

// ============================================
// NOTES SUBCOLLECTION OPERATIONS
// ============================================

export const createNote = async (userId: string, noteData: NoteDataType) => {
  try {
    const notesRef = collection(db, 'users', userId, 'notes')
    const docRef = await addDoc(notesRef, {
      body: noteData.body || '',
      colors: noteData.colors || '',
      position: noteData.position || '',
    })
    console.log('Note created with ID:', docRef.id)
    const response = {
      $id: docRef.id,
      ...noteData,
    }
    return response
  } catch (error) {
    console.error('Error creating note:', error)
    throw error
  }
}

export const getNote = async (userId: string, noteId: string) => {
  try {
    const noteRef = doc(db, 'users', userId, 'notes', noteId)
    const noteSnap = await getDoc(noteRef)

    if (noteSnap.exists()) {
      return { id: noteSnap.id, ...noteSnap.data() }
    } else {
      throw new Error('Note not found')
    }
  } catch (error) {
    console.error('Error getting note:', error)
    throw error
  }
}

export const getUserNotes = async (userId: string) => {
  try {
    const notesRef = collection(db, 'users', userId, 'notes')
    const q = query(notesRef)
    const querySnapshot = await getDocs(q)
    const notes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return notes
  } catch (error) {
    console.error('Error getting notes:', error)
    throw error
  }
}

export const updateNote = async (
  userId: string,
  noteId: string,
  updates: NoteDataType
) => {
  try {
    const noteRef = doc(db, 'users', userId, 'notes', noteId)
    await updateDoc(noteRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error('Error updating note:', error)
    throw error
  }
}

export const deleteNote = async (userId: string, noteId: string) => {
  try {
    const noteRef = doc(db, 'users', userId, 'notes', noteId)
    await deleteDoc(noteRef)
    console.log('Note deleted successfully')
  } catch (error) {
    console.error('Error deleting note:', error)
    throw error
  }
}

export const deleteAllUserNotes = async (userId: string) => {
  try {
    const notes = await getUserNotes(userId)
    const deletePromises = notes.map((note) => deleteNote(userId, note.id))
    await Promise.all(deletePromises)
    console.log(`Deleted ${notes.length} notes for user ${userId}`)
  } catch (error) {
    console.error('Error deleting all notes:', error)
    throw error
  }
}

export const searchNotes = async (userId: string, searchTerm: string) => {
  try {
    const notes = await getUserNotes(userId)

    // Filter notes that contain the search term
    const filteredNotes = notes.filter((note: NoteDataType) => {
      const body = note.body?.toLowerCase() || ''
      const search = searchTerm.toLowerCase()
      return body.includes(search)
    })

    return filteredNotes
  } catch (error) {
    console.error('Error searching notes:', error)
    throw error
  }
}

// ============================================
// BATCH OPERATIONS
// ============================================

export const createMultipleNotes = async (
  userId: string,
  notesArray: NoteDataType[]
) => {
  try {
    const promises = notesArray.map((noteData: NoteDataType) =>
      createNote(userId, noteData)
    )
    const noteIds = await Promise.all(promises)
    console.log(`Created ${noteIds.length} notes successfully`)
    return noteIds
  } catch (error) {
    console.error('Error creating multiple notes:', error)
    throw error
  }
}

export const getUserNoteCount = async (userId: string) => {
  try {
    const notes = await getUserNotes(userId)
    return notes.length
  } catch (error) {
    console.error('Error getting note count:', error)
    throw error
  }
}

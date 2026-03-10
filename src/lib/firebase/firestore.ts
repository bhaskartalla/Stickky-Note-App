/* eslint-disable @typescript-eslint/no-explicit-any */
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
import type { FirebaseError } from 'firebase/app'

export const createUser = async (
  userId: string,
  userData: Record<string, any>
) => {
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
    throw new Error('Error creating user')
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
    throw new Error('Error getting user')
  }
}

export const updateUser = async (
  userId: string,
  updates: Record<string, any>
) => {
  try {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    throw new Error('Error updating user')
  }
}

export const deleteUser = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId)
    await deleteDoc(userRef)
  } catch (error) {
    throw new Error('Error deleting user')
  }
}

export const createNote = async (
  userId: string,
  noteData: Record<string, any>
) => {
  try {
    const notesRef = collection(db, 'users', userId, 'notes')
    const docRef = await addDoc(notesRef, {
      body: noteData.body || '',
      colors: noteData.colors || '',
      position: noteData.position || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return {
      id: docRef.id,
      ...noteData,
    }
  } catch (error) {
    throw new Error('Error creating note')
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
    throw new Error('Error getting note')
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
    throw new Error('Error getting notes')
  }
}

export const updateNote = async (
  userId: string,
  noteId: string,
  updates: Record<string, any>
) => {
  try {
    const noteRef = doc(db, 'users', userId, 'notes', noteId)
    await updateDoc(noteRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    throw new Error('Error updating note')
  }
}

export const deleteNote = async (userId: string, noteId: string) => {
  try {
    const noteRef = doc(db, 'users', userId, 'notes', noteId)
    await deleteDoc(noteRef)
  } catch (error) {
    throw new Error('Error deleting note')
  }
}

export const deleteAllUserNotes = async (userId: string) => {
  try {
    const notes = await getUserNotes(userId)
    const deletePromises = notes.map((note: any) => deleteNote(userId, note.id))
    await Promise.all(deletePromises)
  } catch (error) {
    throw new Error('Error deleting all notes')
  }
}

export const searchNotes = async (userId: string, searchTerm: string) => {
  try {
    const notes = await getUserNotes(userId)
    const filteredNotes = notes.filter((note: any) => {
      const body = note.body?.toLowerCase() || ''
      const search = searchTerm.toLowerCase()
      return body.includes(search)
    })
    return filteredNotes
  } catch (error) {
    throw new Error('Error searching notes')
  }
}

export const createMultipleNotes = async (
  userId: string,
  notesArray: Record<string, any>[]
) => {
  try {
    const promises = notesArray.map((noteData) => createNote(userId, noteData))
    const noteIds = await Promise.all(promises)
    return noteIds
  } catch (error) {
    throw new Error('Error creating multiple notes')
  }
}

export const getUserNoteCount = async (userId: string) => {
  try {
    const notes = await getUserNotes(userId)
    return notes.length
  } catch (error) {
    throw new Error('Error getting note count')
  }
}

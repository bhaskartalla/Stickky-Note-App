/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from './config'

/* ---------------- NOTES ---------------- */

export const createNote = async (
  userId: string,
  noteData: Record<string, any>
) => {
  try {
    const notesRef = collection(db, 'notes')

    const docRef = await addDoc(notesRef, {
      ownerId: userId,
      body: noteData.body || '',
      color: noteData.color || '',
      position: noteData.position || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    return {
      id: docRef.id,
      ownerId: userId,
      ...noteData,
    }
  } catch {
    throw new Error('Error creating note')
  }
}

export const getNote = async (userId: string, noteId: string) => {
  try {
    const noteRef = doc(db, 'notes', noteId)
    const noteSnap = await getDoc(noteRef)

    if (!noteSnap.exists()) throw new Error('Note not found')

    const data = noteSnap.data()

    if (data.ownerId !== userId) {
      throw new Error('Unauthorized access to note')
    }

    return { id: noteSnap.id, ...data }
  } catch {
    throw new Error('Error getting note')
  }
}

export const getUserNotes = async (userId: string) => {
  try {
    const notesRef = collection(db, 'notes')

    const q = query(notesRef, where('ownerId', '==', userId))

    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch {
    throw new Error('Error getting notes')
  }
}

export const updateNote = async (
  userId: string,
  noteId: string,
  updates: Record<string, any>
) => {
  try {
    const noteRef = doc(db, 'notes', noteId)

    const noteSnap = await getDoc(noteRef)

    if (!noteSnap.exists()) throw new Error('Note not found')

    if (noteSnap.data().ownerId !== userId) {
      throw new Error('Unauthorized update attempt')
    }

    await updateDoc(noteRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    })
  } catch {
    throw new Error('Error updating note')
  }
}

export const deleteNote = async (userId: string, noteId: string) => {
  try {
    const noteRef = doc(db, 'notes', noteId)

    const noteSnap = await getDoc(noteRef)

    if (!noteSnap.exists()) throw new Error('Note not found')

    if (noteSnap.data().ownerId !== userId) {
      throw new Error('Unauthorized delete attempt')
    }

    await deleteDoc(noteRef)
  } catch {
    throw new Error('Error deleting note')
  }
}

export const deleteAllUserNotes = async (userId: string) => {
  try {
    const notes = await getUserNotes(userId)

    const deletePromises = notes.map((note: any) => deleteNote(userId, note.id))

    await Promise.all(deletePromises)
  } catch {
    throw new Error('Error deleting all notes')
  }
}

export const searchNotes = async (userId: string, searchTerm: string) => {
  try {
    const notes = await getUserNotes(userId)

    const search = searchTerm.toLowerCase()

    return notes.filter((note: any) =>
      note.body?.toLowerCase().includes(search)
    )
  } catch {
    throw new Error('Error searching notes')
  }
}

export const createMultipleNotes = async (
  userId: string,
  notesArray: Record<string, any>[]
) => {
  try {
    const promises = notesArray.map((noteData) => createNote(userId, noteData))

    return await Promise.all(promises)
  } catch {
    throw new Error('Error creating multiple notes')
  }
}

export const getUserNoteCount = async (userId: string) => {
  try {
    const notesRef = collection(db, 'notes')

    const q = query(notesRef, where('ownerId', '==', userId))

    const snapshot = await getDocs(q)

    return snapshot.size
  } catch {
    throw new Error('Error getting note count')
  }
}

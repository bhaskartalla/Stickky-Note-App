import {
  createNote,
  updateNote,
  deleteNote,
  getUserNotes,
  createMultipleNotes,
  db,
} from '@/src/lib/firebase'
import type { NoteDataType } from '@/types'
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore'

export const notesService = {
  async createNote(userId: string, noteData: Partial<NoteDataType>) {
    return await createNote(userId, noteData)
  },

  async updateNote(
    userId: string,
    noteId: string,
    updates: Partial<NoteDataType>
  ) {
    return await updateNote(userId, noteId, updates)
  },

  async deleteNote(userId: string, noteId: string) {
    return await deleteNote(userId, noteId)
  },

  async getUserNotes(userId: string) {
    return await getUserNotes(userId)
  },

  async createMultipleNotes(
    userId: string,
    notesArray: Partial<NoteDataType>[]
  ) {
    return await createMultipleNotes(userId, notesArray)
  },

  async mergeAnonymousNotes(anonymousUid: string, existingUid: string) {
    if (!anonymousUid || !existingUid || anonymousUid === existingUid) return

    const anonNotesRef = collection(db, 'users', anonymousUid, 'notes')
    const snapshot = await getDocs(anonNotesRef)
    if (snapshot.empty) return

    const mergePromises = snapshot.docs.map(async (noteDoc) => {
      const data = noteDoc.data()
      const newDocRef = doc(db, 'users', existingUid, 'notes', noteDoc.id)
      await setDoc(newDocRef, data)
      await deleteDoc(noteDoc.ref)
    })

    await Promise.all(mergePromises)
  },
}

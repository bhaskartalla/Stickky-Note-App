/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createNote,
  updateNote,
  deleteNote,
  getUserNotes,
  db,
} from '@/src/lib/firebase'
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
  writeBatch,
  type Unsubscribe,
} from 'firebase/firestore'
import type { NoteDataType } from '@/types'

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

  subscribeToUserNotes(
    userId: string,
    onSuccess: (notes: NoteDataType[]) => void,
    onError: (error: any) => void
  ): Unsubscribe {
    const notesRef = collection(db, 'notes')

    const q = query(
      notesRef,
      where('ownerId', '==', userId),
      orderBy('createdAt', 'asc')
    )

    return onSnapshot(
      q,
      (snapshot) => {
        const notes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as NoteDataType[]

        onSuccess(notes)
      },
      onError
    )
  },

  async migrateAnonymousNotes(anonymousUid: string, existingUid: string) {
    if (!anonymousUid || !existingUid || anonymousUid === existingUid) return

    const q = query(
      collection(db, 'notes'),
      where('ownerId', '==', anonymousUid),
      orderBy('createdAt')
    )

    const snapshot = await getDocs(q)
    if (snapshot.empty) return

    const docs = snapshot.docs
    const batchSize = 450

    for (let i = 0; i < docs.length; i += batchSize) {
      const batch = writeBatch(db)
      const chunk = docs.slice(i, i + batchSize)

      chunk.forEach((note) => {
        batch.update(doc(db, 'notes', note.id), {
          ownerId: existingUid,
        })
      })

      await batch.commit()
    }
  },
}

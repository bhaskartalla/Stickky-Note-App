import {
  createNote,
  updateNote,
  deleteNote,
  getUserNotes,
  createMultipleNotes,
  db,
} from '@/src/lib/firebase'
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
  writeBatch,
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

  async createMultipleNotes(
    userId: string,
    notesArray: Partial<NoteDataType>[]
  ) {
    return await createMultipleNotes(userId, notesArray)
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
    const batchSize = 450 // keep margin under 500

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

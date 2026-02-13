import type { NoteDataType } from '@/types'
import { db } from './config'
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

const collections = ['notes']

type WrapperFunctionType = {
  createDocument: (payload: NoteDataType) => Promise<NoteDataType>
  getAllDocuments: () => Promise<NoteDataType[]>
  updateDocument: (noteId: string, payload: NoteDataType) => Promise<void>
  deleteDocument: (noteId: string) => Promise<void>
}

type DBType = Record<string, WrapperFunctionType>

const dbFunctions: DBType = {}

collections.forEach((collectionName) => {
  dbFunctions[collectionName] = {
    createDocument: async (payload: NoteDataType) => {
      const docRef = await addDoc(collection(db, collectionName), payload)
      const response = {
        $id: docRef.id,
        ...payload,
      }
      return response
    },
    getAllDocuments: async () => {
      const querySnapshot = await getDocs(collection(db, collectionName))
      const notes: NoteDataType[] = []
      querySnapshot.forEach((doc) => {
        notes.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      return notes
    },
    updateDocument: async (noteId: string, payload: NoteDataType) => {
      const docRef = doc(db, collectionName, noteId)
      return await updateDoc(docRef, payload)
    },
    deleteDocument: async (noteId: string) => {
      const docRef = doc(db, collectionName, noteId)
      return await deleteDoc(docRef)
    },
  }
})

export { dbFunctions }

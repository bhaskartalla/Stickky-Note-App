/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from 'react'
import type { NoteDataType, ToastType } from '@/types'
import type { User, Unsubscribe } from 'firebase/auth'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { getToastErrorMessage } from '@/src/shared/utils'
import { db, auth } from '@/src/lib/firebase'

export const useRealtimeNotes = (user: User | null) => {
  const [notes, setNotes] = useState<NoteDataType[]>([])
  const [toast, setToast] = useState<ToastType>({} as ToastType)
  const [selectedNote, setSelectedNote] = useState<NoteDataType | null>(null)

  const unsubscribeRef = useRef<Unsubscribe | null>(null)

  useEffect(() => {
    unsubscribeRef.current?.()
    unsubscribeRef.current = null

    if (!user?.uid) {
      setNotes([])
      return
    }

    const notesRef = collection(db, 'notes')

    const queryRef = query(
      notesRef,
      where('ownerId', '==', user.uid),
      orderBy('createdAt', 'asc')
    )

    unsubscribeRef.current = onSnapshot(
      queryRef,
      (snapshot) => {
        const updatedNotes = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))

        setNotes(updatedNotes as NoteDataType[])
        setSelectedNote((prev: NoteDataType) => {
          if (prev) return prev
          return updatedNotes.length ? updatedNotes.at(-1) : null
        })
      },
      (error) => {
        const isLogoutTransition =
          error.code === 'permission-denied' && !auth.currentUser
        if (isLogoutTransition) return

        setToast(getToastErrorMessage(error))
      }
    )

    return () => {
      unsubscribeRef.current?.()
    }
  }, [user?.uid])

  return { notes, toast, setToast, setNotes, selectedNote, setSelectedNote }
}

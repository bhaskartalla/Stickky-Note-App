/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from 'react'
import type { NoteDataType } from '@/types'
import type { User } from 'firebase/auth'
import type { Unsubscribe } from 'firebase/firestore'
import { auth } from '@/src/lib/firebase'
import { notesService } from '../notes.service'
import { getToastErrorMessage } from '@/src/shared/utils'
import useToastNotification from '@/src/shared/hooks/useToastNotification'

export const useRealtimeNotes = (user: User | null) => {
  const [notes, setNotes] = useState<NoteDataType[]>([])
  const { NotificationComp, triggerNotification } =
    useToastNotification('bottom-right')
  const [selectedNote, setSelectedNote] = useState<NoteDataType | null>(null)
  const [isNotesLoading, setIsNotesLoading] = useState(true)

  const unsubscribeRef = useRef<Unsubscribe | null>(null)

  useEffect(() => {
    unsubscribeRef.current?.()
    unsubscribeRef.current = null

    if (!user?.uid) {
      setNotes([])
      setIsNotesLoading(false)
      return
    }

    setIsNotesLoading(true)
    unsubscribeRef.current = notesService.subscribeToUserNotes(
      user.uid,
      (updatedNotes) => {
        setNotes(updatedNotes as NoteDataType[])
        setSelectedNote((prev: NoteDataType) => {
          if (prev) return prev
          return updatedNotes.length ? updatedNotes.at(-1) : null
        })
        setIsNotesLoading(false)
      },
      (error) => {
        const isLogoutTransition =
          error.code === 'permission-denied' && !auth.currentUser
        if (isLogoutTransition) return

        triggerNotification(getToastErrorMessage(error))
        setIsNotesLoading(false)
      }
    )

    return () => {
      setIsNotesLoading(false)
      unsubscribeRef.current?.()
    }
  }, [user?.uid])

  return {
    notes,
    NotificationComp,
    triggerNotification,
    setNotes,
    selectedNote,
    setSelectedNote,
    isNotesLoading,
    setIsNotesLoading,
  }
}

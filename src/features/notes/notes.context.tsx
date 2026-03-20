import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react'

import type { NoteDataType, ToastType } from '@/types'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { useRealtimeNotes } from './hooks/useRealtimeNotes'

type NotesContextType = {
  notes: NoteDataType[]
  setNotes: Dispatch<SetStateAction<NoteDataType[] | []>>
  selectedNote: NoteDataType | null
  setSelectedNote: Dispatch<SetStateAction<NoteDataType | null>>
  isNoteSaving: boolean
  setIsNoteSaving: Dispatch<SetStateAction<boolean>>
  toast: ToastType
  setToast: Dispatch<SetStateAction<ToastType>>
  isNotesLoading: boolean
  setIsNotesLoading: Dispatch<SetStateAction<boolean>>
}

const NotesContext = createContext<NotesContextType | undefined>(undefined)

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()

  const {
    notes,
    toast,
    setToast,
    setNotes,
    selectedNote,
    setSelectedNote,
    isNotesLoading,
    setIsNotesLoading,
  } = useRealtimeNotes(user)

  const [isNoteSaving, setIsNoteSaving] = useState(false)

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        selectedNote,
        setSelectedNote,
        isNoteSaving,
        setIsNoteSaving,
        toast,
        setToast,
        isNotesLoading,
        setIsNotesLoading,
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}

export { NotesContext }

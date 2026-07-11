import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react'

import type { NoteDataType } from '@/types'
import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { useRealtimeNotes } from './hooks/useRealtimeNotes'
import type { NotificationConfigType } from '@/src/shared/hooks/useToastNotification'

type NotesContextType = {
  notes: NoteDataType[]
  setNotes: Dispatch<SetStateAction<NoteDataType[] | []>>
  selectedNote: NoteDataType | null
  setSelectedNote: Dispatch<SetStateAction<NoteDataType | null>>
  isNoteSaving: boolean
  setIsNoteSaving: Dispatch<SetStateAction<boolean>>
  NotificationComp: ReactNode
  triggerNotification: (notificationConfig: NotificationConfigType) => void
  isNotesLoading: boolean
  setIsNotesLoading: Dispatch<SetStateAction<boolean>>
}

const NotesContext = createContext<NotesContextType | undefined>(undefined)

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()

  const {
    notes,
    NotificationComp,
    triggerNotification,
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
        NotificationComp,
        triggerNotification,
        isNotesLoading,
        setIsNotesLoading,
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}

export { NotesContext }

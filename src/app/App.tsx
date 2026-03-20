import { AuthProvider } from '@/src/features/auth/auth.context'
import AuthGate from './AuthGate'
import { NotesProvider } from '@/src/features/notes/notes.context'

function App() {
  return (
    <AuthProvider>
      <NotesProvider>
        <div id='app'>
          <AuthGate />
        </div>
      </NotesProvider>
    </AuthProvider>
  )
}

export default App

import { AuthProvider } from '@/src/features/auth/auth.context'
import AuthGate from './AuthGate'
import { NotesProvider } from '@/src/features/notes/notes.context'
import { useEffect } from 'react'
import { hideSplashScreen } from 'vite-plugin-splash-screen/runtime'

function App() {
  useEffect(() => {
    hideSplashScreen()
  }, [])

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

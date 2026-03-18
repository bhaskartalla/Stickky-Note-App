import { AuthProvider } from '@/src/features/auth/auth.context'
import AuthGate from './AuthGate'

function App() {
  return (
    <AuthProvider>
      {/*
        #app receives the grid-dot background via globals.css.
        data-theme attribute is managed by ThemeManager (future integration).
      */}
      <div id='app'>
        <AuthGate />
      </div>
    </AuthProvider>
  )
}

export default App

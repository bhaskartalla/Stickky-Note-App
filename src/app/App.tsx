import { AuthProvider } from '@/src/features/auth/auth.context'
import AuthGate from './AuthGate'

function App() {
  return (
    <AuthProvider>
      <div id='app'>
        <AuthGate />
      </div>
    </AuthProvider>
  )
}

export default App

import NotesPage from './pages/NotesPage'
import Saving from './components/Saving'
import NotesProvider from './context/NotesProvider'

function App() {
  return (
    <div id='app'>
      <NotesProvider>
        <div id='header'>
          <Saving />
        </div>
        <NotesPage />
      </NotesProvider>
    </div>
  )
}

export default App

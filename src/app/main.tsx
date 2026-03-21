import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/globals.css'
import App from './App.tsx'
import { themeManager } from './theme/theme.ts'

themeManager.init()

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => console.log('SW registered ✅'))
      .catch((e) => console.error('SW failed ❌', e))
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

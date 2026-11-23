import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Global styles first, so section/component CSS can override utilities.
import './styles/global.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

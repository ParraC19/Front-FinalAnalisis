import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthView from "./views/AuthView";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthView />
  </StrictMode>,
)

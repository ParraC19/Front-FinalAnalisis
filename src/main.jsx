import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FormLogInUsers from "./components/FormLogInUsers";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormLogInUsers />
  </StrictMode>,
)

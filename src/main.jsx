import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppTable from './AppTable.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppTable />
  </StrictMode>,
)

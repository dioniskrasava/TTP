import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EditableTable from './components/EditableTable/EditableTable.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EditableTable/>
  </StrictMode>,
)

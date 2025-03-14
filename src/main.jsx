import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UTonyCalc from './CalcApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UTonyCalc />
  </StrictMode>,
)

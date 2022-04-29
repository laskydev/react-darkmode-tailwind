import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {DarkmodeProvider} from '../../../packages/react-darkmode-tailwind/src/Index'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DarkmodeProvider>
        <App />
    </DarkmodeProvider>
  </React.StrictMode>
)

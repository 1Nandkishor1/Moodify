import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { EmotionProvider } from './Features/screen/EmotionContext.jsx'


createRoot(document.getElementById('root')).render(
    <EmotionProvider>
    <App />
  </EmotionProvider>
)

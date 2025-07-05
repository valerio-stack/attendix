import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'nprogress/nprogress.css';
import './styles/general.css'
import './styles/firstView.css'
import './styles/getStarted.css'
import './styles/mainPage.css'
import './styles/navbar.css'
import './styles/room.css'
  import './styles/stylesForAssets/toggleSwitch.css'

createRoot(document.getElementById('root')).render(
  <App />
)

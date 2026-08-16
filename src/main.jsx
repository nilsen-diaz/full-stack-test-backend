import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FollowerProvider } from 'react-mouse-follower'
import ShopContextProvider from './context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopContextProvider>
      <FollowerProvider>
        <App />
      </FollowerProvider>
    </ShopContextProvider>
  </StrictMode>,
)

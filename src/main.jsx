import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './features/AuthContext'
import { UserProvider } from './features/UserContext'
import { CartProvider } from './features/CartContext'



createRoot(document.getElementById('root')).render(

  
  <StrictMode>
    <UserProvider>
    <AuthProvider>
      <CartProvider>
    <App />
    </CartProvider>
    </AuthProvider>
    </UserProvider>
  </StrictMode>,
)

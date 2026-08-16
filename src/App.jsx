import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Login from './Pages/Login'           // ← NUEVO
import Register from './Pages/Register'     // ← NUEVO
import Footer from './components/Footer'
import { UpdateFollower } from 'react-mouse-follower'
import ProductList from './components/ProductList'
import Navbar2 from './components/Navbar2'
import SingleProduct from './components/SingleProduct'
import AuthContextProvider from './context/AuthContext'  // ← NUEVO

const router = createBrowserRouter([
  {
    path: '/',
    element: <><Home /><Footer /></>
  },
  {
    path: '/mens',
    element: <><Navbar2 /><ProductList category="men" /><Footer /></>
  },
  {
    path: '/womens',
    element: <><Navbar2 /><ProductList category="women" /><Footer /></>
  },
  {
    path: '/kids',
    element: <><Navbar2 /><ProductList category="kid" /><Footer /></>
  },
  {
    path: '/contact',
    element: <><Navbar2 /><Contact /><Footer /></>
  },
  {
    path: '/products/:productId',
    element: <><Navbar2 /><SingleProduct /><Footer /></>
  },
  {
    path: '/cart',
    element: <><Navbar2 /><Cart /><Footer /></>
  },
  // ── NUEVAS RUTAS DE AUTENTICACIÓN ──────────────────────────
  {
    path: '/login',
    element: <Login />                      // sin Navbar — layout propio
  },
  {
    path: '/register',
    element: <Register />                   // sin Navbar — layout propio
  },
])

const App = () => {
  return (
    // AuthContextProvider envuelve todo para que Navbar y páginas
    // accedan al estado de sesión mediante useContext(AuthContext)
    <AuthContextProvider>
      <main className='overflow-x-hidden min-h-screen w-full font-sans relative'>
        {/* Dark Background Layer */}
        <div
          className="fixed inset-0 z-0"
          style={{
            background: 'radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)',
          }}
        />
        <div className='relative z-10'>
          <UpdateFollower
            mouseOptions={{
              backgroundColor: 'white',
              zIndex: 10,
              followSpeed: 1.5,
            }}
          >
            <RouterProvider router={router} />
          </UpdateFollower>
        </div>
      </main>
    </AuthContextProvider>
  )
}

export default App

import React, { useContext } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { NavbarMenu } from './Navbar';
import { AuthContext } from '../context/AuthContext';   // ← NUEVO

const ResponsiveMenu = ({ showMenu, setShowMenu }) => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);  // ← NUEVO

  const handleLogout = () => {
    logout();
    setShowMenu(false);
  };

  return (
    <div className={`${showMenu ? "left-0" : "-left-[100%]"} fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-gray-900/95 backdrop-blur-md px-8 pb-6 pt-16 text-foreground transition-all duration-200 md:hidden rounded-r-xl shadow-md border-r border-gray-800`}>
      <div>
        {/* Sección usuario */}
        <div className='flex items-center justify-start gap-3'>
          <FaUserCircle size={50} className='text-foreground' />
          <div>
            {isLoggedIn ? (
              <>
                <h1 className='text-foreground font-semibold'>
                  {user?.email?.split('@')[0]}
                </h1>
                <h1 className='text-sm text-[#33CCCC]'>Logged in</h1>
              </>
            ) : (
              <>
                <h1 className='text-foreground'>Hello, Guest</h1>
                <Link
                  to="/login"
                  onClick={() => setShowMenu(false)}
                  className='text-sm text-[#33CCCC] hover:underline'
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Links de navegación */}
        <nav className='mt-12'>
          <ul className='space-y-4 text-sl text-foreground flex flex-col'>
            {NavbarMenu.map((item, index) => (
              <li key={index} onClick={() => setShowMenu(false)}>
                <Link
                  to={item.link}
                  className='inline-block text-base font-semibold py-2 px-3 uppercase text-foreground hover:text-blue-400 transition-colors'
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Botón logout (solo si está logueado) */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className='mt-8 w-full py-2 px-4 rounded-md border border-red-500/50
                       text-red-400 text-sm font-medium hover:bg-red-500/10 transition'
          >
            Sign Out
          </button>
        )}
      </div>

      <div>
        <h1 className='text-gray-400'>Made with ❤️ by Aditya</h1>
      </div>
    </div>
  )
}

export default ResponsiveMenu

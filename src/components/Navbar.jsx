import React, { useState, useContext } from 'react'
import Logo from '../assets/logo2.png'
import { Link } from 'react-router-dom';
import { ShoppingCart, LogOut } from 'lucide-react';
import { FaRegUser } from "react-icons/fa";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from './ResponsiveMenu';
import { UpdateFollower } from 'react-mouse-follower';
import { AuthContext } from '../context/AuthContext';   // ← NUEVO

export const NavbarMenu = [
  { id: 1, title: "Home",    link: "/" },
  { id: 2, title: "Mens",    link: "/mens" },
  { id: 3, title: "Womens",  link: "/womens" },
  { id: 4, title: "Kids",    link: "/kids" },
  { id: 5, title: "Contact", link: "/contact" },
];

const MOUSE_OPTS = {
  backgroundColor: "white",
  zIndex: 9999,
  followSpeed: 1.5,
  scale: 5,
  mixBlendMode: "difference",
};

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isLoggedIn, user, logout } = useContext(AuthContext);  // ← NUEVO

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div className='text-white py-8'>
      <div className='container flex justify-between items-center'>
        {/* Logo */}
        <div>
          <img src={Logo} alt="" className='max-w-[100px] invert' />
        </div>

        {/* Menú desktop */}
        <div className='hidden md:block'>
          <ul className='flex items-center gap-4 relative z-40'>
            {NavbarMenu.map((item, index) => (
              <li key={index}>
                <UpdateFollower mouseOptions={MOUSE_OPTS}>
                  <Link to={item.link} className='inline-block text-base font-semibold py-2 px-3 uppercase'>
                    {item.title}
                  </Link>
                </UpdateFollower>
              </li>
            ))}

            {/* Carrito */}
            <UpdateFollower mouseOptions={MOUSE_OPTS}>
              <Link to='/cart'>
                <button className='text-xl ps-14'><ShoppingCart /></button>
              </Link>
            </UpdateFollower>

            {/* ── SECCIÓN AUTH ── */}
            {isLoggedIn ? (
              // Usuario logueado: muestra nombre recortado + botón logout
              <div className='flex items-center gap-2 ps-8'>
                <span className='text-xs text-[#33CCCC] max-w-[90px] truncate hidden lg:block'>
                  {user?.email?.split('@')[0]}
                </span>
                <UpdateFollower mouseOptions={MOUSE_OPTS}>
                  <button
                    onClick={logout}
                    title="Sign out"
                    className='text-xl hover:text-red-400 transition-colors'
                  >
                    <LogOut size={20} />
                  </button>
                </UpdateFollower>
              </div>
            ) : (
              // Sin sesión: icono lleva al login
              <UpdateFollower mouseOptions={MOUSE_OPTS}>
                <Link to='/login'>
                  <button className='text-xl ps-8'><FaRegUser /></button>
                </Link>
              </UpdateFollower>
            )}
          </ul>
        </div>

        {/* Menú mobile */}
        <div className='flex gap-8 md:hidden z-50'>
          <Link to={'/cart'}><ShoppingCart /></Link>
          {showMenu ? (
            <HiMenuAlt1 onClick={toggleMenu} className='cursor-pointer transition-all md:hidden z-50' size={30} />
          ) : (
            <HiMenuAlt3 onClick={toggleMenu} className='cursor-pointer transition-all md:hidden z-50' size={30} />
          )}
        </div>
      </div>

      <div>
        <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
    </div>
  )
}

export default Navbar

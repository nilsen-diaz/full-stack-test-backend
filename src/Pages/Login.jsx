import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UpdateFollower } from 'react-mouse-follower';
import { loginUser } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import Logo from '../assets/logo2.png';

const MOUSE_OPTS = {
  backgroundColor: 'white',
  zIndex: 9999,
  followSpeed: 1.5,
  scale: 3,
  mixBlendMode: 'difference',
};

const Login = () => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [mensaje,  setMensaje]  = useState({ texto: '', tipo: '' });
  const [cargando, setCargando] = useState(false);

  const { loginSuccess } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ texto: '', tipo: '' });

    if (!email || !password) {
      setMensaje({ texto: 'Please fill in all fields.', tipo: 'error' });
      return;
    }

    setCargando(true);
    const result = await loginUser(email, password);
    setCargando(false);

    if (result.ok) {
      loginSuccess(result.user, result.token);
      navigate('/');                // redirige al home tras login exitoso
    } else {
      setMensaje({ texto: result.error, tipo: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/">
            <img src={Logo} alt="Nike" className="max-w-[100px] invert" />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-2 text-center text-[#33CCCC]">
            Sign In
          </h2>
          <p className="text-gray-400 text-center text-sm mb-8">
            Welcome back. Enter your credentials to continue.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 p-3 block w-full text-white border border-gray-700 rounded-md
                           sm:text-sm bg-gray-800 focus:outline-none
                           focus:border-[#33CCCC] focus:ring-1 focus:ring-[#33CCCC]"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="mt-1 p-3 block w-full text-white border border-gray-700 rounded-md
                           sm:text-sm bg-gray-800 focus:outline-none
                           focus:border-[#33CCCC] focus:ring-1 focus:ring-[#33CCCC]"
                required
              />
            </div>

            {/* Mensaje de estado */}
            {mensaje.texto && (
              <p className={`text-sm font-medium ${
                mensaje.tipo === 'success' ? 'text-green-400' : 'text-red-400'
              }`}>
                {mensaje.tipo === 'error' ? '❌ ' : '✅ '}
                {mensaje.texto}
              </p>
            )}

            {/* Botón submit */}
            <UpdateFollower mouseOptions={MOUSE_OPTS}>
              <button
                type="submit"
                disabled={cargando}
                className="w-full bg-[#33CCCC] text-black font-semibold py-3 px-4
                           rounded-md shadow hover:bg-[#28a5a5] transition
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cargando ? 'Signing in…' : 'Sign In'}
              </button>
            </UpdateFollower>
          </form>

          {/* Link a registro */}
          <p className="text-gray-400 text-sm text-center mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-[#33CCCC] hover:underline font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

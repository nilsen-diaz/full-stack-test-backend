import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UpdateFollower } from 'react-mouse-follower';
import { registerUser } from '../services/authService';
import Logo from '../assets/logo2.png';

const MOUSE_OPTS = {
  backgroundColor: 'white',
  zIndex: 9999,
  followSpeed: 1.5,
  scale: 3,
  mixBlendMode: 'difference',
};

const Register = () => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [mensaje,  setMensaje]  = useState({ texto: '', tipo: '' });
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ texto: '', tipo: '' });

    // Validaciones del lado del cliente
    if (!email || !password || !confirm) {
      setMensaje({ texto: 'Please fill in all fields.', tipo: 'error' });
      return;
    }
    if (password.length < 6) {
      setMensaje({ texto: 'Password must be at least 6 characters.', tipo: 'error' });
      return;
    }
    if (password !== confirm) {
      setMensaje({ texto: 'Passwords do not match.', tipo: 'error' });
      return;
    }

    setCargando(true);
    const result = await registerUser(email, password);
    setCargando(false);

    if (result.ok) {
      setMensaje({ texto: result.message, tipo: 'success' });
      // Redirige a login tras 1.5 s para que el usuario vea el mensaje de éxito
      setTimeout(() => navigate('/login'), 1500);
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
            Create Account
          </h2>
          <p className="text-gray-400 text-center text-sm mb-8">
            Join us today. It only takes a minute.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                id="reg-email"
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
              <label htmlFor="reg-password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="reg-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="mt-1 p-3 block w-full text-white border border-gray-700 rounded-md
                           sm:text-sm bg-gray-800 focus:outline-none
                           focus:border-[#33CCCC] focus:ring-1 focus:ring-[#33CCCC]"
                required
              />
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label htmlFor="reg-confirm" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                id="reg-confirm"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat your password"
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
                {cargando ? 'Creating account…' : 'Create Account'}
              </button>
            </UpdateFollower>
          </form>

          {/* Link a login */}
          <p className="text-gray-400 text-sm text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#33CCCC] hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

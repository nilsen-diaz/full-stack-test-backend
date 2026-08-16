import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user,  setUser]  = useState(null);   // { id, email } | null
  const [token, setToken] = useState(null);   // JWT string   | null

  // Al montar: restaurar sesión guardada en localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser  = localStorage.getItem('authUser');
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        // Si el JSON está corrupto, limpiar
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    }
  }, []);

  // Llamado tras un login exitoso (desde Login.jsx)
  const loginSuccess = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('authToken', jwtToken);
    localStorage.setItem('authUser', JSON.stringify(userData));
  };

  // Cierra sesión y limpia estado + localStorage
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  const contextValue = {
    user,
    token,
    loginSuccess,
    logout,
    isLoggedIn: !!user,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

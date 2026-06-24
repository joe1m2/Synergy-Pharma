import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load session from localStorage on startup
  useEffect(() => {
    const storedUser = localStorage.getItem('synergy_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('synergy_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Call the real backend — POST /api/auth/login
      const data = await authService.login(email, password);
      // Backend returns { token, role, email }
      // Role from backend is e.g. "ROLE_ADMIN" or "ADMIN" — normalise it
      const normalizedRole = data.role?.startsWith('ROLE_') ? data.role : `ROLE_${data.role}`;
      const userData = {
        email: data.email,
        username: data.email,
        role: normalizedRole,
        token: data.token
      };
      setUser(userData);
      localStorage.setItem('synergy_user', JSON.stringify(userData));
      return userData;
    } finally {
      setLoading(false);
    }
  };

  const register = async (fullName, email, password) => {
    setLoading(true);
    try {
      const data = await authService.register({ fullName, email, password, role: 'USER' });
      const normalizedRole = data.role?.startsWith('ROLE_') ? data.role : `ROLE_${data.role}`;
      const userData = {
        email: data.email,
        username: data.email,
        fullName: fullName,
        role: normalizedRole,
        token: data.token
      };
      setUser(userData);
      localStorage.setItem('synergy_user', JSON.stringify(userData));
      return userData;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('synergy_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

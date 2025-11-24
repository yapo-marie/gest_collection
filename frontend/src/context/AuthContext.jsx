import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

import {
  fetchMe,
  login as apiLogin,
  loginWithFirebase,
  register as apiRegister,
  setAuthToken
} from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setLoading(false);
      return;
    }
    setAuthToken(token);
    fetchMe()
      .then(setUser)
      .catch(() => {
        setAuthToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const token = await apiLogin(email, password);
    setAuthToken(token);
    const me = await fetchMe();
    setUser(me);
  };

  const register = async (email, password) => {
    await apiRegister({ email, password });
    await login(email, password);
  };

  const loginGoogle = async (idToken) => {
    const token = await loginWithFirebase(idToken);
    setAuthToken(token);
    const me = await fetchMe();
    setUser(me);
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, loginGoogle, logout, isAuthenticated: Boolean(user) }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuth = () => useContext(AuthContext);

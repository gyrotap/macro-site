// src/lib/AuthContext.jsx

import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = () => {
    const authenticated = sessionStorage.getItem('admin_authenticated');
    setIsAuthenticated(!!authenticated);
    setIsLoadingAuth(false);
  };

  const logout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
  };

  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoadingAuth,
      logout,
      navigateToLogin,
      checkAppState
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

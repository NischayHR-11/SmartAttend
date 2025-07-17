import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const loadAuthState = async () => {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };
    
    loadAuthState();
  }, []);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => {
    // Check both the state and localStorage to ensure we don't lose auth on refresh
    const stateAuth = !!(token && user);
    const localAuth = !!(localStorage.getItem('token') && localStorage.getItem('user'));
    return stateAuth || localAuth;
  };

  const getUserType = () => {
    if (user?.userType) {
      return user.userType;
    }
    
    // Try to get user type from localStorage if state is empty
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        return parsedUser.userType || null;
      } catch (error) {
        return null;
      }
    }
    return null;
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
    getUserType
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

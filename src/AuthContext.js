import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        return storedUser ? JSON.parse(storedUser) : null;
      });
    
      const login = (userData) => {
        setUser(userData);
        localStorage.setItem('loggedInUser', JSON.stringify(userData));
      };
    
      const logout = () => {
        setUser(null);
        localStorage.removeItem('loggedInUser');
      };

  return (
    <AuthContext.Provider value={{ user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
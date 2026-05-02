import { createContext, useContext, useState } from 'react';
import { saveUser, getUser, removeUser } from '../utils/localStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getUser());

  const login = (email, password) => {
    const user = getUser();
    if (user && user.email === email && user.password === password) {
      setCurrentUser(user);
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const register = (name, email, password) => {
    const existingUser = getUser();
    if (existingUser && existingUser.email === email) {
      return { success: false, message: 'User already exists' };
    }
    const newUser = { name, email, password };
    saveUser(newUser);
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    removeUser();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));

  const login = () => {
    localStorage.setItem('token', 'nico-token'); 
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};




//traer todo lo que tenga que ver con usuario, data, ordenes que tienen.
//tener generalizacion, el hook que trabaja con usuario pueda usar eso
//contexto solo a memorizar data
//userservice
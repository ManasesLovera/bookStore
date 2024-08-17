import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<string>('');

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("");
  }
  return context;
};


//traer todo lo que tenga que ver con usuario, data, ordenes que tienen.
//tener generalizacion, el hook que trabaja con usuario pueda usar eso
//contexto solo a memorizar data
//userservice
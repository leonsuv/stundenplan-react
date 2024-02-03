import React, { createContext, useState } from 'react';

export interface iDate {
  day: number;
  month: number;
  year: number;
}

interface AppContextProps {
  date: iDate;
  setDate: (value: iDate) => void;
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({
  date: {
    day: 22,
    month: 1,
    year: 2024
  },
  setDate: () => {},
  isLoggedIn: false,
  setLoggedIn: () => {}
});

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dateNow = new Date();
  const [date, setDate] = useState<iDate>({
    day: dateNow.getDate(),
    month: dateNow.getUTCMonth() + 1,
    year: dateNow.getFullYear()
  });
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <AppContext.Provider
      value={{
        date: date,
        setDate: setDate,
        isLoggedIn: isLoggedIn,
        setLoggedIn: setLoggedIn
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

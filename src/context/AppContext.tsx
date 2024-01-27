import { createContext, useState } from 'react';

export interface iDate {
  day: number,
  month: number,
  year: number
}

export const AppContext = createContext<{
  date: iDate;
  setDate: (value: iDate) => void;
  authToken: string;
  refreshToken: string
}>({
  date: {
    day: 22,
    month: 1,
    year: 2024
  },
  setDate: () => { },
  authToken: "Bearer ",
  refreshToken: "Bearer "
});

export const AppContextProvider = ({ children }: { children: any }) => {
  const date = new Date(Date.now());
  const [state, setState] = useState({
    day: date.getDate(),
    month: date.getUTCMonth()+1,
    year: date.getFullYear()
  });
  const [authToken] = useState("Bearer ");
  const [refreshToken] = useState("Bearer ");

  return (
    <AppContext.Provider value={{
      date: state,
      setDate: setState,
      authToken: authToken,
      refreshToken: refreshToken
    }}>
      {children}
    </AppContext.Provider>
  );
};
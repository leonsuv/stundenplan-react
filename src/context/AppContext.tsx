import { createContext, useState } from 'react';

export interface iDate {
  day: number,
  month: number,
  year: number
}

export const AppContext = createContext<{
  date: iDate;
  setDate: (value: iDate) => void
}>({
  date: {
    day: 22,
    month: 1,
    year: 2024
  },
  setDate: () => { }
});

export const AppContextProvider = ({ children }: { children: any }) => {
  const date = new Date(Date.now());
  const [state, setState] = useState({
    day: date.getDate(),
    month: date.getUTCMonth()+1,
    year: date.getFullYear()
  });

  return (
    <AppContext.Provider value={{ date: state, setDate: setState }}>
      {children}
    </AppContext.Provider>
  );
};
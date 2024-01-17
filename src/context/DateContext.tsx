import { createContext, useState } from 'react';
//TODO: Create date context for Overview and Calendar
/*
  let [arithDays, setArithDays] = useState(1);
  let date = new Date(Date.now());
  let sDate = date.getDate() + "-" + 
      (date.getUTCMonth()+1) + "-" +
      date.getFullYear();
  const today = (element: any) => element.Date = sDate+arithDays;
*/

interface date {
  day: number,
  month: number,
  year: number
}

export const CalendarContext = createContext<{
  state: date;
  setState: (value: date) => void
}>({
  state: {
    day: 1,
    month: 17,
    year: 2019
  },
  setState: () => { }
});

export const CalendarProvider = ({ children }: { children: any }) => {
  const [state, setState] = useState({
    day: 0,
    month: 11,
    year: 2019
  });

  return (
    <CalendarContext.Provider value={{ state, setState }}>
      {children}
    </CalendarContext.Provider>
  );
};
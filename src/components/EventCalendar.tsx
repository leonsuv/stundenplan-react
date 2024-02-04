import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { Calendar } from "./ui/calendar";
import { de } from "date-fns/locale"
import events from '../data/mock.json'

export default function EventCalendar() {
  const { date: dateCtx, setDate: setDateCtx } = useContext(AppContext);
  const [dateState, setDateState] = useState<Date | undefined>(new Date(dateCtx.year, dateCtx.month - 1, dateCtx.day));
  const [shownMonth, setShownMonth] = useState<Date | undefined>(dateState)
  let prevMonthValue = dateState;

  const eventDates = events.map((event) => {
    const dateParts = event.Date.split('-').map(part => parseInt(part, 10));
    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  });

  useEffect(() => {
    if (dateCtx.year !== dateState?.getFullYear() ||
      dateCtx.month !== dateState?.getMonth() + 1 ||
      dateCtx.day !== dateState?.getDate()) {
      setDateState(new Date(dateCtx.year, dateCtx.month - 1, dateCtx.day));
      setShownMonth(new Date(dateCtx.year, dateCtx.month - 1, dateCtx.day));
    }
  }, [dateCtx]);

  useEffect(() => {
    if (dateState) {
      if (
        dateState.getFullYear() !== dateCtx.year ||
        dateState.getMonth() !== dateCtx.month - 1 ||
        dateState.getDate() !== dateCtx.day
      ) {
        setDateCtx({
          day: dateState.getDate(),
          month: dateState.getMonth() + 1,
          year: dateState.getFullYear(),
        });
      }
    }
  }, [dateState]);

  return (
    <>
      <Calendar
        mode="single"
        showOutsideDays={false}
        month={shownMonth}
        onMonthChange={(monthChange) => setShownMonth(monthChange)}
        ISOWeek
        locale={de}
        selected={dateState}
        onSelect={setDateState}
        modifiers={{ booked: eventDates }}
        modifiersClassNames={{ booked: "border-1 rounded-lg border-gray-400" }}
        className="rounded-md border h-fit"
      />
    </>
  );
}
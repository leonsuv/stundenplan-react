import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { Calendar } from "./ui/calendar";
import { de } from "date-fns/locale"
import { getEvents } from "@/data/ApiWrapper";
import { EventDay, loggedOutBearer } from "@/lib/utils";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function EventCalendar() {
  const { date: dateCtx, setDate: setDateCtx } = useContext(AppContext);
  const [dateState, setDateState] = useState<Date | undefined>(new Date(dateCtx.year, dateCtx.month - 1, dateCtx.day));
  const [shownMonth, setShownMonth] = useState<Date | undefined>(dateState);
  const [refreshToken,] = useLocalStorage("refreshToken", loggedOutBearer);
  const [events, setEvents] = useState<EventDay[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedEvents = await getEvents(refreshToken);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    })();
  }, []);

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
        onMonthChange={(monthChange: Date) => setShownMonth(monthChange)}
        ISOWeek
        locale={de}
        selected={dateState}
        onSelect={setDateState}
        modifiers={{ booked: eventDates }}
        modifiersClassNames={{ booked: "border-1 rounded-lg border-gray-400" }}
        className="rounded-md border h-fit max-w-[265px] min-w-[265px] place-self-center
                  md:place-self-end mb-auto md:col-span-1 col-span-2"
      />
    </>
  );
}
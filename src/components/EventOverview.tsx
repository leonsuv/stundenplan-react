import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import EventCard from "./EventCard"
import { useContext, useEffect, useState } from "react"
import { Button } from "@nextui-org/button"
import { AppContext, iDate } from "@/context/AppContext"
import React from "react"
import { getEvents } from "@/data/ApiWrapper"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { EventDay, loggedOutBearer } from "@/lib/utils"



export default function EventOverview() {
  const { date, setDate } = useContext(AppContext);
  const [refreshToken,] = useLocalStorage("refreshToken", loggedOutBearer);
  const [events, setEvents] = useState<EventDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventComponents, setEventComponents] = useState<JSX.Element[]>([]);

  const eventDates = events.map((event) => {
    const dateParts = event.Date.split('-').map((part: string) => parseInt(part, 10));
    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  });

  useEffect(() => {
    const eventElements = getEventsForToday(events, date)?.Event.map((evento: any, index: number) => (
      <React.Fragment key={index}>
        <EventCard key={`${evento.Starttime.Hour}-${index}`} event={evento} />
        <Separator key={`sep-${index}`} className="my-2" />
      </React.Fragment>
    ));
    if (eventElements) {
      setEventComponents(eventElements)
    } else {
      incrementDays(date, setDate, eventDates)
    }
    setIsLoading(false);
  }, [isLoading]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const fetchedEvents = await getEvents(refreshToken);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [refreshToken]);

  useEffect(() => {
    setIsLoading(true);
  }, [date]);

  return (
    <ScrollArea className="no-scrollbar overflow-y-auto min-h-[400px] h-auto max-h-[600px] rounded-md border w-full max-w-[400px] min-w-[250px] md:col-span-1 col-span-2 place-self-center mb-auto">
      <div className="p-4">
        <div className="p-2 flex flex-row flex-1">
          <Button onClick={() => decrementDays(date, setDate, eventDates)}
            size="sm"
            className="bg-background max-w-8 min-w-8 text-lg"
          >
            {"<"}
          </Button>
          <h4 className="mb-4 text-sm grow text-center font-medium leading-none">Vorlesungen</h4>
          <Button onClick={() => incrementDays(date, setDate, eventDates)}
            size="sm"
            className="bg-background max-w-8 min-w-8 text-lg"
          >
            {">"}
          </Button>
        </div>
        {isLoading && <div>Loading events...</div>}
        {eventComponents}
      </div>
    </ScrollArea>
  )
}

function getEventsForToday(events: EventDay[], date: iDate) {
  return (events.find((element: any) => {
    return element.Date === stateToStrDate(date);
  }))
}

function stateToStrDate(date: iDate): string {
  return date.year + "-"
    + (date.month < 10 ? "0" : "") + date.month + "-"
    + (date.day < 10 ? "0" : "") + date.day;
}

function isEventDay(date: Date, bookedDays: Date[]): boolean {
  return bookedDays.some(bookedDate =>
    date.getFullYear() === bookedDate.getFullYear() &&
    date.getMonth() === bookedDate.getMonth() &&
    date.getDate() === bookedDate.getDate()
  );
}

function incrementDays(date: iDate, setDate: (date: iDate) => void, bookedDays: Date[]) {
  let checkDate = new Date(date.year, date.month - 1, date.day);
  let failedAttempts = 0;

  do {
    checkDate.setDate(checkDate.getDate() + 1);

    if (isEventDay(checkDate, bookedDays)) {
      setDate({
        day: checkDate.getDate(),
        month: checkDate.getMonth() + 1,
        year: checkDate.getFullYear()
      });
      return;
    }
    failedAttempts++;
  } while (failedAttempts < 21);
}

function decrementDays(date: iDate, setDate: (date: iDate) => void, bookedDays: Date[]) {
  let checkDate = new Date(date.year, date.month - 1, date.day);
  let failedAttempts = 0;
  do {
    checkDate.setDate(checkDate.getDate() - 1);

    if (isEventDay(checkDate, bookedDays)) {
      setDate({
        day: checkDate.getDate(),
        month: checkDate.getMonth() + 1,
        year: checkDate.getFullYear()
      });
      return;
    }
    failedAttempts++;
  } while (failedAttempts < 21);
}
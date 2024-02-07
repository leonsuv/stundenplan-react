import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import events from '../data/mock.json'
import EventCard from "./EventCard"
import { useContext } from "react"
import { Button } from "@nextui-org/react"
import { AppContext, iDate } from "@/context/AppContext"
import React from "react"



export default function EventOverview() {
  const { date, setDate } = useContext(AppContext)
  const eventDates = events.map((event) => {
    const dateParts = event.Date.split('-').map(part => parseInt(part, 10));
    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  });

  return (
    <ScrollArea className="min-h-[400px] h-auto max-h-[600px] w-1/2 rounded-md border max-w-[400px] min-w-[250px]">
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
        {events.find((element: any) => {
          return element.Date === stateToStrDate(date);
        })?.Event.map((evento, index) => (
          <React.Fragment key={index}>
            <EventCard key={`${evento.Starttime.Hour}-${index}`} event={evento} />
            <Separator key={`separator-${index}`} className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
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
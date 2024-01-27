import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import events from '../data/mock.json'
import EventCard from "./EventCard"
import { useContext } from "react"
import { Button } from "@nextui-org/react"
import { AppContext, iDate } from "@/context/AppContext"



export default function EventOverview() {
  const { date, setDate } = useContext(AppContext)

  return (
    <ScrollArea className="h-[35rem] w-1/2 rounded-md border">
      <div className="p-4">
        <div className="p-2 flex flex-row flex-1">
          <Button onClick={() => decrementDays(date, setDate)}
            size="sm"
            color="primary"
          >
            {"<"}
          </Button>
          <h4 className="mb-4 text-sm grow text-center font-medium leading-none">Vorlesungen</h4>
          <Button onClick={() => incrementDays(date, setDate)}
            size="sm"
            color="primary"
          >
            {">"}
          </Button>
        </div>
        {events.find(
          (element: any) => { return element.Date === stateToDate(date) }
        )?.Event.map((evento) => (
          <>
            <EventCard key={evento.Starttime.Hour} event={evento} />
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  )
}

function stateToDate(date: iDate): string {
  return date.year + "-"
    + (date.month < 10 ? "0" : "") + date.month + "-"
    + (date.day < 10 ? "0" : "") + date.day;
}

function incrementDays(date: iDate, setDate: (date: iDate) => void) {
  const checkMonth = new Date(date.year, date.month - 1, date.day);
  checkMonth.setDate(checkMonth.getDate() + 1);
  if (checkMonth.getMonth() + 1 > date.month) {
    setDate({ day: checkMonth.getDate(), month: date.month + 1, year: date.year });
    return;
  }
  setDate({ day: date.day + 1, month: date.month, year: date.year });
}

function decrementDays(date: iDate, setDate: (date: iDate) => void) {
  const checkMonth = new Date(date.year, date.month - 1, date.day);
  checkMonth.setDate(checkMonth.getDate() - 1);
  if (checkMonth.getMonth() + 1 < date.month) {
    setDate({ day: checkMonth.getDate(), month: date.month - 1, year: date.year });
    return;
  }
  setDate({ day: date.day - 1, month: date.month, year: date.year });
}
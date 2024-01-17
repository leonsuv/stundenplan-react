import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import events from '../data/mock.json'
import EventCard from "./EventCard"
import { useState } from "react"
import { Button } from "@nextui-org/react"



export default function EventOverview() {
  //TODO: Create date context for Overview and Calendar
  let [arithDays, setArithDays] = useState(1);
  let date = new Date(Date.now());
  let sDate = date.getDate() + "-" +
    (date.getUTCMonth() + 1) + "-" +
    date.getFullYear();
  const today = (element: any) => element.Date = sDate + arithDays;
  return (
    <ScrollArea className="h-[35rem] w-1/2 rounded-md border">
      <div className="p-4">
        <div className="p-2 flex flex-row flex-1">
          <Button onClick={() => setArithDays(arithDays - 1)}
            size="sm"
            color="primary"
          >
            {"<"}
          </Button>
          <h4 className="mb-4 text-sm grow text-center font-medium leading-none">Vorlesungen</h4>
          <Button onClick={() => setArithDays(arithDays + 1)}
            size="sm"
            color="primary"
          >
            {">"}
          </Button>
        </div>
        {events.find(today)?.Event.map((evento) => (
          <>
            <EventCard key={evento.Starttime.Hour} event={evento} />
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  )
}
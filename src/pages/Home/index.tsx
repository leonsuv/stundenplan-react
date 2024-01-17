import EventCalendar from "@/components/EventCalendar";
import EventOverview from "@/components/EventOverview";

export default function Home() {
  return (
    <>
    //todo: classname="row sm:col" 
      <EventOverview/>
      <EventCalendar/>
    </>
  )
}
import EventCalendar from "@/components/EventCalendar";
import EventOverview from "@/components/EventOverview";

export default function Home() {
  //todo: classname="row sm:col" 
  return (
    <>
      <EventOverview/>
      <EventCalendar/>
    </>
  )
}
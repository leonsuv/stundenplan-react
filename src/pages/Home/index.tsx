import EventCalendar from "@/components/EventCalendar";
import EventOverview from "@/components/EventOverview";

export default function Home() {
  //todo: classname="row sm:col" 
  return (
    <div className="flex flex-col md:flex-row w-8/12 mx-auto">
      <EventCalendar/>
      <EventOverview/>
    </div>
  )
}
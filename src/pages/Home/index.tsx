import ContactOverview from "@/components/ContactOverview";
import EventCalendar from "@/components/EventCalendar";
import EventOverview from "@/components/EventOverview";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row mx-auto">
      <EventCalendar/>
      <EventOverview/>
      <ContactOverview/>
    </div>
  )
}
import ContactOverview from "@/components/ContactOverview";
import EventCalendar from "@/components/EventCalendar";
import EventOverview from "@/components/EventOverview";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="grid xl:grid-cols-4 grid-cols-2 gap-4 place-items-stretch top-2/4 md:top-auto mt-4">
        <EventCalendar />
        <EventOverview />
        <ContactOverview />
      </div>
    </div>
  )
}
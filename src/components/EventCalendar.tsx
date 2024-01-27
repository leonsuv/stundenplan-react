import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { Calendar } from "./ui/calendar";
import { de } from "date-fns/locale"

export default function EventCalendar() {
  const { date, setDate } = useContext(AppContext);
  const [date2, setDate2] = useState<Date | undefined>(new Date(date.year, date.month - 1, date.day));

  useEffect(() => {
    if (date.year !== date2?.getFullYear() ||
      date.month !== date2?.getMonth() + 1 ||
      date.day !== date2?.getDate()) {
      setDate2(new Date(date.year, date.month - 1, date.day));
    }
  }, [date]);

  useEffect(() => {
    if (date2?.getFullYear() !== date.year ||
      date2?.getMonth() + 1 !== date.month ||
      date2?.getDate() !== date.day) {
      setDate({
        day: date2?.getDate() ?? 4,
        month: date2 ? date2.getUTCMonth() + 1 : 5,
        year: date2?.getFullYear() ?? 2023
      });
    }
  }, [date2]);

  return (
    <>
      <Calendar
        mode="single"
        showOutsideDays={false}
        ISOWeek
        locale={de}
        selected={date2}
        onSelect={setDate2}
        className="rounded-md border h-fit"
      />
    </>
  );
}
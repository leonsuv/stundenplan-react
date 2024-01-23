import { useContext, useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";
import { AppContext } from "@/context/AppContext";



export default function EventCalendar() {
  const { date, setDate } = useContext(AppContext)
  const [date2, setDate2] = useState<Date | undefined>(new Date(date.year, date.month-1, date.day))

  useEffect(() => {
    setDate2(new Date(date.year, date.month-1, date.day))
  }, [date])
  
  useEffect(() => {
    setDate({
      day: (date2?.getDate() === undefined ? 1 : date2.getDate()),
      month: (date2?.getUTCMonth() === undefined ? 1 : date2.getUTCMonth()+1),
      year: (date2?.getFullYear() === undefined ? 2022 : date2.getFullYear())
    })
  }, [date2])

  return (
    <>
      <Calendar mode="single" selected={date2} onSelect={setDate2} className="rounded-md border h-fit"/>
    </>
  )
}
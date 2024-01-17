import { Card, CardHeader, CardBody } from "@nextui-org/react";

export default function EventCard({ event }: { event: any }) {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col">
            <p className="text-md">
              {event.Title}
            </p>
            <p className="text-small text-default-500">
              {event.Starttime.Hour + ":" + event.Starttime.Minute + " "}
              -
              {" " + event.Endtime.Hour + ":" + event.Endtime.Minute}
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <p>{event.Teacher}</p>
          <p>
            {event.Rooms.map((room: string) => (
              <>
                <p>{room}</p>
              </>
            ))}
          </p>
        </CardBody>
      </Card>
    </>
  )
}
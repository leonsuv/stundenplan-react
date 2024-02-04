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
            <a className="text-small text-default-500">
              {event.Starttime.Hour + ":" + event.Starttime.Minute + " "}
              -
              {" " + event.Endtime.Hour + ":" + event.Endtime.Minute}
            </a>
          </div>
        </CardHeader>
        <CardBody>
          <a>{event.Teacher}</a>
          <div>
            {event.Rooms.map((room: string) => (
                <p key={room}>{room}</p>
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  )
}
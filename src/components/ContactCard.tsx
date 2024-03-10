import { Contact } from "@/lib/utils";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";


export default function ContactCard({ contact: contact }: { contact: Contact }) {
  return (
    <>
      <Card className="p-0 m-0">
        <CardHeader className="">
          <div className="flex flex-col">
            <p className="text-md">
              {contact.information.Name}
            </p>
            <a className="text-small text-default-500">
            </a>
            <Link color="warning" href={"mailto:"+contact.information.Email}>{contact.information.Email}</Link>
          </div>
        </CardHeader>
        <CardBody>
          <a>{contact.information.Organisation}</a>
          <a>{contact.information.Ort}</a>
          <a>{contact.information.Telefonzentrale}</a>
        </CardBody>
      </Card>
    </>
  )
}
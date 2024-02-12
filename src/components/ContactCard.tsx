import { Contact } from "@/lib/utils";
import { Card, CardHeader, CardBody, Link } from "@nextui-org/react";

export default function ContactCard({ contact: contact }: { contact: Contact }) {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col">
            <p className="text-md">
              {contact.CardTitle}
            </p>
            <a className="text-small text-default-500">
              {contact.information.Name}
            </a>
            <Link href={"mailto:"+contact.information.Email}>{contact.information.Email}</Link>
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { getContacts } from "@/data/ApiWrapper"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { Contact, loggedOutBearer } from "@/lib/utils"
import ContactCard from "./ContactCard"
import { Accordion, AccordionItem } from "@nextui-org/react"



export default function ContactOverview() {
  const [ refreshToken, ] = useLocalStorage("refreshToken", loggedOutBearer);
  const [ contacts, setContacts ] = useState<Contact[]>([]);
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const fetchedContacts = await getContacts(refreshToken);
        const stringContacts = await JSON.stringify(fetchedContacts);
        const cleanedContacts = stringContacts.split(":\":").join("\":");
        const finalContacts = JSON.parse(cleanedContacts)
        setContacts(finalContacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [refreshToken]);

  return (
    <ScrollArea className="no-scrollbar overflow-y-auto min-h-[400px] h-auto max-h-[600px] rounded-md border max-w-[600px] min-w-[250px] col-span-2 xl:col-span-2 place-self-center">
      <div className="p-4">
        <div className="p-2 flex flex-row flex-1">
          <h4 className="mb-4 text-sm grow text-center font-medium leading-none">Kontakte</h4>
        </div>
        {isLoading && <div>Loading contacts...</div>}
        <Accordion variant="splitted" defaultExpandedKeys={["0"]}>
        {!isLoading && contacts.map((contact: Contact, index: number) => (
          <AccordionItem key={index} title={contact.CardTitle}>
            <ContactCard key={`${contact.information.Email || ""}-${index}`} contact={contact} />
            <Separator key={`separator-${index}`} className="my-2" />
          </AccordionItem>
        )) || <AccordionItem>No contacts found</AccordionItem>}
        </Accordion>
      </div>
    </ScrollArea>
  )
}
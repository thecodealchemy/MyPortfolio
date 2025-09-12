import React from "react";
import ContactItem from "@/components/side-bar/contact-item";
import type { Contact } from "@/types/config";

import "@/styles/side-bar/contact-list.css";

interface ContactsListProps {
  contacts: Contact[];
}

function ContactsList({ contacts }: ContactsListProps) {
  return (
    <ul className="contacts-list">
      {contacts.map((contact, index) => (
        <ContactItem key={index} contact={contact} />
      ))}
    </ul>
  );
};

export default ContactsList;

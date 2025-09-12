import React from "react";
import IconBox from "@/components/icon-box";
import Link from "next/link";
import type { Contact } from "@/types/config";

import "@/styles/side-bar/contact-info.css";

interface ContactItemProps {
  contact: Contact;
}

function ContactItem({ contact }: ContactItemProps) {
  const { icon: Icon, title, content, link } = contact;
  const ContentElement = link ? (
    <Link
      href={link}
      className="block text-white-2 text-sm font-light truncate hover:text-orange-yellow-crayola
      transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </Link>
  ) : (
    <span className="block text-white-2 text-sm font-light truncate">
      {content}
    </span>
  );

  return (
    <li className="min-w-full flex items-center gap-4">
      <IconBox icon={Icon} />
      <div className="contact-info">
        <p className="text-light-gray-70 uppercase mb-1 text-xs">
          {title}
        </p>
        {ContentElement}
      </div>
    </li>
  );
}

export default ContactItem;

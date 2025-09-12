import React from 'react';
import ContactsList from './contact-list';
import SocialList from './social-list';
import Footer from './footer';

import type { Contact } from "@/types/config";
import type { SocialLink } from "@/types/config";

interface SideBarInfoMoreProps {
  contacts: Contact[];
  socialLinks: SocialLink[];
}

function SideBarInfoMore(
  { contacts, socialLinks }: SideBarInfoMoreProps) {
  return (
    <div className="sidebar-info-more">
      <div className="separator"></div>
      <ContactsList contacts={contacts} />
      <div className="separator-no-line"></div>
      <SocialList socialLinks={socialLinks} />
      <div className="separator-footer"></div>
      <Footer />
    </div>
  );
};

export default SideBarInfoMore;

"use client";

import React, { useState, useRef } from 'react';
import SideBarInfo from '@/components/side-bar/sidebar-info';
import SideBarInfoMore from '@/components/side-bar/sidebar-info-more';
import config from "@/config";

const { socialLinks, contacts } = config;

interface SideBarProps {
  avatar: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
}

function SideBar({
  avatar,
  firstName,
  lastName,
  middleName,
  preferredName
}: SideBarProps) {
  const [isActive, setIsActive] = useState(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  const handleSidebarToggle = () => {
    setIsActive(prevState => !prevState);
  };

  const sideBarState = `sidebar ${isActive ? 'active' : ''}`;

  return (
    <aside className={sideBarState} ref={sideBarRef} data-sidebar>
      <SideBarInfo
        onToggle={handleSidebarToggle}
        avatar={avatar}
        firstName={firstName}
        lastName={lastName}
        middleName={middleName}
        preferredName={preferredName}
      />
      <SideBarInfoMore contacts={contacts} socialLinks={socialLinks} />
    </aside>
  );
};

export default SideBar;

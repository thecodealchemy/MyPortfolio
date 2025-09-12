import type { About } from "@/types/about";
import type { Resume } from "@/types/resume";
import type { NavItem } from "@/types/nav-bar";
import { OpenGraph } from "./open-graph";
import type { GiscusProps } from "@giscus/react";
import type { IconType as ReactIconType } from "react-icons";
import type { Icon as OcticonsType } from "@primer/octicons-react";

export type VCardIconType = ReactIconType | OcticonsType;

export type SocialLink = {
  url: string;
  icon: VCardIconType;
  name: string;
}

export type Contact = {
  icon: VCardIconType;
  title: string;
  content?: string;
  link?: string;
}

export type Config = {
  avatar: string;
  title: string;
  description: string;
  author: string;
  keywords: string[];
  status: string;
  siteURL: string;
  openGraph: OpenGraph
  navItems: NavItem[];
  contacts: Contact[];
  socialLinks: SocialLink[];
  about: About;
  resume: Resume;
  giscusConfig: GiscusProps;
  googleAnalyticId: string;
  googleTagManagerId: string;
}

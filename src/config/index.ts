import { Config } from "@/types/config";
import { MdOutlineDevices, MdAttachment } from "react-icons/md";
import { IoSchoolOutline } from "react-icons/io5";
import { PiTrophy, PiBooks, PiMediumLogoBold } from "react-icons/pi";
import { GoalIcon } from "@primer/octicons-react";
import {
  LuGithub,
  LuPencil,
  LuLinkedin,
  LuRss,
  LuMail,
  LuMapPin,
} from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { FaReact, FaAws } from "react-icons/fa";
import { TbPhoneCalling } from "react-icons/tb";
import { IoCalendarOutline } from "react-icons/io5";
import { AiOutlinePython } from "react-icons/ai";
import { RiJavaLine, RiJavascriptLine } from "react-icons/ri";
import { SiLatex, SiFastapi, SiKubernetes, SiPostman } from "react-icons/si";
import { BiLogoFlask } from "react-icons/bi";
import { VscTerminalLinux, VscAzure } from "react-icons/vsc";
import { DiRedis } from "react-icons/di";
import {
  TbBrandCpp,
  TbBrandTypescript,
  TbBrandGolang,
  TbBrandNextjs,
  TbBrandDjango,
  TbBrandDocker,
  TbBrandMysql,
  TbMarkdown,
  TbBrandAstro,
  TbBrandTerraform,
  TbPhotoSquareRounded,
} from "react-icons/tb";

const config: Config = {
  avatar: "/images/profile.webp",
  title: "Aditya Kumar Singh - theCodeAlchemy | Software Engineer",
  description:
    "I'm Aditya Kumar Singh, a B-Tech graduate in Mechanical Engineering from IIT Hyderabad, passionate about software development.",
  author: "Aditya Kumar Singh - theCodeAlchemy",
  keywords: [
    "Aditya Kumar Singh",
    "theCodeAlchemy",
    "Software Engineering",
    "Next.js",
    "ReactJS",
  ],
  status: "⚡️sudo rm -rf /*",
  siteURL: "https://code-alchemy.netlify.app",
  openGraph: {
    url: "https://code-alchemy.netlify.app",
    type: "website",
    siteName: "Aditya Kumar Singh - theCodeAlchemy",
    title: "Aditya Kumar Singh - theCodeAlchemy | Software Engineer",
    description:
      "I'm Aditya Kumar Singh, a B-Tech graduate in Mechanical Engineering from IIT Hyderabad, passionate about software development.",
    images: [],
  },
  navItems: [
    { path: "/", label: "About" },
    { path: "/resume", label: "Resume" },
    { path: "/portfolio", label: "Portfolio" },
  ],
  contacts: [
    {
      icon: LuMapPin,
      title: "Location",
      content: "Gurugram, India 🇮🇳",
    },
    {
      icon: LuMail,
      title: "Email",
      link: "mailto:adityaks.tech@gmail.com",
      content: "adityaks.tech@gmail.com",
    },
  ],
  socialLinks: [
    {
      url: `https://github.com/thecodealchemy`,
      icon: LuGithub,
      name: "GitHub",
    },
    {
      url: `https://www.linkedin.com/in/thecodealchemy/`,
      icon: LuLinkedin,
      name: "LinkedIn",
    },
    {
      url: `https://twitter.com/alchemyxcode`,
      icon: FaXTwitter,
      name: "Twitter",
    },
    { url: `/ADITYA_KUMAR_SINGH.pdf`, icon: MdAttachment, name: "CV" },
  ],
  about: {
    firstName: "Aditya",
    lastName: "Kumar Singh",
    middleName: "",
    preferredName: "",
    additionalName: "Singh",
    pronouns: "He/Him",
    githubUsername: "thecodealchemy",
    introduction: `
I obtained my B-Tech degree from [IIT Hyderabad](https://www.iith.ac.in/), driven by a *sincere passion* for **Software Engineering 💻.**

Software is built by humans. Unfortunately, humans make errors, <mark class="text-orange-yellow-crayola bg-transparent"><b>LOTS of ERRORS.</b></mark> Throughout human history, humans have learned to craft machines and tools to help us construct complex architecture. Inspired by this, I explore practical methodologies and tools to improve large-scale software systems' quality, reliability, and efficiency.

In my spare time, I focus on contributing to open-source projects, alongside working out 💪🏻, capturing street photography 📸, and writing tech content ✍🏻.

**Self-motivated, Team player, Love coding 👨🏻‍💻**
    `,
    lifestyles: [
      {
        icon: LuGithub,
        title: "Open Source",
        text: "Actively contributing to open source projects on GitHub.",
      },
      {
        icon: LuPencil,
        title: "Storytelling",
        text: "Love to share my knowledge and experience with others.",
      },
      {
        icon: GoalIcon,
        title: "Workouts",
        text: "Badminton and weight training defines my active workout lifestyle.",
      },
      {
        icon: TbPhotoSquareRounded,
        title: "Photography",
        text: "Sky brings freedom; streets, a reminder of others' contributions.",
      },
    ],
    techStacks: {
      programmingLanguages: [
        { name: "Python", icon: AiOutlinePython },
        { name: "TypeScript", icon: TbBrandTypescript },
        { name: "Java", icon: RiJavaLine },
        { name: "JavaScript", icon: RiJavascriptLine },
        { name: "C++", icon: TbBrandCpp },
        { name: "SQL", icon: TbBrandMysql },
        { name: "Bash", icon: VscTerminalLinux },
      ],
      frameworks: [
        { name: "React", icon: FaReact },
        { name: "Node.js", icon: TbBrandNextjs },
        { name: "Express", icon: TbBrandDjango },
        { name: "Docker", icon: TbBrandDocker },
        { name: "Kubernetes", icon: SiKubernetes },
        { name: "AWS", icon: FaAws },
        { name: "Jenkins", icon: SiPostman },
        { name: "Linux", icon: VscTerminalLinux },
        { name: "Azure", icon: VscAzure },
      ],
    },
  },
  resume: {
    educations: {
      icon: IoSchoolOutline,
      title: "Education",
      items: [
        {
          company: "Indian Institute of Technology, Hyderabad",
          location: "Hyderabad, India",
          role: "B-Tech Mechanical Engineering",
          duration: "July 2018 – April 2022",
          tasksMarkdown: `
- B-Tech in Mechanical Engineering
- Activities: Technical clubs and student leadership (see Experience)
          `,
        },
      ],
    },
    awardLeaderships: {
      icon: PiTrophy,
      title: "Award & Leaderships",
      items: [],
    },
    teachingExperiences: {
      icon: PiBooks,
      title: "Teaching",
      items: [],
    },
    professionalExperiences: {
      icon: MdOutlineDevices,
      title: "Professional Experience",
      items: [
        {
          company: "Amazon",
          location: "Hyderabad, India",
          role: "Software Development Engineer",
          duration: "June 2022 – January 2025",
          tasksMarkdown: `
- **Frontend & Backend Development:** Resolved software bugs, developed complex UI features, and introduced two new APIs using Node.js and Java.
- **AWS:** Architected and optimized cloud infrastructure using EC2, SQS, S3, and Lambda; monitored systems using CloudWatch and alarms.
- **Automation Scripting:** Streamlined tasks with automation scripts, reducing deployment timelines from two weeks to four days.
- **Cross-Team Collaboration:** Coordinated inter-team efforts to deliver 6+ projects.
- **Data Loss Detection:** Engineered a monitoring system to alert critical data-loss points, reducing incidents by over 90%.
          `,
        },
        {
          company: "Tinkerer's Lab",
          location: "Hyderabad, India",
          role: "Technical In-charge",
          duration: "December 2019 – April 2022",
          tasksMarkdown: `
- Managed multiple tenants: projects, events, inventory, and stakeholder coordination.
- Streamlined event and project management through an online platform and managed lab social channels.
- Organized and led 15+ events annually (talks, outreach programs, tech sessions on Arduino, Raspberry Pi, and 3D printers).
          `,
        },
        {
          company: "Grid Edgewrks Pvt Ltd",
          location: "Hyderabad, India",
          role: "Intern",
          duration: "May 2021 – July 2021",
          tasksMarkdown: `
- **Automation:** Automated data calculation/manipulation tasks using Python scripts, saving 5+ hours/week.
- **App Development:** Implemented features and bug fixes for the app beta and collaborated on product expansion.
          `,
        },
      ],
    },
  },
  giscusConfig: {
    id: "comments",
    repo: "thecodealchemy/MyPortfolio",
    repoId: "920166687",
    category: "General",
    categoryId: "DIC_kwDOLBatd84CjpPs",
    mapping: "pathname",
    term: "Welcome to @giscus/react component!",
    reactionsEnabled: "1",
    emitMetadata: "1",
    inputPosition: "bottom",
    theme: "dark_tritanopia",
    lang: "en",
    loading: "lazy",
  },
  googleAnalyticId: process.env.NEXT_PUBLIC_GA_ID || "",
  googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID || "",
};

export default config;

export type WorkRole = {
  title: string;
  dates: string;
};

export type WorkExperienceItem = {
  company: string;
  companyUrl: string;
  location: string;
  logo?: string;
  roles: WorkRole[];
};

export type EducationItem = {
  institution?: string;
  institutionUrl?: string;
  degree: string;
  location: string;
  dates: string;
  status: string;
  logo?: string;
};

export type WhatIDoItem = {
  title: string;
  desc: string;
};

export const WORK_EXPERIENCE: WorkExperienceItem[] = [
  {
    company: "MAQ Software",
    companyUrl: "https://maqsoftware.com",
    location: "Noida, India",
    logo: "/images/maq-software.png",
    roles: [
      {
        title: "Software Engineer 1",
        dates: "July 2026 - Present",
      },
      {
        title: "Associate Software Engineer",
        dates: "Jan 2026 - June 2026",
      },
    ],
  },
  {
    company: "Factly Media & Research",
    companyUrl: "https://factlymedia.com",
    location: "Remote",
    logo: "/images/factlyIcon.png",
    roles: [
      {
        title: "Full-Stack Developer",
        dates: "Feb 2025 - Dec 2025",
      },
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "Nirma University",
    institutionUrl: "https://nirmauni.ac.in/",
    degree: "B.Tech in Computer Science & Engineering",
    location: "Ahmedabad, Gujarat",
    dates: "Sep 2022 - Sep 2026",
    status: "Completed",
    logo: "/images/Nirma_University_Logo.png",
  },
  {
    institution: "Gyanmanjari Vidhyapith",
    institutionUrl: "https://gyanmanjarividyapith.edu.in/",
    degree: "Higher Secondary",
    location: "Bhavnagar, Gujarat",
    dates: "2020 - 2022",
    status: "Completed",
    logo: "/images/gyanManjari.jpg",
  },
];

export const WHAT_I_DO: WhatIDoItem[] = [
  {
    title: "Full-Stack Development",
    desc: "Building scalable web applications with React, Next.js, TypeScript, and robust backend systems.",
  },
  {
    title: "AI & Multi-Agent Systems",
    desc: "Designing intelligent multi-agent systems using LangChain, LangGraph, and LangSmith for data exploration.",
  },
  {
    title: "System Architecture",
    desc: "Data engineering, efficient processing pipelines, real-time systems, and secure execution environments.",
  },
];

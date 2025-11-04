export type WorkExperienceItem = {
  title: string;
  company: string;
  companyUrl: string;
  location: string;
  dates: string;
  logo?: string;
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
    title: "Full-Stack Developer Intern",
    company: "Factly Media & Research",
    companyUrl: "https://factlymedia.com",
    location: "Remote",
    dates: "Feb 2025 - Present",
    logo: "https://factlymedia.com/factlyIcon.png",
  },
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "Nirma University",
    institutionUrl: "https://nirmauni.ac.in/",
    degree: "B.Tech in Computer Science & Engineering",
    location: "Ahmedabad, Gujarat",
    dates: "Sep 2022 - Present",
    status: "Current",
    logo: "https://upload.wikimedia.org/wikipedia/en/8/83/Nirma_University_Logo.png",
  },
  {
    institution: "Gyanmanjari Vidhyapith",
    institutionUrl: "https://gyanmanjarividyapith.edu.in/",
    degree: "Higher Secondary",
    location: "Bhavnagar, Gujarat",
    dates: "2020 - 2022",
    status: "Completed",
    logo: "https://yt3.googleusercontent.com/ytc/AIdro_nzbr0KcId58B5Pzdf3PEo8OKJ3lIpxZcLae6oqj3qBjg=s900-c-k-c0x00ffffff-no-rj",
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
    desc: "Engineering efficient data processing pipelines, real-time systems, and secure code execution environments.",
  },
];

import { siteConfig } from "./site";

const projects = [
  {
    title: "WhispherDocs",
    description:
      "A website that allows users to upload a PDF and interact with it via a chat interface, enabling questions and responses based on the content.",
    image: "../Mindhub.png",
    link: "https://whispherdocs.yuvrajsinh.dev",
    tag: [
      "Typescript",
      "Gen-ai",
      "Trpc",
      "Nextjs14",
      "Tailwind CSS",
      "Uploadthings",
      "Cohere",
    ],
    year: "2023",
    createdAt: "2023-12-02",
    githubLink: "https://github.com/yuvrajsinh5252/WhispherDocs",
  },
  {
    title: "Brilliant++",
    description:
      "An AI-powered educational platform that generates personalized quizzes for students and auto-generates subtitles for uploaded course materials.",
    image: "../Mindhub.png",
    link: "https://brilliant-plus-plus.vercel.app",
    tag: [
      "Nextjs14",
      "React",
      "Typescript",
      "Tailwind CSS",
      "Postgresql",
      "Gemini",
      "Prisma",
      "T3",
      "Trpc",
    ],
    year: "2024",
    createdAt: "2024-07-25",
    githubLink: "https://github.com/yuvrajsinh5252/brilliant-plus-plus",
  },
  {
    title: "Chess Game",
    description:
      "A comprehensive multiplayer chess platform. Includes real-time chat, matchmaking system, and ELO rating system for competitive play.",
    image: "../Mindhub.png",
    link: "https://chess.yuvrajsinh.dev",
    tag: [
      "Next.js",
      "TypeScript",
      "Pusher",
      "Zustand",
      "Stockfish",
      "ELO Rating",
      "Tailwind CSS",
    ],
    year: "2024",
    createdAt: "2024-08-12",
    githubLink: "https://github.com/yuvrajsinh5252/ChessGame",
  },
  {
    title: "RBT-visualizer",
    description:
      "Interactive Red-Black Tree visualizer built with rust. Users can insert, delete, nodes in the tree and includes step-by-step updation of nodes.",
    image: "../FlashLearn.png",
    tag: ["Rust", "Dioxus", "Red-Black Tree", "Tailwind CSS"],
    year: "2024",
    createdAt: "2024-10-19",
    githubLink: "https://github.com/yuvrajsinh5252/rbt-visualizer",
  },
  {
    title: "LeetCode CLI",
    description:
      "A sleek command-line tool for LeetCode - solve, test, and submit problems directly from your terminal.",
    image: "../Mindhub.png",
    tag: ["Python", "CLI", "Typer", "LeetCode"],
    year: "2025",
    createdAt: "2025-02-05",
    githubLink: "https://github.com/yuvrajsinh5252/leetcode-cli",
  },
  {
    title: "TODO App",
    description:
      "A GUI-based TODO application that allows users to manage tasks with user authentication and data storage.",
    image: "../Mindhub.png",
    tag: ["Java", "JavaFX", "MySQL", "JFoenix"],
    year: "2023",
    createdAt: "2023-10-27",
    githubLink: "https://github.com/yuvrajsinh5252/TODO-app",
  },
  {
    title: "Portfolio",
    description:
      "A portfolio website that showcases my projects, skills, and experiences.",
    image: "../website.png",
    link: `${siteConfig.url}/`,
    tag: ["Nextjs15", "Tailwind CSS"],
    year: "2024",
    createdAt: "2024-07-30",
    githubLink: "https://github.com/yuvrajsinh5252/website",
  },
  {
    title: "MyFlashcard",
    description:
      "A flashcard application, add custom data to each flashcard for personalized learning.",
    image: "../FlashLearn.png",
    link: "https://my-flashcard.vercel.app/",
    tag: ["React", "ElysiaJs", "Context API", "Postgresql"],
    year: "2024",
    createdAt: "2024-07-30",
    githubLink: "https://github.com/yuvrajsinh5252/FlashLearn",
  },
];

export const PROJECTS = [...projects].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

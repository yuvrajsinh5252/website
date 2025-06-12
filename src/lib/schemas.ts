// Structured data schemas for SEO

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yuvrajsinh Gohil",
  alternateName: ["Yuvrajsinh", "Yuvraj Gohil"],
  description:
    "Computer Science student and full-stack developer specializing in web technologies",
  url: "https://www.yuvrajsinh.me",
  image: "https://www.yuvrajsinh.me/logo.png",
  jobTitle: "Software Developer",
  worksFor: {
    "@type": "EducationalOrganization",
    name: "Nirma University",
    url: "https://nirmauni.ac.in/",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Nirma University",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressRegion: "Gujarat",
  },
  email: "yuvrajsinh476@gmail.com",
  sameAs: [
    "https://github.com/yuvrajsinh5252",
    "https://www.linkedin.com/in/yuvrajsinh099",
    "https://x.com/Yuvrajsinh_099",
    "https://discord.com/users/1035138685689139311",
    "https://www.youtube.com/@yuvrajsinh472/videos",
  ],
  knowsAbout: [
    "Web Development",
    "Full-Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "System Design",
    "Python",
    "C++",
    "Rust",
    "Go",
    "Java",
    "PostgreSQL",
    "MongoDB",
    "IoT Development",
    "Hardware Design",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Software Developer",
    description: "Full-stack developer specializing in modern web technologies",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Yuvrajsinh Gohil Portfolio",
  description:
    "Portfolio website of Yuvrajsinh Gohil showcasing projects, skills, and experience in software development",
  url: "https://www.yuvrajsinh.me",
  author: {
    "@type": "Person",
    name: "Yuvrajsinh Gohil",
  },
  publisher: {
    "@type": "Person",
    name: "Yuvrajsinh Gohil",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.yuvrajsinh.me/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const breadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const portfolioWorkSchema = (project: {
  title: string;
  description: string;
  url?: string;
  image?: string;
  dateCreated: string;
  programmingLanguage: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: project.title,
  description: project.description,
  url: project.url,
  image: project.image,
  dateCreated: project.dateCreated,
  creator: {
    "@type": "Person",
    name: "Yuvrajsinh Gohil",
  },
  programmingLanguage: project.programmingLanguage,
});

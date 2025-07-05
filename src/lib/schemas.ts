import { siteConfig } from "@/config/site";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  alternateName: ["Yuvrajsinh", siteConfig.name],
  description:
    "Computer Science student and software developer specializing in web technologies",
  url: siteConfig.url,
  image: `${siteConfig.url}/logo.png`,
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Nirma University",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressRegion: "Gujarat",
  },
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.twitter,
    "https://discord.com/users/1035138685689139311",
    "https://www.youtube.com/@yuvrajsinh472/videos",
  ],
  knowsAbout: siteConfig.keywords,
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${siteConfig.name} Portfolio`,
  description: siteConfig.description,
  url: siteConfig.url,
  author: {
    "@type": "Person",
    name: siteConfig.name,
  },
  publisher: {
    "@type": "Person",
    name: siteConfig.name,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/search?q={search_term_string}`,
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

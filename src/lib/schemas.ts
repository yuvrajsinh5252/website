import { siteConfig } from "@/config/site";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/logo.png`,
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.twitter,
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Nirma University",
  },
};

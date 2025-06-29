export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  readingTime: string;
  tags: string[];
  category: "personal" | "advent-of-code";
  coverImage?: string;
}

export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  category: "personal" | "advent-of-code";
  coverImage?: string;
}

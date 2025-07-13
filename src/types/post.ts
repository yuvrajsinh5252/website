export interface Post {
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

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  category: "personal" | "advent-of-code";
  coverImage?: string;
}

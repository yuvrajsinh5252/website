export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  readingTime: string;
  tags: string[];
  coverImage?: string;
}

export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  coverImage?: string;
}

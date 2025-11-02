export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
}

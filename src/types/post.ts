import type { MDXContent } from "mdx/types";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  coverImage?: string;
}

export interface Post extends PostMeta {
  Component: MDXContent;
}

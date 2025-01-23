import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost, BlogMeta } from "@/types/blog";
import readingTime from "reading-time";

const POSTS_PATH = path.join(process.cwd(), "src/content/blog");

export const getBlogPosts = (): BlogMeta[] => {
  const files = fs.readdirSync(POSTS_PATH);
  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(POSTS_PATH, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);
      const stats = readingTime(content);

      return {
        slug: file.replace(".mdx", ""),
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags || [],
        readingTime: stats.text,
        coverImage: data.coverImage,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
};

export const getBlogPost = (slug: string): BlogPost | null => {
  try {
    const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return {
      slug,
      content,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      readingTime: stats.text,
      coverImage: data.coverImage,
    };
  } catch {
    return null;
  }
};

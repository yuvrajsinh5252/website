import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, PostMeta } from "@/types/post";

const contentDirectory = path.join(process.cwd(), "src/content");

export function getPosts(): PostMeta[] {
  const postsDirectory = path.join(contentDirectory, "posts");

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(postsDirectory);
  const posts: PostMeta[] = [];

  for (const file of files) {
    if (file.endsWith(".mdx")) {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(contentDirectory, "posts", `${slug}.mdx`);

      if (!fs.existsSync(filePath)) {
        continue;
      }

      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      try {
        posts.push({
          slug,
          title: data.title,
          description: data.description,
          date: data.date,
          readingTime: data.readingTime,
          tags: data.tags,
        });
      } catch (error) {
        console.error(`Error reading post for ${slug}:`, error);
        continue;
      }
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPost(slug: string): Post | null {
  try {
    const filePath = path.join(contentDirectory, "posts", `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      content,
    };
  } catch (error) {
    console.error(`Error reading post for ${slug}:`, error);
    return null;
  }
}

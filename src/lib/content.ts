import type { MDXContent } from "mdx/types";
import type { Post, PostMeta } from "@/types/post";

interface MdxModule {
  default: MDXContent;
  frontmatter?: Record<string, unknown>;
  /** Injected at build time by plugins/remark-reading-time.ts */
  readingTime?: string;
}

const modules = import.meta.glob<MdxModule>("../content/posts/*.mdx", {
  eager: true,
});

function toStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

/** Returns null when frontmatter is missing the fields every post needs. */
function parsePost(path: string, module: MdxModule): Post | null {
  const slug = path.split("/").pop()!.replace(/\.mdx$/, "");
  const data = module.frontmatter ?? {};

  if (typeof data.title !== "string" || typeof data.description !== "string") {
    console.warn(`[content] Skipping "${slug}": missing title or description.`);
    return null;
  }

  const parsedDate = new Date(String(data.date));

  if (Number.isNaN(parsedDate.getTime())) {
    console.warn(`[content] Skipping "${slug}": invalid or missing date.`);
    return null;
  }

  return {
    slug,
    title: data.title,
    description: data.description,
    date: parsedDate.toISOString().slice(0, 10),
    tags: toStringArray(data.tags),
    readingTime:
      typeof data.readingTime === "string"
        ? data.readingTime
        : (module.readingTime ?? ""),
    coverImage:
      typeof data.coverImage === "string" ? data.coverImage : undefined,
    Component: module.default,
  };
}

const posts: Post[] = Object.entries(modules)
  .map(([path, module]) => parsePost(path, module))
  .filter((post): post is Post => post !== null)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPosts(): PostMeta[] {
  return posts.map(({ Component: _Component, ...meta }) => meta);
}

export function getPost(slug: string): Post | null {
  return posts.find((post) => post.slug === slug) ?? null;
}

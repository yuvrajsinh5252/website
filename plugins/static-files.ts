import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { Plugin } from "vite";
import { SITE_META } from "../src/config/site-meta.ts";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: Date;
  tags: string[];
}

function escapeXml(value: string): string {
  return String(value).replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      default:
        return "&quot;";
    }
  });
}

function readFrontmatter(raw: string): Record<string, string | string[]> | null {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const data: Record<string, string | string[]> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^(\w+):\s*(.*)$/);
    if (!field) continue;

    const [, key, rawValue] = field;
    const value = rawValue.trim();

    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      data[key] = value.replace(/^["']|["']$/g, "");
    }
  }
  return data;
}

async function loadPosts(dir: string): Promise<Post[]> {
  let files: string[] = [];
  try {
    files = await readdir(dir);
  } catch {
    return [];
  }

  const posts: Post[] = [];
  for (const file of files.filter((name) => name.endsWith(".mdx"))) {
    const data = readFrontmatter(await readFile(path.join(dir, file), "utf8"));
    if (!data) continue;

    const { title, description, date, tags } = data;
    if (typeof title !== "string" || typeof description !== "string") continue;

    const parsed = new Date(String(date));
    if (Number.isNaN(parsed.getTime())) continue;

    posts.push({
      slug: file.replace(/\.mdx$/, ""),
      title,
      description,
      date: parsed,
      tags: Array.isArray(tags) ? tags : [],
    });
  }

  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

function buildSitemap(posts: Post[], siteUrl: string): string {
  const staticPages = [
    { path: "", changefreq: "weekly", priority: "1.0" },
    { path: "/projects", changefreq: "weekly", priority: "0.8" },
    { path: "/posts", changefreq: "weekly", priority: "0.8" },
  ];

  const urls = [
    ...staticPages.map(
      ({ path: p, changefreq, priority }) => `  <url>
    <loc>${siteUrl}${p}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    ),
    ...posts.map(
      (post) => `  <url>
    <loc>${siteUrl}/posts/${post.slug}</loc>
    <lastmod>${post.date.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    ),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

function buildFeed(posts: Post[], siteUrl: string): string {
  const items = posts
    .map((post) => {
      const url = `${siteUrl}/posts/${post.slug}`;
      const categories = post.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${post.date.toUTCString()}</pubDate>
${categories}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_META.title)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(SITE_META.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

export function staticFiles(): Plugin {
  let root = process.cwd();
  let siteUrl = SITE_META.defaultUrl;

  return {
    name: "site:static-files",
    apply: "build",

    configResolved(config) {
      root = config.root;
      siteUrl = (config.env.VITE_SITE_URL ?? SITE_META.defaultUrl).replace(
        /\/$/,
        ""
      );
    },

    async generateBundle() {
      if (this.environment?.name === "ssr") return;

      const posts = await loadPosts(path.resolve(root, "src/content/posts"));

      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: buildSitemap(posts, siteUrl),
      });
      this.emitFile({
        type: "asset",
        fileName: "feed.xml",
        source: buildFeed(posts, siteUrl),
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });

      this.info(
        `wrote sitemap.xml, feed.xml, robots.txt (${posts.length} post${
          posts.length === 1 ? "" : "s"
        })`
      );
    },
  };
}

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeHighlight from "rehype-highlight";
import { fileURLToPath, URL } from "node:url";
import { staticFiles } from "./plugins/static-files.ts";
import { remarkReadingTime } from "./plugins/remark-reading-time.ts";

export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [
          remarkFrontmatter,
          remarkReadingTime,
          [remarkMdxFrontmatter, { name: "frontmatter" }],
        ],
        rehypePlugins: [rehypeHighlight],
      }),
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    tailwindcss(),
    staticFiles(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    postcss: { plugins: [] },
  },
  build: {
    outDir: "dist",
  },
  ssr: {
    noExternal: ["react-icons"],
  },
});

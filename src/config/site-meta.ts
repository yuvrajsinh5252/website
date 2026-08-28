/**
 * Site metadata with no runtime dependencies, so it can be imported from both
 * browser code and the Vite build (which has no `import.meta.env`).
 */
export const SITE_META = {
  name: "Yuvrajsinh Gohil",
  title: "Yuvrajsinh Gohil - Software Developer",
  description:
    "Software Developer passionate about emerging technologies and building innovative solutions. Explore my projects and blog posts.",
  defaultUrl: "https://www.yuvrajsinh.dev",
} as const;

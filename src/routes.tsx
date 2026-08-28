import type { RouteRecord } from "vite-react-ssg";
import { Layout } from "./layout";
import { HomePage } from "./pages/home";
import { ProjectsPage } from "./pages/projects";
import { PostsPage } from "./pages/posts";
import { PostPage } from "./pages/post";
import { NotFoundPage } from "./pages/not-found";
import { getPosts } from "@/lib/content";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "posts", element: <PostsPage /> },
      {
        path: "posts/:slug",
        element: <PostPage />,
        getStaticPaths: () => getPosts().map((post) => `/posts/${post.slug}`),
      },
      { path: "404", element: <NotFoundPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "highlight.js/styles/github-dark.css";
import "./styles/globals.css";
import "./styles/stars.css";

export const createRoot = ViteReactSSG({ routes });

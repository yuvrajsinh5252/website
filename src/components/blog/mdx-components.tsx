"use client";

import { type MDXComponents as MDXComponentsType } from "mdx/types";
import MagicLink from "../effects/magiclink";

export function MDXComponents(): MDXComponentsType {
  return {
    a: ({ children, href }) => <MagicLink href={href}>{children}</MagicLink>,
  };
}

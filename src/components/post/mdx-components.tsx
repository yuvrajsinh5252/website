import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { MagicLink } from "@/components/effects/magiclink";
import { Pre } from "@/components/post/code-block";

export const mdxComponents: MDXComponents = {
  a: ({ href, children }: ComponentPropsWithoutRef<"a">) => (
    <MagicLink
      className="no-underline"
      href={href ?? "#"}
      external={!!href && !href.startsWith("/")}
    >
      {children}
    </MagicLink>
  ),
  img: ({ src, alt, ...props }: ComponentPropsWithoutRef<"img">) => (
    <img
      {...props}
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      loading="lazy"
      decoding="async"
      className="rounded-xl shadow-lg my-4 border border-white/10 h-auto w-full"
    />
  ),
  pre: Pre,
};

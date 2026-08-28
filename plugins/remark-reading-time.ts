import type { Root, Yaml } from "mdast";
const WORDS_PER_MINUTE = 200;

function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

type AnyNode = { type: string; value?: string; children?: AnyNode[] };

function countTreeWords(nodes: Root["children"]): number {
  let words = 0;
  const stack: AnyNode[] = [...nodes];

  while (stack.length > 0) {
    const node = stack.pop()!;

    if (
      node.type === "text" ||
      node.type === "inlineCode" ||
      node.type === "code"
    ) {
      words += countWords(node.value ?? "");
    }

    if (node.children) stack.push(...node.children);
  }

  return words;
}

export function remarkReadingTime() {
  return (tree: Root) => {
    const frontmatter = tree.children.find(
      (child): child is Yaml => child.type === "yaml"
    );

    if (frontmatter && /^readingTime:/m.test(frontmatter.value)) return;

    const minutes = Math.max(
      1,
      Math.ceil(countTreeWords(tree.children) / WORDS_PER_MINUTE)
    );
    const line = `readingTime: "${minutes} min read"`;

    if (frontmatter) {
      frontmatter.value = `${frontmatter.value.trimEnd()}\n${line}`;
    }
  };
}

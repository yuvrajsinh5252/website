"use client";

import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js/lib/core";
import cpp from "highlight.js/lib/languages/cpp";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/github-dark.css";
import { FiCopy, FiCheck } from "react-icons/fi";

hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("c++", cpp);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("python", python);

interface CodeBlockProps {
  children: string;
  className?: string;
}

export function CodeBlock({ children, className = "" }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [children]);

  const language = className.replace("language-", "") || "plaintext";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative group my-6">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-600">
        <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">
          {language === "plaintext" ? "code" : language}
        </span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-gray-200 transition-colors rounded hover:bg-gray-700"
          title="Copy code"
        >
          {copied ? (
            <>
              <FiCheck size={12} />
              Copied
            </>
          ) : (
            <>
              <FiCopy size={12} />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="relative">
        <pre className="overflow-x-auto bg-[#0d1117] rounded-b-lg border border-t-0 border-gray-700 p-0 m-0">
          <div className="py-4 px-4">
            <code
              ref={codeRef}
              className={`language-${language} text-sm leading-6 block`}
              style={{ background: "transparent" }}
            >
              {children}
            </code>
          </div>
        </pre>
      </div>
    </div>
  );
}

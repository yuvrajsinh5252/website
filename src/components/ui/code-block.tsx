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
    <div className="relative group my-4 sm:my-6">
      <div className="mb-1 sm:mb-1.5 text-right">
        <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-400">
          {language === "plaintext" ? "code" : language}
        </span>
      </div>

      <div className="relative">
        <pre className="overflow-x-auto m-0 bg-transparent">
          <div className="py-3 sm:py-4 px-3 sm:px-4">
            <code
              ref={codeRef}
              className={`language-${language} text-xs sm:text-sm leading-6 sm:leading-7 block`}
              style={{ background: "transparent" }}
            >
              {children}
            </code>
          </div>
        </pre>

        <button
          onClick={copyToClipboard}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-gray-400 hover:text-white rounded transition-colors duration-200 bg-transparent"
          title="Copy code"
        >
          {copied ? (
            <>
              <FiCheck size={14} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <FiCopy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

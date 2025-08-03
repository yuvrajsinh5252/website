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
    <div className="relative group my-6 rounded-xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center justify-between bg-gray-800/50 px-4 py-2 border-b border-gray-700/50">
        <span className="px-3 py-1 text-sm font-medium text-blue-300 bg-blue-500/10 border border-blue-500/30 rounded-md">
          {language === "plaintext" ? "code" : language}
        </span>
      </div>

      <div className="relative">
        <pre className="overflow-x-auto bg-[#0d1117]/50 m-0">
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

        <button
          onClick={copyToClipboard}
          className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-gray-200 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600/50 hover:border-gray-500/50 rounded-md transition-all duration-200 backdrop-blur-sm"
          title="Copy code"
        >
          {copied ? (
            <>
              <FiCheck size={14} />
              <span>Copied!</span>
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

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
    <div className="relative group my-4 sm:my-6 overflow-hidden">
      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-cyan-400 uppercase tracking-wide">
          {language === "plaintext" ? "code" : language}
        </span>
      </div>

      <div className="relative">
        <pre className="overflow-x-auto bg-slate-900/30 backdrop-blur-sm m-0">
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
          className="absolute top-2 sm:top-3 right-2 sm:right-3 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-gray-400 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded transition-all duration-200 backdrop-blur-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
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

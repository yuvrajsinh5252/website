"use client";

import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js/lib/core";
import cpp from "highlight.js/lib/languages/cpp";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import go from "highlight.js/lib/languages/go";
import rust from "highlight.js/lib/languages/rust";
// @ts-ignore
import "highlight.js/styles/github-dark.css";
import { FiCopy, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("c++", cpp);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("go", go);
hljs.registerLanguage("rust", rust);

interface CodeTab {
  language: string;
  code: string;
}

interface TabbedCodeBlockProps {
  tabs: CodeTab[];
}

export function TabbedCodeBlock({ tabs }: TabbedCodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [activeTab]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(tabs[activeTab].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative group my-6 sm:my-8 not-prose">
      <div className="relative rounded-lg overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
        {/* Tab Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`
              px-3 py-1 text-xs font-medium transition-colors rounded-md
              ${
                activeTab === index
                  ? "text-white bg-white/10"
                  : "text-gray-400 hover:text-gray-300 hover:bg-white/5"
              }
            `}
              >
                {tab.language}
              </button>
            ))}
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-gray-400 hover:text-white transition-colors"
            title="Copy code"
          >
            {copied ? (
              <>
                <FiCheck size={14} className="text-green-400" />
                <span className="text-green-400">Copied</span>
              </>
            ) : (
              <>
                <FiCopy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="relative"
          >
            <pre className="overflow-x-auto m-0 !bg-transparent">
              <div className="py-5 px-5">
                <code
                  ref={codeRef}
                  className={`language-${tabs[activeTab].language} text-base font-medium leading-relaxed block font-mono !bg-transparent`}
                >
                  {tabs[activeTab].code}
                </code>
              </div>
            </pre>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Pre({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <div className="relative rounded-lg overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl my-6 not-prose">
      <pre {...props} className="!bg-transparent !m-0 !p-4 overflow-x-auto">
        {children}
      </pre>
    </div>
  );
}

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
    <div className="relative group my-4 sm:my-6">
      {/* Tab Header */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`
              px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium transition-colors uppercase tracking-wide
              ${
                activeTab === index
                  ? "text-gray-200"
                  : "text-gray-400 hover:text-gray-300"
              }
            `}
          >
            <span className="relative z-10">{tab.language}</span>
          </button>
        ))}
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
          <pre className="overflow-x-auto m-0 bg-transparent">
            <div className="py-3 sm:py-4 px-3 sm:px-4">
              <code
                ref={codeRef}
                className={`language-${tabs[activeTab].language} text-xs sm:text-sm leading-6 sm:leading-7 block`}
                style={{ background: "transparent" }}
              >
                {tabs[activeTab].code}
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

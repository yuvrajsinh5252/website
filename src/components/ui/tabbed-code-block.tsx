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
    <div className="relative group my-6 rounded-xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
      {/* Tab Header */}
      <div className="flex items-center justify-between bg-gray-800/50 px-4 py-2 border-b border-gray-700/50">
        <div className="flex items-center gap-2">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`
                relative px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200
                ${
                  activeTab === index
                    ? "text-blue-300 bg-blue-500/10 border border-blue-500/30"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 border border-transparent"
                }
              `}
            >
              {activeTab === index && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-500/10 rounded-md"
                  initial={false}
                  transition={{ type: "spring", bounce: 0, duration: 0.2 }}
                />
              )}
              <span className="relative z-10">
                {tab.language.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
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
          <pre className="overflow-x-auto bg-[#0d1117]/50 m-0">
            <div className="py-4 px-4">
              <code
                ref={codeRef}
                className={`language-${tabs[activeTab].language} text-sm leading-6 block`}
                style={{ background: "transparent" }}
              >
                {tabs[activeTab].code}
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

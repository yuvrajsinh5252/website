import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaCode, FaHome, FaUser, FaLaptopCode } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { TfiWrite } from "react-icons/tfi";

interface NavLinkProps {
  href: string;
  text: string;
}

export default function NavLink({ href, text }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.split("/")[1] === href.split("/")[1];

  const getIcon = (text: string) => {
    switch (text) {
      case "home":
        return <FaHome className="text-sm sm:text-base md:text-lg" />;
      case "projects":
        return <FaLaptopCode className="text-sm sm:text-base md:text-lg" />;
      case "about":
        return <FaUser className="text-sm sm:text-base md:text-lg" />;
      case "posts":
        return <TfiWrite className="text-sm sm:text-base md:text-lg" />;
      case "challenges":
        return <FaCode className="text-sm sm:text-base md:text-lg" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative capitalize group">
      {isActive && (
        <motion.div
          layoutId="nav-background"
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-blue-400/25 to-blue-500/20 rounded-full"
          initial={false}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        />
      )}

      <Link
        href={href}
        className={`relative rounded-full flex items-center gap-2 px-3 py-2 border
          transition-colors duration-150 ${
            isActive
              ? "text-blue-200 font-medium bg-white/5 border-white/10"
              : "text-gray-300 border-transparent hover:text-blue-200 hover:bg-blue-400/10 hover:border-blue-400/20"
          } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/30`}
        aria-label={`Navigate to ${text} page`}
      >
        <div
          className={`transition-all duration-200 ${
            isActive ? "text-blue-200" : "group-hover:text-blue-300"
          }`}
        >
          {getIcon(text)}
        </div>

        <AnimatePresence>
          {isActive && (
            <motion.span
              className="block pr-1 sm:pr-2 whitespace-nowrap text-xs sm:text-sm md:text-base"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {text}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </div>
  );
}

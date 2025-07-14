import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaCode, FaHome, FaUser, FaLaptopCode } from "react-icons/fa";
import { motion } from "framer-motion";
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
          className="absolute inset-0 bg-gradient-to-r from-blue-500/25 via-blue-400/30 to-blue-500/25 rounded-full shadow-lg shadow-blue-500/20"
          initial={false}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 200,
            damping: 25,
          }}
        />
      )}

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
        }}
      />

      <Link
        href={href}
        className={`relative rounded-full flex items-center gap-2 expand-cursor px-3 py-2
          transition-all duration-300 ${
            isActive
              ? "text-blue-200 font-medium drop-shadow-sm"
              : "text-gray-300 hover:text-blue-300 hover:drop-shadow-sm"
          }`}
      >
        <motion.div
          whileHover={{
            rotate: [0, -5, 5, -3, 0],
            scale: [1, 1.08, 1],
            transition: { duration: 0.7, ease: "easeInOut" },
          }}
          whileTap={{
            scale: 0.9,
            transition: { type: "spring", stiffness: 300, damping: 30 },
          }}
          className={`transition-all duration-300 ${
            isActive
              ? "text-blue-200 drop-shadow-lg"
              : "group-hover:text-blue-300"
          }`}
        >
          {getIcon(text)}
        </motion.div>

        <motion.div
          className="overflow-hidden"
          style={{ width: isActive ? "auto" : 0 }}
          initial={false}
          animate={{
            width: isActive ? "auto" : 0,
            transition: {
              duration: 0.5,
              ease: "easeInOut",
              type: "spring",
              stiffness: 200,
              damping: 25,
            },
          }}
        >
          <motion.span
            className="block pr-1 sm:pr-2 whitespace-nowrap text-xs sm:text-sm md:text-base"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: isActive ? 1 : 0,
              x: isActive ? 0 : -10,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: isActive ? 0.15 : 0,
            }}
          >
            {text}
          </motion.span>
        </motion.div>
      </Link>
    </div>
  );
}

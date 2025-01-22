import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaCode, FaHome, FaUser } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { motion } from "framer-motion";

interface NavLinkProps {
  href: string;
  text: string;
}

export default function NavLink({ href, text }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const getIcon = (text: string) => {
    switch (text) {
      case "home":
        return <FaHome className="text-lg" />;
      case "projects":
        return <FaCode className="text-lg" />;
      case "about":
        return <FaUser className="text-lg" />;
      case "blog":
        return <GiNotebook className="text-lg" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative capitalize ${
        isActive ? "font-medium" : "opacity-70 hover:opacity-100"
      }`}
    >
      <Link
        href={href}
        className={`rounded-full flex items-center gap-2
          hover:text-blue-500 dark:hover:text-blue-400 ${
            !isActive ? "py-1" : ""
          }`}
      >
        <motion.div
          className="px-1"
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {getIcon(text)}
        </motion.div>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: -10, width: 0 }}
            animate={{
              opacity: 1,
              x: 0,
              width: "auto",
              transition: {
                duration: 0.3,
                ease: [0.23, 1, 0.32, 1],
              },
            }}
            exit={{
              opacity: 0,
              x: 10,
              width: 0,
              transition: {
                duration: 0.2,
                ease: [0.23, 1, 0.32, 1],
              },
            }}
            className="font-medium pr-2 overflow-hidden whitespace-nowrap"
          >
            {text}
          </motion.div>
        )}
      </Link>
    </div>
  );
}

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBlog, FaCode, FaHome, FaUser } from "react-icons/fa";
import { MdNoteAlt } from "react-icons/md";
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
        return <FaHome className="text-blue-400 dark:text-blue-300" />;
      case "projects":
        return <FaCode className="text-blue-400 dark:text-blue-300" />;
      case "about":
        return <FaUser className="text-blue-400 dark:text-blue-300" />;
      case "blog":
        return (
          <GiNotebook size={18} className="text-blue-400 dark:text-blue-300" />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative capitalize hover:opacity-80 transition-opacity ${
        isActive ? "font-medium" : ""
      } `}
    >
      <Link href={href} className="rounded-full flex items-center gap-2">
        {getIcon(text)}
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {text}
          </motion.div>
        )}
      </Link>
    </div>
  );
}

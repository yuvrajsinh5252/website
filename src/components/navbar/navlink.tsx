import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { FaBlog, FaCode, FaHome, FaUser } from "react-icons/fa";

interface NavLinkProps {
  href: string;
  text: string;
  setActiveNav?: (s: string) => void;
  activeNav?: string;
}

export default function NavLink({
  href,
  text,
  activeNav,
  setActiveNav,
}: NavLinkProps) {
  const isActive = activeNav === href;

  const getIcon = (text: string) => {
    switch (text) {
      case "home":
        return <FaHome />;
      case "projects":
        return <FaCode />;
      case "about":
        return <FaUser />;
      case "blog":
        return <FaBlog />;
      default:
        return null;
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link href={href} onClick={() => setActiveNav?.(href)}>
        <div className="rounded-full flex items-center gap-2">
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
        </div>
      </Link>
    </motion.div>
  );
}

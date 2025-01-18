import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBlog, FaCode, FaHome, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

interface NavLinkProps {
  href: string;
  text: string;
  className?: string;
  activeClassName?: string;
}

export default function NavLink({
  href,
  text,
  className = "",
  activeClassName = "",
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

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
    <Link
      href={href}
      className={`${className} ${
        isActive ? activeClassName : ""
      } hover:opacity-80 transition-opacity`}
    >
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
  );
}

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBlog, FaCode, FaHome, FaUser } from "react-icons/fa";
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

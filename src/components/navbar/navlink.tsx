import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaCode, FaHome, FaUser } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { motion } from "motion/react";

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
    <div className="relative capitalize group">
      {isActive && (
        <motion.div
          layoutId="nav-background"
          className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100/80
            dark:from-blue-500/20 dark:to-blue-300/20 rounded-full"
          initial={false}
          transition={{ duration: 0.3 }}
        />
      )}
      <Link
        href={href}
        className={`relative rounded-full flex items-center gap-2 px-3 py-2
          hover:text-blue-600 transition-all duration-300 ${
            isActive
              ? "text-blue-600 dark:text-blue-300 font-medium"
              : "text-gray-600 dark:text-gray-300 hover:opacity-100"
          }`}
      >
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {getIcon(text)}
        </motion.div>
        <motion.div
          className="overflow-hidden"
          style={{ width: isActive ? "auto" : 0 }}
          initial={false}
          animate={{
            width: isActive ? "auto" : 0,
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
        >
          <motion.span
            className="block pr-2 whitespace-nowrap"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: isActive ? 1 : 0,
              x: isActive ? 0 : -10,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {text}
          </motion.span>
        </motion.div>
      </Link>
    </div>
  );
}

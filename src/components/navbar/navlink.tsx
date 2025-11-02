import Link from "next/link";
import { usePathname } from "next/navigation";
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
        return <FaHome className="text-lg" />;
      case "projects":
        return <FaLaptopCode className="text-lg" />;
      case "about":
        return <FaUser className="text-lg" />;
      case "posts":
        return <TfiWrite className="text-lg" />;
      case "challenges":
        return <FaCode className="text-lg" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative capitalize group">
      <Link
        href={href}
        className={`relative rounded-full flex items-center justify-center gap-2 px-3 py-2 border
          transition-colors duration-150 ${
            isActive
              ? "text-blue-100 font-medium bg-white/5 border-white/10"
              : "text-gray-300 border-transparent hover:text-blue-100 hover:bg-blue-400/10 hover:border-blue-400/20"
          } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/30`}
        aria-label={`Navigate to ${text} page`}
      >
        {isActive && (
          <motion.div
            layoutId="nav-background"
            className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-blue-300/25 to-blue-500/20 rounded-full"
            initial={false}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              layout: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }}
          />
        )}
        <div
          className={`relative z-10 transition-all duration-200 ${
            isActive ? "text-blue-100" : "group-hover:text-blue-300"
          }`}
        >
          {getIcon(text)}
        </div>

        <motion.span
          className="relative z-10 block whitespace-nowrap text-base pr-2"
          initial={false}
          animate={{
            width: isActive ? "auto" : 0,
            opacity: isActive ? 1 : 0,
            marginLeft: isActive ? 0 : -8,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          {text}
        </motion.span>
      </Link>
    </div>
  );
}

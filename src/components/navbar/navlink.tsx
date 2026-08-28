import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaLaptopCode } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";

interface NavLinkProps {
  href: string;
  text: string;
}

export default function NavLink({ href, text }: NavLinkProps) {
  const { pathname } = useLocation();
  const isActive = pathname.split("/")[1] === href.split("/")[1];

  const getIcon = (text: string) => {
    switch (text) {
      case "home":
        return <FaHome className="text-base md:text-lg block m-0" />;
      case "projects":
        return <FaLaptopCode className="text-base md:text-lg block m-0" />;
      case "about":
        return <FaUser className="text-base md:text-lg block m-0" />;
      case "posts":
        return <TfiWrite className="text-base md:text-lg block m-0" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative capitalize group">
      <Link
        to={href}
        className={`relative rounded-full flex items-center px-2.5 md:px-3 py-2 border
          transition-colors duration-150 ${
            isActive
              ? "text-blue-100 font-medium bg-white/5 border-white/10 justify-start gap-1.5 md:gap-2"
              : "text-gray-300 border-transparent hover:text-blue-100 hover:bg-blue-400/10 hover:border-blue-400/20 justify-center"
          } focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-400/30`}
        aria-label={`Navigate to ${text} page`}
      >
        {isActive && (
          <div className="absolute inset-0 bg-linear-to-r from-blue-100/20 via-blue-300/25 to-blue-500/20 rounded-full" />
        )}
        <div
          className={`relative z-10 flex items-center justify-center leading-none transition-all duration-200 shrink-0 ${
            isActive ? "text-blue-100" : "group-hover:text-blue-300"
          }`}
        >
          {getIcon(text)}
        </div>

        {/* Grid columns animate to intrinsic width, which plain `width` cannot. */}
        <span
          className={`relative z-10 grid transition-[grid-template-columns,opacity] duration-300 ease-in-out ${
            isActive ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0"
          }`}
        >
          <span className="overflow-hidden whitespace-nowrap text-sm md:text-base leading-none">
            {text}
          </span>
        </span>
      </Link>
    </div>
  );
}

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
  href: string;
  text: string;
  icon?: React.ReactNode;
  setActiveNav?: (s: string) => void;
}

export default function NavLink(props: NavLinkProps) {
  const path = usePathname();

  return (
    <Link
      onMouseOver={() =>
        props.setActiveNav ? props.setActiveNav(props.href) : null
      }
      onMouseLeave={() =>
        props.setActiveNav ? props.setActiveNav(path) : null
      }
      className="navlink z-30"
      href={props.href}
    >
      <span className={`rounded-full px-5 py-2 bg-transparent}`}>
        {props.icon !== null ? props.icon : <></>}
        {props.text}
      </span>
    </Link>
  );
}

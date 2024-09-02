import Link from "next/link";
import React from "react";

interface NavLinkProps {
  href: string;
  text: string;
  icon?: React.ReactNode;
}

export default function NavLink(props: NavLinkProps) {
  return (
    <Link className="navlink" href={props.href}>
      <span className={`rounded-full px-5 py-2 bg-transparent}`}>
        {props.icon !== null ? props.icon : <></>}
        {props.text}
      </span>
    </Link>
  );
}
import Link from "next/link";
import React from "react";
import { FaBlog, FaCode, FaHome, FaUser } from "react-icons/fa";

interface NavLinkProps {
  href: string;
  text: string;
  setActiveNav?: (s: string) => void;
  activeNav?: string;
}

export default function NavLink(props: NavLinkProps) {
  return (
    <Link
      className={"navlink z-30 " + (props.activeNav == props.href ? "m-4 mr-5" : "")}
      onClick={() => {
        props.setActiveNav ? props.setActiveNav(props.href) : null;
      }}
      href={props.href}
    >
      <span className={`rounded-full flex items-center justify-center gap-2 py-2 bg-transparent`}>
        <span>
          {props.text == "home" ? <FaHome /> : <></>}
          {props.text == "projects" ? <FaCode /> : <></>}
          {props.text == "about" ? <FaUser /> : <></>}
          {props.text == "blog" ? <FaBlog /> : <></>}
        </span>
        <span>
          {props.activeNav == props.href ? props.text : <></>}
        </span>
      </span>
    </Link>
  );
}

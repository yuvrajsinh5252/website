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

export default function NavLink(props: NavLinkProps) {
  return (
    <Link
      className={"navlink z-30 " + (props.activeNav == props.href ? "m-4" : "")}
      onClick={() => {
        props.setActiveNav ? props.setActiveNav(props.href) : null;
      }}
      href={props.href}
    >
      <span
        className={`rounded-full flex items-center justify-between gap-2 py-2 bg-transparent`}
      >
        <span>
          {props.text == "home" ? <FaHome /> : <></>}
          {props.text == "projects" ? <FaCode /> : <></>}
          {props.text == "about" ? <FaUser /> : <></>}
          {props.text == "blog" ? <FaBlog /> : <></>}
        </span>
        <span>
          <span>
            {props.activeNav == props.href ? (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {props.text.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            ) : (
              <></>
            )}
          </span>
        </span>
      </span>
    </Link>
  );
}

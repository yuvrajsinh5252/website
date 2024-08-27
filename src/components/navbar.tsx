import Link from "next/link";
import ThemeChange from "./theme/ThemeChange";

export default function Navbar() {
  return (
    <div className="flex justify-around items-center p-2 fixed w-full mt-5">
      <ThemeChange />
      <nav
        className="flex gap-5 justify-center items-center bg-tranparent backdrop-filter backdrop-blur-[5px] border-2 p-2 rounded-full"
      >
        <Link href="/" className="pl-3">About</Link>
        <Link href="/about" >Projects</Link>
        <Link href="/contact" className="pr-3">Skills</Link>
      </nav>
    </div>
  )
}
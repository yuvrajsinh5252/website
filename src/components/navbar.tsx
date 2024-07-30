import Link from "next/link";
import ToggleTheme from "./theme/toggle-theme";

export default function Navbar() {
  return (
    <div className="flex justify-around items-center p-2 fixed w-full bg-transparent">
      <ToggleTheme />
      <nav className="flex gap-5 justify-center items-center p-2 rounded-full">
        <Link href="/" className="pl-3">Home</Link>
        <Link href="/about" >About</Link>
        <Link href="/contact" className="pr-3">Contact</Link>
      </nav>
    </div>
  )
}
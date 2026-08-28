import NavLink from "./navlink";

const NAV_ITEMS = [
  { href: "/", text: "home" },
  { href: "/projects", text: "projects" },
  { href: "/posts", text: "posts" },
] as const;

export default function Navbar() {
  return (
    <div className="fixed inset-x-0 top-4 md:top-10 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className="pointer-events-auto flex items-center gap-1 md:gap-1.5 p-1 rounded-full
          backdrop-blur-md
          bg-slate-600/40
          border border-slate-700/40
          hover:border-blue-500/20
          shadow-lg shadow-black/20
          hover:shadow-xl hover:shadow-blue-300/40
          transition-all duration-300
          animate-fade-in"
      >
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} href={item.href} text={item.text} />
        ))}
      </nav>
    </div>
  );
}

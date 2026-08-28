import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { Seo } from "@/lib/seo";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center">
      <Seo
        title="Page not found"
        description="The page you are looking for does not exist."
        noIndex
      />
      <MaxWidthWrapper>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-32 text-center">
          <p className="text-6xl sm:text-8xl font-extrabold tracking-tight bg-linear-to-br from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            404
          </p>
          <h1 className="mt-6 text-2xl sm:text-3xl font-bold text-white">
            Lost in space
          </h1>
          <p className="mt-3 text-gray-400 text-base sm:text-lg">
            This page drifted out of orbit, or never existed to begin with.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 transition-colors hover:border-blue-500/50 hover:bg-blue-500/20 hover:text-blue-200"
            >
              <IoIosArrowBack aria-hidden="true" />
              Back home
            </Link>
            <Link
              to="/posts"
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-white/20 hover:text-white"
            >
              Read posts
            </Link>
            <Link
              to="/projects"
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-white/20 hover:text-white"
            >
              See projects
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PageHeaderProps {
  title: string;
  description?: string;
  backHref?: string | null;
}

export default function PageHeader({
  title,
  description,
  backHref = null,
}: PageHeaderProps) {
  return (
    <div className="mb-12 sm:mb-14 md:mb-16 animate-fade-in">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="flex justify-center items-center text-2xl sm:text-3xl md:text-4xl text-blue-400 hover:text-blue-300 transition-colors duration-150 rounded-full">
          {backHref ? (
            <Link to={backHref} aria-label="Go back">
              <IoIosArrowBack aria-hidden="true" />
            </Link>
          ) : (
            <IoIosArrowForward aria-hidden="true" />
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          {title}
        </h1>
      </div>

      {description && (
        <p className="text-gray-400 text-base sm:text-lg max-w-3xl sm:ml-[calc(2.25rem+0.75rem)] md:ml-[calc(2.5rem+0.75rem)]">
          {description}
        </p>
      )}
    </div>
  );
}

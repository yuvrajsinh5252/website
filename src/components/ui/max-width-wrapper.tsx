import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-lg px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MDX_STYLES = `prose dark:prose-invert transition-all max-w-none
prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 sm:prose-h2:mb-6 prose-h2:mt-10 sm:prose-h2:mt-14 prose-h2:text-white
prose-h3:text-lg sm:prose-h3:text-xl prose-h3:font-bold prose-h3:mb-3 sm:prose-h3:mb-4 prose-h3:mt-8 sm:prose-h3:mt-10 prose-h3:text-blue-200
prose-p:text-gray-300 prose-p:leading-7 sm:prose-p:leading-8 prose-p:mb-6 sm:prose-p:mb-8 prose-p:text-base sm:prose-p:text-lg
prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-img:max-w-full prose-img:h-auto
prose-pre:!p-0 prose-pre:!bg-transparent prose-pre:!border-0
prose-code:!bg-transparent prose-code:!border-0 prose-code:text-gray-200 prose-code:px-1.5 sm:prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:text-sm sm:prose-code:text-base prose-code:font-medium
prose-strong:text-white prose-strong:font-bold
prose-ul:text-gray-300 prose-ul:my-4 sm:prose-ul:my-6 prose-ul:text-base sm:prose-ul:text-lg
prose-li:text-gray-300 prose-li:my-2 sm:prose-li:my-3 prose-li:text-base sm:prose-li:text-lg
prose-blockquote:pl-6 sm:prose-blockquote:pl-8 prose-blockquote:italic prose-blockquote:text-gray-400 prose-blockquote:py-2 prose-blockquote:text-base sm:prose-blockquote:text-lg
prose-a:text-blue-400 prose-a:no-underline prose-a:hover:text-blue-300 prose-a:transition-colors prose-a:text-base sm:prose-a:text-lg`;

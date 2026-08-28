import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Client-side navigation keeps scroll position; reset it like a real page load.
 *  Hash links (e.g. /#about) are left alone so anchors still work. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

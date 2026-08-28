import { useEffect } from "react";

const umamiWebsiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

function appendScript(attrs: Record<string, string>, inline?: string) {
  const script = document.createElement("script");
  Object.entries(attrs).forEach(([key, value]) =>
    script.setAttribute(key, value)
  );
  if (inline) script.textContent = inline;
  document.head.appendChild(script);
  return script;
}

/** Injected after hydration so the trackers never block first paint. */
export function Analytics() {
  useEffect(() => {
    if (import.meta.env.DEV) return;

    const added: HTMLScriptElement[] = [];

    if (umamiWebsiteId) {
      added.push(
        appendScript({
          src: "https://cloud.umami.is/script.js",
          "data-website-id": umamiWebsiteId,
          defer: "",
        })
      );
    }

    if (gaMeasurementId) {
      added.push(
        appendScript({
          src: `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`,
          async: "",
        }),
        appendScript(
          {},
          `window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', '${gaMeasurementId}');`
        )
      );
    }

    return () => added.forEach((script) => script.remove());
  }, []);

  return null;
}

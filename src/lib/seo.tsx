import { Head } from "vite-react-ssg";
import { siteConfig } from "@/config/site";

export interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
  publishedTime?: string;
  type?: "website" | "article";
  /** Serialised JSON-LD injected as a script tag. */
  jsonLd?: Record<string, unknown>;
}

export function Seo({
  title,
  description = siteConfig.description,
  image,
  canonical,
  noIndex = false,
  publishedTime,
  type = "website",
  jsonLd,
}: SeoProps) {
  const pageTitle = title ? `${title} - ${siteConfig.name}` : siteConfig.title;
  const pageUrl = canonical ?? siteConfig.url;
  const pageImage = image
    ? image.startsWith("http")
      ? image
      : `${siteConfig.url}${image}`
    : `${siteConfig.url}/images/og.png`;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="creator" content={siteConfig.name} />
      <link rel="canonical" href={pageUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={pageTitle} />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:creator" content="@Yuvrajsinh_099" />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Head>
  );
}

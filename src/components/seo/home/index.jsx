import { SEO } from "@/vars/seo";
import { images } from "@/vars/images";
import { externalLinks } from "@/vars/external_links";

export const HomeSEO = (
  <>
    <title>{SEO.title}</title>
    <meta name="description" content={SEO.description} />

    {/* Canonical URL */}
    <link rel="canonical" href={SEO.siteUrl} />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={SEO.title} />
    <meta property="og:description" content={SEO.description} />
    <meta property="og:image" content={images.home} />
    <meta property="og:url" content={SEO.siteUrl} />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={SEO.title} />
    <meta name="twitter:description" content={SEO.description} />
    <meta name="twitter:image" content={images.home} />

    {/* JSON-LD */}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SEO.siteName,
        url: SEO.siteUrl,
        logo: images.logo,
        sameAs: [externalLinks.instagram, externalLinks.tiktok],
      })}
    </script>
  </>
);

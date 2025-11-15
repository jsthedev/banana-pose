import { SEO, RTWSEO } from "@/vars/seo";
import { images } from "@/vars/images";

export const ReadyToWearSEO = (
  <>
    <title>{RTWSEO.siteName}</title>
    <meta name="description" content={RTWSEO.description} />
    <link rel="canonical" href={RTWSEO.siteUrl} />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={SEO.siteName} />
    <meta property="og:title" content={RTWSEO.siteName} />
    <meta property="og:description" content={RTWSEO.description} />
    <meta property="og:url" content={RTWSEO.siteUrl} />
    <meta property="og:image" content={images.RTW} />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={RTWSEO.siteName} />
    <meta name="twitter:description" content={RTWSEO.description} />
    <meta name="twitter:image" content={images.RTW} />

    {/* JSON-LD: CollectionPage + Breadcrumb */}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": ["CollectionPage", "WebPage"],
        name: RTWSEO.siteName,
        url: RTWSEO.siteUrl,
        description: RTWSEO.description,
        inLanguage: "en",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SEO.siteUrl}/#website`,
          name: SEO.siteName,
          url: SEO.siteUrl,
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: SEO.siteUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Ready to Wear",
              item: RTWSEO.siteUrl,
            },
          ],
        },
      })}
    </script>
  </>
);

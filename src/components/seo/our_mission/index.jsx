import { SEO, missionSEO } from "@/vars/seo";
import { images } from "@/vars/images";

export const MissionSEO = (
  <>
    <title>{missionSEO.siteName}</title>
    <meta name="description" content={missionSEO.description} />
    <link rel="canonical" href={missionSEO.siteUrl} />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={missionSEO.siteName} />
    <meta property="og:title" content={missionSEO.siteName} />
    <meta property="og:description" content={missionSEO.description} />
    <meta property="og:url" content={missionSEO.siteUrl} />
    <meta property="og:image" content={images.mission} />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={missionSEO.siteName} />
    <meta name="twitter:description" content={missionSEO.description} />
    <meta name="twitter:image" content={images.mission} />

    {/* JSON-LD: AboutPage + Breadcrumb */}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": ["AboutPage", "WebPage"],
        name: missionSEO.siteName,
        url: missionSEO.siteUrl,
        description: missionSEO.description,
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
              name: "Our Mission",
              item: missionSEO.siteUrl,
            },
          ],
        },
      })}
    </script>
  </>
);

import "@/pages/home/index.scss";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/utils/seo";
import { images } from "@/utils/images";
import { externalLinks } from "@/utils/external_links";

function Home() {
  return (
    <div className="home">
      <Helmet>
        <title>{SEO.title}</title>
        <meta name="description" content={SEO.description} />

        {/* Canonical URL */}
        <link rel="canonical" href={SEO.siteName} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={SEO.title} />
        <meta property="og:description" content={SEO.description} />
        <meta property="og:image" content={images.home} />
        <meta property="og:url" content={SEO.siteName} />

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
      </Helmet>
      <div className="home-landing-container">
        <div className="wide-image-wrapper">
          <img className="home-image" src={images.home} />
        </div>
      </div>
    </div>
  );
}

export default Home;

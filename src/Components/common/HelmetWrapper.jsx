import { Helmet } from "react-helmet-async";

function HelmetWrapper({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogType = "website", 
  ogImage = "/default-og-image.png", 
  ogUrl = window.location.href, 
  twitterCard = "summary_large_image", 
  twitterSite = "@YourTwitterHandle" 
}) {
  return (
    <Helmet>
      {/* Balises de base */}
      <title>{title || "Mon Application"}</title>
      <meta name="description" content={description || "Bienvenue sur Mon Application"} />
      <meta name="keywords" content={keywords || "React, SEO, Tailwind, application web"} />
      <meta name="robots" content="index, follow" />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph (OG) pour les réseaux sociaux */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title || "Mon Application"} />
      <meta property="og:description" content={description || "Bienvenue sur Mon Application"} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />

      {/* Twitter Cards */}
      {/* <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title || "Mon Application"} />
      <meta name="twitter:description" content={description || "Bienvenue sur Mon Application"} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content={twitterSite} /> */}
    </Helmet>
  );
}

export default HelmetWrapper;

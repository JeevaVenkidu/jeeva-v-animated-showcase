
import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  url, 
  image = '/placeholder.svg',
  type = 'website',
  author = 'Jeeva V',
  publishedTime,
  modifiedTime
}: SEOHeadProps) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Set or update meta tags
    const setMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const setPropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const setLinkTag = (rel: string, href: string, type?: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
      if (type) link.setAttribute('type', type);
    };

    // Basic meta tags for SEO
    setMetaTag('description', description);
    setMetaTag('author', author);
    setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMetaTag('googlebot', 'index, follow');
    setMetaTag('bingbot', 'index, follow');
    
    if (keywords) {
      setMetaTag('keywords', keywords);
    }

    // Viewport and mobile optimization
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0, shrink-to-fit=no');
    setMetaTag('theme-color', '#3b82f6');
    setMetaTag('msapplication-TileColor', '#3b82f6');

    // Open Graph tags for social media
    setPropertyTag('og:title', title);
    setPropertyTag('og:description', description);
    setPropertyTag('og:type', type);
    setPropertyTag('og:image', image);
    setPropertyTag('og:image:alt', title);
    setPropertyTag('og:site_name', 'Jeeva V - Portfolio');
    setPropertyTag('og:locale', 'en_US');
    
    if (url) {
      setPropertyTag('og:url', url);
    }

    if (publishedTime) {
      setPropertyTag('article:published_time', publishedTime);
    }

    if (modifiedTime) {
      setPropertyTag('article:modified_time', modifiedTime);
    }

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', image);
    setMetaTag('twitter:creator', '@jeevadev');
    setMetaTag('twitter:site', '@jeevadev');

    // LinkedIn optimization
    setPropertyTag('og:image:width', '1200');
    setPropertyTag('og:image:height', '630');

    // Canonical URL
    if (url) {
      setLinkTag('canonical', url);
    }

    // Preconnect to external domains for performance
    setLinkTag('preconnect', 'https://fonts.googleapis.com');
    setLinkTag('preconnect', 'https://fonts.gstatic.com');

    // JSON-LD Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Jeeva V",
      "jobTitle": "Backend Developer",
      "description": description,
      "url": url || "https://jeevacode.web.app",
      "image": image,
      "sameAs": [
        "https://github.com/jeeva-v",
        "https://linkedin.com/in/jeeva-v"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Viskamnix Technology"
      },
      "knowsAbout": [
        "Node.js",
        "Express.js", 
        "PostgreSQL",
        "Prisma",
        "Backend Development",
        "Full Stack Development",
        "REST APIs"
      ]
    };

    // Remove existing JSON-LD script
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new JSON-LD script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

  }, [title, description, keywords, url, image, type, author, publishedTime, modifiedTime]);

  return null;
};

export default SEOHead;

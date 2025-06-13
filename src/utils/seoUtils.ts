
// SEO utility functions for better search engine optimization

export const generateSitemap = () => {
  const baseUrl = 'https://jeevacode.web.app';
  const routes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/projects', priority: '0.9', changefreq: 'weekly' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

export const generateRobotsTxt = () => {
  const baseUrl = 'https://jeevacode.web.app';
  
  return `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;
};

export const getStructuredData = (type: 'Person' | 'WebSite' | 'WebPage', data: any) => {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };

  if (type === 'Person') {
    return {
      ...baseStructuredData,
      "name": "Jeeva V",
      "jobTitle": "Backend Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "Viskamnix Technology"
      },
      "knowsAbout": [
        "Node.js", "Express.js", "PostgreSQL", "Prisma", 
        "Backend Development", "Full Stack Development", "REST APIs"
      ],
      "sameAs": [
        "https://github.com/jeeva-v",
        "https://linkedin.com/in/jeeva-v"
      ]
    };
  }

  return baseStructuredData;
};

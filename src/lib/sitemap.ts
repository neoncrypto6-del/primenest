// lib/sitemap.ts
import { seoPages } from './seoPages';

const DOMAIN = 'https://www.theprimenest.online';

export function generateSitemap(): string {
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static Pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/listings', priority: '0.9', changefreq: 'daily' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.5', changefreq: 'yearly' },
    { url: '/terms', priority: '0.5', changefreq: 'yearly' },
  ];

  staticPages.forEach(({ url, priority, changefreq }) => {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}${url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  // All SEO Location Pages
  seoPages.forEach((page) => {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/${page.slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
}

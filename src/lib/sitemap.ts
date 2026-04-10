import { seoPages } from './seoPages';

const DOMAIN = 'https://www.theprimenest.online';

export function generateSitemap(): string {
  const staticPages = [
  '',
  '/listings',
  '/contact',
  '/about',
  '/privacy',
  '/terms'];


  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add static pages
  staticPages.forEach((page) => {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}${page}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page === '' || page === '/listings' ? 'daily' : 'monthly'}</changefreq>\n`;
    xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
    xml += `  </url>\n`;
  });

  // Add SEO location pages
  seoPages.forEach((page) => {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/${page.slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.9</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  return xml;
}

// In a real Node.js environment, you would write this to public/sitemap.xml
// fs.writeFileSync('./public/sitemap.xml', generateSitemap())
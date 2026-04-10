// generate-sitemap.js
const { generateSitemap } = require('./lib/sitemap.js');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const sitemap = generateSitemap();
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf-8');

console.log('✅ Sitemap generated successfully → public/sitemap.xml');

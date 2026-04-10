// generate-sitemap.js
import { generateSitemap } from './lib/sitemap.js';
import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const sitemap = generateSitemap();
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf-8');

console.log('✅ Sitemap generated successfully → public/sitemap.xml');

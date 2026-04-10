import { generateSitemap } from './lib/sitemap-generator.js';
import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const sitemap = generateSitemap();

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8');

console.log('✅ Sitemap generated → dist/sitemap.xml');

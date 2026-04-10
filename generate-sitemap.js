// generate-sitemap.js
import { generateSitemap } from './lib/sitemap.js';
import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const sitemap = generateSitemap();

// ✅ IMPORTANT: write to dist (Vercel serves from here)
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8');

console.log('✅ Sitemap generated → dist/sitemap.xml');

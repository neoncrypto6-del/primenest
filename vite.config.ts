// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { generateSitemap } from './lib/sitemap.js';   // <-- Note the .js extension

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'generate-sitemap',
      closeBundle() {
        try {
          const sitemapContent = generateSitemap();
          const fs = require('fs');
          const path = require('path');

          const publicDir = path.join(process.cwd(), 'public');
          
          if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
          }

          fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent, 'utf-8');
          
          console.log('✅ Sitemap generated successfully at public/sitemap.xml');
        } catch (error) {
          console.error('❌ Sitemap generation failed:', error);
        }
      },
    },
  ],
});

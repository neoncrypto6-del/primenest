import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { generateSitemap } from './lib/sitemap';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'generate-sitemap',
      closeBundle() {
        try {
          const sitemap = generateSitemap();
          const publicDir = join(process.cwd(), 'public');

          if (!existsSync(publicDir)) {
            mkdirSync(publicDir, { recursive: true });
          }

          writeFileSync(join(publicDir, 'sitemap.xml'), sitemap, 'utf-8');
          console.log('✅ Sitemap generated successfully → public/sitemap.xml');
        } catch (error) {
          console.error('❌ Failed to generate sitemap:', error);
        }
      },
    },
  ],
});

// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'generate-sitemap',
      closeBundle: async () => {
        try {
          // Dynamic import to avoid resolution issues on Vercel
          const { generateSitemap } = await import('./lib/sitemap.js');
          
          const sitemapContent = generateSitemap();
          
          const fs = await import('fs');
          const path = await import('path');

          const publicDir = path.join(process.cwd(), 'public');
          
          if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
          }

          fs.writeFileSync(
            path.join(publicDir, 'sitemap.xml'), 
            sitemapContent, 
            'utf-8'
          );

          console.log('✅ Sitemap generated successfully → public/sitemap.xml');
        } catch (error) {
          console.error('❌ Failed to generate sitemap:', error);
        }
      },
    },
  ],
});

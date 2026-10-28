import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        'web-design': resolve(__dirname, 'web-design.html'),
        'web-development': resolve(__dirname, 'web-development.html'),
        deployment: resolve(__dirname, 'deployment.html'),
        hosting: resolve(__dirname, 'hosting.html'),
        domains: resolve(__dirname, 'domains.html'),
        'business-email': resolve(__dirname, 'business-email.html'),
        ssl: resolve(__dirname, 'ssl.html'),
        maintenance: resolve(__dirname, 'maintenance.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        about: resolve(__dirname, 'about.html'),
        faq: resolve(__dirname, 'faq.html'),
        contact: resolve(__dirname, 'contact.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        '404': resolve(__dirname, '404.html'),
      },
    },
  },
});

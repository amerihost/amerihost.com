import path from 'path';
import { readFileSync } from 'node:fs';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Connect, type Plugin } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    'PORT environment variable is required but was not provided.',
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    'BASE_PATH environment variable is required but was not provided.',
  );
}

// Cloudflare reads _redirects in production. Mirror only the retired legal
// routes in Vite so preview uses the same permanent redirects, not SPA fallback.
function legacyLegalRedirects(): Plugin {
  const redirects = new Map(
    readFileSync(path.resolve(import.meta.dirname, 'public/_redirects'), 'utf8')
      .split('\n')
      .map((line) => line.trim().split(/\s+/))
      .filter(([from, , status]) => from.startsWith('/website-forms/') && status === '301')
      .map(([from, to]) => [from, to]),
  );
  const middleware: Connect.NextHandleFunction = (request, response, next) => {
      const url = new URL(request.url ?? '/', 'http://localhost');
      const prefix = (basePath ?? '/').replace(/\/$/, '');
      const pathname = prefix && url.pathname.startsWith(`${prefix}/`)
        ? url.pathname.slice(prefix.length)
        : url.pathname;
      const destination = redirects.get(pathname);
      if (!destination) return next();
      response.writeHead(301, { Location: `${prefix}${destination}${url.search}` });
      response.end();
  };
  return {
    name: 'legacy-legal-redirects',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    legacyLegalRedirects(),
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: path.resolve(import.meta.dirname, 'index.html'),
        websiteDesign: path.resolve(
          import.meta.dirname,
          'website-design/index.html',
        ),
        hosting: path.resolve(import.meta.dirname, 'hosting/index.html'),
        businessEmail: path.resolve(
          import.meta.dirname,
          'business-email/index.html',
        ),
        domainsDns: path.resolve(
          import.meta.dirname,
          'domains-dns/index.html',
        ),
        domainServices: path.resolve(
          import.meta.dirname,
          'domain-services/index.html',
        ),
        security: path.resolve(import.meta.dirname, 'security/index.html'),
        about: path.resolve(import.meta.dirname, 'about/index.html'),
        contact: path.resolve(import.meta.dirname, 'contact/index.html'),
        terminology: path.resolve(import.meta.dirname, 'terminology/index.html'),
        portfolio: path.resolve(import.meta.dirname, 'portfolio/index.html'),
        privacyPolicy: path.resolve(
          import.meta.dirname,
          'privacy-policy/index.html',
        ),
        termsOfUse: path.resolve(
          import.meta.dirname,
          'terms-of-use/index.html',
        ),
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    // Development only: the public API allows amerihost.com, not preview hosts.
    // Production browsers fetch directly from the shared public API.
    proxy: {
      '/__portfolio-preview/api/public/portfolio': {
        target: 'https://portfolio.smbportals.com',
        changeOrigin: true,
        rewrite: () => '/api/public/portfolio',
        headers: { Origin: 'https://amerihost.com' },
      },
    },
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});

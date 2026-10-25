import fs from 'fs';
import path from 'path';

// List of all known static routes that need dedicated 200 OK HTML files
const ROUTES = [
  'disclaimer',
  'privacy-policy',
  'terms',
  'cookie-policy',
  'editorial-policy',
  'dork-generator',
  'google-dorks',
  'yandex-dorks',
  'guides',
  'tools',
  'faq',
  'about',
  'contact',
  '404',
];

const distDir = path.resolve(process.cwd(), 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('[postbuild] dist/index.html not found! Run vite build first.');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

ROUTES.forEach((route) => {
  const routeDir = path.join(distDir, route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  const routeHtmlFile = path.join(routeDir, 'index.html');
  fs.writeFileSync(routeHtmlFile, indexContent, 'utf8');
  console.log(`[postbuild] Created static 200 OK route: /${route}/index.html`);
});

console.log('[postbuild] Successfully generated all static route HTML files for direct 200 HTTP responses.');

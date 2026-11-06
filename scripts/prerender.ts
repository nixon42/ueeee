import fs from 'node:fs';
import path from 'node:path';
import { GAMES_CATALOG } from '../src/data/games-catalog';

const DIST_DIR = path.resolve(import.meta.dirname, '../dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

function runPrerender() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error('Error: dist/index.html does not exist. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

  // 1. Ensure 404.html exists for GitHub Pages client-side fallback
  const fallback404Path = path.join(DIST_DIR, '404.html');
  fs.writeFileSync(fallback404Path, baseHtml, 'utf-8');
  console.log('✓ Generated dist/404.html (SPA Fallback)');

  // 2. Generate static HTML files for all 10 catalog games
  for (const game of GAMES_CATALOG) {
    const gameUrl = `https://ueeee.my.id/game/${game.id}`;
    const pageTitle = `${game.title} - ${game.subjectDetail} | UEEEE Game Edukasi Interaktif`;
    const pageDesc = game.description.replace(/"/g, '&quot;');

    // Schema.org Structured Data for Google LearningResource Rich Snippets
    const structuredData = `
    <!-- Google Rich Snippet Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      "name": "${game.title.replace(/"/g, '\\"')}",
      "description": "${game.description.replace(/"/g, '\\"')}",
      "url": "${gameUrl}",
      "educationalLevel": "${game.gradeLevel}",
      "learningResourceType": "Interactive Educational Game",
      "inLanguage": "id",
      "isAccessibleForFree": true,
      "provider": {
        "@type": "Organization",
        "name": "ueeee",
        "url": "https://ueeee.my.id/"
      }
    }
    </script>`;

    let gameHtml = baseHtml;

    // Replace Title
    gameHtml = gameHtml.replace(
      /<title>.*?<\/title>/s,
      `<title>${pageTitle}</title>`
    );

    // Replace Meta Title
    gameHtml = gameHtml.replace(
      /<meta\s+name="title"\s+content=".*?"\s*\/>/i,
      `<meta name="title" content="${pageTitle}" />`
    );

    // Replace Meta Description
    gameHtml = gameHtml.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/>/i,
      `<meta name="description" content="${pageDesc}" />`
    );

    // Replace Canonical Link
    gameHtml = gameHtml.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/>/i,
      `<link rel="canonical" href="${gameUrl}" />`
    );

    // Replace Open Graph metadata
    gameHtml = gameHtml.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/>/i,
      `<meta property="og:title" content="${game.title} | UEEEE" />`
    );
    gameHtml = gameHtml.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/>/i,
      `<meta property="og:description" content="${pageDesc}" />`
    );
    gameHtml = gameHtml.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/>/i,
      `<meta property="og:url" content="${gameUrl}" />`
    );

    // Replace Twitter metadata
    gameHtml = gameHtml.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/>/i,
      `<meta name="twitter:title" content="${game.title} | UEEEE" />`
    );
    gameHtml = gameHtml.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/>/i,
      `<meta name="twitter:description" content="${pageDesc}" />`
    );
    gameHtml = gameHtml.replace(
      /<meta\s+name="twitter:url"\s+content=".*?"\s*\/>/i,
      `<meta name="twitter:url" content="${gameUrl}" />`
    );

    // Inject structured data before </head>
    gameHtml = gameHtml.replace('</head>', `${structuredData}\n  </head>`);

    // Write to dist/game/:id/index.html
    const gameSubdir = path.join(DIST_DIR, 'game', game.id);
    fs.mkdirSync(gameSubdir, { recursive: true });
    fs.writeFileSync(path.join(gameSubdir, 'index.html'), gameHtml, 'utf-8');

    // Also write to dist/:id/index.html (direct slug support)
    const directSlugDir = path.join(DIST_DIR, game.id);
    fs.mkdirSync(directSlugDir, { recursive: true });
    fs.writeFileSync(path.join(directSlugDir, 'index.html'), gameHtml, 'utf-8');

    console.log(`✓ Generated static route: /game/${game.id} & /${game.id}`);
  }

  // 3. Ensure sitemap and robots are synced in dist
  const publicSitemap = path.resolve(import.meta.dirname, '../public/sitemap.xml');
  if (fs.existsSync(publicSitemap)) {
    fs.copyFileSync(publicSitemap, path.join(DIST_DIR, 'sitemap.xml'));
    console.log('✓ Synced dist/sitemap.xml');
  }

  const publicRobots = path.resolve(import.meta.dirname, '../public/robots.txt');
  if (fs.existsSync(publicRobots)) {
    fs.copyFileSync(publicRobots, path.join(DIST_DIR, 'robots.txt'));
    console.log('✓ Synced dist/robots.txt');
  }

  console.log('🚀 Prerender static routing and SEO metadata completed successfully!');
}

runPrerender();

# Vercel readiness — 26 October 2026

Ready for frontend review deployment; no deployment was performed by this check.

## Configuration

- Framework: Next.js; repository root; default output directory.
- Node.js: 24.x, pinned in package.json and lockfile.
- Install: npm ci. Build: npm run build.
- NEXT_PUBLIC_ENABLE_INDEXING=false during review.
- NEXT_PUBLIC_SITE_URL: deployment URL or final domain, including https://. Omit to use VERCEL_URL; do not copy the localhost example to Vercel.
- Enable Vercel Deployment Protection when sharing the review admin.
- Vercel Node version reference: https://vercel.com/docs/functions/runtimes/node-js/node-js-versions

## Completed validation

- Clean lockfile install: npm ci --ignore-scripts --no-audit --no-fund --offline (33 packages installed from cache).
- npm run format:check, npm run typecheck, npm run build: passed after clean install.
- Production server: npm start -- --port 3100, Node v24.12.0.
- 25 HTTP checks: storefront, shop category query, collections, product, cart, checkout/result, admin routes, contact/about/FAQ, guides, policies, robots, sitemap, Open Graph image, and unknown URL. Expected 200/404 statuses passed.
- X-Robots-Tag: noindex, nofollow on all checked routes.
- Homepage referenced scripts/styles/images returned 200. Literal local image/brand/font references in source exist on disk.
- git diff --check passed; only .env.example is tracked among environment files.

## Scope and limitations

Build and HTTP checks do not guarantee platform deployment or browser interactions. No live Vercel build or browser end-to-end checkout was performed. Offline install validated the lockfile against cached packages, not public registry availability.

This remains a frontend review app. Product/admin/cart state is browser-local; admin login is a frontend gate. Database, server authentication, payment, real orders, carrier rates and email sending require backend integration before operating a live store.

# 3D PC Buyer Inspector — Intel i5-14400F • ASUS RTX 5060 8GB

Interactive WebGL / Three.js 3D showcase built for Thai Facebook Marketplace buyers so they can spin the PC, open the tempered glass side panel, drag the **Exploded View** slider, click individual parts to inspect verified specs & Thai market pricing, check diagnostics, and copy the Thai listing.

## Features
- **Interactive 3D PC Model (Three.js):** Orbit, zoom, click any internal component (CPU, ASUS RTX 5060, Gigabyte B760M, 4×8GB HyperX RAM, WD Blue SN5000 1TB, WD_BLACK SN750 250GB, Seagate 1TB HDD, PSU, Cooler, Case, plus optional **Dahua 30" 200Hz Curved Monitor**).
- **Exploded View & Open Glass:** Smoothly separate components and toggle the CPU cooler to inspect the Intel Core i5-14400F underneath.
- **Honest Verification Badges:** Clearly marks software-verified hardware vs. physically unverified parts (PSU, Case, Cooler, Warranty).
- **Thai Market Valuation & Links:** Side-by-side Thai new retail vs. used market references (Advice, JIB, OverclockZone, Shopee, NextStep Reborn) + optional monitor bundle toggle.
- **Bilingual (ไทย / EN)** & mobile-ready for Facebook/Line in-app browsers.

## Customize Before Sharing
Edit `SELLER_CONFIG` in `src/data/pcData.ts` to fill in your physical PSU, Case, Cooler, exact ASUS RTX 5060 edition, warranty dates, pickup location, and Line/Phone contact info.

## Local Development
```bash
npm install
npm run dev
npm run build
```

## Deploy Options

### 1. Cloudflare Pages (Recommended — Faster than GitHub Pages in Thailand)
Cloudflare has edge nodes directly in Bangkok, unlimited free bandwidth, automatic HTTPS, and instant deploys from GitHub.
```bash
npx wrangler pages deploy dist --project-name pc-showcase-3d
```
Or connect your GitHub repo in the Cloudflare Pages dashboard (`Build command: npm run build`, `Output directory: dist`).

### 2. Vercel (Fastest 1-Command CLI Deploy)
```bash
npx vercel --prod
```

### 3. GitHub Pages (Included via GitHub Actions)
Push to GitHub, then enable **Settings → Pages → Source: GitHub Actions**:
```bash
gh auth login
gh repo create pc-showcase-3d --public --source=. --push
```
The workflow in `.github/workflows/deploy-pages.yml` will automatically build and publish to `https://<your-username>.github.io/pc-showcase-3d/`.

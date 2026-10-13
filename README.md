# Blueglasses — Dhanar Santika

Personal website for Dhanar Santika. Built with Astro as a bilingual, static site for Azure Static Web Apps Free.

## Development

Requires Node.js 22 and npm.

```sh
npm ci
npm run dev
```

## Checks and production build

```sh
npm test
```

Build output is written to `dist/`. The GitHub Actions workflow validates and builds the site before deploying that directory to Azure Static Web Apps.

## Azure and Cloudflare domain setup

The existing Azure Static Web App hostname is `polite-desert-0f68e6600.1.azurestaticapps.net`.

1. Add `www.blueglasses.xyz` and `blueglasses.xyz` under the app's **Custom domains** in Azure.
2. In Cloudflare DNS, point `www` to the Azure hostname with a CNAME record and **DNS only** proxy status.
3. Point apex `@` to the same hostname with a CNAME record. Cloudflare flattens this apex CNAME; keep it **DNS only**.
4. Add Azure's generated TXT validation record in Cloudflare exactly as Azure displays it.
5. After both domains validate and HTTPS is ready, set `www.blueglasses.xyz` as the Azure app's **default domain**.

Azure then redirects requests for the apex and generated Azure hostname to `www`, preserving paths such as `/id/`. Do not create conflicting `A`/`AAAA` records or a separate Cloudflare redirect for these hosts. Keep unrelated DNS records unchanged.

## Content publication safety

- English content is served at `/`; Bahasa Indonesia is served at `/id/`.
- Keep internal notes outside this repository; publish only approved text and assets.
- SIKAP demo and screenshot remain unpublished until their safety gates pass.
- Never add internal SIKARE material, client data, secrets, or unpublished project assets to this repository.

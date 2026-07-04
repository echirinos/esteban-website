# Portfolio Project Context

This repository is the current personal portfolio site for Esteban Chirinos.
The GitHub remote used for the active site is `echirinos/esteban-website`.

## Stack

- Next.js 16 with the App Router.
- React 19.
- Tailwind CSS 3.
- DaisyUI 5.
- Playwright smoke tests under `tests/`.
- Vercel deployment target.

## Primary Surfaces

- Canonical homepage: `app/page.tsx`, rendering `app/components/modern-portfolio-page.tsx`.
- `/modern` redirects to `/`.
- Portfolio proof and hero CTA copy live in `app/components/modern-portfolio-page.tsx`.
- Navigation lives in `app/components/nav.tsx`.
- Global theme and shared visual behavior live in `app/global.css`.

## Design Direction

The site uses a "whiteprint" drafting identity: Esteban is a solutions
architect and certified roofing contractor, so the visual language is the
technical drawing — vellum paper (`--base-100`), drafting-blue linework and
links (`--primary`), a deep blueprint-blue field for the hero and contact
bookend (`#101f58`), and safety orange reserved for primary CTAs
(`--accent`). Dark mode is full blueprint mode (blue field site-wide).

- Type: Barlow Condensed (display, uppercase, `font-display`), Archivo
  (body, `font-sans`), IBM Plex Mono (annotations, `font-mono` and the
  `.annotation` utility).
- Structure devices: sections are labeled as drawing sheets
  (`SHT A-02 · WORK`), work history is a hairline schedule table (no cards),
  projects are numbered plates (P-01…), the chat section is the RFI.
- Corners are square (2px max radius); borders use `.hairline`
  (`--hairline`); the drafting grid utilities are `.sheet-grid` /
  `.sheet-grid-field`.
- Motion: Lenis smooth scroll (`app/components/lenis-provider.tsx`),
  framer-motion draft-in reveals (`app/components/blueprint-motion.tsx`),
  hero load sequence + parallax (`app/components/blueprint-hero.tsx`).
  Everything respects `prefers-reduced-motion`.

Keep it proof-led: direct hero copy, visible metrics ("quantities"),
scannable schedule rows, clear CTAs. Avoid rounded-card grids, drop shadows,
gradients, and marketing filler — they break the drafting language.

## DaisyUI Theme Notes

DaisyUI 5 uses `--color-*` theme tokens. Legacy tokens such as `--primary` may
still be useful for local custom CSS, but they do not fully drive DaisyUI
components.

When overriding DaisyUI 5 themes, match the generated selector specificity:

```css
:is(:root:has(input.theme-controller[value="light"]:checked), [data-theme="light"]) {
  --color-primary: #0f766e;
  --color-primary-content: #ffffff;
}
```

Filled DaisyUI buttons may need explicit content color rules in `app/global.css`
so CTA text remains readable after theme changes.

## Verification

Use these checks before handing off UI work:

```bash
npm run typecheck
npm run build
npm run test:smoke
```

There is currently no `npm run lint` script in `package.json`.

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

The portfolio uses a warm editorial identity inspired by HEY, Basecamp,
and 37signals: paper backgrounds, forest-green links and buttons, expressive
Kaisei Tokumin headlines, and clear Geist body text. Preserve factual content,
readable sentence case, generous spacing, and the personal tone. The homepage
uses a real photo, a short personal note, work and project lists, and a scenic
invitation into the goggles. Avoid reintroducing the old blueprint sheet codes.

Goggles are a browser-rendered Three.js experience with ten scenic worlds,
a portfolio desk, an image fallback, motion controls, and mobile navigation.
Keep the heavy renderer off the homepage. Do not preload every world texture.
Respect reduced motion, stop rendering while the page is hidden, and keep
all portfolio controls usable if WebGL or browser storage is unavailable.

Tailwind alpha shorthand only compiles for multiples of 5 (`/65` works,
`/62` silently generates no CSS). Use bracket values for other opacities.
Any motion element hidden in SSR must carry `data-draft=""` so the no-JS
and print overrides expose its content.

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

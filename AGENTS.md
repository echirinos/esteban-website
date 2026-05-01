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

Keep the site crisp, high-contrast, and proof-led. Preserve the restrained
portfolio style: direct hero copy, visible proof card, scannable credentials,
and clear CTAs. Avoid adding generic marketing filler or decorative UI that
competes with the work evidence.

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

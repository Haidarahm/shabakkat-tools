# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build to `dist/` (Netlify runs this; see `netlify.toml`)
- `npm run preview` — serve the built bundle

There is no test runner or linter configured.

## Source of truth

The site is a Vite + React 19 port of the HTML mockups in `Homepage-html/` (`Main`, `Reach`, `Sign`, `Pulse` `.dc.html`) and `Design system-html/System.dc.html`. Check any design change against those files first; they win over other specs.

- `src/styles.css` and `src/tools/tools.css` are the mockup CSS copied verbatim. Local additions are marked in the files (`.orbit > svg` fix, phone breakpoint, `.tool-page`). Keep new CSS in the same style rather than introducing a CSS-in-JS or utility layer.
- Dark theme with a fluorescent lime accent `#C8FF00` (still named `--blue`, set on the `.sk` root via `Layout`'s `accent` prop and on each tool's `.u-app`). The `/hr` page uses fluorescent cyan `#00E5FF` instead (passed from `App.jsx`). Neutrals are dark tokens in `styles.css` / `tools.css`; text on accent fills is `var(--ground)`. Single accent only; the one exception is the orange warning state in the tools.
- Light theme: `html[data-theme="light"]` (set by the nav toggle, persisted in `localStorage.theme`, applied pre-render by the inline script in `index.html`; light is the default). Its token overrides live at the end of `styles.css`; accent becomes electric blue `#2453FF` everywhere (overrides the inline `--blue`). The switch uses a View Transitions circular reveal from the toggle.
- English only. The EN/ع switch is visual only.
- Don't add GSAP, Framer, Locomotive or Swiper. Motion is plain CSS, IntersectionObserver and sticky-scroll logic ported from the mockups. The hero WebGL "woven net" is `src/HeroNet.js` (three).

## Architecture

- **No router.** `src/App.jsx` switches on `window.location.pathname`: `/` renders `pages/home/Home`, and `/reach`, `/sign`, `/pulse` render the matching component from `src/tools/` inside `ToolPage`. Netlify's catch-all redirect to `/index.html` makes deep links work. A new route means adding it to the `TOOLS` map.
- **`ToolPage`** renders each tool as a fixed 1440×900 app and scales it with `transform: scale(min(vw/1440, vh/900))`. Tool UIs are therefore authored at that fixed size; don't make them responsive internally.
- **`layout/Layout.jsx`** wraps every page. It owns the scroll progress bar, the nav `is-scrolled` state, and a shared reveal-on-enter system: any element with `data-reveal` gets `.is-in` from an IntersectionObserver (skipped under `prefers-reduced-motion`).
- **`pages/home/Home.jsx`** composes the section components (Hero, Products, Tools, Platform, …, Cta) and holds the refs and effects that cross sections: the pinned horizontal tools scroll (≥1024px) and the `--pv` preview-scale variable. Section copy lives in `pages/home/data.js`.
- **`src/tools/`**: `Reach`, `Sign`, `Pulse` are self-contained demo apps with inline mock data. `Rail.jsx` is the shared left rail, toast hook and `Toast`. Shared SVG icons are in `src/icons.jsx`.

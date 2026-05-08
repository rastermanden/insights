# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Local Development

No build step required — this is a pure static site.

- **VSCode Live Server**: Open any `.html` file and click "Go Live" (configured on port 5501)
- **Python**: `python -m http.server 8000`
- **Node**: `npx http-server`

There are no lint, test, or build commands.

## Deployment

Pushing to `main` triggers `.github/workflows/static.yml`, which deploys the entire repo to GitHub Pages automatically.

## Architecture

Static HTML/CSS/JavaScript educational demos — no framework, no bundler, no package manager.

- `index.html` — landing page with card-based navigation to the demos
- `math/` — Bayes' Theorem calculator, RPN stack calculator, Risk/NNT calculator
- `physics/` — Planet effective temperature calculator (Stefan-Boltzmann law)

Each demo is a self-contained `.html` file with inline CSS and JavaScript, plus a shared `styles.css` at the repo root that carries the design system. External dependencies (Chart.js for graphs, MathJax for LaTeX rendering) are loaded via CDN.

## Design system

**`design.md` is the source of truth for all visual design.** It documents the IBM Carbon Design System adopted for this site (palette, typography, spacing, components). When making any UI/visual change, read `design.md` first and follow its tokens; do not reintroduce the old gradient/rounded look.

Key tokens (mirrored as CSS variables in `styles.css`):
- Primary accent: IBM Blue `#0f62fe` — used only for primary CTAs, links, focused-input underlines.
- Surfaces: white canvas `#ffffff`, light gray `#f4f4f4`, charcoal footer `#161616`.
- Text: ink `#161616`, ink-muted `#525252`.
- Type: IBM Plex Sans (weight 300 for display 42px+, 400 for body, 600 for emphasis), `letter-spacing: 0.16px` on body.
- Geometry: square corners (`border-radius: 0`) on every button, card, input, container. No drop shadows.

`styles.css` provides shared base styles, `.ibm-*` utility classes (top-nav, page shell, tile grid, hero, footer, buttons, inputs), and mobile safety rules that prevent horizontal page scroll so range sliders capture touch drags correctly.

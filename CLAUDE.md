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
- `Math/` — Bayes' Theorem calculator, RPN stack calculator, Risk/NNT calculator
- `Physics/` — Planet effective temperature calculator (Stefan-Boltzmann law)

Each demo is a self-contained `.html` file with all CSS and JavaScript inline. External dependencies (Chart.js for graphs, MathJax for LaTeX rendering) are loaded via CDN.

**Design conventions**: gradient backgrounds (`#e0e7ff` → `#f3f4f6`), blue palette (`#1e3a8a` primary, `#3b82f6` accent), responsive via CSS media queries, semantic HTML with ARIA labels.

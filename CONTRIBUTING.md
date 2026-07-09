# Contributing to Hex Viewer

First off, thank you for taking the time to contribute! 🎉 Contributions of all
kinds are welcome — bug reports, feature requests, code, translations, and docs.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Available Scripts](#available-scripts)
- [Coding Standards](#coding-standards)
- [Adding or Updating Translations](#adding-or-updating-translations)
- [Commit & Pull Request Guidelines](#commit--pull-request-guidelines)

## Code of Conduct

This project adheres to a [Code of Conduct](./CODE_OF_CONDUCT.md). By
participating, you are expected to uphold it.

## Getting Started

1. **Fork** the repository and clone your fork:
   ```bash
   git clone https://github.com/<your-username>/hex-viewer.git
   cd hex-viewer
   ```
2. **Install** dependencies (Node.js `>=18` is required):
   ```bash
   npm install
   ```
3. **Start** the dev server:
   ```bash
   npm run dev
   ```

## Development Workflow

1. Create a feature branch: `git checkout -b feat/my-feature`.
2. Make your changes and add tests.
3. Run the full check suite before pushing:
   ```bash
   npm run check
   ```
4. Push and open a Pull Request against `main`.

## Available Scripts

| Script                     | Description                                            |
| -------------------------- | ------------------------------------------------------ |
| `npm run dev`              | Start the Vite development server.                     |
| `npm run build`            | Build the production bundle into `dist/`.              |
| `npm run preview`          | Preview the production build locally.                  |
| `npm run test`             | Run the test suite once.                               |
| `npm run test:watch`       | Run tests in watch mode.                               |
| `npm run coverage`         | Run tests with coverage (enforces minimum thresholds). |
| `npm run lint`             | Lint the codebase with ESLint.                         |
| `npm run lint:fix`         | Lint and auto-fix issues.                              |
| `npm run format`           | Check formatting with Prettier.                        |
| `npm run format:fix`       | Auto-format the codebase with Prettier.                |
| `npm run check`            | Run format, lint, coverage, and build together.        |
| `npm run locales:generate` | Regenerate `src/locales/*.json` from the generator.    |
| `npm run deploy`           | Build and deploy to GitHub Pages.                      |

## Coding Standards

- Code is formatted with **Prettier** and linted with **ESLint**. Run
  `npm run format:fix` and `npm run lint:fix` before committing.
- Keep changes focused and covered by tests. Coverage must stay at or above the
  configured thresholds (see [vite.config.js](./vite.config.js)).
- Prefer small, well-named functions. Pure logic belongs in
  [src/functions.js](./src/functions.js) so it can be unit-tested easily.

## Adding or Updating Translations

The app ships with 26 UI languages. Translation strings are generated from a
single source of truth in [scripts/generate-locales.mjs](./scripts/generate-locales.mjs):

1. Add or edit the strings for a language in `scripts/generate-locales.mjs`.
2. If you are adding a **new** language, also add its native name to the
   `LANGUAGES` list in [src/i18n.js](./src/i18n.js) (and mark it in
   `RTL_LANGUAGES` if it is right-to-left).
3. Regenerate the locale files:
   ```bash
   npm run locales:generate
   ```
4. Run `npm run check` and open a PR.

English (`en`) is the fallback language; every key must exist there.

## Commit & Pull Request Guidelines

- Write clear, descriptive commit messages (e.g. `feat: add search box`).
- Reference related issues in the PR description (e.g. `Closes #12`).
- Add a note to the current date section of [CHANGELOG.md](./CHANGELOG.md).
- Ensure CI is green before requesting a review.

Thank you for making Hex Viewer better! ☕

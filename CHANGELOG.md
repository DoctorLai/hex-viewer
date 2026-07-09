# Changelog

All notable changes to this project are documented in this file.

This project does not maintain numbered releases. Changelog entries are grouped
by date instead.

## 2026-07-09

### Added

- 🌐 **Internationalization (i18n)** with 26 UI languages, including Traditional
  Chinese, and an in-app language selector. Locale files live in `src/locales/`
  and are generated from `scripts/generate-locales.mjs`.
- 📋 **Copy Hex Dump** button to copy a formatted dump to the clipboard.
- 💾 **Download** button to save the hex dump as a `.txt` file.
- 🔍 **Search / filter** box to find bytes by hex, ASCII, or offset.
- 🗑️ **Clear** button to reset the viewer.
- Right-to-left (RTL) layout support for Arabic and Urdu.
- ESLint (flat config) with React plugins and a `lint` / `lint:fix` script.
- Test coverage reporting via `@vitest/coverage-v8` with enforced minimum
  thresholds and a `coverage` script.
- A `check` script that runs format, lint, coverage, and build together.
- Community & project health files: `CONTRIBUTING.md`, `SECURITY.md`,
  `SUPPORT.md`, `PRIVACY.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md`,
  `.gitattributes`, a pull request template, and Dependabot configuration.
- Many new unit and component tests (functions, i18n, and the App UI).
- Numerous status badges in the README.

### Changed

- Refactored `App.jsx` to use the i18n layer and new toolbar/actions UI.
- CI workflow now also runs linting and coverage.

### Fixed

- Test setup no longer crashes on Node.js 20+ where `globalThis.crypto` is a
  read-only getter (the Web Crypto polyfill is now applied defensively).
- Corrected the `homepage` field in `package.json` (was pointing at an
  unrelated project).
- Removed an unused parameter in `vite.config.js`.
- Removed project version metadata and release-number-based changelog entries.

## 2025

### Added

- Initial release: upload or drag & drop a file to view its contents in
  hexadecimal and ASCII, 16 bytes per row.
- Light/dark mode with persistence.
- Vitest test suite and GitHub Pages deployment.

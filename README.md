# Hex Viewer App

[![CI](https://github.com/DoctorLai/hex-viewer/actions/workflows/ci.yaml/badge.svg)](https://github.com/DoctorLai/hex-viewer/actions/workflows/ci.yaml)
[![Coverage](https://github.com/DoctorLai/hex-viewer/actions/workflows/coverage.yaml/badge.svg)](https://github.com/DoctorLai/hex-viewer/actions/workflows/coverage.yaml)
[![Deploy](https://github.com/DoctorLai/hex-viewer/actions/workflows/deploy-pages.yaml/badge.svg)](https://github.com/DoctorLai/hex-viewer/actions/workflows/deploy-pages.yaml)
[![License: MIT](https://img.shields.io/github/license/DoctorLai/hex-viewer)](./LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen?logo=node.js&logoColor=white)](https://nodejs.org)
[![Code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier&logoColor=white)](https://prettier.io)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![JavaScript](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FDoctorLai%2Fhex-viewer%2Fbadges%2F.github%2Fbadges%2Fjavascript.json)](https://github.com/DoctorLai/hex-viewer/search?l=javascript)
[![Top Language](https://img.shields.io/github/languages/top/DoctorLai/hex-viewer)](https://github.com/DoctorLai/hex-viewer)
[![Repo Size](https://img.shields.io/github/repo-size/DoctorLai/hex-viewer)](https://github.com/DoctorLai/hex-viewer)
[![Last Commit](https://img.shields.io/github/last-commit/DoctorLai/hex-viewer)](https://github.com/DoctorLai/hex-viewer/commits/main)
[![Commit Activity](https://img.shields.io/github/commit-activity/m/DoctorLai/hex-viewer)](https://github.com/DoctorLai/hex-viewer/pulse)
[![Open Issues](https://img.shields.io/github/issues/DoctorLai/hex-viewer)](https://github.com/DoctorLai/hex-viewer/issues)
[![Open PRs](https://img.shields.io/github/issues-pr/DoctorLai/hex-viewer)](https://github.com/DoctorLai/hex-viewer/pulls)
[![Stars](https://img.shields.io/github/stars/DoctorLai/hex-viewer)](https://github.com/DoctorLai/hex-viewer/stargazers)
[![Forks](https://img.shields.io/github/forks/DoctorLai/hex-viewer)](https://github.com/DoctorLai/hex-viewer/network/members)
[![Watchers](https://img.shields.io/github/watchers/DoctorLai/hex-viewer)](https://github.com/DoctorLai/hex-viewer/watchers)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/DoctorLai/hex-viewer)

A simple React web app that lets you upload or drag & drop any file and view its contents in **hexadecimal and ASCII format**. The project is available in **26 languages**, supports **dark mode**, is fully tested with Vitest, and can be easily deployed to GitHub Pages.

<img width="1028" height="786" alt="image" src="https://github.com/user-attachments/assets/3cacd4ea-1236-4112-8115-eca506717d34" />

## Features

- **Hex Viewer**: Displays the hex bytes of a file alongside their ASCII representation, 16 bytes per row.
- **Drag & Drop or Upload**: Easily load files via file input or drag & drop.
- **Search / Filter**: Instantly filter rows by hex (spaces optional), ASCII text, or offset.
- **Copy & Download**: Copy the formatted hex dump to your clipboard or download it as a `.txt` file.
- **26 Languages**: Fully internationalized UI with an in-app language selector and automatic browser-language detection (including Traditional Chinese and right-to-left support for Arabic and Urdu).
- **Dark Mode**: Toggle between light and dark modes for better readability.
- **Privacy-first**: Files are parsed entirely in your browser — nothing is ever uploaded. See [PRIVACY.md](./PRIVACY.md).
- **Clean and Intuitive UI**: Hex and ASCII columns are styled for clarity.
- **Responsive Design**: Works well on desktop and tablet screens.

## Live Demo

The live demo is deployed here:

- [GitHub Pages: Hex Viewer](https://doctorlai.github.io/hex-viewer/)

## Installation

To run the app locally:

1. Clone the repository:

```bash
git clone https://github.com/doctorlai/hex-viewer.git
cd hex-viewer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Run tests:

```bash
npm run test        # Run once
npm run coverage    # Run with coverage (enforces minimum thresholds)
```

5. Lint & format code:

```bash
npm run lint        # Check for lint errors
npm run lint:fix    # Auto-fix lint errors
npm run format      # Check formatting
npm run format:fix  # Automatically fix formatting
```

6. Run everything at once (format, lint, coverage, build):

```bash
    npm run check
```

7. Open [http://localhost:5173/](http://localhost:5173/) in your browser.

## Available Scripts

| Script                     | Description                                             |
| -------------------------- | ------------------------------------------------------- |
| `npm run dev`              | Start the Vite development server.                      |
| `npm run build`            | Build the production bundle into `dist/`.               |
| `npm run preview`          | Preview the production build locally.                   |
| `npm run test`             | Run the test suite once.                                |
| `npm run test:watch`       | Run tests in watch mode.                                |
| `npm run coverage`         | Run tests with coverage and enforce minimum thresholds. |
| `npm run lint`             | Lint the codebase with ESLint.                          |
| `npm run lint:fix`         | Lint and auto-fix issues.                               |
| `npm run format`           | Check formatting with Prettier.                         |
| `npm run format:fix`       | Auto-format the codebase.                               |
| `npm run check`            | Run format, lint, coverage, and build together.         |
| `npm run locales:generate` | Regenerate `src/locales/*.json` translation files.      |
| `npm run deploy`           | Build and deploy to GitHub Pages.                       |

## Usage

1. Upload a file or drag & drop it into the app.
2. View the file’s **hexadecimal bytes** and **ASCII representation** side by side.
3. Use the **search box** to filter rows by hex (e.g. `48 65` or `4865`), ASCII text, or offset.
4. **Copy** 📋 the hex dump to your clipboard or **download** 💾 it as a `.txt` file.
5. Change the **language** 🌐 from the selector in the top toolbar.
6. Toggle **Light/Dark Mode** using the 🌞/🌙 button.
7. Press 🗑️ **Clear** to reset and load another file.

## Internationalization

Hex Viewer ships with **26 UI languages**, including Traditional Chinese. Translation
strings live in [`src/locales/`](./src/locales) and are generated from a single
source of truth in [`scripts/generate-locales.mjs`](./scripts/generate-locales.mjs).
To add or update a translation, edit the generator and run:

```bash
    npm run locales:generate
```

See [CONTRIBUTING.md](./CONTRIBUTING.md#adding-or-updating-translations) for details.

## Contributing

Contributions are welcome! Please read the [Contributing Guide](./CONTRIBUTING.md)
and our [Code of Conduct](./CODE_OF_CONDUCT.md) before getting started.

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature-branch
```

3. Make your changes and ensure `npm run check` passes.
4. Commit your changes:

```bash
git commit -am 'Add new feature'
```

5. Push to your fork:

```bash
git push origin feature-branch
```

6. Open a Pull Request.

## Documentation & Policies

- 📘 [Contributing Guide](./CONTRIBUTING.md)
- 🛟 [Support](./SUPPORT.md)
- 🔒 [Security Policy](./SECURITY.md)
- 🕵️ [Privacy Policy](./PRIVACY.md)
- 🤝 [Code of Conduct](./CODE_OF_CONDUCT.md)
- 📝 [Changelog](./CHANGELOG.md)
- 🤖 [AI-generated docs (DeepWiki)](https://deepwiki.com/DoctorLai/hex-viewer)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- Built with ❤️ by [@justyy](https://github.com/doctorlai)
- Initial boilerplate provided by ChatGPT.
- If you found this tool useful, consider buying me a [coffee](https://buymeacoffee.com/y0btg5r) ☕ Thank you!

# Privacy Policy

_Last updated: 2026-07-09_

**Hex Viewer** is designed with privacy as a first principle.

## The short version

**Your files never leave your device.** Hex Viewer is a static, client-side web
application. When you open or drag & drop a file, it is read and parsed entirely
in your browser using the standard [`FileReader`](https://developer.mozilla.org/docs/Web/API/FileReader)
API. No file contents, file names, or metadata are ever uploaded to any server.

## What we store

Hex Viewer uses your browser's `localStorage` **only** to remember your
preferences between visits:

| Key        | Purpose                                |
| ---------- | -------------------------------------- |
| `darkMode` | Whether light or dark mode is enabled. |
| `language` | Your selected interface language.      |

This data stays on your device and can be cleared at any time by clearing your
browser's site data. There is no account system and nothing is transmitted.

## What we do **not** do

- ❌ No file uploads or network transmission of your data.
- ❌ No cookies used for tracking.
- ❌ No analytics, advertising, or third-party trackers.
- ❌ No selling or sharing of personal data (we do not collect any).

## Hosting

The live demo is hosted on **GitHub Pages**. As with any website, the hosting
provider (GitHub) may collect standard technical information such as IP
addresses in its server logs. This is governed by
[GitHub's Privacy Statement](https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement).

## Changes

This policy may be updated over time. Material changes will be noted in
[CHANGELOG.md](./CHANGELOG.md).

## Contact

Questions about privacy? Reach out via [https://justyy.com](https://justyy.com)
or open an issue.

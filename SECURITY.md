# Security Policy

## Security Updates

Hex Viewer is a client-side, static web application. Security fixes are applied
to the `main` branch and the live GitHub Pages deployment. This project does not
maintain numbered release lines.

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please
**do not open a public issue**. Instead, report it privately:

- Preferred: open a [GitHub Security Advisory](https://github.com/DoctorLai/hex-viewer/security/advisories/new).
- Alternatively, contact the maintainer via [https://justyy.com](https://justyy.com).

Please include:

- A description of the vulnerability and its impact.
- Steps to reproduce (proof of concept, if possible).
- Any suggested remediation.

We will acknowledge your report as soon as possible and keep you informed of the
progress toward a fix and public disclosure.

## Scope

Hex Viewer runs entirely in the browser and does **not** upload or transmit any
file you open — all parsing happens locally. See [PRIVACY.md](./PRIVACY.md) for
details. The most relevant classes of issues are therefore:

- Cross-site scripting (XSS) via crafted file names or contents.
- Supply-chain issues in dependencies (tracked via Dependabot).

Thank you for helping keep Hex Viewer and its users safe!

import "@testing-library/jest-dom/vitest"; // Custom DOM matchers (toBeInTheDocument, etc.)
import { webcrypto } from "node:crypto"; // Node.js built-in Web Crypto

// jsdom does not always expose the Web Crypto API. Depending on the Node
// version, `globalThis.crypto` may be undefined or a read-only getter, so we
// polyfill it defensively without ever reassigning a read-only property.
if (!globalThis.crypto) {
  Object.defineProperty(globalThis, "crypto", {
    value: webcrypto,
    configurable: true,
  });
} else if (typeof globalThis.crypto.randomUUID !== "function") {
  globalThis.crypto.randomUUID = webcrypto.randomUUID.bind(webcrypto);
}

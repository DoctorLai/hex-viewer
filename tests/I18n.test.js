import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  LANGUAGES,
  DEFAULT_LANGUAGE,
  isSupported,
  getDirection,
  detectLanguage,
  getStoredLanguage,
  getInitialLanguage,
  translate,
} from "../src/i18n";

describe("i18n metadata", () => {
  it("exposes 26 supported languages", () => {
    expect(LANGUAGES).toHaveLength(26);
  });

  it("lists English first as the default language", () => {
    expect(DEFAULT_LANGUAGE).toBe("en");
    expect(LANGUAGES[0].code).toBe("en");
  });

  it("gives every language a native display name", () => {
    for (const lang of LANGUAGES) {
      expect(typeof lang.name).toBe("string");
      expect(lang.name.length).toBeGreaterThan(0);
    }
  });
});

describe("isSupported", () => {
  it("recognises bundled languages", () => {
    expect(isSupported("en")).toBe(true);
    expect(isSupported("zh")).toBe(true);
    expect(isSupported("zh-tw")).toBe(true);
  });

  it("rejects unknown or empty values", () => {
    expect(isSupported("xx")).toBe(false);
    expect(isSupported("")).toBe(false);
    expect(isSupported(null)).toBe(false);
  });
});

describe("getDirection", () => {
  it("returns rtl for right-to-left languages", () => {
    expect(getDirection("ar")).toBe("rtl");
    expect(getDirection("ur")).toBe("rtl");
  });

  it("returns ltr for everything else", () => {
    expect(getDirection("en")).toBe("ltr");
    expect(getDirection("zh")).toBe("ltr");
  });
});

describe("translate", () => {
  it("returns the string for the requested language", () => {
    expect(translate("en", "appTitle")).toBe("Simple Hex Viewer");
    expect(translate("zh-tw", "appTitle")).toBe("簡易十六進位檢視器");
    expect(translate("es", "appTitle")).toBe("Visor Hexadecimal Simple");
  });

  it("falls back to English for an unsupported language", () => {
    expect(translate("xx", "appTitle")).toBe("Simple Hex Viewer");
  });

  it("falls back to the key when it is missing everywhere", () => {
    expect(translate("en", "doesNotExist")).toBe("doesNotExist");
  });
});

describe("language detection and storage", () => {
  const originalLanguage = Object.getOwnPropertyDescriptor(
    navigator,
    "language",
  );

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    if (originalLanguage) {
      Object.defineProperty(navigator, "language", originalLanguage);
    }
  });

  it("detects a supported browser language", () => {
    Object.defineProperty(navigator, "language", {
      value: "fr-FR",
      configurable: true,
    });
    expect(detectLanguage()).toBe("fr");
  });

  it("prefers an exact supported browser locale over its base language", () => {
    Object.defineProperty(navigator, "language", {
      value: "zh-TW",
      configurable: true,
    });
    expect(detectLanguage()).toBe("zh-tw");
  });

  it("falls back to English for unsupported browser languages", () => {
    Object.defineProperty(navigator, "language", {
      value: "xx-XX",
      configurable: true,
    });
    expect(detectLanguage()).toBe("en");
  });

  it("reads a valid stored language", () => {
    localStorage.setItem("language", "de");
    expect(getStoredLanguage()).toBe("de");
  });

  it("ignores an invalid stored language", () => {
    localStorage.setItem("language", "not-a-lang");
    expect(getStoredLanguage()).toBeNull();
  });

  it("prefers the stored language over detection", () => {
    localStorage.setItem("language", "ja");
    expect(getInitialLanguage()).toBe("ja");
  });
});

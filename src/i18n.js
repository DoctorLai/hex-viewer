// Lightweight i18n helper for the Hex Viewer app.
//
// Translation strings live in ./locales/<code>.json and are generated from
// scripts/generate-locales.mjs. English (`en`) is the source of truth and is
// used as a fallback for any missing key or unsupported language.

// Eagerly import every locale JSON file so the bundler can tree-shake and
// inline them. `import.meta.glob` is provided by Vite (and Vitest).
const modules = import.meta.glob("./locales/*.json", {
  eager: true,
  import: "default",
});

const translations = {};
for (const path in modules) {
  const match = path.match(/([A-Za-z-]+)\.json$/);
  if (match) {
    translations[match[1]] = modules[path];
  }
}

export const DEFAULT_LANGUAGE = "en";

// Ordered list of supported languages with their native display names. Only
// languages that have a matching locale file are exposed.
export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
  { code: "zh-tw", name: "繁體中文" },
  { code: "hi", name: "हिन्दी" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "ar", name: "العربية" },
  { code: "bn", name: "বাংলা" },
  { code: "pt", name: "Português" },
  { code: "ru", name: "Русский" },
  { code: "ur", name: "اردو" },
  { code: "id", name: "Bahasa Indonesia" },
  { code: "de", name: "Deutsch" },
  { code: "ja", name: "日本語" },
  { code: "sw", name: "Kiswahili" },
  { code: "mr", name: "मराठी" },
  { code: "te", name: "తెలుగు" },
  { code: "tr", name: "Türkçe" },
  { code: "ta", name: "தமிழ்" },
  { code: "ko", name: "한국어" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "it", name: "Italiano" },
  { code: "th", name: "ไทย" },
  { code: "pl", name: "Polski" },
  { code: "nl", name: "Nederlands" },
  { code: "uk", name: "Українська" },
].filter((lang) => translations[lang.code]);

// Right-to-left languages get a matching text direction.
const RTL_LANGUAGES = new Set(["ar", "ur"]);

export function isSupported(lang) {
  return Boolean(lang && translations[lang]);
}

export function getDirection(lang) {
  return RTL_LANGUAGES.has(lang) ? "rtl" : "ltr";
}

// Pick the best language from the browser settings, falling back to English.
export function detectLanguage() {
  if (typeof navigator === "undefined") return DEFAULT_LANGUAGE;
  const candidates = [navigator.language, ...(navigator.languages || [])];
  for (const candidate of candidates) {
    if (!candidate) continue;
    const normalized = candidate.toLowerCase();
    if (translations[normalized]) return normalized;
    const short = normalized.split("-")[0];
    if (translations[short]) return short;
  }
  return DEFAULT_LANGUAGE;
}

export function getStoredLanguage() {
  const saved =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("language")
      : null;
  return isSupported(saved) ? saved : null;
}

export function getInitialLanguage() {
  return getStoredLanguage() || detectLanguage();
}

// Translate a key for the given language, falling back to English then the key.
export function translate(lang, key) {
  const table = translations[lang] || translations[DEFAULT_LANGUAGE];
  if (table && key in table) return table[key];
  const fallback = translations[DEFAULT_LANGUAGE];
  return fallback && key in fallback ? fallback[key] : key;
}

export { translations };

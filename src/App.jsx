import "./App.css";
import { useState, useEffect, useMemo } from "react";
import {
  parseHexData,
  formatFileSize,
  formatHexDump,
  filterRows,
} from "./functions";
import { LANGUAGES, getInitialLanguage, getDirection, translate } from "./i18n";

export default function App() {
  const appDate = "2026-07-09";
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  const [lang, setLang] = useState(() => getInitialLanguage());
  const [hexData, setHexData] = useState([]);
  const [fileInfo, setFileInfo] = useState(null);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const t = (key) => translate(lang, key);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("language", lang);
  }, [lang]);

  const filteredData = useMemo(
    () => filterRows(hexData, query),
    [hexData, query],
  );

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setHexData(parseHexData(e.target.result));
      setFileInfo({
        name: file.name,
        size: formatFileSize(file.size),
        sizeInBytes: file.size,
        lastModified: new Date(file.lastModified).toLocaleString(),
      });
      setQuery("");
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = (e) => {
    if (e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleCopy = async () => {
    const text = formatHexDump(hexData);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API may be unavailable (e.g. insecure context); ignore.
    }
  };

  const handleDownload = () => {
    const text = formatHexDump(hexData);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileInfo?.name ?? "hexdump"}.hex.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setHexData([]);
    setFileInfo(null);
    setQuery("");
  };

  const hasData = hexData.length > 0;

  return (
    <div
      className={darkMode ? "app dark" : "app"}
      dir={getDirection(lang)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="toolbar">
        <label className="lang-select">
          🌐{" "}
          <select
            aria-label={t("language")}
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          aria-pressed={darkMode}
        >
          {darkMode ? `🌞 ${t("lightMode")}` : `🌙 ${t("darkMode")}`}
        </button>
      </div>

      <h1>📂 {t("appTitle")}</h1>

      <input type="file" aria-label={t("file")} onChange={handleUpload} />

      <div>{t("uploadPrompt")}</div>

      {fileInfo && (
        <div className="file-info">
          <p>
            <strong>{t("file")}:</strong> {fileInfo.name} <br />
            <strong>{t("size")}:</strong> {fileInfo.size} <br />
            <strong>{t("size")} (B):</strong> {fileInfo.sizeInBytes} <br />
            <strong>{t("size")} (KB):</strong>{" "}
            {(fileInfo.sizeInBytes / 1024).toFixed(3)} <br />
            <strong>{t("size")} (MB):</strong>{" "}
            {(fileInfo.sizeInBytes / 1024 / 1024).toFixed(3)} <br />
            <strong>{t("lastModified")}:</strong> {fileInfo.lastModified}
          </p>
        </div>
      )}

      {hasData && (
        <div className="actions">
          <input
            type="search"
            className="search"
            placeholder={t("search")}
            aria-label={t("search")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" onClick={handleCopy}>
            📋 {copied ? t("copied") : t("copy")}
          </button>
          <button type="button" onClick={handleDownload}>
            💾 {t("download")}
          </button>
          <button type="button" onClick={handleClear}>
            🗑️ {t("clear")}
          </button>
        </div>
      )}

      {hasData && (
        <div className="hex-viewer">
          {filteredData.length === 0 ? (
            <p className="no-matches">{t("noMatches")}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>{t("offset")}</th>
                  <th>Hex</th>
                  <th>ASCII</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr key={row.offset}>
                    <td className="offset">{row.offset}</td>
                    <td className="hex">{row.hex}</td>
                    <td className="ascii">{row.ascii}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <footer>
        <div className="footer">
          <p>
            {t("madeWith")}{" "}
            <a
              href="https://github.com/doctorlai"
              target="_blank"
              rel="noopener noreferrer"
            >
              @justyy
            </a>
            <br />
            {t("openSource")}{" "}
            <a
              href="https://github.com/doctorlai/hex-viewer"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <br />
            {t("foundUseful")}{" "}
            <a
              href="https://buymeacoffee.com/y0btg5r"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("buyCoffee")}
            </a>
            <br />
            <small className="app-version">Version: {appDate}</small>
          </p>
        </div>
      </footer>
    </div>
  );
}

// functions.js

export function parseHexData(arrayBuffer) {
  const buffer = new Uint8Array(arrayBuffer);
  const rows = [];

  for (let i = 0; i < buffer.length; i += 16) {
    const slice = buffer.slice(i, i + 16);
    const hexPart = Array.from(slice)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(" ");
    const asciiPart = Array.from(slice)
      .map((b) => (b >= 32 && b <= 126 ? String.fromCharCode(b) : "."))
      .join("");
    rows.push({
      offset: i.toString(16).padStart(8, "0"),
      hex: hexPart,
      ascii: asciiPart,
    });
  }
  return rows;
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// Render parsed rows as a classic, copy/paste-friendly hex dump:
//   00000000  48 65 6c 6c 6f                                    |Hello|
export function formatHexDump(rows) {
  return rows
    .map((row) => `${row.offset}  ${row.hex.padEnd(47, " ")}  |${row.ascii}|`)
    .join("\n");
}

// Filter rows by a free-text query. Hex is matched ignoring spaces/case (so
// "48656c" matches "48 65 6c"), while ASCII and offset are matched as typed.
export function filterRows(rows, query) {
  const raw = (query || "").trim().toLowerCase();
  if (!raw) return rows;
  const hexQuery = raw.replace(/\s+/g, "");
  return rows.filter((row) => {
    const hexNormalized = row.hex.replace(/\s+/g, "").toLowerCase();
    return (
      hexNormalized.includes(hexQuery) ||
      row.ascii.toLowerCase().includes(raw) ||
      row.offset.toLowerCase().includes(raw)
    );
  });
}

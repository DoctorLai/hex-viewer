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

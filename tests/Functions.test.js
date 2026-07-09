import { describe, it, expect } from "vitest";
import {
  parseHexData,
  formatFileSize,
  formatHexDump,
  filterRows,
} from "../src/functions";

describe("formatFileSize", () => {
  it("formats bytes correctly", () => {
    expect(formatFileSize(0)).toBe("0 B");
    expect(formatFileSize(512)).toBe("512 B");
    expect(formatFileSize(1023)).toBe("1023 B");
  });

  it("formats kilobytes correctly", () => {
    expect(formatFileSize(1024)).toBe("1.00 KB");
    expect(formatFileSize(1536)).toBe("1.50 KB");
    expect(formatFileSize(1024 * 1024 - 1)).toBe("1024.00 KB");
  });

  it("formats megabytes correctly", () => {
    expect(formatFileSize(1024 * 1024)).toBe("1.00 MB");
    expect(formatFileSize(5 * 1024 * 1024 + 512 * 1024)).toBe("5.50 MB");
    expect(formatFileSize(10 * 1024 * 1024)).toBe("10.00 MB");
  });
});

describe("parseHexData", () => {
  test("parseHexData converts ArrayBuffer to hex/ASCII rows", () => {
    const buffer = new Uint8Array([72, 101, 108, 108, 111, 0, 255]).buffer;
    const rows = parseHexData(buffer);

    expect(rows.length).toBe(1);
    expect(rows[0].offset).toBe("00000000");
    expect(rows[0].hex).toBe("48 65 6c 6c 6f 00 ff");
    expect(rows[0].ascii).toBe("Hello.."); // 0 and 255 become '.'
  });

  it("returns an empty array for an empty buffer", () => {
    expect(parseHexData(new Uint8Array([]).buffer)).toEqual([]);
  });

  it("splits data into 16-byte rows with incrementing offsets", () => {
    const buffer = new Uint8Array(20).fill(65).buffer; // 20 x 'A'
    const rows = parseHexData(buffer);

    expect(rows.length).toBe(2);
    expect(rows[0].offset).toBe("00000000");
    expect(rows[1].offset).toBe("00000010"); // 16 in hex
    expect(rows[0].ascii).toBe("A".repeat(16));
    expect(rows[1].ascii).toBe("A".repeat(4));
  });
});

describe("formatHexDump", () => {
  it("renders an aligned, copy-friendly dump", () => {
    const rows = parseHexData(new Uint8Array([72, 101, 108, 108, 111]).buffer);
    const dump = formatHexDump(rows);

    expect(dump).toBe(`00000000  ${"48 65 6c 6c 6f".padEnd(47, " ")}  |Hello|`);
  });

  it("joins multiple rows with newlines", () => {
    const rows = parseHexData(new Uint8Array(20).fill(65).buffer);
    const dump = formatHexDump(rows);

    expect(dump.split("\n")).toHaveLength(2);
  });

  it("returns an empty string for no rows", () => {
    expect(formatHexDump([])).toBe("");
  });
});

describe("filterRows", () => {
  const rows = parseHexData(
    new Uint8Array([72, 101, 108, 108, 111, 0, 255]).buffer,
  );

  it("returns all rows for an empty query", () => {
    expect(filterRows(rows, "")).toBe(rows);
    expect(filterRows(rows, "   ")).toBe(rows);
    expect(filterRows(rows, undefined)).toBe(rows);
  });

  it("matches hex ignoring spaces and case", () => {
    expect(filterRows(rows, "48 65")).toHaveLength(1);
    expect(filterRows(rows, "4865")).toHaveLength(1);
    expect(filterRows(rows, "FF")).toHaveLength(1);
  });

  it("matches ASCII text", () => {
    expect(filterRows(rows, "Hello")).toHaveLength(1);
    expect(filterRows(rows, "hello")).toHaveLength(1);
  });

  it("matches the offset column", () => {
    expect(filterRows(rows, "00000000")).toHaveLength(1);
  });

  it("returns no rows when nothing matches", () => {
    expect(filterRows(rows, "zzzz")).toHaveLength(0);
  });
});

import { describe, it, expect } from "vitest";
import { parseHexData, formatFileSize } from "../src/functions";

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
});

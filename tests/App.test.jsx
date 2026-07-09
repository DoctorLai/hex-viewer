import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, it, expect, vi, beforeEach, afterEach } from "vitest";
import App from "../src/App";
import { formatHexDump, parseHexData } from "../src/functions";

// "Hello" -> 48 65 6c 6c 6f
const HELLO_BYTES = new Uint8Array([72, 101, 108, 108, 111]);

function makeFile(bytes = HELLO_BYTES, name = "hello.bin") {
  return new File([bytes], name, { lastModified: 0 });
}

async function uploadFile(file = makeFile()) {
  const input = screen.getByLabelText("File");
  fireEvent.change(input, { target: { files: [file] } });
  // The FileReader resolves asynchronously.
  await screen.findByText("48 65 6c 6c 6f");
}

beforeEach(() => {
  localStorage.clear();
});

test("renders Hex Viewer UI", () => {
  render(<App />);
  const linkElement = screen.getByText(/Simple Hex Viewer/i);
  expect(linkElement).to.exist;
});

test("renders the date-based version in the footer", () => {
  render(<App />);
  expect(screen.getByText("Version: 2026-07-09")).toBeInTheDocument();
});

describe("file loading", () => {
  it("renders hex, ascii and file info after upload", async () => {
    render(<App />);
    await uploadFile();

    expect(screen.getByText("48 65 6c 6c 6f")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText(/hello\.bin/)).toBeInTheDocument();
  });

  it("loads a file dropped onto the app", async () => {
    const { container } = render(<App />);
    const app = container.querySelector(".app");

    fireEvent.drop(app, { dataTransfer: { files: [makeFile()] } });
    expect(await screen.findByText("48 65 6c 6c 6f")).toBeInTheDocument();
  });
});

describe("dark mode", () => {
  it("toggles theme and persists the choice", () => {
    const { container } = render(<App />);
    const app = container.querySelector(".app");
    expect(app).not.toHaveClass("dark");

    fireEvent.click(screen.getByRole("button", { name: /Dark Mode/ }));

    expect(app).toHaveClass("dark");
    expect(localStorage.getItem("darkMode")).toBe("true");
  });
});

describe("language selection", () => {
  it("switches the UI language and persists it", () => {
    render(<App />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "es" },
    });

    expect(screen.getByText(/Visor Hexadecimal Simple/)).toBeInTheDocument();
    expect(localStorage.getItem("language")).toBe("es");
  });
});

describe("search / filter", () => {
  it("filters rows and shows a no-matches message", async () => {
    render(<App />);
    await uploadFile();

    const search = screen.getByRole("searchbox");

    fireEvent.change(search, { target: { value: "Hello" } });
    expect(screen.getByText("48 65 6c 6c 6f")).toBeInTheDocument();

    fireEvent.change(search, { target: { value: "zzzz" } });
    expect(screen.getByText("No matches")).toBeInTheDocument();
    expect(screen.queryByText("48 65 6c 6c 6f")).not.toBeInTheDocument();
  });
});

describe("copy", () => {
  let writeText;

  beforeEach(() => {
    writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("copies the hex dump to the clipboard", async () => {
    render(<App />);
    await uploadFile();

    fireEvent.click(screen.getByRole("button", { name: /Copy Hex Dump/ }));

    const expected = formatHexDump(parseHexData(HELLO_BYTES.buffer));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith(expected));
    expect(
      await screen.findByRole("button", { name: /Copied!/ }),
    ).toBeInTheDocument();
  });

  it("does not throw when the clipboard API is unavailable", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true,
    });
    render(<App />);
    await uploadFile();

    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: /Copy Hex Dump/ })),
    ).not.toThrow();
  });
});

describe("download", () => {
  it("creates a downloadable blob of the hex dump", async () => {
    const createObjectURL = vi.fn(() => "blob:mock");
    const revokeObjectURL = vi.fn();
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = revokeObjectURL;
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});

    render(<App />);
    await uploadFile();

    fireEvent.click(screen.getByRole("button", { name: /Download/ }));

    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:mock");

    clickSpy.mockRestore();
  });
});

describe("clear", () => {
  it("removes the loaded file and hex table", async () => {
    render(<App />);
    await uploadFile();
    expect(screen.getByText(/hello\.bin/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Clear/ }));

    expect(screen.queryByText(/hello\.bin/)).not.toBeInTheDocument();
    expect(screen.queryByText("48 65 6c 6c 6f")).not.toBeInTheDocument();
  });
});

import "./App.css";
import { useState, useEffect } from "react";
import { parseHexData, formatFileSize } from "./functions";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  const [hexData, setHexData] = useState([]);
  const [fileInfo, setFileInfo] = useState(null);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

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

  return (
    <div
      className={darkMode ? "app dark" : "app"}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h1>📂 File Hex Viewer</h1>

      <input type="file" onChange={handleUpload} />

      <div>Or drag & drop a file here</div>

      {fileInfo && (
        <div className="file-info">
          <p>
            <strong>File:</strong> {fileInfo.name} <br />
            <strong>Size:</strong> {fileInfo.size} <br />
            <strong>Size (Byte):</strong> {fileInfo.sizeInBytes} <br />
            <strong>Size (KB):</strong>{" "}
            {(fileInfo.sizeInBytes / 1024).toFixed(3)} <br />
            <strong>Size (MB):</strong>{" "}
            {(fileInfo.sizeInBytes / 1024 / 1024).toFixed(3)} <br />
            <strong>Last Modified:</strong> {fileInfo.lastModified}
          </p>
        </div>
      )}

      {hexData.length > 0 && (
        <div className="hex-viewer">
          <table>
            <thead>
              <tr>
                <th>Offset</th>
                <th>Hex</th>
                <th>ASCII</th>
              </tr>
            </thead>
            <tbody>
              {hexData.map((row, i) => (
                <tr key={i}>
                  <td className="offset">{row.offset}</td>
                  <td className="hex">{row.hex}</td>
                  <td className="ascii">{row.ascii}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <footer>
        <div className="footer">
          <p>
            Made with ❤️ by{" "}
            <a
              href="https://github.com/doctorlai"
              target="_blank"
              rel="noopener noreferrer"
            >
              @justyy
            </a>
            <br />
            Open Source at{" "}
            <a
              href="https://github.com/doctorlai/hex-viewer"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <br />
            If you found this useful, consider{" "}
            <a
              href="https://justyy.com/out/bmc"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy me a coffee ☕
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

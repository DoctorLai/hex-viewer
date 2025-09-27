# Hex Viewer App
[![Hex Viewer (Built, Lint and Test)](https://github.com/DoctorLai/hex-viewer/actions/workflows/ci.yaml/badge.svg)](https://github.com/DoctorLai/hex-viewer/actions/workflows/ci.yaml)

A simple React web app that lets you upload or drag & drop any file and view its contents in **hexadecimal and ASCII format**. The project supports **dark mode**, is fully tested with Vitest, and can be easily deployed to GitHub Pages.

<img width="879" height="474" alt="image" src="https://github.com/user-attachments/assets/06192443-c137-4d4b-adff-da564644da21" />

## Features

- **Hex Viewer**: Displays the hex bytes of a file alongside their ASCII representation, 16 bytes per row.  
- **Drag & Drop or Upload**: Easily load files via file input or drag & drop.  
- **Dark Mode**: Toggle between light and dark modes for better readability.  
- **Clean and Intuitive UI**: Hex and ASCII columns are styled for clarity.  
- **Responsive Design**: Works well on desktop and tablet screens.  

## Live Demo

The live demo is deployed here:  
- [GitHub Pages: Hex Viewer](https://doctorlai.github.io/hex-viewer/)

## Installation

To run the app locally:

1. Clone the repository:
```bash
    git clone https://github.com/doctorlai/hex-viewer.git
    cd hex-viewer
```

2. Install dependencies:  
```bash
    npm install
```

3. Start the development server:  
```bash
    npm run dev
```

4. Run tests:
```bash
    npm run test
```

5. Format code:
```bash
    npm run format     # Check formatting
    npm run format:fix # Automatically fix formatting
```

6. Open [http://localhost:5173/](http://localhost:5173/) in your browser.

## Usage

1. Upload a file or drag & drop it into the app.  
2. View the file’s **hexadecimal bytes** and **ASCII representation** side by side.  
3. Toggle **Light/Dark Mode** using the 🌞/🌙 button.  
4. Scroll to explore the full file content.

## Contributing

Contributions are welcome!  

1. Fork the repository.  
2. Create a feature branch:
```bash
    git checkout -b feature-branch
```
3. Commit your changes:
```bash
    git commit -am 'Add new feature'
```
4. Push to your fork:
```bash
    git push origin feature-branch
```
5. Open a Pull Request.  

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Extra Documentation
AI generated document can be found [here](https://deepwiki.com/DoctorLai/hex-viewer)

## Acknowledgments

- Built with ❤️ by [@justyy](https://github.com/doctorlai)  
- Initial boilerplate provided by ChatGPT.  
- If you found this tool useful, consider buying me a [coffee](https://justyy.com/out/bmc) ☕ Thank you!  

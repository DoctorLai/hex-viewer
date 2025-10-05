import { render, screen } from "@testing-library/react";
import App from "../src/App";

test("renders Hex Viewer UI", () => {
  render(<App />);
  const linkElement = screen.getByText(/File Hex Viewer/i);
  expect(linkElement).to.exist;
});

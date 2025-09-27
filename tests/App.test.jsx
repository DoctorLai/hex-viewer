import { render, screen } from "@testing-library/react";
import App from "../src/App";

test("renders Hex Viewer UI", () => {
  render(<App />);
  const linkElement = screen.getByText(/Simple Hex Viewer/i);
  expect(linkElement).to.exist;
});

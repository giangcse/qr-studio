import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("render không bị crash và hiển thị tiêu đề", () => {
    render(<App />);
    expect(
      screen.getByText(/QR Studio/i, { selector: "h1" })
    ).toBeInTheDocument();
  });
});


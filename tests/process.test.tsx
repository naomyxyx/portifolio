import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HowWeCreate from "@/components/HowWeCreate";

describe("Como criamos", () => {
  it("mantém os controles da ilustração como elementos não clicáveis", () => {
    render(<HowWeCreate />);

    fireEvent.click(screen.getByRole("button", { name: "Design" }));

    const illustratedCta = screen.getByText("RESERVAR UMA MESA");
    expect(illustratedCta.tagName).toBe("SPAN");
    expect(illustratedCta).not.toHaveAttribute("role", "button");
  });

  it("troca a etapa com os seletores visuais comuns", () => {
    render(<HowWeCreate />);

    const strategy = screen.getByRole("button", { name: /estratégia/i });
    fireEvent.click(strategy);

    expect(strategy).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByLabelText(/ilustração da etapa estratégia/i)).toBeInTheDocument();
  });
});

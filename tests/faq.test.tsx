import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Faq from "@/components/Faq";

describe("FAQ", () => {
  it("abre e fecha uma resposta usando o mesmo botão", () => {
    render(<Faq />);

    const supportButton = screen.getByRole("button", {
      name: /existe suporte após a publicação/i,
    });

    expect(supportButton).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(supportButton);
    expect(supportButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/posso oferecer um período de acompanhamento/i)).toBeInTheDocument();

    fireEvent.click(supportButton);
    expect(supportButton).toHaveAttribute("aria-expanded", "false");
  });
});

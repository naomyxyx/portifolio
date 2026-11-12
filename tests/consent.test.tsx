import { StrictMode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import TrackingConsent from "@/components/TrackingConsent";
import { CONSENT_KEY, Tracking } from "@/lib/tracking";
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER, WHATSAPP_URL } from "@/lib/contact";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
beforeEach(() => { localStorage.clear(); sessionStorage.clear(); vi.restoreAllMocks(); });
it("offers unchecked categories, accepts separately and allows later refusal", () => {
  render(<TrackingConsent />);
  const analytics = screen.getByLabelText(/Análise de visitas/);
  expect(analytics).not.toBeChecked();
  expect(screen.getByLabelText(/Publicidade/)).not.toBeChecked();
  fireEvent.click(analytics);
  fireEvent.click(screen.getByRole("button", { name: "Salvar escolhas" }));
  expect(JSON.parse(localStorage.getItem(CONSENT_KEY)!)).toMatchObject({ analytics: true, marketing: false });
  fireEvent.click(screen.getByRole("button", { name: "Preferências de cookies" }));
  fireEvent.click(screen.getByRole("button", { name: "Recusar opcionais" }));
  expect(JSON.parse(localStorage.getItem(CONSENT_KEY)!)).toMatchObject({ analytics: false, marketing: false });
});
it("registers only one delegated handler in StrictMode, including clicks on an inner icon", () => {
  const send = vi.spyOn(Tracking.prototype, "interaction");
  render(<StrictMode><TrackingConsent /><a href="#contato" data-track-event="quote_click" data-track-location="hero"><span>Ícone</span></a></StrictMode>);
  fireEvent.click(screen.getByText("Ícone"));
  expect(send).toHaveBeenCalledExactlyOnceWith("quote_click", "hero");
});
it("has a real HTTPS WhatsApp destination and the exact approved message", () => {
  const url = new URL(WHATSAPP_URL);
  expect(url.origin).toBe("https://wa.me");
  expect(url.pathname).toBe(`/${WHATSAPP_NUMBER}`);
  expect(url.searchParams.get("text")).toBe(WHATSAPP_MESSAGE);
});

import { beforeEach, describe, expect, it, vi } from "vitest";
import { campaignFrom, CONSENT_KEY, CONSENT_TTL, readConsent, saveConsent, Tracking } from "@/lib/tracking";

function commands() { return (window.dataLayer || []).map((entry) => Array.from(entry as ArrayLike<unknown>)); }
function gaEvents(name: string) { return commands().filter((entry) => entry[0] === "event" && entry[1] === name); }
beforeEach(() => {
  localStorage.clear(); sessionStorage.clear(); document.head.innerHTML = "";
  window.dataLayer = []; delete window.gtag; delete window.fbq; delete window._fbq;
  history.replaceState(null, "", "/?utm_source=instagram&utm_medium=paid_social&utm_campaign=sites");
});
describe("consent and event dispatch", () => {
  it("sends nothing and loads no script before consent or when refused", () => {
    const tracker = new Tracking("G-TEST", "123456");
    tracker.page(); tracker.interaction("quote_click", "hero");
    tracker.setConsent({ analytics: false, marketing: false });
    expect(document.querySelectorAll("script")).toHaveLength(0);
    expect(commands()).toHaveLength(0); expect(window.fbq).toBeUndefined();
  });
  it("analytics-only consent never loads Meta; same route and hash changes do not duplicate views", () => {
    const tracker = new Tracking("G-TEST", "123456");
    tracker.setConsent({ analytics: true, marketing: false });
    tracker.setConsent({ analytics: true, marketing: false }); tracker.page();
    history.replaceState(null, "", "/#sobre"); tracker.page();
    expect(gaEvents("page_view")).toHaveLength(1);
    expect(document.getElementById("nx2y-meta")).toBeNull();
    history.replaceState(null, "", "/projetos"); tracker.page();
    expect(gaEvents("page_view")).toHaveLength(2);
    expect(gaEvents("page_view")[1][2]).toMatchObject({ utm_source: "instagram" });
    history.replaceState(null, "", "/"); tracker.page();
    expect(gaEvents("page_view")).toHaveLength(3);
  });
  it("marketing-only consent loads only Meta and never emits Lead on contact clicks", () => {
    const tracker = new Tracking("G-TEST", "123456");
    tracker.setConsent({ analytics: false, marketing: true }); tracker.page();
    tracker.interaction("whatsapp_click", "contact"); tracker.interaction("quote_click", "hero");
    expect(document.getElementById("nx2y-ga")).toBeNull();
    expect(window.fbq?.queue?.filter((entry) => entry[1] === "PageView")).toHaveLength(1);
    expect(window.fbq?.queue?.filter((entry) => entry[0] === "trackCustom")).toHaveLength(2);
    expect(JSON.stringify(window.fbq?.queue)).not.toContain("Lead");
  });
  it("revocation blocks subsequent views and clicks and clears first-party cookies", () => {
    const tracker = new Tracking("G-TEST", "123456");
    tracker.setConsent({ analytics: true, marketing: true });
    document.cookie = "_ga=test; path=/"; document.cookie = "_fbp=test; path=/";
    tracker.setConsent({ analytics: false, marketing: false });
    const gaCount = commands().length; const metaCount = window.fbq?.queue?.length;
    tracker.interaction("email_click", "contact"); history.replaceState(null, "", "/projetos"); tracker.page();
    expect(commands()).toHaveLength(gaCount); expect(window.fbq?.queue).toHaveLength(metaCount!);
    expect(document.cookie).not.toContain("_ga="); expect(document.cookie).not.toContain("_fbp=");
  });
  it("rejects arbitrary event names, placements and sensitive query values", () => {
    expect(campaignFrom("https://nx2y.vercel.app/?utm_source=person@example.com&utm_campaign=5511912280890")).toEqual({});
    history.replaceState(null, "", "/?email=secret@example.com&text=hello&utm_source=instagram");
    const tracker = new Tracking("G-TEST", "123456"); tracker.setConsent({ analytics: true, marketing: true });
    tracker.interaction("Lead", "hero"); tracker.interaction("email_click", "secret@example.com");
    expect(location.search).toBe("?utm_source=instagram");
    expect(JSON.stringify(commands())).not.toContain("secret");
    expect(gaEvents("email_click")).toHaveLength(0);
  });
  it("accepts no IDs gracefully", () => {
    new Tracking("", "").setConsent({ analytics: true, marketing: true });
    expect(document.querySelectorAll("script")).toHaveLength(0);
  });
  it("validates saved consent and expiration", () => {
    saveConsent({ analytics: true, marketing: false }); expect(readConsent()?.analytics).toBe(true);
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: 1, analytics: true, marketing: true, time: Date.now() - CONSENT_TTL - 1 }));
    expect(readConsent()).toBeNull();
    localStorage.setItem(CONSENT_KEY, "invalid"); expect(readConsent()).toBeNull();
  });
  it("retains campaign slugs across full page navigation only after consent", () => {
    saveConsent({ analytics: true, marketing: false });
    new Tracking("G-TEST", "").setConsent({ analytics: true, marketing: false });
    history.replaceState(null, "", "/projetos");
    new Tracking("G-TEST", "").setConsent({ analytics: true, marketing: false });
    expect(gaEvents("page_view").at(-1)?.[2]).toMatchObject({ utm_campaign: "sites" });
  });
});

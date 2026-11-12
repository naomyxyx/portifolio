export type Consent = { analytics: boolean; marketing: boolean };
export const CONSENT_KEY = "nx2y-consent-v1";
export const CONSENT_TTL = 180 * 24 * 60 * 60 * 1000;
export const DENIED: Consent = { analytics: false, marketing: false };
const ATTRIBUTION_KEY = "nx2y-attribution-v1";
export function readConsent(): Consent | null {
  try {
    const value = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
    if (value?.version !== 1 || typeof value.analytics !== "boolean" || typeof value.marketing !== "boolean" || !Number.isFinite(value.time) || value.time > Date.now() || Date.now() - value.time > CONSENT_TTL) return null;
    return { analytics: value.analytics, marketing: value.marketing };
  } catch { return null; }
}
export function saveConsent(value: Consent) {
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...value, version: 1, time: Date.now() })); } catch { /* Session-only consent if storage is unavailable. */ }
}

const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_id", "utm_content", "utm_term"];
export function campaignFrom(url: string): Record<string, string> {
  const params = new URL(url).searchParams;
  return Object.fromEntries(CAMPAIGN_KEYS.flatMap((key) => {
    const value = params.get(key);
    // Campaign slugs only. Never accept email addresses, free text or phone numbers.
    return value && /^[a-zA-Z][a-zA-Z0-9_-]{0,79}$/.test(value) && !/\d{7}/.test(value) ? [[key, value]] : [];
  }));
}
export function safeLocation(url: string, campaign: Record<string, string>) {
  const source = new URL(url);
  const path = ["/", "/projetos", "/privacidade"].includes(source.pathname) ? source.pathname : "/";
  const clean = new URL(path, source.origin);
  Object.entries(campaign).forEach(([key, value]) => clean.searchParams.set(key, value));
  return clean.href;
}

type Queue = ((...args: unknown[]) => void) & { queue?: unknown[][]; callMethod?: (...args: unknown[]) => void; push?: Queue; loaded?: boolean; version?: string };
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; fbq?: Queue; _fbq?: Queue; }
}
function script(id: string, src: string) {
  if (document.getElementById(id)) return;
  const node = document.createElement("script");
  node.id = id; node.async = true; node.src = src;
  document.head.appendChild(node);
}
export function clearTrackingCookies(category: keyof Consent) {
  const prefix = category === "analytics" ? /^_ga(?:_|$)|^_gid$|^_gat/ : /^_fb[pc]$/;
  const host = location.hostname.split(".");
  const domains = ["", ...host.map((_, index) => host.slice(index).join("."))];
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (!prefix.test(name)) return;
    domains.forEach((domain) => { document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`; });
  });
}

export class Tracking {
  consent: Consent = { ...DENIED };
  private gaStarted = false;
  private metaStarted = false;
  private lastGa = "";
  private lastMeta = "";
  private campaign: Record<string, string>;
  private referrer: string;
  constructor(private ga: string, private pixel: string, private debug = false) {
    this.ga = /^G-[A-Z0-9]+$/.test(ga) ? ga : "";
    this.pixel = /^\d+$/.test(pixel) ? pixel : "";
    this.campaign = campaignFrom(location.href);
    if (readConsent()?.analytics || readConsent()?.marketing) {
      try {
        const saved = sessionStorage.getItem(ATTRIBUTION_KEY);
        if (!Object.keys(this.campaign).length && saved) this.campaign = campaignFrom(saved);
      } catch { /* Attribution remains in memory. */ }
    }
    try { this.referrer = document.referrer ? new URL(document.referrer).origin : ""; } catch { this.referrer = ""; }
  }
  setConsent(value: Consent) {
    this.consent = value;
    if (value.analytics || value.marketing) {
      try { sessionStorage.setItem(ATTRIBUTION_KEY, safeLocation(location.href, this.campaign)); } catch { /* Memory fallback. */ }
    } else {
      try { sessionStorage.removeItem(ATTRIBUTION_KEY); } catch { /* Storage unavailable. */ }
    }
    if (!value.analytics) {
      if (this.gaStarted) {
        (window as unknown as Record<string, unknown>)[`ga-disable-${this.ga}`] = true;
        window.gtag?.("consent", "update", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      }
      clearTrackingCookies("analytics");
    }
    if (!value.marketing) { if (this.metaStarted) window.fbq?.("consent", "revoke"); clearTrackingCookies("marketing"); }
    if (value.analytics && this.ga) {
      (window as unknown as Record<string, unknown>)[`ga-disable-${this.ga}`] = false;
      if (!this.gaStarted) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer!.push(arguments); };
        window.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
        window.gtag("js", new Date());
        window.gtag("config", this.ga, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: 15552000, page_location: safeLocation(location.href, this.campaign), page_referrer: this.referrer });
        this.gaStarted = true;
        script("nx2y-ga", `https://www.googletagmanager.com/gtag/js?id=${this.ga}`);
      }
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
    }
    if (value.marketing && this.pixel) {
      this.cleanPixelUrl();
      if (!this.metaStarted) {
        const fbq: Queue = (...args) => { if (fbq.callMethod) fbq.callMethod(...args); else fbq.queue!.push(args); };
        fbq.queue = []; fbq.push = fbq; fbq.loaded = true; fbq.version = "2.0";
        window.fbq = window._fbq = fbq;
        fbq("consent", "grant");
        fbq("set", "autoConfig", false, this.pixel);
        fbq("init", this.pixel);
        this.metaStarted = true;
        script("nx2y-meta", "https://connect.facebook.net/en_US/fbevents.js");
      } else window.fbq?.("consent", "grant");
    }
    this.page();
  }
  page() {
    const currentCampaign = campaignFrom(location.href);
    if (Object.keys(currentCampaign).length) this.campaign = currentCampaign;
    const url = safeLocation(location.href, this.campaign);
    if (this.consent.analytics && this.gaStarted && this.lastGa !== url) {
      this.lastGa = url;
      window.gtag?.("event", "page_view", { page_location: url, page_referrer: this.referrer, ...this.campaign, ...(this.debug ? { debug_mode: true } : {}) });
    }
    if (this.consent.marketing && this.metaStarted && this.lastMeta !== url) {
      this.lastMeta = url;
      this.cleanPixelUrl();
      window.fbq?.("track", "PageView");
    }
  }
  interaction(event: string, placement: string) {
    if (!["quote_click", "whatsapp_click", "instagram_click", "email_click"].includes(event)) return;
    if (!["hero", "investment", "nav_desktop", "nav_mobile", "contact", "footer"].includes(placement)) return;
    const params = { button_location: placement, page_location: safeLocation(location.href, this.campaign), ...this.campaign };
    if (this.consent.analytics && this.gaStarted) window.gtag?.("event", event, { ...params, ...(this.debug ? { debug_mode: true } : {}) });
    if (this.consent.marketing && this.metaStarted) {
      this.cleanPixelUrl();
      window.fbq?.("trackCustom", event, { button_location: placement, ...this.campaign });
    }
  }
  private cleanPixelUrl() {
    // Meta reads document.location itself. Drop arbitrary query values before loading it.
    // Internal navigation/restoration parameters remain handled by the current page.
    const current = new URL(location.href);
    const clean = new URL(safeLocation(current.href, campaignFrom(current.href)));
    const clickId = current.searchParams.get("fbclid");
    if (clickId && /^[A-Za-z0-9_-]{10,500}$/.test(clickId)) clean.searchParams.set("fbclid", clickId);
    if (/^#[a-z-]+$/.test(current.hash)) clean.hash = current.hash;
    if (clean.href !== current.href) history.replaceState(history.state, "", clean.href);
  }
}

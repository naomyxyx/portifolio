"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_KEY, DENIED, readConsent, saveConsent, Tracking, type Consent } from "@/lib/tracking";

export default function TrackingConsent() {
  const pathname = usePathname();
  const runtime = useRef<Tracking | null>(null);
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<Consent>({ ...DENIED });
  const [storageWarning, setStorageWarning] = useState(false);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    runtime.current ??= new Tracking(process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "", process.env.NEXT_PUBLIC_META_PIXEL_ID || "", process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true");
    const stored = readConsent();
    setChoice(stored || { ...DENIED });
    setOpen(!stored);
    runtime.current.setConsent(stored || { ...DENIED });
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || !(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[data-track-event]");
      if (link) runtime.current?.interaction(link.dataset.trackEvent || "", link.dataset.trackLocation || "");
    };
    const sync = (event: StorageEvent) => {
      if (event.key !== CONSENT_KEY && event.key !== null) return;
      const value = readConsent();
      runtime.current?.setConsent(value || { ...DENIED });
      setChoice(value || { ...DENIED }); setOpen(!value);
    };
    document.addEventListener("click", click);
    window.addEventListener("storage", sync);
    return () => { document.removeEventListener("click", click); window.removeEventListener("storage", sync); };
  }, []);
  useEffect(() => { runtime.current?.page(); }, [pathname]);
  function commit(value: Consent) {
    saveConsent(value);
    setStorageWarning(!readConsent());
    runtime.current?.setConsent(value);
    setChoice(value); setOpen(false);
  }
  return <>
    <button className="privacy-settings" type="button" aria-expanded={open} aria-controls="privacy-preferences" onClick={() => {
      setOpen((value) => !value);
      window.requestAnimationFrame(() => panel.current?.focus());
    }}>Preferências de cookies</button>
    {open && <section ref={panel} tabIndex={-1} id="privacy-preferences" className="privacy-banner" aria-labelledby="privacy-heading">
      <h2 id="privacy-heading">Sua privacidade</h2>
      <p>Você escolhe se podemos medir visitas com Google Analytics e resultados de anúncios com Meta Pixel. O site funciona mesmo se recusar.</p>
      <p>Necessários: salvamos sua escolha por até 180 dias. <a href="/privacidade">Política de privacidade</a></p>
      <label><input type="checkbox" checked={choice.analytics} onChange={(event) => setChoice({ ...choice, analytics: event.target.checked })} /> Análise de visitas (Google Analytics)</label>
      <label><input type="checkbox" checked={choice.marketing} onChange={(event) => setChoice({ ...choice, marketing: event.target.checked })} /> Publicidade (Meta Pixel)</label>
      <div className="privacy-actions">
        <button type="button" onClick={() => commit({ ...DENIED })}>Recusar opcionais</button>
        <button type="button" onClick={() => commit({ analytics: true, marketing: true })}>Aceitar todos</button>
        <button type="button" onClick={() => commit(choice)}>Salvar escolhas</button>
      </div>
    </section>}
    {storageWarning && <p className="privacy-storage" role="status">Sua escolha vale nesta página. O navegador não permitiu salvá-la.</p>}
  </>;
}

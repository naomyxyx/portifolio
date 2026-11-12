"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import ParticleHero from "./ParticleHero";
import { WHATSAPP_URL } from "@/lib/contact";

type HeroProps = {
  skipIntro?: boolean;
  returnPosition?: number;
};

export default function Hero({ skipIntro = false, returnPosition = 0 }: HeroProps) {
  const [formed, setFormed] = useState(skipIntro);
  const handleFormed = useCallback(() => setFormed(true), []);

  useLayoutEffect(() => {
    if (skipIntro) {
      document.body.classList.add("hero-intro-complete");
      window.dispatchEvent(new Event("hero-intro-complete"));

      let revealFrame = 0;
      const restorationTimer = window.setTimeout(() => {
        const galleryTop = document.getElementById("servicos")?.offsetTop ?? 0;
        const restoredTop = Number.isFinite(returnPosition) && returnPosition > 0
          ? returnPosition
          : Math.max(0, galleryTop - 72);

        window.scrollTo({ top: restoredTop, left: 0, behavior: "auto" });
        window.history.replaceState(window.history.state, "", "/#servicos");
        revealFrame = window.requestAnimationFrame(() => {
          document.querySelector(".portfolio-return-view")?.classList.add("is-restored");
        });
      }, 120);

      return () => {
        window.clearTimeout(restorationTimer);
        if (revealFrame) window.cancelAnimationFrame(revealFrame);
      };
    }

    document.body.classList.remove("hero-intro-complete");
    if (!formed) {
      window.scrollTo({ top: 0, left: 0 });
      return;
    }

    const revealTimer = window.setTimeout(() => {
      document.body.classList.add("hero-intro-complete");
      window.dispatchEvent(new Event("hero-intro-complete"));
    }, 650);

    return () => window.clearTimeout(revealTimer);
  }, [formed, skipIntro, returnPosition]);

  return (
    <section className="hero-stage relative flex w-full items-center justify-center overflow-hidden bg-black">
      <ParticleHero settled={formed} onFormed={handleFormed} />

      <div className={`hero-message container-nexa ${formed ? "is-visible" : ""}`} aria-hidden={!formed}>
        <h1 className="hero-title font-display max-w-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-[var(--ink)]">
          Sites estratégicos para apresentar seu negócio e <span className="hero-title__accent">transformar visitas em oportunidades.</span>
        </h1>
        <p className="hero-subtitle">Desenvolvimento front-end, direção visual e uma experiência pensada para conectar sua marca às pessoas certas.</p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-track-event="quote_click" data-track-location="hero" className="glow-btn mt-8 inline-flex items-center rounded-full border border-[var(--pink)] px-6 py-3.5 text-sm font-semibold text-[var(--pink)] transition-colors hover:bg-[var(--pink)] hover:text-black">
          Quero planejar meu site <span aria-hidden="true" className="ml-2">↗</span>
        </a>
        <p className="hero-cta-note">Uma conversa inicial para entender sua ideia, sem compromisso.</p>
        <p className="hero-proofline"><strong>Ideal para</strong> profissionais autônomos, negócios locais, serviços especializados e empresas em crescimento.</p>
      </div>

      <div className={`hero-transition-line ${formed ? "is-visible" : ""}`} aria-hidden="true" />
    </section>
  );
}

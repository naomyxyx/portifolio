"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import ParticleHero from "./ParticleHero";

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
        <h1 className="font-display max-w-4xl text-[clamp(34px,5vw,64px)] font-semibold leading-[0.98] tracking-[-0.055em] text-[var(--ink)]">
          Estratégias digitais para negócios que querem crescer.
        </h1>
        <p className="hero-subtitle">Para ser lembrado e transformar visitas em oportunidades.</p>
        <a href="#contato" className="glow-btn mt-8 inline-flex items-center rounded-full border border-[var(--pink)] px-6 py-3.5 text-sm font-semibold text-[var(--pink)] transition-colors hover:bg-[var(--pink)] hover:text-black">
          Quero um site para meu negócio <span aria-hidden="true" className="ml-2">↗</span>
        </a>
        <p className="hero-cta-note">Uma conversa inicial para entender sua ideia, sem compromisso.</p>
        <p className="hero-proofline">Profissionais autônomos · Negócios locais · Serviços especializados · Empresas em crescimento</p>
      </div>

      <div className={`hero-transition-line ${formed ? "is-visible" : ""}`} aria-hidden="true" />
    </section>
  );
}

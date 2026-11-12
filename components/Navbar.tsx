"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Investimento", href: "#investimento" },
  { label: "Como criamos", href: "#como-criamos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Dúvidas", href: "#duvidas" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <header className="site-header fixed left-0 right-0 top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]/80 backdrop-blur-md">
        <div className="container-nexa flex h-[72px] items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="font-display text-xl font-bold tracking-[-0.04em] text-[var(--ink)]"
          onClick={() => setOpen(false)}
        >
          NX2Y
        </a>

        {/* Navegação desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--muted)] transition-colors duration-200 hover:text-[var(--ink)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA desktop */}
        <a
          data-track-event="quote_click" data-track-location="nav_desktop"
          href="#contato"
          className="glow-btn hidden rounded-full border border-[var(--pink)] px-6 py-3 text-sm font-semibold text-[var(--pink)] transition-all duration-200 hover:bg-[var(--pink)] hover:text-black md:block"
        >
          Tenho uma ideia
        </a>

        {/* Botão mobile */}
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="relative z-[60] flex h-10 w-10 items-center justify-center text-[var(--ink)] md:hidden"
        >
          <span className="sr-only">
            {open ? "Fechar menu" : "Abrir menu"}
          </span>

          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-px w-6 bg-current transition-transform duration-200 ${
                open ? "translate-y-[4px] rotate-45" : ""
              }`}
            />

            <span
              className={`block h-px w-6 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`block h-px w-6 bg-current transition-transform duration-200 ${
                open ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
        </div>
      </header>

      {/* Menu mobile */}
      <div
        className={`mobile-glass-menu md:hidden${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <button
          className="mobile-glass-menu__backdrop"
          type="button"
          tabIndex={-1}
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
        />

        <nav className="mobile-glass-menu__panel" aria-label="Navegação mobile">
          <span className="mobile-glass-menu__reflection" aria-hidden="true" />
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="mobile-glass-menu__link"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contato"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className="mobile-glass-menu__cta"
            data-track-event="quote_click" data-track-location="nav_mobile"
          >
            Tenho uma ideia
            <svg
              className="mobile-glass-menu__cta-icon"
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M5 15 15 5M7 5h8v8" />
            </svg>
          </a>
        </nav>
      </div>
    </>
  );
}

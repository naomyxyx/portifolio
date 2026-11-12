"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const AUTO_PLAY_MS = 4600;
const RESUME_DELAY_MS = 1800;

const PROJECTS = [
  { name: "Clínicas", eyebrow: "Saúde & cuidado", description: "Presença digital clara, humana e preparada para transformar atenção em agendamentos.", art: "clinic" },
  { name: "Gastronomia", eyebrow: "Restaurantes", description: "Experiências que começam na tela e conduzem o público até a mesa.", art: "food" },
  { name: "Academias", eyebrow: "Corpo & movimento", description: "Produtos digitais com energia para apresentar modalidades, planos e comunidade.", art: "fitness" },
  { name: "Assistência técnica", eyebrow: "Serviços", description: "Jornadas objetivas para explicar serviços, gerar confiança e acelerar orçamentos.", art: "service" },
  { name: "Imobiliárias", eyebrow: "Espaços & negócios", description: "Portfólios digitais que valorizam imóveis e simplificam a descoberta.", art: "realestate" },
  { name: "Hotéis & pousadas", eyebrow: "Hospitalidade", description: "Experiências digitais que apresentam espaços, despertam desejo e aproximam hóspedes da reserva.", art: "institutional" },
] as const;

type Art = (typeof PROJECTS)[number]["art"];

function ProjectArtwork({ art, name }: { art: Art; name: string }) {
  return (
    <div className={`showcase-art showcase-art--${art}`} aria-label={`Composição visual para ${name}`} role="img">
      <div className="showcase-art__grid" />
      <span className="showcase-art__index">INTERFACE / CONCEITO</span>

      {art === "clinic" && <div className="segment-window clinic-window">
        <div className="segment-window__bar"><b>CLÍNICA VIVA</b><span>AGENDAMENTO</span></div>
        <div className="clinic-summary"><i>+</i><span><small>PRÓXIMA CONSULTA</small><b>Hoje, 14:30</b><em>Dra. Marina Alves</em></span></div>
        <div className="clinic-calendar"><span>SEG</span><span>TER</span><span className="is-selected">QUA<br /><b>18</b></span><span>QUI</span><span>SEX</span></div>
        <div className="clinic-slots"><span>09:00</span><span>10:30</span><span className="is-selected">14:30</span></div>
      </div>}

      {art === "food" && <div className="segment-window food-window">
        <div className="segment-window__bar"><b>VÉRTICE</b><span>RESERVAR MESA</span></div>
        <div className="food-feature"><div className="food-plate"><i /><b /></div><small>MENU DA ESTAÇÃO</small><strong>Sabores que criam encontros.</strong></div>
        <div className="food-menu-row"><span>Entrada autoral</span><b>R$ 32</b></div>
        <div className="food-menu-row"><span>Principal da casa</span><b>R$ 68</b></div>
      </div>}

      {art === "fitness" && <div className="segment-window fitness-window">
        <div className="segment-window__bar"><b>PULSO</b><span>MEU TREINO</span></div>
        <div className="fitness-progress"><span><strong>72%</strong><small>META SEMANAL</small></span></div>
        <div className="fitness-week"><i style={{ height: "42%" }} /><i style={{ height: "68%" }} /><i className="is-active" style={{ height: "92%" }} /><i style={{ height: "58%" }} /><i style={{ height: "76%" }} /></div>
        <div className="fitness-labels"><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span></div>
        <div className="fitness-class"><small>PRÓXIMA AULA</small><b>Funcional, 19:00</b><span>CONFIRMADO</span></div>
      </div>}

      {art === "service" && <div className="segment-window service-window">
        <div className="segment-window__bar"><b>REPARA+</b><span>ORDEM DE SERVIÇO</span></div>
        <div className="service-device"><i /><span /></div>
        <div className="service-status"><small>APARELHO EM ANÁLISE</small><b>Diagnóstico em andamento</b><span><i className="is-done" /><i className="is-done" /><i /><i /></span><em>Previsão de atualização: 16h</em></div>
        <div className="service-checks"><span>✓ Entrada</span><span>✓ Testes</span><span>Reparo</span></div>
      </div>}

      {art === "realestate" && <div className="segment-window property-window">
        <div className="segment-window__bar"><b>HABITAR</b><span>IMÓVEIS</span></div>
        <div className="property-photo"><div className="property-building"><i /><i /><i /><i /><i /><i /></div><span>VILA MADALENA</span></div>
        <div className="property-info"><small>APARTAMENTO</small><strong>Um novo espaço para chamar de seu.</strong><div><span>2 quartos</span><span>84 m²</span><span>1 vaga</span></div><b>R$ 860.000</b></div>
      </div>}

      {art === "institutional" && <div className="segment-window hotel-window">
        <div className="segment-window__bar"><b>CASA BRISA</b><span>RESERVAS</span></div>
        <div className="hotel-room"><div className="hotel-sun" /><div className="hotel-window-shape"><i /><i /><i /></div><span>DESCANSO PERTO DO MAR</span></div>
        <div className="hotel-booking"><div><small>ENTRADA</small><b>18 OUT</b></div><div><small>SAÍDA</small><b>21 OUT</b></div><div><small>HÓSPEDES</small><b>2</b></div></div>
        <span className="mock-cta">VER DISPONIBILIDADE</span>
      </div>}
    </div>
  );
}

export default function HoverExpandShowcase() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let observer: IntersectionObserver | null = null;

    const observeAfterIntro = () => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          setRevealed(true);
          observer?.disconnect();
        },
        { threshold: 0.01, rootMargin: "0px 0px -12% 0px" },
      );

      observer.observe(section);
    };

    if (document.body.classList.contains("hero-intro-complete")) {
      observeAfterIntro();
    } else {
      window.addEventListener("hero-intro-complete", observeAfterIntro, { once: true });
    }

    return () => {
      observer?.disconnect();
      window.removeEventListener("hero-intro-complete", observeAfterIntro);
    };
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => setActive((current) => (current + 1) % PROJECTS.length), AUTO_PLAY_MS);
    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => () => { if (resumeTimer.current) clearTimeout(resumeTimer.current); }, []);

  function pause() {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setPaused(true);
  }

  function resumeLater() {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_DELAY_MS);
  }

  function select(index: number) {
    pause();
    setActive(index);
  }

  return (
    <section
      ref={sectionRef}
      id="servicos"
      className={`possibilities-section bg-[var(--bg)] pb-24 pt-16 md:pb-32 md:pt-20 ${revealed ? "is-revealed" : ""}`}
    >
      <div className="container-nexa">
        <div className="possibilities-intro mb-12 grid gap-6 md:mb-16 md:grid-cols-[1.35fr_0.45fr] md:items-end">
          <div>
            <span className="eyebrow">Possibilidades</span>
            <h2 className="mt-4 max-w-4xl font-display text-[clamp(28px,3.7vw,48px)] font-semibold leading-[1.02] tracking-[-0.045em]">
              Cada negócio pede uma <span className="section-title-accent">experiência própria.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[var(--muted)] md:justify-self-end">
            Cada site é planejado de acordo com o público, os objetivos e a personalidade do negócio. Explore algumas direções que uma presença digital pode assumir.
          </p>
        </div>

        <div className="possibilities-gallery showcase-accordion" onMouseEnter={pause} onMouseLeave={resumeLater} onFocusCapture={pause} onBlurCapture={resumeLater}>
          {PROJECTS.map((project, index) => {
            const isActive = active === index;
            return (
              <article key={project.name} className={`showcase-panel ${isActive ? "is-active" : ""}`} onMouseEnter={() => select(index)}>
                <button type="button" className="showcase-panel__trigger" aria-expanded={isActive} aria-controls={`showcase-panel-${index}`} onClick={() => select(index)} onFocus={() => select(index)}>
                  <span className="showcase-panel__name">{project.name}</span>
                </button>

                <div id={`showcase-panel-${index}`} className="showcase-panel__content" aria-hidden={!isActive}>
                  <ProjectArtwork art={project.art} name={project.name} />
                  <div className="showcase-panel__copy">
                    <span>{project.eyebrow}</span>
                    <p>{project.description}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <a
          className="possibilities-footer real-projects-folder"
          href="/projetos"
          onClick={(event) => {
            event.preventDefault();
            router.push(`/projetos?voltar=${Math.round(window.scrollY)}`);
          }}
        >
          <span className="real-projects-folder__tab">PROJETOS REAIS</span>
          <span className="real-projects-folder__copy">
            <small>TRABALHOS PUBLICADOS</small>
            <strong>Projetos construídos para negócios reais.</strong>
            <span>Conheça projetos desenvolvidos para organizar informações, fortalecer marcas e aproximar negócios de seus clientes.</span>
          </span>
          <span className="real-projects-folder__action">
            Ver projetos publicados
            <span className="real-projects-folder__arrow" aria-hidden="true">
              <svg viewBox="0 0 20 20" focusable="false">
                <path d="M5 15 15 5M7 5h8v8" />
              </svg>
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}

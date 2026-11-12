"use client";

import { useState } from "react";

const STEPS = [
  { name: "Ideia", label: "Ponto de partida", description: "Escutamos o contexto, identificamos oportunidades e transformamos percepções soltas em uma direção inicial clara." },
  { name: "Estratégia", label: "Direção", description: "Definimos público, objetivos, palavras-chave, jornada e prioridades para que cada decisão tenha uma razão." },
  { name: "Design", label: "Forma & experiência", description: "Criamos identidade, hierarquia e interfaces que traduzem a estratégia em uma experiência reconhecível e intuitiva." },
  { name: "Desenvolvimento", label: "Construção", description: "Transformamos o conceito em uma experiência responsiva, rápida e funcional, cuidando de cada interação." },
  { name: "Solução", label: "Entrega & evolução", description: "Validamos, refinamos e colocamos no ar uma presença digital preparada para aproximar marca e público." },
] as const;

function IdeaVisual() {
  return <div className="process-scene process-scene--idea" role="img" aria-label="Anotações iniciais para o restaurante Vértice">
    <div className="idea-phone"><div className="idea-phone__notch" /><span>NOTAS</span><h3>VÉRTICE</h3><p>cozinha contemporânea</p><ul><li>reservas</li><li>cardápio autoral</li><li>experiência urbana</li></ul></div>
    <div className="idea-note"><span>Primeiros sinais</span><b>Uma marca que transforma encontros em experiências.</b><i>restaurante / noite / cidade</i></div>
    <div className="idea-palette"><i /><i /><i /><i /></div>
    <div className="idea-sketch">V</div>
  </div>;
}

function StrategyVisual() {
  return <div className="process-scene process-scene--strategy" role="img" aria-label="Painel estratégico com gráfico crescente, público e checklist">
    <svg className="strategy-chart" viewBox="0 0 720 390" aria-hidden="true">
      <path className="strategy-chart__grid" d="M40 330H680M40 250H680M40 170H680M40 90H680M120 40V350M260 40V350M400 40V350M540 40V350" />
      <text className="strategy-chart__title" x="275" y="34">JORNADA ATÉ A RESERVA</text>
      <polyline className="strategy-chart__line" points="55,315 165,270 250,285 355,190 445,215 555,105 665,60" />
      {["55,315","165,270","250,285","355,190","445,215","555,105","665,60"].map((point, index) => { const [cx, cy] = point.split(","); return <circle key={point} className="strategy-chart__node" style={{ animationDelay: `${0.25 + index * 0.12}s` }} cx={cx} cy={cy} r="7" />; })}
      <g className="strategy-chart__people" transform="translate(45 278)"><circle cx="10" cy="8" r="6"/><circle cx="26" cy="10" r="5"/><path d="M0 27c1-9 6-13 11-13s10 4 11 13M18 27c1-7 5-10 9-10s8 3 9 10"/></g>
      <g className="strategy-chart__calendar" transform="translate(536 66)"><rect x="0" y="5" width="30" height="27" rx="4"/><path d="M7 0v10M23 0v10M1 14h28"/></g>
      <path className="strategy-chart__peak-guide" d="M665 60V332" />
      <path className="strategy-chart__flag" d="M665 60V22h45l-11 11 11 11h-45" />
      <text className="strategy-chart__peak" x="570" y="15">PICO DE INTENÇÃO</text>
      <text className="strategy-chart__peak-time" x="584" y="49">20H / MAIOR PROCURA</text>
      <text className="strategy-chart__milestone" x="42" y="350">PÚBLICO</text>
      <text className="strategy-chart__milestone" x="215" y="310">INTERESSE</text>
      <text className="strategy-chart__milestone" x="410" y="240">CARDÁPIO</text>
      <text className="strategy-chart__milestone" x="527" y="126">RESERVA</text>
      <text className="strategy-chart__journey" x="270" y="372">DESCOBERTA  →  DECISÃO  →  RESERVA</text>
    </svg>
    <div className="strategy-card strategy-card--goal"><span>OBJETIVO PRINCIPAL</span><b><i>✓</i> Aumentar reservas diretas</b></div>
    <div className="strategy-card strategy-card--public"><div className="strategy-people" aria-hidden="true"><i/><i/><i/></div><span>PÚBLICO PRIORITÁRIO</span><b>urbano</b><b>experiências</b><b className="strategy-mobile-badge">mobile first</b></div>
    <div className="strategy-card strategy-card--keywords"><span>PALAVRAS-CHAVE</span><div><i>AUTORAL</i><i>ACOLHEDOR</i><i>CONTEMPORÂNEO</i></div></div>
    <div className="strategy-checklist"><span>CHECKPOINTS</span><p>✓ Público identificado</p><p>✓ Jornada mapeada</p><p>✓ Conteúdo priorizado</p></div>
  </div>;
}

function DesignVisual() {
  return <div className="process-scene process-scene--design" role="img" aria-label="Sistema visual e interfaces do restaurante Vértice">
    <div className="design-type"><small>IDENTIDADE</small><strong>VÉRTICE</strong><em>COZINHA CONTEMPORÂNEA</em><div className="design-stair" aria-hidden="true"><span>Vértice</span><span>VÉRTICE</span><span>vértice</span></div></div>
    <div className="design-desktop"><div className="design-nav">VÉRTICE <span>MENU&nbsp;&nbsp; SOBRE&nbsp;&nbsp; RESERVAS</span></div><h3>Sabores que<br />criam encontros.</h3><span className="mock-cta">RESERVAR UMA MESA</span></div>
    <div className="design-mobile"><div className="design-mobile__notch" /><span>VÉRTICE</span><div /><b>Menu<br />autoral.</b><i>RESERVAR ↗</i></div>
    <div className="design-swatches"><i /><i /><i /></div>
  </div>;
}

function DevelopmentVisual() {
  return <div className="process-scene process-scene--development" role="img" aria-label="Interface do restaurante Vértice em desenvolvimento">
    <div className="dev-browser"><div className="dev-browser__bar"><i /><i /><i /><span>nx2y.local/vertice</span></div><div className="dev-browser__site"><span>VÉRTICE</span><h3>Sabores que<br />criam encontros.</h3><span className="mock-cta">RESERVAR</span><div className="dev-site-components"><i><b>01</b><small>MENU AUTORAL</small></i><i><b>02</b><small>NOSSA HISTÓRIA</small></i><i><b>03</b><small>RESERVAS</small></i></div><div className="dev-site-plate"><i /><i /></div></div><div className="dev-cursor" aria-hidden="true" /></div>
    <div className="dev-code"><span>COMPONENT / HERO</span><p><i>01</i> display: grid;</p><p><i>02</i> min-height: 100svh;</p><p><i>03</i> transition: transform;</p><p><i>04</i> responsive: true;</p></div>
    <div className="dev-breakpoints"><i>DESKTOP</i><i>TABLET</i><i>MOBILE</i></div>
  </div>;
}

function SolutionVisual() {
  return <div className="process-scene process-scene--solution" role="img" aria-label="Site final do restaurante Vértice publicado">
    <div className="solution-status"><i /> PROJETO PUBLICADO</div>
    <div className="solution-laptop"><div className="solution-camera" /><div className="solution-screen"><nav>VÉRTICE <span>MENU&nbsp;&nbsp; SOBRE&nbsp;&nbsp; RESERVAR</span></nav><small>COZINHA CONTEMPORÂNEA</small><h3>Sabores que criam encontros.</h3><span className="mock-cta">RESERVAR UMA MESA ↗</span><div className="solution-site-plate"><i /><i /></div><div className="solution-site-components"><i><b>01</b><span>MENU AUTORAL</span></i><i><b>02</b><span>NOSSA HISTÓRIA</span></i><i><b>03</b><span>RESERVAS</span></i></div></div></div>
    <div className="solution-phone"><div className="solution-phone__notch" /><span>VÉRTICE</span><div className="solution-phone__art"><i /><i /></div><b>Reserve<br />seu momento.</b><em>ESCOLHER DATA</em></div>
    <div className="solution-caption"><span>DA IDEIA À EXPERIÊNCIA</span><b>Uma presença digital pronta para receber.</b></div>
  </div>;
}

const VISUALS = [IdeaVisual, StrategyVisual, DesignVisual, DevelopmentVisual, SolutionVisual];

export default function HowWeCreate() {
  const [active, setActive] = useState(0);
  const ActiveVisual = VISUALS[active];

  function move(direction: number) {
    setActive((current) => (current + direction + STEPS.length) % STEPS.length);
  }

  return <section id="como-criamos" className="process-section section-divider scroll-reveal-section bg-black py-24 md:py-32">
    <div className="container-nexa">
      <div className="process-heading mb-12 md:mb-16" data-scroll-reveal="1">
        <span className="eyebrow">Processo</span>
        <h2 className="mt-4 font-display text-[clamp(38px,6vw,76px)] font-semibold leading-[0.95] tracking-[-0.055em]">Como criamos</h2>
        <p className="process-heading__intro">Você acompanha as decisões durante todo o processo. Organizamos objetivos, conteúdo e direção visual antes de transformar a ideia em uma interface pronta para publicação.</p>
      </div>

      <div className="process-experience" data-scroll-reveal="2">
        <div className="process-steps" aria-label="Etapas do processo">
          {STEPS.map((step, index) => {
            const selected = active === index;
            return <button key={step.name} type="button" aria-label={step.name} aria-pressed={selected} className={`process-step ${selected ? "is-active" : ""}`} onClick={() => setActive(index)}>
              <span className="process-step__head"><b>{step.name}</b><em aria-hidden="true">+</em></span>
              <span className="process-step__body"><small>{step.label}</small>{step.description}</span>
            </button>;
          })}
          <div className="process-arrows">
            <button type="button" aria-label="Etapa anterior" onClick={() => move(-1)}>↑</button>
            <button type="button" aria-label="Próxima etapa" onClick={() => move(1)}>↓</button>
          </div>
        </div>

        <div id={`process-visual-${active}`} className="process-visual-shell" aria-label={`Ilustração da etapa ${STEPS[active].name}`}>
          <ActiveVisual key={active} />
        </div>
      </div>
    </div>
  </section>;
}

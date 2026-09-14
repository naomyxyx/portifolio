"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

const APPROACH = [
  { label: "Analisar", detail: "Compreender o contexto e identificar prioridades." },
  { label: "Estruturar", detail: "Organizar as informações e definir uma direção." },
  { label: "Desenvolver", detail: "Transformar a direção em uma interface funcional." },
] as const;

export default function About() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const cardStageRef = useRef<HTMLDivElement>(null);

  const handleCardClick = () => {
    setCardFlipped((current) => !current);
  };

  const moveMetalCard = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "mouse") return;

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width;
    const vertical = (event.clientY - bounds.top) / bounds.height;
    const rotateY = (horizontal - 0.5) * 30;
    const rotateX = (0.5 - vertical) * 22;

    card.style.setProperty("--card-rotate-x", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--card-rotate-y", `${rotateY.toFixed(2)}deg`);
    card.style.setProperty("--foil-x", `${(horizontal * 100).toFixed(1)}%`);
    card.style.setProperty("--foil-y", `${(vertical * 100).toFixed(1)}%`);
  };

  const resetMetalCard = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const card = event.currentTarget;
    card.style.setProperty("--card-rotate-x", "0deg");
    card.style.setProperty("--card-rotate-y", "0deg");
    card.style.setProperty("--foil-x", "50%");
    card.style.setProperty("--foil-y", "45%");
  };

  useEffect(() => {
    if (paused) return;

    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % APPROACH.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    const stage = cardStageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setCardVisible(true);
        observer.disconnect();
      },
      { threshold: 0.28 },
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="sobre" className="about-section section-divider">
      <div className="container-nexa">
        <div className="about-heading">
          <div>
            <span className="eyebrow">Por trás da NX2Y</span>
            <h2>Da análise à interface,<br />lado a lado.</h2>
          </div>
        </div>

        <div className="about-layout">
          <div
            ref={cardStageRef}
            className={`about-identity${cardVisible ? " is-card-visible" : ""}`}
            aria-label="Carta de apresentação de Naomy, desenvolvedora front-end"
          >
            <div className="about-metal-card">
              <button
                className={`about-metal-card__interactive${cardFlipped ? " is-flipped" : ""}`}
                type="button"
                aria-label={cardFlipped ? "Virar a carta para a frente" : "Virar a carta para o verso"}
                aria-pressed={cardFlipped}
                onClick={handleCardClick}
                onPointerMove={moveMetalCard}
                onPointerLeave={resetMetalCard}
              >
                <span className="about-metal-card__flipper">
                  <span className="about-metal-card__face about-metal-card__front">
                    <Image
                      className="about-metal-card__image"
                      src="/images/naomy-seven-hearts-v2.png"
                      width={1080}
                      height={1457}
                      sizes="(max-width: 600px) 68vw, (max-width: 900px) 340px, 24vw"
                      alt="Carta sete de copas personalizada com ilustração de Naomy"
                      priority={false}
                    />
                    <span className="about-metal-card__foil" aria-hidden="true" />
                    <span className="about-metal-card__shine" aria-hidden="true" />
                  </span>

                  <span className="about-metal-card__face about-metal-card__back" aria-hidden="true">
                    <span className="about-metal-card__back-frame" />
                    <small>NEXT TO YOU</small>
                    <strong>NX2Y</strong>
                    <i>♥</i>
                    <span className="about-metal-card__back-signature">NAOMY / FRONT-END</span>
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div className="about-content">
            <p className="about-content__intro">
              Sou Naomy, desenvolvedora front-end e também em formação na área de dados.
            </p>

            <div className="about-content__copy">
              <p>
                Criei a NX2Y para unir desenvolvimento e pensamento analítico. Antes de começar um projeto, procuro entender o contexto, organizar as informações e identificar as prioridades. A partir disso, defino uma direção clara para o que será construído.
              </p>
              <p>
                Esse olhar me ajuda a transformar ideias, referências e projetos visuais em sites responsivos, interativos e bem estruturados. Cuido da experiência, do movimento e de cada detalhe da interface, acompanhando o projeto de perto da primeira conversa à publicação.
              </p>
            </div>

            <div
              className="about-approach"
              aria-label="Forma de trabalhar"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={() => setPaused(false)}
            >
              {APPROACH.map((item, index) => (
                <button
                  className={`about-approach__item ${active === index ? "is-active" : ""}`}
                  key={item.label}
                  type="button"
                  aria-pressed={active === index}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                >
                  <i aria-hidden="true" />
                  <b>{item.label}</b>
                  <small>{item.detail}</small>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

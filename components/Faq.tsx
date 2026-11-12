"use client";

import { useState } from "react";

const QUESTIONS = [
  {
    question: "Quanto tempo leva para a criação?",
    answer: "O prazo depende da complexidade do projeto. Depois da primeira conversa, organizamos as etapas e definimos um cronograma claro para a construção.",
  },
  {
    question: "Posso acompanhar e solicitar ajustes durante o projeto?",
    answer: "Sim. O projeto possui momentos de apresentação e refinamento para que você acompanhe as decisões e solicite ajustes antes da publicação.",
  },
  {
    question: "Você também cria a identidade visual?",
    answer: "Sim, mas apenas para o site. Posso desenvolver a direção visual da interface, definindo cores, tipografia, composição e estilo para transformar a ideia do projeto em uma experiência coerente e profissional. Esse trabalho é voltado exclusivamente ao desenvolvimento do site e não inclui criação de conteúdo, peças gráficas ou gestão de redes sociais.",
  },
  {
    question: "Domínio e hospedagem estão incluídos?",
    answer: "O domínio é o endereço usado para acessar o site, como \"seunegocio.com.br\". A hospedagem é o serviço que mantém esse site disponível na internet. Posso orientar e cuidar da configuração dessas duas partes. Como são serviços contratados separadamente, os respectivos valores são apresentados com clareza antes da publicação.",
  },
  {
    question: "O site pode receber novas páginas depois?",
    answer: "Sim. A estrutura pode ser planejada para crescer com o negócio, permitindo novas páginas, conteúdos e funcionalidades no futuro.",
  },
  {
    question: "Como recebo o orçamento?",
    answer: "Depois de entender o momento do negócio e o que o site precisa oferecer, preparo uma proposta com escopo, etapas, prazo e investimento. A conversa inicial não gera compromisso de contratação.",
  },
  {
    question: "Existe suporte após a publicação?",
    answer: "Sim. Posso oferecer um período de acompanhamento depois que o site for publicado e, se você precisar, também podemos combinar uma manutenção contínua. O formato do suporte será definido de acordo com as necessidades do projeto e com o nível de acompanhamento que fizer sentido para você.",
  },
] as const;

export default function Faq() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="duvidas" className="faq-section section-divider scroll-reveal-section">
      <div className="faq-grid" aria-hidden="true" />
      <div className="faq-scan" aria-hidden="true" />

      <div className="container-nexa faq-container">
        <div className="faq-heading" data-scroll-reveal="1">
          <div>
            <h2>Dúvidas frequentes</h2>
          </div>
          <p>
            Informações diretas sobre o processo, a entrega e o que acontece depois que a sua ideia entra em movimento.
          </p>
        </div>

        <div className="faq-list" data-scroll-reveal-group>
          {QUESTIONS.map((item, index) => {
            const open = active === index;
            return (
              <article className={`faq-item ${open ? "is-open" : ""}`} key={item.question}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setActive(open ? null : index)}
                >
                  <span className="faq-item__signal" aria-hidden="true" />
                  <b>{item.question}</b>
                  <i aria-hidden="true">+</i>
                </button>
                <div className="faq-item__answer" id={`faq-answer-${index}`}>
                  <p>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

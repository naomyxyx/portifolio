export default function Contact() {
  return (
    <section id="contato" className="contact-section section-divider">
      <div className="contact-grid" aria-hidden="true" />
      <div className="contact-orbit contact-orbit--one" aria-hidden="true" />
      <div className="contact-orbit contact-orbit--two" aria-hidden="true" />

      <div className="container-nexa contact-container">
        <div className="contact-status">
          <span><i /> DISPONÍVEL PARA NOVOS PROJETOS</span>
          <b>NEXT TO YOU / ONLINE</b>
        </div>

        <div className="contact-main">
          <div className="contact-copy">
            <span className="eyebrow">Vamos conversar</span>
            <h2>Sua próxima ideia<br />pode começar aqui.</h2>
            <p>
              Conte o que você imagina, o momento do seu negócio e onde gostaria de chegar. A partir disso, organizamos o caminho e construímos lado a lado.
            </p>

            <a
              className="contact-cta"
              href="https://wa.me/5511912280890?text=Ol%C3%A1%2C%20Naomy!%20Conheci%20seu%20trabalho%20pela%20NX2Y%20e%20quero%20conversar%20sobre%20um%20site%20para%20meu%20neg%C3%B3cio."
              target="_blank"
              rel="noreferrer"
            >
              <span>Conversar pelo WhatsApp</span>
              <span className="contact-cta__arrow" aria-hidden="true">
                <svg viewBox="0 0 20 20" focusable="false">
                  <path d="M5 15 15 5M7 5h8v8" />
                </svg>
              </span>
            </a>

            <div className="contact-channels" aria-label="Outros canais de contato">
              <a href="mailto:naomy4612@gmail.com">E-MAIL</a>
              <a href="https://br.linkedin.com/in/naomy-matos-427567269" target="_blank" rel="noreferrer">LINKEDIN</a>
            </div>
          </div>

          <div className="contact-panel">
            <div className="contact-panel__corners" aria-hidden="true"><i /><i /><i /><i /></div>
            <span className="contact-panel__label">INFORMAÇÕES PARA COMEÇAR</span>
            <div className="contact-prompt">
              <span>OBJETIVO</span>
              <p>O que o novo site precisa comunicar ou transformar?</p>
            </div>
            <div className="contact-prompt">
              <span>MOMENTO</span>
              <p>É uma nova presença digital ou a evolução de algo que já existe?</p>
            </div>
            <div className="contact-prompt">
              <span>REFERÊNCIAS</span>
              <p>Quais experiências, estilos e movimentos representam a sua ideia?</p>
            </div>
          </div>
        </div>

        <footer className="contact-footer">
          <strong>NX2Y</strong>
          <span>NAOMY · DESENVOLVEDORA FRONT-END</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>
    </section>
  );
}

import { WHATSAPP_URL } from "@/lib/contact";

export default function Contact() {
  return (
    <section id="contato" className="contact-section section-divider scroll-reveal-section">
      <div className="contact-grid" aria-hidden="true" />
      <div className="contact-orbit contact-orbit--one" aria-hidden="true" />
      <div className="contact-orbit contact-orbit--two" aria-hidden="true" />

      <div className="container-nexa contact-container">
        <div className="contact-status" data-scroll-reveal="1">
          <span><i /> DISPONÍVEL PARA NOVOS PROJETOS</span>
          <b>NEXT TO YOU / ONLINE</b>
        </div>

        <div className="contact-main">
          <div className="contact-copy" data-scroll-reveal="2">
            <span className="eyebrow">Vamos conversar</span>
            <h2>Vamos entender o que<br />seu negócio <span className="section-title-accent">precisa construir.</span></h2>
            <p>
              Conte um pouco sobre sua ideia, o momento do negócio e o resultado que espera alcançar. A primeira conversa serve para organizar as possibilidades e identificar o melhor caminho.
            </p>

            <a
              className="contact-cta"
              data-track-event="whatsapp_click" data-track-location="contact"
              href={WHATSAPP_URL}
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
              <a href="mailto:naomy4612@gmail.com" data-track-event="email_click" data-track-location="contact">E-MAIL</a>
              <a href="https://br.linkedin.com/in/naomy-matos-427567269" target="_blank" rel="noreferrer">LINKEDIN</a>
              <a href="https://www.instagram.com/nx2y.web/" target="_blank" rel="noreferrer" data-track-event="instagram_click" data-track-location="contact">INSTAGRAM</a>
            </div>
          </div>

          <div className="contact-panel" data-scroll-reveal="3">
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

        <footer className="contact-footer" data-scroll-reveal="4">
          <strong>NX2Y</strong>
          <a href="https://www.instagram.com/nx2y.web/" target="_blank" rel="noreferrer" data-track-event="instagram_click" data-track-location="footer">@NX2Y.WEB</a>
          <span>NAOMY · DESENVOLVEDORA FRONT-END</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>
    </section>
  );
}

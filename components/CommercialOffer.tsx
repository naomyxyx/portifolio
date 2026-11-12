const SERVICES = [
  { title: "Landing pages", text: "Páginas focadas em apresentar uma oferta, campanha, produto ou serviço e conduzir o visitante a uma ação." },
  { title: "Sites institucionais", text: "Estruturas para apresentar a empresa, seus serviços, diferenciais e formas de contato." },
  { title: "Portfólios profissionais", text: "Experiências para organizar trabalhos, projetos e competências de forma clara e autoral." },
  { title: "Catálogos digitais", text: "Páginas que facilitam a descoberta de produtos ou serviços e o contato para compra ou orçamento." },
  { title: "Reformulação de sites", text: "Evolução visual, estrutural e responsiva de uma presença digital que já existe." },
] as const;

const PRICES = [
  { label: "Landing page essencial", price: "R$ 399", text: "Uma página compacta e responsiva para apresentar uma ideia, campanha ou serviço com clareza." },
  { label: "Landing page personalizada", price: "R$ 599", text: "Uma experiência mais completa, com direção visual própria, mais seções e interações." },
  { label: "Site institucional", price: "R$ 1.199", text: "Uma estrutura mais ampla para apresentar o negócio, seus serviços, diferenciais e canais de contato." },
] as const;

export default function CommercialOffer() {
  return (
    <section id="solucoes" className="commercial-section section-divider scroll-reveal-section">
      <div className="container-nexa">
        <div className="commercial-heading">
          <div data-scroll-reveal="1">
            <span className="eyebrow">O que posso construir</span>
            <h2>Soluções digitais para <span className="section-title-accent">diferentes momentos</span> do seu negócio.</h2>
          </div>
          <p data-scroll-reveal="2">Da primeira presença online à evolução de um site existente, cada projeto é estruturado de acordo com o que o seu negócio precisa comunicar e alcançar.</p>
        </div>

        <div className="commercial-services" data-scroll-reveal-group>
          {SERVICES.map((service) => <article key={service.title}><h3>{service.title}</h3><p>{service.text}</p></article>)}
        </div>

        <div id="investimento" className="investment-heading" data-scroll-reveal="3">
          <span className="eyebrow">Investimento</span>
          <h2>Referências claras, projeto <span className="section-title-accent">sob medida.</span></h2>
          <p>Os valores indicam o investimento inicial. Estrutura, conteúdo, animações, integrações e personalizações podem alterar o orçamento final, que é apresentado com clareza antes do início do projeto.</p>
        </div>

        <div className="investment-grid" data-scroll-reveal-group>
          {PRICES.map((item) => <article key={item.label}><span>{item.label}</span><small>A partir de</small><strong>{item.price}</strong><p>{item.text}</p></article>)}
          <article className="investment-custom"><span>Projetos avançados</span><small>Investimento</small><strong>Personalizado</strong><p>Hotelaria, catálogos maiores, reservas, lojas virtuais e integrações são avaliados de acordo com a estrutura necessária.</p></article>
        </div>

        <div className="investment-note" data-scroll-reveal="5">
          <p>Domínio, hospedagem, plataformas de venda, sistemas de reserva e outros serviços externos não estão incluídos. Quando necessários, todos os custos são apresentados antes do início do projeto.</p>
          <a href="#contato" data-track-event="quote_click" data-track-location="investment">
            Solicitar uma proposta
            <svg className="investment-note__arrow" aria-hidden="true" viewBox="0 0 20 20" fill="none">
              <path d="M5 15 15 5M7 5h8v8" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

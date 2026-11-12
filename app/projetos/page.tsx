import type { Metadata } from "next";
import ProjectsBackLink from "@/components/ProjectsBackLink";

type RealProject = {
  title: string;
  segment: string;
  description: string;
  role: string;
  technologies: string[];
  url: string;
  preview: string;
};

const REAL_PROJECTS: RealProject[] = [
  {
    title: "BTech Assistência Técnica",
    segment: "Projeto real · publicado",
    description:
      "Um site responsivo criado para apresentar os serviços com clareza, fortalecer a presença digital da empresa e facilitar pedidos de orçamento pelo WhatsApp.",
    role: "Estratégia, interface e desenvolvimento front-end",
    technologies: ["Design responsivo", "Jornada de orçamento", "Integração WhatsApp"],
    url: "https://btech-assistencia.vercel.app",
    preview: "/projects/btech-hero.png",
  },
  {
    title: "Vero Imóveis",
    segment: "Mercado imobiliário",
    description:
      "A Vero precisava transformar um catálogo extenso em uma busca simples e confiável. Criamos uma experiência responsiva com filtros objetivos, anúncios completos e caminhos claros para iniciar uma conversa.",
    role: "Estratégia, experiência, interface e desenvolvimento front-end",
    technologies: ["Catálogo responsivo", "Filtros inteligentes", "Jornada de contato"],
    url: "https://imobiliariavero.vercel.app",
    preview: "/projects/vero-hero.webp",
  },
];

export const metadata: Metadata = {
  title: "Projetos reais | NX2Y",
  description: "Projetos desenvolvidos por Naomy e publicados pela NX2Y.",
};

type ProjectsPageProps = {
  searchParams: Promise<{ voltar?: string }>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { voltar } = await searchParams;

  return (
    <main className="projects-page">
      <header className="projects-nav">
        <a className="projects-nav__logo" href="/">NX2Y</a>
        <ProjectsBackLink returnPosition={voltar} />
      </header>

      <section className="projects-hero">
        <span className="eyebrow">Projetos reais</span>
        <h1>Trabalhos que já ganharam vida.</h1>
        <p>
          Uma seleção de interfaces desenvolvidas, publicadas e preparadas para aproximar ideias, marcas e pessoas.
        </p>
      </section>

      {REAL_PROJECTS.length > 0 ? (
        <section className="real-projects-grid" aria-label="Lista de projetos publicados">
          {REAL_PROJECTS.map((project) => (
            <article className="real-project-card" key={project.title}>
              <div
                className="real-project-card__preview"
                style={{ backgroundImage: `linear-gradient(180deg, rgba(5, 5, 7, 0.08), rgba(5, 5, 7, 0.9)), url(${project.preview})` }}
              >
                <span>{project.segment}</span><strong>{project.title}</strong>
              </div>
              <div className="real-project-card__content">
                <span>{project.segment}</span>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <small>{project.role}</small>
                <div>{project.technologies.map((technology) => <i key={technology}>{technology}</i>)}</div>
                <a href={project.url} target="_blank" rel="noreferrer">
                  <span>Visitar o site</span>
                  <b aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="projects-empty">
          <span className="projects-empty__tab">ARQUIVO NX2Y</span>
          <div>
            <small>ESTRUTURA PREPARADA</small>
            <h2>Os primeiros projetos<br />serão apresentados aqui.</h2>
            <p>
              Esta página está pronta para receber imagens, detalhes e links dos trabalhos concluídos, sem misturar projetos conceituais com resultados publicados.
            </p>
          </div>
        </section>
      )}

      <footer className="projects-footer">
        <strong>NX2Y</strong>
        <span>NAOMY / FRONT-END</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}

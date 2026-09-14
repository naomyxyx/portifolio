"use client";

import { useRouter } from "next/navigation";

type ProjectsBackLinkProps = {
  returnPosition?: string;
};

export default function ProjectsBackLink({ returnPosition }: ProjectsBackLinkProps) {
  const router = useRouter();

  function returnToPortfolio() {
    const savedPosition = Number(returnPosition);
    const destination = Number.isFinite(savedPosition) && savedPosition > 0
      ? `/?retorno=projetos&posicao=${Math.round(savedPosition)}`
      : "/?retorno=servicos";

    router.replace(destination, { scroll: false });
  }

  return (
    <button className="projects-nav__back" type="button" onClick={returnToPortfolio}>
      Voltar
    </button>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HoverExpandShowcase from "@/components/HoverExpandShowcase";
import HowWeCreate from "@/components/HowWeCreate";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";

type HomeProps = {
  searchParams: Promise<{ retorno?: string; posicao?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { retorno, posicao } = await searchParams;
  const returningToServices = retorno === "servicos" || retorno === "projetos";
  const returnPosition = Number(posicao);

  return (
    <div className={returningToServices ? "portfolio-return-view" : undefined}>
      <Navbar />
      <main>
        <Hero skipIntro={returningToServices} returnPosition={returnPosition} />
        <HoverExpandShowcase />
        <HowWeCreate />
        <About />
        <Faq />
        <Contact />
      </main>
    </div>
  );
}

import Portfolio from "../components/Portfolio";
import ArcRevealHero from "../components/ui/arc-preloader-hero";

export default function Home() {
  return (
    <ArcRevealHero storageKey="hero-preloader-seen">
      <Portfolio />
    </ArcRevealHero>
  );
}

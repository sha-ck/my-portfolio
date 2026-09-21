import type { PortfolioContent } from "./types";
import { Navigation } from "./components/Navigation";
import { SceneBoundary } from "./components/SceneBoundary";
import { StaticSystem } from "./components/StaticSystem";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Contact } from "./sections/Contact";
import tokens from "./tokens.module.css";
import s from "./portfolio.module.css";

export function PortfolioExperience({
  content,
}: {
  content: PortfolioContent;
}) {
  return (
    <div className={`${tokens.tokens} ${s.root}`} data-immersive-root>
      <a href="#main" className={s.skipLink}>
        Skip to content
      </a>
      <StaticSystem />
      <SceneBoundary />
      <Navigation />
      <main id="main">
        <Hero identity={content.identity} />
        <About identity={content.identity} portrait={content.portrait} />
        <Experience items={content.experience} />
        <Projects items={content.projects} />
        <Skills
          groups={content.skills}
          projects={content.projects}
          experience={content.experience}
          aiPractices={content.aiPractices}
        />
        <Contact config={content.contact} />
      </main>
      <footer className={s.footer}>
        <span>{content.identity.name}</span>
        <span>Thoughtful interfaces. Connected systems.</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}

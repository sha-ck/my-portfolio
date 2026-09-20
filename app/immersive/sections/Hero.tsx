import type { PortfolioContent } from "../types";
import s from "../portfolio.module.css";
export function Hero({ identity }: { identity: PortfolioContent["identity"] }) {
  return (
    <section id="home" className={s.hero} aria-labelledby="hero-heading">
      <div className={s.heroCopy}>
        <p className={s.eyebrow}>
          <span className={s.signal} /> {identity.name} / {identity.currentRole}
        </p>
        <h1 id="hero-heading">
          {identity.headline.split(' × ')[0]}
          <br />
          <span>× {identity.headline.split(' × ')[1]}</span>
        </h1>
        <p className={s.lead}>{identity.introduction}</p>
        <div className={s.actions}>
          <a className={s.primary} href="#projects">
            Explore my work <span aria-hidden="true">↗</span>
          </a>
          <a className={s.textLink} href="#contact">
            Start a conversation <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className={s.heroFoot}>
        <span>Interfaces · Architecture · Performance</span>
        <a href="#about">
          Meet the person behind the work <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}

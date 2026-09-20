import Image from "next/image";
import type { PortfolioContent } from "../types";
import s from "../portfolio.module.css";
export function About({
  identity,
  portrait,
}: {
  identity: PortfolioContent["identity"];
  portrait: PortfolioContent["portrait"];
}) {
  return (
    <section
      id="about"
      className={`${s.section} ${s.about}`}
      aria-labelledby="about-heading"
    >
      <div className={s.portrait}>
        <Image
          {...portrait}
          src={portrait.src}
          alt={portrait.alt}
          sizes="(max-width: 700px) 80vw, 380px"
        />
        <span>
          {identity.name}
          <small>Frontend engineering & architecture</small>
        </span>
      </div>
      <div>
        <p className={s.eyebrow}>About / The human layer</p>
        <h2 id="about-heading">
          The interface is
          <br />
          only the beginning.
        </h2>
        <p className={s.lead}>{identity.biography}</p>
        <p className={s.bodyCopy}>
          From the first interaction to the way data moves through a product,
          the details belong to the same system. That’s where I like to work.
        </p>
        <a className={s.textLink} href="#experience">
          Follow the journey <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}

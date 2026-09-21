import type { ExperienceItem } from "../types";
import s from "../portfolio.module.css";
export function Experience({ items }: { items: ExperienceItem[] }) {
  return (
    <section
      id="experience"
      className={s.section}
      aria-labelledby="experience-heading"
    >
      <p className={s.eyebrow} data-reveal>
        Experience / A connected journey
      </p>
      <h2 data-reveal id="experience-heading">
        Built over time.
      </h2>
      <div className={s.timeline}>
        {items.map((item) => (
          <article
            data-reveal
            id={item.id}
            className={s.timelineItem}
            key={item.id}
          >
            <div className={s.period}>
              {item.period}
              <span>
                {item.kind === "education" ? "Education" : "Experience"}
              </span>
            </div>
            <div>
              <h3>{item.role}</h3>
              <p className={s.organization}>{item.organization}</p>
              {item.responsibilities.length > 0 && (
                <ul className={s.bullets}>
                  {item.responsibilities.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              )}
              <div className={s.tags}>
                {item.technologies.map((text) => (
                  <span key={text}>{text}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

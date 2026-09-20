import type { ExperienceItem, ProjectCaseStudy, SkillGroup } from "../types";
import s from "../portfolio.module.css";
export function Skills({
  groups,
  projects,
  experience,
}: {
  groups: SkillGroup[];
  projects: ProjectCaseStudy[];
  experience: ExperienceItem[];
}) {
  return (
    <section id="skills" className={s.section} aria-labelledby="skills-heading">
      <p className={s.eyebrow}>Capabilities / Connected by practice</p>
      <h2 id="skills-heading">
        What I bring
        <br />
        to the system.
      </h2>
      <div className={s.skills}>
        {groups.map((group) => (
          <article key={group.id}>
            <span className={s.skillNode} aria-hidden="true" />
            <h3>{group.name}</h3>
            <ul>
              {group.capabilities.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
            <div className={s.evidence}>
              <span>In practice</span>
              {group.evidence.map((ref) => {
                const label =
                  ref.kind === "project"
                    ? projects.find((p) => p.id === ref.id)?.name
                    : experience.find((e) => e.id === ref.id)?.organization;
                return label ? (
                  <a href={`#${ref.id}`} key={ref.id}>
                    {label} ↗
                  </a>
                ) : null;
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

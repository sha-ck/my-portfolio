import type {
  AiPractice,
  ExperienceItem,
  ProjectCaseStudy,
  SkillGroup,
} from "../types";
import s from "../portfolio.module.css";

export function filterRenderableAiPractices(aiPractices: AiPractice[]) {
  return aiPractices.filter(
    (practice) =>
      Array.isArray(practice.evidence) && practice.evidence.length > 0,
  );
}

export function Skills({
  groups,
  projects,
  experience,
  aiPractices,
}: {
  groups: SkillGroup[];
  projects: ProjectCaseStudy[];
  experience: ExperienceItem[];
  aiPractices: AiPractice[];
}) {
  const visibleAiPractices = filterRenderableAiPractices(aiPractices);

  return (
    <section id="skills" className={s.section} aria-labelledby="skills-heading">
      <p className={s.eyebrow} data-reveal>
        Capabilities / Connected by practice
      </p>
      <h2 data-reveal id="skills-heading">
        What I bring
        <br />
        to the system.
      </h2>
      <div className={s.skills}>
        {groups.map((group) => (
          <article data-reveal key={group.id}>
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
        {visibleAiPractices.map((practice) => (
          <article data-reveal key={practice.id} className={s.practice}>
            <span className={s.skillNode} aria-hidden="true" />
            <h3>{practice.name}</h3>
            <p>{practice.description}</p>
            <div className={s.evidence}>
              <span>Current practice</span>
              <span className={s.evidenceNote}>
                Workflow evidence is documented separately; no AI product claim
                is implied without verification.
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

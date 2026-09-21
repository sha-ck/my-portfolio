'use client';

import { useEffect, useState } from 'react';
import type { ProjectCaseStudy } from '../types';
import Image from 'next/image';
import s from '../portfolio.module.css';
export function Projects({ items }: { items: ProjectCaseStudy[] }) {
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-immersive-root]');
    if (!root) return;
    const selectedIndex = items.findIndex((item) => item.id === selectedId);
    root.dataset.selectedProject = String(Math.max(0, selectedIndex));
    root.dispatchEvent(new Event('projectselect'));
    return () => {
      delete root.dataset.selectedProject;
    };
  }, [items, selectedId]);

  return (
    <section
      id="projects"
      className={s.section}
      aria-labelledby="projects-heading"
    >
      <div className={s.sectionHeading} data-reveal>
        <div>
          <p className={s.eyebrow}>Selected work / Applied engineering</p>
          <h2 id="projects-heading">Behind the interface.</h2>
        </div>
        <p>
          Different products.
          <br />
          The same care for how they work.
        </p>
      </div>
      <div className={s.projects}>
        {items.map((item, index) => (
          <article
            data-reveal
            id={item.id}
            className={`${s.project} ${selectedId === item.id ? s.projectSelected : ''}`}
            key={item.id}
            data-selected={selectedId === item.id ? 'true' : undefined}
          >
            <div className={s.projectArt} data-variant={index}>
              {item.media?.[0] ? (
                <Image
                  {...item.media[0]}
                  alt={item.media[0].alt}
                  sizes="(max-width: 700px) 86vw, 43vw"
                />
              ) : (
                <svg viewBox="0 0 500 220" fill="none" aria-hidden="true">
                  <g stroke="currentColor">
                    {Array.from({ length: 9 }, (_, i) => (
                      <path
                        key={i}
                        d={
                          index % 2
                            ? `M${80 + i * 22} 170 Q250 ${-80 + i * 22} ${410 - i * 10} 160`
                            : `M${70 + i * 15} ${160 - i * 4} L250 ${35 + i * 7} L${430 - i * 12} ${145 - i * 3} L250 ${210 - i * 5} Z`
                        }
                        opacity={0.25 + i * 0.07}
                      />
                    ))}
                    <circle cx="250" cy="110" r="5" fill="currentColor" />
                  </g>
                </svg>
              )}
            </div>
            <div className={s.projectCopy}>
              <p className={s.eyebrow}>{item.users}</p>
              <div className={s.tags}>
                {item.technologies.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <h3>{item.name}</h3>
              <p className={s.projectProblem}>{item.problem}</p>
              <button
                className={s.projectSelect}
                type="button"
                aria-pressed={selectedId === item.id}
                onClick={() => setSelectedId(item.id)}
              >
                {selectedId === item.id ? 'System selected' : 'Select system'}
                <span aria-hidden="true">
                  {selectedId === item.id ? '·' : '↗'}
                </span>
              </button>
              <details>
                <summary>
                  Inside the engineering <span aria-hidden="true">+</span>
                </summary>
                <div className={s.projectDetails}>
                  <h4>System</h4>
                  <p>{item.architecture}</p>
                  <h4>My contribution</h4>
                  <ul className={s.bullets}>
                    {item.responsibilities.map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                  {item.outcomes.map((outcome) => (
                    <p key={outcome.text}>{outcome.text}</p>
                  ))}
                  {item.links?.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </details>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

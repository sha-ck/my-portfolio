"use client";
import { useEffect, useRef, useState } from "react";
import s from "../portfolio.module.css";

const sections = [
  "Home",
  "About",
  "Experience",
  "Projects",
  "Skills",
  "Contact",
];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const media = matchMedia("(min-width: 901px)");
    const reset = () => {
      if (media.matches) setOpen(false);
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        button.current?.focus();
      }
    };
    media.addEventListener("change", reset);
    document.addEventListener("keydown", escape);
    return () => {
      media.removeEventListener("change", reset);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <header className={s.header}>
      <a className={s.wordmark} href="#home" aria-label="Shanid, home">
        s<span>.</span>
      </a>
      <nav aria-label="Main navigation" className={s.desktopNav}>
        {sections.map((name) => (
          <a key={name} href={`#${name.toLowerCase()}`}>
            {name}
          </a>
        ))}
      </nav>
      <a href="#contact" className={s.headerContact}>
        Let’s talk <span aria-hidden="true">↗</span>
      </a>
      <button
        className={s.menuButton}
        ref={button}
        aria-expanded={open}
        aria-controls="lab-mobile-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}{" "}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <nav
        id="lab-mobile-nav"
        aria-label="Mobile navigation"
        className={s.mobileNav}
        hidden={!open}
      >
        {sections.map((name) => (
          <a
            key={name}
            href={`#${name.toLowerCase()}`}
            onClick={() => setOpen(false)}
          >
            {name}
          </a>
        ))}
      </nav>
      <noscript>
        <nav className={s.noScriptNav} aria-label="Section navigation">
          {sections.map((name) => (
            <a key={name} href={`#${name.toLowerCase()}`}>
              {name}
            </a>
          ))}
        </nav>
      </noscript>
    </header>
  );
}

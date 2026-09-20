"use client";
import React, { useState, useEffect, useRef } from "react";

// Stable shared style tokens to avoid re-creating identical objects on every render
const G = {
  card: {
    background: "rgba(17,24,39,0.7)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.05)",
  },
};

const PHOTO_SRC = "https://photos.app.goo.gl/9XPMAEPVwG4gXkhj8";

function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({
    name: "",
    email: "",
    interest: "Frontend Architecture",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [visibleSkills, setVisibleSkills] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisibleSkills(true);
      },
      { threshold: 0.1 },
    );
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `mailto:shanid0cherukattil@gmail.com?subject=${encodeURIComponent(form.interest + " - " + form.name)}&body=${encodeURIComponent(form.message)}`;
    setSent(true);
  };

  const navLinks = [
    "Home",
    "About",
    "Experience",
    "Projects",
    "Skills",
    "Contact",
  ];

  const experience = [
    {
      role: "Lead Frontend Developer",
      company: "Spericorn Technology, India",
      period: "Oct 2021 – Present",
      bullets: [
        "Engineered high-performance SSR and SSG strategies, reducing load times by 30–40%.",
        "Increased Lighthouse performance scores by up to 35%, boosting organic visibility.",
        "Architected analytics-driven dashboards for real-time conversion monitoring.",
        "Designed a scalable components library, cutting development workflows by 40%.",
      ],
      tags: ["React.js", "Next.js", "TypeScript", "SEO"],
    },
    {
      role: "Software Engineering Intern",
      company: "Inmakes Technology",
      period: "July 2021 – Sept 2021",
      bullets: [
        "Focused on component-driven development and modern JS paradigms.",
        "Completed professional training in modern frontend paradigms.",
      ],
      tags: [],
    },
    {
      role: "BCA (Computer Applications)",
      company: "Nasra Arts and Science College",
      period: "2017 – 2020",
      bullets: [],
      tags: [],
    },
  ];

  const coreSkills = [
    "React.js",
    "Next.js",
    "TypeScript",
    "Redux",
    "Node.js",
    "JavaScript",
  ];
  const perfSkills = [
    { name: "Core Web Vitals", label: "Expert", pct: 95 },
    { name: "Technical SEO", label: "Expert", pct: 90 },
    { name: "SSE & Real-time", label: "Advanced", pct: 85 },
    { name: "Infrastructure (Git)", label: "Lead", pct: 92 },
  ];

  const projects = [
    {
      title: "SEO Analytics Platform",
      badge: "Performance",
      badgeColor: "#00FF87",
      desc: "High-performance React/Next.js dashboard for multi-API data visualization. Overcame browser lag during massive dataset rendering through optimized React consumption.",
      tags: ["NEXT.JS", "REACT", "API SYNC"],
      challenge: "Data Lag → Solution: API Optimization",
      graphic: "bars",
    },
    {
      title: "Fintech Money Lending",
      badge: "Real-Time",
      badgeColor: "#38BDF8",
      desc: "Secure React/TypeScript application with real-time state via Server-Sent Events (SSE). Built with a robust architecture for zero-latency financial workflows.",
      tags: ["TYPESCRIPT", "SSE", "REDUX"],
      challenge: "Security → Solution: TS + Event Sync",
      graphic: "rings",
    },
    {
      title: "Call Tracking Attribution",
      badge: "MarketingTech",
      badgeColor: "#00FF87",
      desc: "Mobile-responsive reporting interface for real-time marketing attribution. Focused on fluid UI and accessibility.",
      tags: ["#MarketingTech", "#Reporting"],
      challenge: null,
      graphic: "mini",
    },
    {
      title: "Admin Management Platform",
      badge: "Enterprise",
      badgeColor: "#38BDF8",
      desc: "Enterprise booking and state-management system optimized for internal team workflows and rapid task processing.",
      tags: ["#Enterprise", "#Automation"],
      challenge: null,
      graphic: "mini",
    },
  ];

  return (
    <div className="app-root">
      {/* NAV */}
      <header className={"site-header" + (scrolled ? " scrolled" : "")}>
        <nav className="container card nav-inner">
          <div className="flex" style={{ alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                background: "#00FF87",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                color: "#0A0F1C",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              S
            </div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              Shanid.<span style={{ color: "#00FF87" }}>dev</span>
            </span>
          </div>
          <ul
            style={{
              display: "flex",
              gap: 32,
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="nav-desktop"
          >
            {navLinks.map((n) => (
              <li key={n}>
                <button
                  onClick={() => scrollTo(n.toLowerCase())}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#F8FAFC",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 12,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontWeight: 500,
                    padding: "4px 0",
                  }}
                >
                  {n}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-mobile-btn"
            style={{
              background: "none",
              border: "none",
              color: "#00FF87",
              cursor: "pointer",
              display: "none",
            }}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
        {menuOpen && (
          <div className="container card card-rounded-16 p-8 mt-8">
            {navLinks.map((n) => (
              <button
                key={n}
                onClick={() => scrollTo(n.toLowerCase())}
                className="nav-mobile-item"
              >
                {n}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="hero-section">
        <div className="decor-right" />
        <div className="decor-left" />
        <div className="hero-grid container">
          <div className="hero-text">
            <div className="chip">
              <span
                style={{
                  position: "relative",
                  display: "inline-flex",
                  width: 8,
                  height: 8,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "#00FF87",
                    opacity: 0.75,
                    animation: "ping 1.5s ease infinite",
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#00FF87",
                  }}
                />
              </span>
              AVAILABLE FOR PERFORMANCE PROJECTS
            </div>
            <h1 className="hero-title">
              Engineering the
              <br />
              <span className="hero-highlight">Speed of the Web.</span>
            </h1>
            <p
              style={{
                color: "#94A3B8",
                fontSize: "clamp(15px,1.5vw,18px)",
                maxWidth: 560,
                marginBottom: 40,
                lineHeight: 1.7,
              }}
            >
              I am Shanid Cherukattil, a Lead Frontend Developer specializing in
              React and Next.js architecture. I build scalable, high-performance
              web applications engineered for optimal Core Web Vitals and
              superior SEO.
            </p>
            <div className="cta-group">
              <button
                onClick={() => scrollTo("contact")}
                className="btn btn-primary"
              >
                Let&apos;s Talk Performance
              </button>
              <button
                onClick={() => scrollTo("projects")}
                className="btn btn-ghost"
              >
                View Projects
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 24,
                maxWidth: 400,
              }}
            >
              {[
                ["30-40%", "Faster Loads", "#00FF87"],
                ["25-35%", "SEO Growth", "#38BDF8"],
                ["4+ Yrs", "Engineering", "#F8FAFC"],
              ].map(([v, l, c]) => (
                <div key={l}>
                  <div
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      color: c,
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                  >
                    {v}
                  </div>
                  <div
                    style={{
                      color: "#94A3B8",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="hero-photo"
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "relative",
                width: 280,
                height: 280,
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid #111827",
                boxShadow:
                  "0 25px 60px rgba(0,0,0,0.5),0 0 60px rgba(0,255,135,0.1)",
              }}
            >
              <img
                src={PHOTO_SRC}
                alt="Shanid Cherukattil"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                inset: -40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.2,
                zIndex: -1,
                pointerEvents: "none",
              }}
            >
              <svg
                style={{
                  width: "100%",
                  height: "100%",
                  animation: "spinSlow 8s linear infinite",
                }}
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#00FF87"
                  strokeWidth="0.5"
                  strokeDasharray="10,5"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-padding section-dark">
        <div
          className="about-grid"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: -32,
                left: -32,
                width: 64,
                height: 64,
                borderTop: "2px solid rgba(0,255,135,0.3)",
                borderLeft: "2px solid rgba(0,255,135,0.3)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -32,
                right: -32,
                width: 64,
                height: 64,
                borderBottom: "2px solid rgba(0,255,135,0.3)",
                borderRight: "2px solid rgba(0,255,135,0.3)",
              }}
            />
            <div className="card card-rounded-24 card-pad-32">
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 28,
                  fontWeight: 700,
                  marginBottom: 24,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    color: "#00FF87",
                    fontFamily: "'Fira Code', monospace",
                  }}
                >
                  01.
                </span>{" "}
                Professional Profile
              </h2>
              <p
                style={{
                  color: "#94A3B8",
                  lineHeight: 1.8,
                  marginBottom: 16,
                  fontSize: 16,
                }}
              >
                Great code doesn&apos;t just work; it performs. Over the last
                four years, I have evolved into a Lead Frontend Developer by
                treating UI performance as a core business metric.
              </p>
              <p style={{ color: "#94A3B8", lineHeight: 1.8, fontSize: 16 }}>
                My expertise lies at the intersection of complex frontend
                architecture and granular SEO optimization. By leveraging React
                and Next.js, I transform data-dense applications into
                lightning-fast digital experiences.
              </p>
            </div>
          </div>
          <div className="grid-2-tight">
            {[
              {
                icon: "⚡",
                title: "Performance",
                desc: "Optimizing for the modern web with Core Web Vitals at the forefront.",
                clr: "#00FF87",
              },
              {
                icon: "🔍",
                title: "Technical SEO",
                desc: "Ensuring search engines love your high-speed React applications.",
                clr: "#38BDF8",
              },
              {
                icon: "📦",
                title: "Scale",
                desc: "Building component libraries that grow with your business.",
                clr: "#00FF87",
              },
              {
                icon: "📊",
                title: "Metrics",
                desc: "Data-driven development using Analytics and Lighthouse.",
                clr: "#38BDF8",
              },
            ].map(({ icon, title, desc, clr }) => (
              <div
                key={title}
                className="card card-rounded-16 p-24 flex"
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    marginBottom: 12,
                    filter: `drop-shadow(0 0 8px ${clr})`,
                  }}
                >
                  {icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {title}
                </h3>
                <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.6 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section-padding">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 className="h2" style={{ textAlign: "center", marginBottom: 64 }}>
            Professional <span style={{ color: "#00FF87" }}>Journey</span>
          </h2>
          <div
            style={{
              borderLeft: "2px solid rgba(255,255,255,0.1)",
              paddingLeft: 32,
              marginLeft: 16,
            }}
          >
            {experience.map((exp, i) => (
              <div
                key={i}
                style={{
                  marginBottom: i < experience.length - 1 ? 64 : 0,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: -41,
                    top: 4,
                    width: 14,
                    height: 14,
                    background: "#00FF87",
                    borderRadius: "50%",
                    boxShadow: "0 0 10px #00FF87",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                    gap: 8,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: 22,
                    }}
                  >
                    {exp.role}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      color: "#00FF87",
                      background: "rgba(0,255,135,0.1)",
                      padding: "4px 12px",
                      borderRadius: 6,
                      fontSize: 13,
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
                <div
                  style={{
                    color: "#38BDF8",
                    fontWeight: 700,
                    marginBottom: 16,
                  }}
                >
                  {exp.company}
                </div>
                {exp.bullets.map((b, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      gap: 12,
                      marginBottom: 10,
                      color: "#94A3B8",
                    }}
                  >
                    <span
                      style={{ color: "#00FF87", marginTop: 2, flexShrink: 0 }}
                    >
                      ▹
                    </span>
                    <span style={{ lineHeight: 1.6 }}>{b}</span>
                  </div>
                ))}
                {exp.tags.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginTop: 16,
                    }}
                  >
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: "4px 10px",
                          background: "#111827",
                          border: "1px solid rgba(255,255,255,0.05)",
                          borderRadius: 6,
                          fontFamily: "'Fira Code', monospace",
                          fontSize: 12,
                          color: "#94A3B8",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section-padding section-dark">
        <div className="container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 64,
              gap: 24,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 36,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                Selected{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg,#00FF87,#38BDF8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Projects
                </span>
              </h2>
              <p style={{ color: "#94A3B8", maxWidth: 480 }}>
                A glimpse into high-performance engineering challenges and their
                data-driven solutions.
              </p>
            </div>
            <div className="flex" style={{ gap: 16 }}>
              {[
                ["35%", "Avg. Score Inc.", "#00FF87"],
                ["0ms", "Sync Latency", "#38BDF8"],
              ].map(([v, l, c]) => (
                <div
                  key={v}
                  className="card rounded-12 p-16 px-20 flex"
                  style={{ gap: 12, alignItems: "center" }}
                >
                  <span style={{ fontWeight: 700, fontSize: 22, color: c }}>
                    {v}
                  </span>
                  <span
                    style={{
                      color: "#94A3B8",
                      fontSize: 11,
                      textTransform: "uppercase",
                    }}
                  >
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="projects-grid grid-2-tight" style={{ gap: 32 }}>
            {projects.map((p, i) => (
              <div key={i} className="card card-rounded-24 overflow-hidden">
                {(p.graphic === "bars" || p.graphic === "rings") && (
                  <div
                    style={{
                      height: 180,
                      background: "#0A0F1C",
                      position: "relative",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          p.graphic === "bars"
                            ? "linear-gradient(135deg,rgba(0,255,135,0.05),transparent)"
                            : "linear-gradient(135deg,rgba(56,189,248,0.05),transparent)",
                      }}
                    />
                    {p.graphic === "bars" && (
                      <div
                        style={{
                          display: "flex",
                          gap: 12,
                          alignItems: "flex-end",
                          height: 140,
                          padding: "0 32px",
                          width: "100%",
                        }}
                      >
                        {[40, 65, 50, 85, 55, 75].map((h, j) => (
                          <div
                            key={j}
                            style={{
                              flex: 1,
                              background: `rgba(0,255,135,${0.15 + j * 0.07})`,
                              height: h + "%",
                              borderRadius: "6px 6px 0 0",
                            }}
                          />
                        ))}
                      </div>
                    )}
                    {p.graphic === "rings" && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          width: "100%",
                          position: "absolute",
                          inset: 0,
                        }}
                      >
                        <div
                          style={{
                            width: 120,
                            height: 120,
                            borderRadius: "50%",
                            border: "3px solid rgba(56,189,248,0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: "50%",
                              border: "3px solid rgba(56,189,248,0.4)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              style={{
                                width: 44,
                                height: 44,
                                borderRadius: "50%",
                                background: "rgba(56,189,248,0.6)",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 12,
                        right: 20,
                        fontFamily: "'Fira Code', monospace",
                        fontSize: 11,
                        color: p.badgeColor,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: p.badgeColor,
                        }}
                      />
                      {p.graphic === "bars" ? "SYSTEM ONLINE" : "REAL-TIME SSE"}
                    </div>
                  </div>
                )}
                <div className="p-32">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 16,
                      gap: 12,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: 20,
                      }}
                    >
                      {p.title}
                    </h3>
                    <span
                      style={{
                        padding: "4px 10px",
                        background: `${p.badgeColor}1A`,
                        border: `1px solid ${p.badgeColor}33`,
                        color: p.badgeColor,
                        borderRadius: 9999,
                        fontSize: 11,
                        fontFamily: "'Fira Code', monospace",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.badge}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "#94A3B8",
                      marginBottom: 20,
                      lineHeight: 1.7,
                      fontSize: 14,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: p.challenge ? 24 : 0,
                    }}
                  >
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: "3px 8px",
                          background: "#0A0F1C",
                          border: "1px solid rgba(255,255,255,0.05)",
                          borderRadius: 4,
                          fontFamily: "'Fira Code', monospace",
                          fontSize: 10,
                          color: t.startsWith("#") ? p.badgeColor : "#94A3B8",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.challenge && (
                    <div
                      style={{
                        paddingTop: 20,
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          color: "#94A3B8",
                          fontFamily: "'Fira Code', monospace",
                          fontSize: 11,
                          fontStyle: "italic",
                        }}
                      >
                        {p.challenge}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section-padding" ref={skillsRef}>
        <div
          className="skills-grid"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 32,
                fontWeight: 700,
                marginBottom: 48,
              }}
            >
              Technical <span style={{ color: "#00FF87" }}>Ecosystem</span>
            </h2>
            <div style={{ marginBottom: 48 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 24,
                  color: "#38BDF8",
                  fontFamily: "'Fira Code', monospace",
                  fontSize: 12,
                  textTransform: "uppercase",
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 1,
                    background: "#38BDF8",
                    display: "inline-block",
                  }}
                />{" "}
                CORE TECH STACK
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 12,
                }}
              >
                {coreSkills.map((s) => (
                  <div
                    key={s}
                    className="card rounded-10 p-12 flex"
                    style={{ alignItems: "center", gap: 10 }}
                  >
                    <span style={{ color: "#00FF87" }}>▹</span>
                    <span style={{ fontWeight: 500, fontSize: 14 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 24,
                  color: "#38BDF8",
                  fontFamily: "'Fira Code', monospace",
                  fontSize: 12,
                  textTransform: "uppercase",
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 1,
                    background: "#38BDF8",
                    display: "inline-block",
                  }}
                />{" "}
                PERFORMANCE & OPS
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                {perfSkills.map((s, i) => (
                  <div key={s.name} className="card rounded-12 p-16">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>{s.name}</span>
                      <span
                        style={{
                          color: "#00FF87",
                          fontFamily: "'Fira Code', monospace",
                          fontSize: 13,
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                    <div
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: 9999,
                        height: 6,
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          borderRadius: 9999,
                          background: "#00FF87",
                          boxShadow: "0 0 10px #00FF87",
                          width: visibleSkills ? s.pct + "%" : "0%",
                          transition: `width 1.2s ease ${i * 150}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-col gap-32">
            <div className="card card-rounded-24 card-pad-40">
              <div
                style={{
                  fontFamily: "'Fira Code', monospace",
                  color: "#00FF87",
                  fontSize: 40,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                35+
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 16,
                }}
              >
                Lighthouse Increase
              </div>
              <p style={{ color: "#94A3B8", lineHeight: 1.7 }}>
                My primary KPI is performance. Every project I lead undergoes
                rigorous optimization to ensure top-tier organic visibility and
                user retention.
              </p>
            </div>
            <div className="card card-rounded-24 card-pad-40 accent-left-38">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: "rgba(56,189,248,0.2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                  }}
                >
                  ⭐
                </div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 20,
                  }}
                >
                  Certifications
                </h3>
              </div>
              {[
                ["Employee of the Month (Sept 2021)", "AWARD"],
                ["Python Developer", "Sinet Institute"],
                ["Junior Programmer", "SSiNET"],
              ].map(([name, badge]) => (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{name}</span>
                  <span
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: 11,
                      color: "#38BDF8",
                    }}
                  >
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-padding section-darker">
        <div className="container">
          <div className="contact-grid card card-rounded-32 card-pad-64 grid-2-3">
            <div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 32,
                  fontWeight: 700,
                  marginBottom: 24,
                }}
              >
                Ready to <span style={{ color: "#00FF87" }}>accelerate</span>{" "}
                your digital product?
              </h2>
              <p
                style={{
                  color: "#94A3B8",
                  marginBottom: 40,
                  lineHeight: 1.7,
                  fontSize: 16,
                }}
              >
                Whether you need a performance audit or a high-speed
                architecture from scratch, I bring the engineering precision
                required for results.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                  marginBottom: 40,
                }}
              >
                {[
                  ["✉️", "Email Me", "shanid0cherukattil@gmail.com"],
                  ["📍", "Location", "India (Open to Global Remote)"],
                ].map(([icon, label, value]) => (
                  <div
                    key={label}
                    className="flex"
                    style={{ alignItems: "center", gap: 16 }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        background: "rgba(0,255,135,0.1)",
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {icon}
                    </div>
                    <div>
                      <div
                        style={{
                          color: "#94A3B8",
                          fontSize: 10,
                          textTransform: "uppercase",
                          fontFamily: "'Fira Code', monospace",
                        }}
                      >
                        {label}
                      </div>
                      <div style={{ color: "#F8FAFC", fontWeight: 500 }}>
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex" style={{ gap: 16 }}>
                {[
                  ["https://github.com/shanid00cherukattil", "GH"],
                  ["https://www.linkedin.com/in/shanid0cherukattil/", "LI"],
                ].map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="card rounded-full w-48 h-48 social-link"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex-col gap-24">
              {sent ? (
                <div style={{ textAlign: "center", padding: 48 }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#00FF87",
                      marginBottom: 8,
                    }}
                  >
                    Transmission Sent!
                  </h3>
                  <p style={{ color: "#94A3B8" }}>
                    Your email client should open. I&apos;ll get back to you
                    soon.
                  </p>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 24,
                    }}
                  >
                    {[
                      ["Name", "name", "text", "John Doe"],
                      ["Email", "email", "email", "john@example.com"],
                    ].map(([label, key, type, ph]) => (
                      <div key={key}>
                        <label
                          style={{
                            display: "block",
                            color: "#94A3B8",
                            fontFamily: "'Fira Code', monospace",
                            fontSize: 11,
                            textTransform: "uppercase",
                            marginBottom: 8,
                          }}
                        >
                          {label}
                        </label>
                        <input
                          type={type}
                          placeholder={ph}
                          value={form[key]}
                          onChange={(e) =>
                            setForm({ ...form, [key]: e.target.value })
                          }
                          style={{
                            width: "100%",
                            background: "#0A0F1C",
                            border: "1px solid rgba(255,255,255,0.05)",
                            borderRadius: 12,
                            padding: "12px 16px",
                            color: "#F8FAFC",
                            fontFamily: "Inter, sans-serif",
                            fontSize: 14,
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        color: "#94A3B8",
                        fontFamily: "'Fira Code', monospace",
                        fontSize: 11,
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      Project Interest
                    </label>
                    <select
                      value={form.interest}
                      onChange={(e) =>
                        setForm({ ...form, interest: e.target.value })
                      }
                      style={{
                        width: "100%",
                        background: "#0A0F1C",
                        border: "1px solid rgba(255,255,255,0.05)",
                        borderRadius: 12,
                        padding: "12px 16px",
                        color: "#F8FAFC",
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        outline: "none",
                      }}
                    >
                      {[
                        "Frontend Architecture",
                        "Performance Audit",
                        "Technical SEO Strategy",
                        "Other",
                      ].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        color: "#94A3B8",
                        fontFamily: "'Fira Code', monospace",
                        fontSize: 11,
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell me about your performance bottlenecks..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      style={{
                        width: "100%",
                        background: "#0A0F1C",
                        border: "1px solid rgba(255,255,255,0.05)",
                        borderRadius: 12,
                        padding: "12px 16px",
                        color: "#F8FAFC",
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        outline: "none",
                        resize: "vertical",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      padding: 16,
                      background: "#00FF87",
                      color: "#0A0F1C",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: 15,
                      border: "none",
                      borderRadius: 12,
                      cursor: "pointer",
                    }}
                  >
                    Send Transmission →
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div
        style={{
          padding: "48px 24px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            Shanid Cherukattil
          </div>
          <div
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: 10,
              color: "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            Optimized with{" "}
            <span style={{ color: "#00FF87" }}>Next.js Philosophy</span> • Built
            for Performance
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Portfolio);

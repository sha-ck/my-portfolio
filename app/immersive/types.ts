export type SceneId =
  "home" | "about" | "experience" | "projects" | "skills" | "contact";
export type RenderProfile = "full" | "lite" | "static";
export type ContactIntent = "role" | "client";
export interface ExperienceItem {
  id: string;
  kind: "employment" | "education";
  role: string;
  organization: string;
  period: string;
  responsibilities: string[];
  technologies: string[];
}
export interface ProjectCaseStudy {
  id: string;
  name: string;
  visibility?: "public" | "private";
  users: string;
  problem: string;
  responsibilities: string[];
  architecture: string;
  technologies: string[];
  outcomes: { text: string; evidence: string }[];
  links?: { label: string; url: string }[];
  media?: { src: string; alt: string; width: number; height: number }[];
}
export interface SkillGroup {
  id: string;
  name: string;
  capabilities: string[];
  evidence: { kind: "experience" | "project"; id: string }[];
}
export interface PortfolioContent {
  identity: {
    name: string;
    headline: string;
    introduction: string;
    biography: string;
  };
  portrait: { src: string; alt: string; width: number; height: number };
  experience: ExperienceItem[];
  projects: ProjectCaseStudy[];
  skills: SkillGroup[];
  contact: {
    email?: string;
    whatsappInternational?: string;
    linkedinUrl?: string;
  };
}

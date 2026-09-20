import type { RenderProfile, SceneId } from "../types";

export const sceneIds: SceneId[] = [
  "home",
  "about",
  "experience",
  "projects",
  "skills",
  "contact",
];
export type SceneState = { id: SceneId; progress: number };
export type SceneControls = SceneState & {
  pointerX: number;
  pointerY: number;
  revision: number;
  projectIndex: number;
};

export function clampProgress(value: number): number {
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
}
export function resolveScene(
  sections: { id: SceneId; top: number; height: number }[],
  position: number,
  atDocumentEnd = false,
): SceneState {
  if (atDocumentEnd && sections.length)
    return { id: sections[sections.length - 1].id, progress: 1 };
  let active = sections[0];
  for (const section of sections) if (section.top <= position) active = section;
  if (!active) return { id: "home", progress: 0 };
  return {
    id: active.id,
    progress: clampProgress(
      (position - active.top) / Math.max(1, active.height),
    ),
  };
}
export function chooseRenderProfile({
  reducedMotion,
  webglAvailable,
  constrained = true,
}: {
  reducedMotion: boolean;
  webglAvailable: boolean;
  constrained?: boolean;
}): RenderProfile {
  return reducedMotion || !webglAvailable
    ? "static"
    : constrained
      ? "lite"
      : "full";
}

export function downgradeProfile(profile: RenderProfile): RenderProfile {
  return profile === "full" ? "lite" : "static";
}

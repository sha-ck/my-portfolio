"use client";
import { useEffect, type MutableRefObject } from "react";
import { resolveScene, sceneIds, type SceneControls } from "./sceneState";

export function SceneDirector({
  controls,
}: {
  controls: MutableRefObject<SceneControls>;
}) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-immersive-root]");
    if (!root) return;
    const sections = sceneIds.flatMap((id) => {
      const element = root.querySelector<HTMLElement>(`#${id}`);
      return element ? [{ id, element }] : [];
    });
    let frame = 0;
    let lastScroll = window.scrollY;
    let snap = true;
    const projects = Array.from(
      root.querySelectorAll<HTMLElement>("#projects article[id]"),
    );
    let interactedProject = -1;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      frame = 0;
      // Match the native anchor offset, not the centre of a tall section.
      const measurements = sections.map(({ id, element }) => {
        const rect = element.getBoundingClientRect();
        return { id, top: rect.top + window.scrollY, height: rect.height };
      });
      const state = resolveScene(
        measurements,
        window.scrollY + 112,
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 2,
      );
      if (
        snap ||
        Math.abs(window.scrollY - lastScroll) > window.innerHeight * 0.7
      )
        controls.current.revision++;
      Object.assign(controls.current, state);
      if (state.id === "projects") {
        let nearest = 0;
        let distance = Infinity;
        projects.forEach((project, index) => {
          const rect = project.getBoundingClientRect();
          const next = Math.max(rect.top - 180, 180 - rect.bottom, 0);
          if (next < distance) {
            distance = next;
            nearest = index;
          }
        });
        const interacted = projects[interactedProject]?.getBoundingClientRect();
        controls.current.projectIndex =
          interacted && interacted.bottom > 112 && interacted.top < innerHeight
            ? interactedProject
            : nearest;
      }
      root.dataset.scene = state.id;
      lastScroll = window.scrollY;
      snap = false;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onHash = () => {
      snap = true;
      schedule();
    };
    const onPointer = (event: PointerEvent) => {
      if (motion.matches || event.pointerType !== "mouse") return;
      controls.current.pointerX = event.clientX / window.innerWidth - 0.5;
      controls.current.pointerY = event.clientY / window.innerHeight - 0.5;
    };
    const resetPointer = () => {
      controls.current.pointerX = controls.current.pointerY = 0;
    };
    const onProjectInteraction = (event: Event) => {
      const article =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("#projects article[id]")
          : null;
      interactedProject = article ? projects.indexOf(article) : -1;
      schedule();
    };
    const resize = new ResizeObserver(schedule);
    sections.forEach(({ element }) => resize.observe(element));
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", onHash);
    root.addEventListener("pointermove", onPointer, { passive: true });
    root.addEventListener("pointerleave", resetPointer);
    root.addEventListener("pointerover", onProjectInteraction);
    root.addEventListener("focusin", onProjectInteraction);
    motion.addEventListener("change", resetPointer);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", onHash);
      root.removeEventListener("pointermove", onPointer);
      root.removeEventListener("pointerleave", resetPointer);
      root.removeEventListener("pointerover", onProjectInteraction);
      root.removeEventListener("focusin", onProjectInteraction);
      motion.removeEventListener("change", resetPointer);
      delete root.dataset.scene;
    };
  }, [controls]);
  return null;
}

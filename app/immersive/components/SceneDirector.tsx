"use client";
import { useEffect, type MutableRefObject } from "react";
import {
  resolveScene,
  sceneIds,
  type SceneControls,
} from "../scene/renderProfile";

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
    const revealed = new WeakSet<HTMLElement>();
    const animations = new Map<HTMLElement, Animation>();
    const tokens = getComputedStyle(root);
    const duration =
      parseFloat(tokens.getPropertyValue("--motion-entrance")) || 520;
    const stagger =
      parseFloat(tokens.getPropertyValue("--motion-stagger")) || 65;
    const finishEntrances = () => {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const onMotion = () => {
      resetPointer();
      if (motion.matches) finishEntrances();
    };
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
      // One director owns section state for both navigation and the canvas.
      root
        .querySelectorAll<HTMLAnchorElement>("nav a[href^='#']")
        .forEach((link) => {
          if (link.hash === `#${state.id}`)
            link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      // Visible HTML is the baseline. Only animate elements that have entered;
      // there is no hidden waiting state and no second scroll/visibility model.
      const entering = Array.from(
        root.querySelectorAll<HTMLElement>("[data-reveal]"),
      )
        .filter((element) => !revealed.has(element))
        .map((element) => ({ element, rect: element.getBoundingClientRect() }));
      let order = 0;
      const direct = snap && Boolean(location.hash);
      const jump =
        Math.abs(window.scrollY - lastScroll) > window.innerHeight * 0.7;
      entering.forEach(({ element, rect }) => {
        if (rect.top >= innerHeight - 24) return;
        revealed.add(element);
        if (
          motion.matches ||
          direct ||
          jump ||
          rect.bottom <= 0 ||
          element.contains(document.activeElement) ||
          !element.animate
        )
          return;
        const animation = element.animate(
          [
            { opacity: 0.35, transform: "translateY(18px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration,
            delay: Math.min(order++, 3) * stagger,
            fill: "backwards",
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          },
        );
        animations.set(element, animation);
        animation.onfinish = () => animations.delete(element);
      });
      lastScroll = window.scrollY;
      snap = false;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onHash = () => {
      finishEntrances();
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
      if (event.type === "focusin") finishEntrances();
      const article =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("#projects article[id]")
          : null;
      interactedProject = article ? projects.indexOf(article) : -1;
      schedule();
    };
    const resize =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(schedule);
    sections.forEach(({ element }) => resize?.observe(element));
    const onVisibility = () => {
      finishEntrances();
      if (!document.hidden) onHash();
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", onHash);
    root.addEventListener("pointermove", onPointer, { passive: true });
    root.addEventListener("pointerleave", resetPointer);
    root.addEventListener("pointerover", onProjectInteraction);
    root.addEventListener("focusin", onProjectInteraction);
    motion.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onHash);
    return () => {
      cancelAnimationFrame(frame);
      resize?.disconnect();
      finishEntrances();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", onHash);
      root.removeEventListener("pointermove", onPointer);
      root.removeEventListener("pointerleave", resetPointer);
      root.removeEventListener("pointerover", onProjectInteraction);
      root.removeEventListener("focusin", onProjectInteraction);
      motion.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onHash);
      root
        .querySelectorAll("nav a[aria-current]")
        .forEach((link) => link.removeAttribute("aria-current"));
      delete root.dataset.scene;
    };
  }, [controls]);
  return null;
}

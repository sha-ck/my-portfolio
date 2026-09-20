"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { RenderProfile } from "../types";
import { SceneDirector } from "./SceneDirector";
import {
  downgradeProfile,
  chooseRenderProfile,
  type SceneControls,
} from "./sceneState";

const LivingSystemCanvas = dynamic(() => import("./LivingSystemCanvas"), {
  ssr: false,
  loading: () => null,
});

class CanvasBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function SceneBoundary() {
  const controls = useRef<SceneControls>({
    id: "home",
    progress: 0,
    pointerX: 0,
    pointerY: 0,
    revision: 0,
    projectIndex: 0,
  });
  const [profile, setProfile] = useState<RenderProfile>("static");
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const failed = useRef(false);
  const ceiling = useRef<RenderProfile>("full");
  const activeProfile = useRef<RenderProfile>("static");
  const fail = useCallback(() => {
    failed.current = true;
    setReady(false);
    setProfile("static");
  }, []);
  const downgrade = useCallback(() => {
    if (ceiling.current === "static") return;
    ceiling.current = downgradeProfile(activeProfile.current);
    activeProfile.current = ceiling.current;
    setProfile(ceiling.current);
  }, []);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = matchMedia("(max-width: 767px)");
    const device = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    let webglAvailable: boolean | undefined;
    const select = () => {
      if (failed.current || ceiling.current === "static") return;
      if (!motion.matches && webglAvailable === undefined) {
        webglAvailable = false;
        try {
          const probe = document.createElement("canvas");
          const gl = probe.getContext("webgl2") || probe.getContext("webgl");
          webglAvailable = Boolean(gl);
          gl?.getExtension("WEBGL_lose_context")?.loseContext();
        } catch {
          /* Retain the static illustration. */
        }
      }
      const selected = chooseRenderProfile({
        reducedMotion: motion.matches,
        webglAvailable: webglAvailable ?? false,
        constrained:
          narrow.matches ||
          device.connection?.saveData === true ||
          (device.deviceMemory ?? 0) < 8 ||
          (navigator.hardwareConcurrency ?? 0) < 8 ||
          ceiling.current === "lite",
      });
      if (selected === "static") setReady(false);
      activeProfile.current = selected;
      setProfile(selected);
    };
    const visibility = () => setVisible(!document.hidden);
    select();
    visibility();
    motion.addEventListener("change", select);
    narrow.addEventListener("change", select);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      motion.removeEventListener("change", select);
      narrow.removeEventListener("change", select);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-immersive-root]");
    if (!root) return;
    root.dataset.renderProfile = profile;
    root.dataset.canvasReady = String(ready && profile !== "static");
    return () => {
      delete root.dataset.renderProfile;
      delete root.dataset.canvasReady;
    };
  }, [profile, ready]);

  return (
    <>
      <SceneDirector controls={controls} />
      {profile !== "static" && (
        <CanvasBoundary onFailure={fail}>
          <LivingSystemCanvas
            profile={profile}
            controls={controls}
            visible={visible}
            onReady={onReady}
            onFailure={fail}
            onSlow={downgrade}
          />
        </CanvasBoundary>
      )}
    </>
  );
}

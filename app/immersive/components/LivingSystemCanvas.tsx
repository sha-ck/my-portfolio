"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  DynamicDrawUsage,
  MathUtils,
  Object3D,
  Vector3,
  type Group,
  type InstancedMesh,
  type Mesh,
} from "three";
import type { RenderProfile } from "../types";
import { sceneIds, type SceneControls } from "./sceneState";
import s from "../portfolio.module.css";

type Props = {
  profile: Exclude<RenderProfile, "static">;
  controls: MutableRefObject<SceneControls>;
  visible: boolean;
  onReady: () => void;
  onFailure: () => void;
  onSlow: () => void;
};

// The same nodes persist: seed, paired branches, spine, chambers, ecosystem, whole system.
function positions(scene: number, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const t = i / count;
    const angle = t * Math.PI * 2;
    const side = i % 2 ? 1 : -1;
    switch (scene) {
      case 1:
        return new Vector3(
          side * (0.55 + Math.sin(t * Math.PI) * 0.85),
          (t - 0.5) * 3.3,
          Math.cos(angle * 2) * 0.45,
        );
      case 2:
        return new Vector3(
          Math.sin(angle * 3) * 0.4,
          (t - 0.5) * 4.4,
          Math.cos(angle * 3) * 0.4,
        );
      case 3: {
        const chamber = Math.floor(t * 4);
        const local = ((t * 4) % 1) * Math.PI * 2;
        return new Vector3(
          ((chamber % 2) - 0.5) * 1.85 + Math.cos(local) * 0.6,
          (Math.floor(chamber / 2) - 0.5) * 1.85 + Math.sin(local) * 0.6,
          Math.sin(local * 2) * 0.4,
        );
      }
      case 4:
        return new Vector3(
          Math.cos(angle) * (i % 3 ? 1.8 : 0.85),
          Math.sin(angle) * (i % 3 ? 1.8 : 0.85),
          Math.sin(angle * 3) * 0.7,
        );
      case 5:
        return new Vector3(
          Math.cos(angle) * 2.2,
          Math.sin(angle) * 2.2,
          Math.sin(angle * 3) * 0.85,
        );
      default:
        return new Vector3(
          Math.cos(angle) * (1 + 0.3 * Math.sin(angle * 3)),
          Math.sin(angle) * 1.45,
          Math.sin(angle * 2) * 0.65,
        );
    }
  });
}

function Organism({
  profile,
  controls,
  visible,
  onReady,
  onSlow,
}: Omit<Props, "onFailure">) {
  const group = useRef<Group>(null);
  const nodes = useRef<InstancedMesh>(null);
  const core = useRef<Mesh>(null);
  const ready = useRef(false);
  const revision = useRef(-1);
  const sample = useRef({ warmup: 0, duration: 0, frames: 0, reported: false });
  const count = profile === "full" ? 24 : 12;
  const layouts = useMemo(
    () => sceneIds.map((_, index) => positions(index, count)),
    [count],
  );
  const current = useMemo(() => positions(0, count), [count]);
  const dummy = useMemo(() => new Object3D(), []);
  const connections = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => [
        [i, (i + 1) % count],
        [i, (i + (profile === "full" ? 5 : 3)) % count],
      ]).flat(),
    [count, profile],
  );
  const geometry = useMemo(() => {
    const result = new BufferGeometry();
    result.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(connections.length * 6), 3).setUsage(
        DynamicDrawUsage,
      ),
    );
    return result;
  }, [connections]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => {
    sample.current = { warmup: 0, duration: 0, frames: 0, reported: false };
  }, [profile, visible]);

  useFrame(({ camera, clock }, delta) => {
    if (!visible || !group.current || !nodes.current || !core.current) return;
    const scene = controls.current;
    const index = sceneIds.indexOf(scene.id);
    const snap = revision.current !== scene.revision;
    revision.current = scene.revision;
    const blend = snap ? 1 : 1 - Math.exp(-Math.min(delta, 0.05) * 4);
    const time = clock.elapsedTime;
    const breath = 1 + Math.sin(time * 0.7) * 0.012;
    const attribute = geometry.getAttribute("position") as BufferAttribute;
    for (let i = 0; i < count; i++) {
      current[i].lerp(layouts[index][i], blend);
      dummy.position.copy(current[i]);
      const chamber = Math.floor((i / count) * 4);
      const emphasis =
        scene.id === "projects" && chamber === scene.projectIndex;
      dummy.scale.setScalar(emphasis ? 0.075 : i % 3 === 0 ? 0.052 : 0.032);
      dummy.updateMatrix();
      nodes.current.setMatrixAt(i, dummy.matrix);
    }
    nodes.current.instanceMatrix.needsUpdate = true;
    connections.forEach(([a, b], i) => {
      attribute.setXYZ(i * 2, current[a].x, current[a].y, current[a].z);
      attribute.setXYZ(i * 2 + 1, current[b].x, current[b].y, current[b].z);
    });
    attribute.needsUpdate = true;
    const parallax = profile === "full" ? 0.18 : 0;
    group.current.rotation.y = MathUtils.lerp(
      group.current.rotation.y,
      Math.sin(time * 0.09) * 0.13 + scene.pointerX * parallax,
      blend,
    );
    group.current.rotation.x = MathUtils.lerp(
      group.current.rotation.x,
      scene.pointerY * parallax,
      blend,
    );
    group.current.scale.setScalar(breath);
    core.current.scale.setScalar(
      MathUtils.lerp(
        core.current.scale.x,
        scene.id === "home" ? 0.68 : 0.27,
        blend,
      ),
    );
    core.current.rotation.y = time * 0.1;
    const cameraZ =
      scene.id === "contact" ? (profile === "full" ? 8.3 : 7.5) : 6.8;
    camera.position.z = MathUtils.lerp(camera.position.z, cameraZ, blend);
    if (!ready.current) {
      ready.current = true;
      onReady();
    }
    // One-way degradation only, after warm-up and a sustained five-second sample.
    const metrics = sample.current;
    metrics.warmup += delta;
    if (metrics.warmup > 3 && !metrics.reported) {
      metrics.duration += delta;
      metrics.frames++;
      if (metrics.duration >= 5) {
        if (metrics.frames / metrics.duration < 24) {
          metrics.reported = true;
          onSlow();
        } else {
          metrics.duration = 0;
          metrics.frames = 0;
        }
      }
    }
  });

  return (
    <group ref={group}>
      <instancedMesh
        ref={nodes}
        args={[undefined, undefined, count]}
        frustumCulled={false}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#5EF2A6" />
      </instancedMesh>
      <lineSegments geometry={geometry} frustumCulled={false}>
        <lineBasicMaterial
          color="#58C7FF"
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </lineSegments>
      <mesh ref={core}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial
          color="#5EF2A6"
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>
      {Array.from({ length: profile === "full" ? 9 : 4 }, (_, i) => (
        <mesh key={i} rotation={[i * 0.31, i * 0.24, i * 0.18]}>
          <torusGeometry
            args={[1.05 + i * 0.075, 0.003, 3, profile === "full" ? 96 : 48]}
          />
          <meshBasicMaterial
            color={i % 2 ? "#8875FF" : "#5EF2A6"}
            transparent
            opacity={0.17}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function ContextGuard({ onFailure }: { onFailure: () => void }) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => gl.domElement.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  return null;
}

export default function LivingSystemCanvas(props: Props) {
  return (
    <div className={s.webgl} aria-hidden="true">
      <Canvas
        dpr={props.profile === "full" ? [1, 1.5] : 1}
        frameloop={props.visible ? "always" : "never"}
        camera={{ position: [0, 0, 6.8], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <ContextGuard onFailure={props.onFailure} />
        <Organism {...props} />
      </Canvas>
    </div>
  );
}

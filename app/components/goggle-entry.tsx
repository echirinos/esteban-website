"use client";

import { useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  RoundedBox,
  useTexture,
} from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export type EntryPhase = "outside" | "transition" | "inside";
export const ENTRY_DURATION_MS = 3800;
export const REDUCED_ENTRY_DURATION_MS = 250;

const smooth = (start: number, end: number, value: number) =>
  THREE.MathUtils.smoothstep(value, start, end);

/** A local, lit 3D headset. No model download or remote environment map. */
export function Headset({
  phase,
  image,
  reducedMotion,
}: {
  phase: EntryPhase;
  image: string;
  reducedMotion: boolean;
}) {
  const rig = useRef<THREE.Group>(null);
  const elapsed = useRef(0);
  const phaseStarted = useRef(0);
  const texture = useTexture(image);
  const { viewport, camera } = useThree();
  const position = useRef(new THREE.Vector3());
  const orientation = useRef(new THREE.Quaternion());
  const baseScale = Math.min(1, viewport.width / 4.5);

  useEffect(() => {
    elapsed.current = 0;
    phaseStarted.current = performance.now();
  }, [phase]);

  useFrame((state, delta) => {
    if (!rig.current) return;
    if (state.frameloop === "always") elapsed.current += Math.min(delta, 0.05);
    const t =
      phase === "transition"
        ? (performance.now() - phaseStarted.current) / 1000
        : elapsed.current;
    const fitting = phase === "transition";
    const lift = fitting && !reducedMotion ? smooth(0, 1.25, t) : 0;
    const approach = fitting && !reducedMotion ? smooth(0.35, 1.65, t) : 0;
    rig.current.visible =
      phase !== "inside" && (!fitting || (!reducedMotion && t < 1.8));
    // Camera-local coordinates keep the headset centered on phones and wide screens.
    position.current.set(
      0,
      THREE.MathUtils.lerp(-0.24, 0, lift),
      THREE.MathUtils.lerp(-4.1, -0.18, approach),
    );
    position.current.applyQuaternion(camera.quaternion).add(camera.position);
    rig.current.position.copy(position.current);
    orientation.current.setFromEuler(
      new THREE.Euler(
        THREE.MathUtils.lerp(-0.12, 0, lift),
        THREE.MathUtils.lerp(-0.22, 0, lift) +
          (!fitting && !reducedMotion ? Math.sin(t * 0.38) * 0.055 : 0),
        THREE.MathUtils.lerp(-0.055, 0, lift),
      ),
    );
    rig.current.quaternion
      .copy(camera.quaternion)
      .multiply(orientation.current);
    rig.current.scale.setScalar(baseScale);
  });

  return (
    <>
      <Environment resolution={128} frames={1}>
        <Lightformer
          intensity={3}
          color="#d4efff"
          position={[-3, 3, 3]}
          scale={[6, 2, 1]}
        />
        <Lightformer
          intensity={2}
          color="#8b92ff"
          position={[4, 0, 2]}
          scale={[3, 5, 1]}
        />
        <Lightformer
          intensity={1.5}
          color="#dffaf1"
          position={[0, -3, 4]}
          scale={[5, 1, 1]}
        />
      </Environment>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 6]} intensity={3} color="#d8efff" />
      <group ref={rig}>
        {/* Soft face gasket, machined shell, optical faceplate. */}
        <RoundedBox
          args={[3.42, 1.52, 0.62]}
          radius={0.32}
          smoothness={5}
          position={[0, 0, -0.15]}
        >
          <meshStandardMaterial color="#121820" roughness={0.9} />
        </RoundedBox>
        <RoundedBox args={[3.36, 1.45, 0.56]} radius={0.3} smoothness={5}>
          <meshPhysicalMaterial
            color="#6e7c8d"
            metalness={0.92}
            roughness={0.26}
            clearcoat={0.65}
          />
        </RoundedBox>
        <RoundedBox
          args={[3.19, 1.28, 0.12]}
          radius={0.3}
          smoothness={5}
          position={[0, 0, 0.3]}
        >
          <meshPhysicalMaterial
            color="#0a111b"
            metalness={0.45}
            roughness={0.2}
            clearcoat={1}
          />
        </RoundedBox>
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.78, 0.015, 0.38]}>
            <mesh scale={[1, 0.85, 1]}>
              <torusGeometry args={[0.53, 0.045, 10, 56]} />
              <meshStandardMaterial
                color="#768ba1"
                metalness={0.95}
                roughness={0.23}
              />
            </mesh>
            <mesh scale={[1, 0.85, 1]} position={[0, 0, 0.025]}>
              <torusGeometry args={[0.47, 0.009, 8, 48]} />
              <meshBasicMaterial color="#a7e5e5" />
            </mesh>
            <mesh scale={[0.48, 0.405, 0.08]} position={[0, 0, 0.015]}>
              <sphereGeometry args={[1, 48, 24]} />
              <meshPhysicalMaterial
                map={texture}
                color="#94c8da"
                metalness={0.38}
                roughness={0.12}
                clearcoat={1}
                clearcoatRoughness={0.08}
              />
            </mesh>
            <RoundedBox
              args={[0.24, 0.44, 0.76]}
              radius={0.09}
              smoothness={3}
              position={[side * 0.98, 0, -0.46]}
            >
              <meshStandardMaterial
                color="#303b49"
                metalness={0.65}
                roughness={0.35}
              />
            </RoundedBox>
          </group>
        ))}
        <RoundedBox
          args={[0.22, 0.055, 0.022]}
          radius={0.018}
          smoothness={3}
          position={[0, 0.43, 0.373]}
        >
          <meshBasicMaterial color="#b4eddb" />
        </RoundedBox>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh key={i} position={[-0.25 + i * 0.1, -0.53, 0.365]}>
            <boxGeometry args={[0.045, 0.023, 0.014]} />
            <meshBasicMaterial color="#46566b" />
          </mesh>
        ))}
      </group>
    </>
  );
}

/** Foreground occlusion makes the transition read as a visor meeting your face. */
export function VisorTransition({
  reducedMotion,
  worldName,
  onSkip,
}: {
  reducedMotion: boolean;
  worldName: string;
  onSkip: () => void;
}) {
  const skip = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    skip.current?.focus({ preventScroll: true });
  }, []);
  return (
    <div className="visor-transition" data-testid="visor-transition">
      {!reducedMotion ? (
        <>
          <motion.div
            className="visor-blackout"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
            transition={{
              duration: 3.8,
              times: [0, 0.23, 0.39, 0.54, 0.57, 1],
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="visor-opening"
            aria-hidden="true"
            initial={{
              opacity: 0,
              top: "50%",
              bottom: "50%",
              left: "48%",
              right: "48%",
              borderRadius: 80,
            }}
            animate={{
              opacity: 1,
              top: ["50%", "25%", "0%"],
              bottom: ["50%", "24%", "0%"],
              left: ["48%", "12%", "0%"],
              right: ["48%", "12%", "0%"],
              borderRadius: [80, 80, 0],
            }}
            transition={{
              delay: 2.05,
              duration: 1.65,
              times: [0, 0.5, 1],
              ease: [0.22, 1, 0.36, 1],
              opacity: { delay: 2.05, duration: 0 },
            }}
          />
          <motion.div
            className="visor-calibration"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              delay: 1.45,
              duration: 1.5,
              times: [0, 0.2, 0.65, 1],
            }}
          >
            <span />
            <span />
            <p>Opening {worldName}</p>
          </motion.div>
        </>
      ) : null}
      <p className="sr-only" role="status">
        Putting on goggles. Entering {worldName}.
      </p>
      <button ref={skip} type="button" className="visor-skip" onClick={onSkip}>
        Skip intro
      </button>
    </div>
  );
}

export function WorldArrival({
  worldName,
  reducedMotion,
}: {
  worldName: string;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      className="world-arrival"
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: reducedMotion ? [1, 1, 0] : [0, 1, 1, 0], y: 0 }}
      transition={{
        opacity: {
          duration: 6,
          times: reducedMotion ? [0, 0.9, 1] : [0, 0.16, 0.85, 1],
        },
        y: { duration: 1.1 },
      }}
    >
      <p>You’re here.</p>
      <h1>{worldName}</h1>
      <p>Take a look around. Your desk is here when you want it.</p>
    </motion.div>
  );
}

export function EntryBackdrop({ phase }: { phase: EntryPhase }) {
  const panel = useRef<THREE.Mesh>(null);
  const time = useRef(0);
  useEffect(() => {
    time.current = performance.now();
  }, [phase]);
  useFrame((state) => {
    if (!panel.current) return;

    panel.current.visible =
      phase === "outside" ||
      (phase === "transition" && performance.now() - time.current < 1500);
    panel.current.position.copy(state.camera.position);
    panel.current.quaternion.copy(state.camera.quaternion);
    panel.current.translateZ(-6);
  });
  return (
    <mesh ref={panel}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color="#080e16" />
    </mesh>
  );
}

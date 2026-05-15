"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type EngineNode = {
  position: [number, number, number];
  color: string;
  size: number;
};

const engineNodes: EngineNode[] = [
  { position: [-1.55, 0.1, 0.08], color: "#5eead4", size: 0.056 },
  { position: [-0.9, 0.54, -0.16], color: "#93c5fd", size: 0.044 },
  { position: [-0.2, -0.42, 0.22], color: "#fdba74", size: 0.052 },
  { position: [0.52, 0.42, -0.08], color: "#5eead4", size: 0.064 },
  { position: [1.08, -0.06, 0.18], color: "#93c5fd", size: 0.048 },
  { position: [1.55, 0.28, -0.2], color: "#fdba74", size: 0.038 },
];

function EngineRings({ reduceMotion }: { reduceMotion: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const innerRef = useRef<THREE.Group | null>(null);

  const lineGeometry = useMemo(() => {
    const points = engineNodes.map((node) => new THREE.Vector3(...node.position));
    points.push(points[0].clone());
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame(({ clock, pointer }, delta) => {
    if (!groupRef.current || !innerRef.current) return;

    if (!reduceMotion) {
      groupRef.current.rotation.y += delta * 0.12;
      innerRef.current.rotation.z -= delta * 0.18;
    }

    groupRef.current.rotation.x = -0.24 + pointer.y * 0.08;
    groupRef.current.rotation.z = -0.18 + Math.sin(clock.elapsedTime * 0.35) * 0.025;
  });

  return (
    <group ref={groupRef} position={[0.45, -0.02, 0]} rotation={[-0.24, -0.4, -0.18]}>
      <group scale={[1.28, 0.58, 1.28]}>
        {[0, 1, 2, 3].map((index) => (
          <mesh
            key={index}
            rotation={[
              index * 0.2,
              index * 0.42,
              index % 2 === 0 ? 0.1 : -0.22,
            ]}
          >
            <torusGeometry args={[1.18 + index * 0.16, 0.0045, 8, 140]} />
            <meshBasicMaterial
              color={index % 2 === 0 ? "#e5edf3" : "#5eead4"}
              opacity={index % 2 === 0 ? 0.38 : 0.24}
              transparent
              wireframe
            />
          </mesh>
        ))}
      </group>

      <group ref={innerRef} scale={[1.15, 0.86, 1.15]}>
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial color="#d8eef4" opacity={0.28} transparent />
        </lineSegments>

        {engineNodes.map((node, index) => (
          <mesh key={`${node.color}-${index}`} position={node.position}>
            <sphereGeometry args={[node.size, 18, 18]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={1.2}
              roughness={0.24}
              metalness={0.18}
            />
          </mesh>
        ))}
      </group>

      <mesh scale={[1, 0.44, 1]} rotation={[0.2, 0.1, 0]}>
        <sphereGeometry args={[0.78, 32, 16]} />
        <meshBasicMaterial
          color="#5eead4"
          opacity={0.055}
          transparent
          wireframe
        />
      </mesh>
    </group>
  );
}

function DataRail({ reduceMotion }: { reduceMotion: boolean }) {
  const railRef = useRef<THREE.Group | null>(null);

  useFrame(({ clock }) => {
    if (!railRef.current || reduceMotion) return;
    railRef.current.position.x = Math.sin(clock.elapsedTime * 0.5) * 0.04;
    railRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.32) * 0.08;
  });

  return (
    <group ref={railRef} position={[0.54, -0.94, -0.18]} rotation={[0.18, -0.2, -0.04]}>
      {[0, 1, 2, 3, 4].map((index) => (
        <mesh key={index} position={[index * 0.42 - 0.88, 0, index % 2 ? 0.04 : -0.04]}>
          <boxGeometry args={[0.26, 0.025, 0.025]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? "#eef4f8" : "#5eead4"}
            opacity={index % 2 === 0 ? 0.32 : 0.48}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

function ProofEngineScene({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <>
      <ambientLight intensity={1.9} />
      <pointLight position={[2.5, 2.2, 2.6]} intensity={7} color="#5eead4" />
      <pointLight position={[-2.2, -1.5, 2]} intensity={3.2} color="#fdba74" />
      <EngineRings reduceMotion={reduceMotion} />
      <DataRail reduceMotion={reduceMotion} />
    </>
  );
}

export function ProofEngineCanvas() {
  const reduceMotion = Boolean(useReducedMotion());
  const [canvasDpr, setCanvasDpr] = useState(1.2);

  useEffect(() => {
    const updateDpr = () => {
      const width = window.innerWidth;
      const maxDpr = width < 1280 ? 1.25 : 1.45;
      setCanvasDpr(Math.min(window.devicePixelRatio || 1, maxDpr));
    };

    updateDpr();
    window.addEventListener("resize", updateDpr, { passive: true });

    return () => {
      window.removeEventListener("resize", updateDpr);
    };
  }, []);

  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, canvasDpr]}
      camera={{ position: [0, 0, 3.4], fov: 42, near: 0.1, far: 20 }}
      gl={{
        alpha: true,
        antialias: canvasDpr > 1.1,
        powerPreference: "high-performance",
      }}
      performance={{ min: 0.7, debounce: 240 }}
    >
      <ProofEngineScene reduceMotion={reduceMotion} />
    </Canvas>
  );
}

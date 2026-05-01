"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { AskEstebanChat } from "./ask-esteban-chat";

type ExperiencePhase = "outside" | "transition" | "inside";
type IconKind = "folder" | "disk" | "lab" | "contact" | "document" | "assistant";
type PointerState = { x: number; y: number };
type SectionId =
  | "ask"
  | "work"
  | "projects"
  | "ai-lab"
  | "contact"
  | "resume"
  | "proof-points"
  | "education"
  | "ai-shipping";
type WorldId =
  | "yosemite"
  | "coastal"
  | "alpine"
  | "desert"
  | "orbital"
  | "aurora"
  | "rainforest"
  | "biolume"
  | "skyreef"
  | "neon";

type WorldOption = {
  id: WorldId;
  name: string;
  shortName: string;
  description: string;
  image: string;
  background: string;
  fog: string;
  ambient: string;
  sun: string;
  fill: string;
  accent: string;
  desktopPosition: [number, number, number];
  portraitPosition: [number, number, number];
  hazePrimary: string;
  hazeSecondary: string;
  hazeOpacity?: number;
};

const portfolioItems: Array<{
  id: SectionId;
  label: string;
  href: string;
  kind: IconKind;
}> = [
  { id: "ask", label: "Ask Esteban", href: "#ask-esteban", kind: "assistant" },
  { id: "work", label: "Platform Work", href: "/work", kind: "folder" },
  { id: "projects", label: "Build Log", href: "/projects", kind: "folder" },
  { id: "ai-lab", label: "AI Workbench", href: "/ai-lab", kind: "lab" },
  { id: "resume", label: "Role Fit", href: "/resume", kind: "document" },
  { id: "proof-points", label: "Receipts.txt", href: "#proof-points", kind: "document" },
  { id: "education", label: "Credentials.txt", href: "#education", kind: "document" },
  { id: "ai-shipping", label: "Shipping Notes.txt", href: "#ai-shipping", kind: "document" },
  { id: "contact", label: "Contact", href: "/contact", kind: "contact" },
];

const worldOptions: WorldOption[] = [
  {
    id: "yosemite",
    name: "El Capitan Valley",
    shortName: "Valley",
    description: "granite cliffs",
    image: "/images/world-yosemite-immersive.webp",
    background: "#e7c48d",
    fog: "#d7b988",
    ambient: "#fff0d6",
    sun: "#ffd28e",
    fill: "#9fc4ff",
    accent: "#ffbd6f",
    desktopPosition: [0.3, 1.34, -8.9],
    portraitPosition: [4.8, 1.15, -8.9],
    hazePrimary: "#fff0cf",
    hazeSecondary: "#ffd79e",
  },
  {
    id: "biolume",
    name: "Biolume Canopy",
    shortName: "Biolume",
    description: "alien night forest",
    image: "/images/world-biolume-canopy-immersive.webp",
    background: "#07111b",
    fog: "#0b1626",
    ambient: "#b9f2ff",
    sun: "#68e3ff",
    fill: "#b56dff",
    accent: "#ffd378",
    desktopPosition: [0.08, 1.17, -8.9],
    portraitPosition: [3.7, 1.08, -8.9],
    hazePrimary: "#34d6ff",
    hazeSecondary: "#b36dff",
    hazeOpacity: 0,
  },
  {
    id: "skyreef",
    name: "Sky Reef",
    shortName: "Sky Reef",
    description: "floating gardens",
    image: "/images/world-sky-reef-immersive.webp",
    background: "#b9d4e6",
    fog: "#c2d8e4",
    ambient: "#f4f8ff",
    sun: "#ffd59b",
    fill: "#a7dcff",
    accent: "#7df1ff",
    desktopPosition: [0.1, 1.15, -8.9],
    portraitPosition: [3.65, 1.08, -8.9],
    hazePrimary: "#e8f6ff",
    hazeSecondary: "#ffe2af",
  },
  {
    id: "coastal",
    name: "Coastal Dusk",
    shortName: "Coast",
    description: "ocean cliffs",
    image: "/images/world-coastal-dusk-immersive.webp",
    background: "#d8a66c",
    fog: "#b48d68",
    ambient: "#ffe4b6",
    sun: "#ffb75f",
    fill: "#87a8bb",
    accent: "#ff9d45",
    desktopPosition: [0.15, 1.2, -8.9],
    portraitPosition: [3.65, 1.12, -8.9],
    hazePrimary: "#ffe2a6",
    hazeSecondary: "#8ac6d8",
  },
  {
    id: "alpine",
    name: "Alpine Glass",
    shortName: "Alpine",
    description: "lake and peaks",
    image: "/images/world-alpine-glass-immersive.webp",
    background: "#b9d5e5",
    fog: "#a6bfca",
    ambient: "#e9f7ff",
    sun: "#ffd7a1",
    fill: "#9bc3e8",
    accent: "#c8f1ff",
    desktopPosition: [0.18, 1.22, -8.9],
    portraitPosition: [3.85, 1.1, -8.9],
    hazePrimary: "#dff8ff",
    hazeSecondary: "#ffdcb4",
  },
  {
    id: "desert",
    name: "Desert Observatory",
    shortName: "Desert",
    description: "canyon twilight",
    image: "/images/world-desert-observatory-immersive.webp",
    background: "#233a5f",
    fog: "#28334c",
    ambient: "#b8c5e2",
    sun: "#d28c55",
    fill: "#5f7eb3",
    accent: "#ffae69",
    desktopPosition: [0.08, 1.22, -8.9],
    portraitPosition: [3.8, 1.1, -8.9],
    hazePrimary: "#788fc2",
    hazeSecondary: "#ffb06d",
    hazeOpacity: 0,
  },
  {
    id: "orbital",
    name: "Orbital Horizon",
    shortName: "Space",
    description: "Earthrise ridge",
    image: "/images/world-orbital-horizon-immersive.webp",
    background: "#030407",
    fog: "#07080d",
    ambient: "#d8e6ff",
    sun: "#fff2c7",
    fill: "#6d9ed8",
    accent: "#7fc7ff",
    desktopPosition: [0.14, 1.18, -8.9],
    portraitPosition: [3.8, 1.08, -8.9],
    hazePrimary: "#88b9ff",
    hazeSecondary: "#fff1bf",
    hazeOpacity: 0,
  },
  {
    id: "aurora",
    name: "Aurora Tundra",
    shortName: "Aurora",
    description: "northern lights",
    image: "/images/world-aurora-tundra-immersive.webp",
    background: "#101b34",
    fog: "#17213b",
    ambient: "#d9eeff",
    sun: "#d5f9ff",
    fill: "#6df0b1",
    accent: "#9c7dff",
    desktopPosition: [0.12, 1.18, -8.9],
    portraitPosition: [3.85, 1.08, -8.9],
    hazePrimary: "#75f7ad",
    hazeSecondary: "#a988ff",
    hazeOpacity: 0,
  },
  {
    id: "rainforest",
    name: "Cloud Rainforest",
    shortName: "Forest",
    description: "mist and canopy",
    image: "/images/world-cloud-rainforest-immersive.webp",
    background: "#84916c",
    fog: "#8f9872",
    ambient: "#f3efd0",
    sun: "#ffe39c",
    fill: "#8cc08e",
    accent: "#ffd37a",
    desktopPosition: [0.1, 1.2, -8.9],
    portraitPosition: [3.75, 1.1, -8.9],
    hazePrimary: "#f5e5b2",
    hazeSecondary: "#9bd99f",
  },
  {
    id: "neon",
    name: "Neon Overlook",
    shortName: "Neon",
    description: "rainy skyline",
    image: "/images/world-neon-overlook-immersive.webp",
    background: "#16212c",
    fog: "#1e2933",
    ambient: "#dbeeff",
    sun: "#79c7ff",
    fill: "#ff8bd2",
    accent: "#ffc66d",
    desktopPosition: [0.1, 1.16, -8.9],
    portraitPosition: [3.65, 1.08, -8.9],
    hazePrimary: "#79d8ff",
    hazeSecondary: "#ff8bd2",
    hazeOpacity: 0,
  },
];

const featuredWorldIds: WorldId[] = ["yosemite", "biolume", "skyreef", "orbital"];
const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const transitionDurationMs = 1520;
const reducedTransitionDurationMs = 540;

const workRows = [
  {
    title: "Coinbase",
    meta: "Developer platform / AI workflows",
    detail:
      "Owns partner integrations and developer friction across Onramp, wallets, trading, x402, AgentKit, and CDP, then turns repeated questions into demos, docs, tools, and product recommendations.",
  },
  {
    title: "TRM Labs",
    meta: "Regulated API products",
    detail:
      "Ran discovery with financial institutions and public-sector teams where the hard work was translating compliance workflows into clear API rollout paths.",
  },
  {
    title: "OpenSea + Polygon Labs",
    meta: "Developer marketplaces / partner POCs",
    detail:
      "Lived close to builders: API request triage, PM rotation work, marketplace docs, partner proof-of-concepts, and reference implementations for new onchain use cases.",
  },
  {
    title: "Google + Microsoft",
    meta: "Enterprise cloud / account engineering",
    detail:
      "Built the enterprise foundation: Google Cloud account architecture and migrations, Microsoft Azure and Office account work, and the customer-success muscle behind technical adoption.",
  },
];

const projectRows = [
  {
    title: "Coinbase Onramp Demo App",
    detail: "2,000+ monthly developer users evaluating fiat-to-crypto flows before they integrate.",
  },
  {
    title: "Onramp Asset Checker",
    detail: "A preflight tool that makes asset, region, payment, and eligibility issues easier to debug.",
  },
  {
    title: "x402 / AgentKit / CDP demos",
    detail: "Reference paths for teams trying to understand what new Coinbase developer primitives can actually ship.",
  },
  {
    title: "NFT Deployment Workflow",
    detail: "A practical reference implementation for minting, deployment, and marketplace-adjacent use cases.",
  },
  {
    title: "True Rank Pickleball",
    detail: "A founder project turned acquired product, with ranking logic and local-market operations behind it.",
  },
  {
    title: "Roofing ops automation",
    detail: "Internal software for a real service business, built around estimates, follow-up, and operator speed.",
  },
];

const labRows = [
  {
    label: "Current-model product fit",
    detail: "Design flows around what the model reliably does today, not what a future model might solve.",
  },
  {
    label: "Developer experience agents",
    detail: "Use agents where they reduce integration ambiguity: setup, docs, debugging, migration, and support loops.",
  },
  {
    label: "Customer workflow automation",
    detail: "Move repeated Salesforce, Slack, docs, and support work into workflows that can be measured and improved.",
  },
  {
    label: "Launchable prototypes",
    detail: "Build demos as product probes: fast enough to test, polished enough to teach, concrete enough to sell.",
  },
];

const resumeRows = [
  {
    label: "Applied AI Architect",
    detail: "Can turn fuzzy AI use cases into working demos, workflow automations, and evaluation criteria.",
  },
  {
    label: "Technical Product Manager",
    detail: "Already converts weekly developer signal into product recommendations, prioritization, and launch feedback.",
  },
  {
    label: "Developer Experience",
    detail: "Has owned docs, SDK migration guidance, sample apps, onboarding paths, and developer support loops.",
  },
  {
    label: "Demo Engineering",
    detail: "Ships reference implementations that make complex APIs understandable before a sales or partner call.",
  },
  {
    label: "Partner Solutions",
    detail: "Has led partner integrations where technical architecture, customer context, and revenue impact all matter.",
  },
  {
    label: "AI Deployment",
    detail: "Comfortable connecting LLM workflows to real operations instead of keeping prototypes in a sandbox.",
  },
];

const proofPointRows = [
  {
    value: "$20M",
    label: "revenue impact supported",
    detail: "Strategic partner integrations across Onramp, Embedded Wallets, and Advanced Trade.",
  },
  {
    value: "30+",
    label: "strategic partner integrations",
    detail: "Coinbase partner launches across payments, wallets, trading, and developer-platform products.",
  },
  {
    value: "30%",
    label: "escalation reduction",
    detail: "AI-enabled workflows across Salesforce, Slack, developer docs, and support operations.",
  },
  {
    value: "2,000+",
    label: "monthly demo users",
    detail: "Coinbase Onramp demo app usage from developers evaluating fiat-to-crypto flows.",
  },
  {
    value: "100+",
    label: "developer insights translated",
    detail: "Weekly developer signals converted into product recommendations and documentation improvements.",
  },
  {
    value: "35%",
    label: "checkout-time reduction",
    detail: "Apple Pay optimization recommendation that reduced Onramp checkout time.",
  },
  {
    value: "58k+",
    label: "demo and tooling LOC",
    detail: "Production-grade demos, reference implementations, and integration tooling across Coinbase developer products.",
  },
  {
    value: "60+",
    label: "technical discovery sessions",
    detail: "TRM Labs customer discovery across financial institutions and public sector teams.",
  },
  {
    value: "40+",
    label: "custom API solutions delivered",
    detail: "Regulated customer integrations, rollout paths, and implementation guidance.",
  },
  {
    value: "10+",
    label: "dashboard tools built",
    detail: "Internal and customer-facing tools to make workflows easier to operate.",
  },
  {
    value: "7+",
    label: "companies shipped at",
    detail: "Coinbase, TRM Labs, Polygon Labs, OpenSea, Google, Microsoft, and JPMorgan Chase.",
  },
];

const educationRows = [
  {
    label: "Berkeley Haas",
    value: "MBA, expected 2028",
    detail: "The product and leadership layer: strategy, customer judgment, markets, and go-to-market execution.",
  },
  {
    label: "Florida International University",
    value: "B.S. Computer Science, 2019",
    detail: "The engineering layer: enough CS depth to reason about APIs, platforms, cloud architecture, and AI systems.",
  },
  {
    label: "Certifications",
    value: "GCP PCA / AWS SA / Azure Fundamentals",
    detail: "Cloud credentials plus Hack Reactor training, useful for technical discovery with engineering teams.",
  },
];

const aiShippingRows = [
  {
    label: "Build for the model in front of you",
    detail:
      "The product work is finding the highest-reliability path through today's model strengths and weaknesses.",
  },
  {
    label: "Shorten idea-to-user time",
    detail:
      "Use demos, previews, docs, and customer conversations to get a feature in front of users before the plan gets stale.",
  },
  {
    label: "Taste matters more as code gets cheaper",
    detail:
      "The scarce judgment is deciding what should be built, what should be skipped, and what the first usable version should feel like.",
  },
  {
    label: "Write down the failure modes",
    detail:
      "Good AI product work names the tasks that must work, the edge cases that break trust, and the checks that prove the workflow is improving.",
  },
];

function usePointerParallax() {
  const [pointer, setPointer] = useState<PointerState>({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const updatePointer = (clientX: number, clientY: number) => {
      if (raf.current) {
        window.cancelAnimationFrame(raf.current);
      }

      raf.current = window.requestAnimationFrame(() => {
        setPointer({
          x: (clientX / window.innerWidth - 0.5) * 2,
          y: (clientY / window.innerHeight - 0.5) * 2,
        });
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      updatePointer(event.clientX, event.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) {
        updatePointer(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (raf.current) {
        window.cancelAnimationFrame(raf.current);
      }
    };
  }, []);

  return pointer;
}

function CameraRig({
  gogglesOn,
  phase,
}: {
  gogglesOn: boolean;
  phase: ExperiencePhase;
}) {
  const { camera, pointer } = useThree();
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const targetLookAt = useMemo(() => new THREE.Vector3(), []);
  const elapsed = useRef(0);

  useFrame((_state, delta) => {
    elapsed.current += delta;
    const drift = Math.sin(elapsed.current * 0.26) * 0.018;
    const targetZ = phase === "transition" ? 3.82 : gogglesOn ? 4.03 : 4.18;

    targetPosition.set(
      pointer.x * 0.18,
      1.18 + pointer.y * 0.08 + drift,
      targetZ
    );
    targetLookAt.set(pointer.x * 0.32, 1.62 + pointer.y * 0.12, -8.2);

    camera.position.lerp(targetPosition, 0.045);

    if (camera instanceof THREE.PerspectiveCamera) {
      const targetFov = phase === "transition" ? 44 : 50;
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.04);
      camera.updateProjectionMatrix();
    }

    camera.lookAt(targetLookAt);
  });

  return null;
}

function WorldBackdrop({ world }: { world: WorldOption }) {
  const texture = useTexture(world.image);
  const { size } = useThree();
  const portrait = size.width < size.height;

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
  }, [texture]);

  return (
    <mesh position={portrait ? world.portraitPosition : world.desktopPosition}>
      <planeGeometry args={[24, 13.5]} />
      <meshBasicMaterial map={texture} toneMapped={false} fog={false} />
    </mesh>
  );
}

type DepthMaskKind = "foreground" | "sky" | "center";

function useDepthAlphaMask(kind: DepthMaskKind) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;

    const context = canvas.getContext("2d");
    if (!context) return null;

    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);

    if (kind === "foreground") {
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(0.52, "rgba(0,0,0,0)");
      gradient.addColorStop(0.7, "rgba(255,255,255,0.26)");
      gradient.addColorStop(0.88, "rgba(255,255,255,0.56)");
      gradient.addColorStop(1, "rgba(255,255,255,0.32)");
    } else if (kind === "sky") {
      gradient.addColorStop(0, "rgba(255,255,255,0.82)");
      gradient.addColorStop(0.34, "rgba(255,255,255,0.34)");
      gradient.addColorStop(0.58, "rgba(0,0,0,0)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
    } else {
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(0.28, "rgba(255,255,255,0.16)");
      gradient.addColorStop(0.58, "rgba(255,255,255,0.58)");
      gradient.addColorStop(0.84, "rgba(0,0,0,0)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
    }

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "destination-in";

    const horizontalFade = context.createLinearGradient(0, 0, canvas.width, 0);
    horizontalFade.addColorStop(0, "rgba(0,0,0,0)");
    horizontalFade.addColorStop(0.12, "rgba(255,255,255,0.82)");
    horizontalFade.addColorStop(0.5, "rgba(255,255,255,1)");
    horizontalFade.addColorStop(0.88, "rgba(255,255,255,0.82)");
    horizontalFade.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = horizontalFade;
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (kind === "foreground") {
      const ovalFade = context.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.92,
        canvas.width * 0.08,
        canvas.width * 0.5,
        canvas.height * 0.92,
        canvas.width * 0.72
      );
      ovalFade.addColorStop(0, "rgba(255,255,255,0.96)");
      ovalFade.addColorStop(0.56, "rgba(255,255,255,0.72)");
      ovalFade.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = ovalFade;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    context.globalCompositeOperation = "source-over";

    const mask = new THREE.CanvasTexture(canvas);
    mask.needsUpdate = true;
    return mask;
  }, [kind]);

  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  return texture;
}

function DepthImageLayer({
  world,
  mask,
  position,
  scale,
  opacity,
  parallax,
}: {
  world: WorldOption;
  mask: DepthMaskKind;
  position: [number, number, number];
  scale: number;
  opacity: number;
  parallax: number;
}) {
  const texture = useTexture(world.image);
  const alphaMap = useDepthAlphaMask(mask);
  const mesh = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const elapsed = useRef(0);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
  }, [texture]);

  useFrame((_state, delta) => {
    elapsed.current += delta;
    if (!mesh.current) return;

    mesh.current.position.x =
      position[0] + pointer.x * parallax + Math.sin(elapsed.current * 0.18) * 0.015;
    mesh.current.position.y =
      position[1] + pointer.y * parallax * 0.45 + Math.cos(elapsed.current * 0.22) * 0.012;
  });

  if (!alphaMap) return null;

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={[24 * scale, 13.5 * scale]} />
      <meshBasicMaterial
        map={texture}
        alphaMap={alphaMap}
        transparent
        opacity={opacity}
        depthWrite={false}
        depthTest={false}
        fog={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function DepthRidge({
  world,
  position,
  opacity,
  speed,
  width,
}: {
  world: WorldOption;
  position: [number, number, number];
  opacity: number;
  speed: number;
  width: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const elapsed = useRef(0);
  const shape = useMemo(() => {
    const ridge = new THREE.Shape();
    ridge.moveTo(-width / 2, -1.15);
    ridge.lineTo(-width / 2, -0.18);
    ridge.bezierCurveTo(-width * 0.32, 0.15, -width * 0.22, -0.42, -width * 0.08, -0.06);
    ridge.bezierCurveTo(width * 0.08, 0.36, width * 0.2, -0.34, width * 0.36, -0.05);
    ridge.bezierCurveTo(width * 0.46, 0.08, width * 0.5, -0.12, width / 2, -0.02);
    ridge.lineTo(width / 2, -1.15);
    ridge.lineTo(-width / 2, -1.15);
    return ridge;
  }, [width]);

  const geometry = useMemo(() => new THREE.ShapeGeometry(shape, 36), [shape]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useFrame((_state, delta) => {
    elapsed.current += delta;
    if (!mesh.current) return;
    mesh.current.position.x = position[0] + pointer.x * speed;
    mesh.current.position.y =
      position[1] + pointer.y * speed * 0.18 + Math.sin(elapsed.current * 0.16) * 0.012;
  });

  return (
    <mesh ref={mesh} geometry={geometry} position={position}>
      <meshBasicMaterial
        color={world.background}
        transparent
        opacity={opacity}
        depthWrite={false}
        depthTest={false}
        fog={false}
      />
    </mesh>
  );
}

function DepthParticles({ world, gogglesOn }: { world: WorldOption; gogglesOn: boolean }) {
  const points = useRef<THREE.Points>(null);
  const { pointer } = useThree();
  const elapsed = useRef(0);
  const positions = useMemo(() => {
    const values: number[] = [];

    for (let index = 0; index < 78; index += 1) {
      const row = index % 13;
      const column = Math.floor(index / 13);
      const x = (row - 6) * 0.72 + Math.sin(index * 1.9) * 0.18;
      const y = 0.22 + column * 0.42 + Math.cos(index * 1.4) * 0.16;
      const z = -3.6 - (index % 6) * 0.62;
      values.push(x, y, z);
    }

    return new Float32Array(values);
  }, []);

  useFrame((_state, delta) => {
    elapsed.current += delta;
    if (!points.current) return;
    points.current.position.x = pointer.x * 0.42;
    points.current.position.y = pointer.y * 0.12 + Math.sin(elapsed.current * 0.24) * 0.025;
    points.current.rotation.z = pointer.x * 0.012;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={world.accent}
        transparent
        opacity={gogglesOn ? 0.34 : 0.14}
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        depthTest={false}
      />
    </points>
  );
}

function WorldDepthStage({
  gogglesOn,
  world,
}: {
  gogglesOn: boolean;
  world: WorldOption;
}) {
  const { size } = useThree();
  const portrait = size.width < size.height;
  const basePosition = portrait ? world.portraitPosition : world.desktopPosition;

  return (
    <>
      <DepthImageLayer
        world={world}
        mask="sky"
        position={[basePosition[0] - 0.06, basePosition[1] + 0.04, -10.15]}
        scale={1.08}
        opacity={gogglesOn ? 0.16 : 0.08}
        parallax={-0.1}
      />
      <DepthImageLayer
        world={world}
        mask="center"
        position={[basePosition[0] + 0.08, basePosition[1] + 0.02, -8.05]}
        scale={0.98}
        opacity={gogglesOn ? 0.14 : 0.06}
        parallax={0.16}
      />
      <DepthImageLayer
        world={world}
        mask="foreground"
        position={[basePosition[0], basePosition[1] - 0.06, -6.82]}
        scale={0.92}
        opacity={gogglesOn ? 0.08 : 0.03}
        parallax={0.28}
      />
      <DepthRidge
        world={world}
        position={[-1.2, -0.98, -4.9]}
        opacity={gogglesOn ? 0.08 : 0.04}
        speed={0.42}
        width={9.4}
      />
      <DepthRidge
        world={world}
        position={[1.1, -1.18, -3.9]}
        opacity={gogglesOn ? 0.12 : 0.06}
        speed={0.58}
        width={8.2}
      />
      <DepthParticles world={world} gogglesOn={gogglesOn} />
    </>
  );
}

function HazeRibbon({
  position,
  rotation,
  color,
  opacity,
  width,
  speed,
}: {
  position: [number, number, number];
  rotation: number;
  color: string;
  opacity: number;
  width: number;
  speed: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);

  useFrame((_state, delta) => {
    elapsed.current += delta;
    if (!mesh.current) return;
    mesh.current.position.y = position[1] + Math.sin(elapsed.current * speed) * 0.025;
    mesh.current.rotation.z = rotation + Math.sin(elapsed.current * speed * 0.72) * 0.012;
  });

  return (
    <mesh ref={mesh} position={position} rotation-z={rotation}>
      <planeGeometry args={[width, 0.16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        fog={false}
      />
    </mesh>
  );
}

function Atmosphere({
  gogglesOn,
  world,
}: {
  gogglesOn: boolean;
  world: WorldOption;
}) {
  const hazeOpacity = world.hazeOpacity ?? 0;

  if (hazeOpacity <= 0) return null;

  return (
    <>
      <HazeRibbon
        position={[-1.7, 2.72, -4.35]}
        rotation={0.06}
        color={world.hazePrimary}
        opacity={(gogglesOn ? 0.12 : 0.08) * hazeOpacity}
        width={1.28}
        speed={0.55}
      />
      <HazeRibbon
        position={[2.0, 2.54, -4.7]}
        rotation={-0.05}
        color={world.hazeSecondary}
        opacity={(gogglesOn ? 0.1 : 0.07) * hazeOpacity}
        width={1.45}
        speed={0.44}
      />
    </>
  );
}

function WorldScene({
  gogglesOn,
  phase,
  world,
}: {
  gogglesOn: boolean;
  phase: ExperiencePhase;
  world: WorldOption;
}) {
  return (
    <>
      <color attach="background" args={[world.background]} />
      <fog attach="fog" args={[world.fog, 13, 25]} />
      <ambientLight intensity={0.62} color={world.ambient} />
      <directionalLight position={[4.5, 4.2, 2.8]} intensity={2.5} color={world.sun} />
      <directionalLight position={[-4.8, 2.8, -2.6]} intensity={0.72} color={world.fill} />
      <pointLight position={[2.9, 1.4, 1.8]} intensity={0.6} color={world.accent} distance={8} />
      <CameraRig gogglesOn={gogglesOn} phase={phase} />
      <Suspense fallback={null}>
        <WorldDepthStage gogglesOn={gogglesOn} world={world} />
        <WorldBackdrop world={world} />
      </Suspense>
      <Atmosphere gogglesOn={gogglesOn} world={world} />
    </>
  );
}

function LensFrame({ phase }: { phase: ExperiencePhase }) {
  const visible = phase === "inside";
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
          initial={{ opacity: 0, filter: reduceMotion ? "blur(0px)" : "blur(5px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.22 : 0.58, ease: cinematicEase }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,244,220,0.1)_0%,rgba(255,244,220,0.025)_34%,rgba(9,7,5,0.1)_58%,rgba(0,0,0,0.76)_100%)]" />
          <div className="absolute inset-0 opacity-25 mix-blend-screen [background-image:linear-gradient(90deg,rgba(90,220,255,0.16),transparent_18%,transparent_82%,rgba(255,138,108,0.16)),linear-gradient(rgba(255,255,255,0.13)_1px,transparent_1px)] [background-size:100%_100%,100%_4px]" />
          <motion.div
            className="absolute inset-x-[-8%] top-[-6.5rem] h-40 rounded-b-[50%] bg-black/[0.78] blur-sm md:top-[-7.8rem] md:h-48"
            initial={{ y: reduceMotion ? 0 : -22 }}
            animate={{ y: 0 }}
            transition={{ duration: reduceMotion ? 0.22 : 0.62, ease: cinematicEase }}
          />
          <motion.div
            className="absolute inset-x-[-8%] bottom-[-6.2rem] h-40 rounded-t-[50%] bg-black/[0.82] blur-sm md:bottom-[-7.8rem] md:h-48"
            initial={{ y: reduceMotion ? 0 : 22 }}
            animate={{ y: 0 }}
            transition={{ duration: reduceMotion ? 0.22 : 0.62, ease: cinematicEase }}
          />
          <div className="absolute left-[-7rem] top-[-5%] h-[110%] w-48 rounded-r-[50%] bg-black/[0.58] blur-md md:w-64" />
          <div className="absolute right-[-7rem] top-[-5%] h-[110%] w-48 rounded-l-[50%] bg-black/[0.58] blur-md md:w-64" />
          <motion.div
            className="absolute left-[7%] top-[8%] h-36 w-[47%] rotate-[-9deg] rounded-[999px] border border-white/18 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),rgba(255,255,255,0.02)_58%,transparent_72%)] blur-[1px]"
            initial={{ opacity: 0, x: reduceMotion ? 0 : -18, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: reduceMotion ? 0.22 : 0.62, delay: reduceMotion ? 0 : 0.08, ease: "easeOut" }}
          />
          <motion.div
            className="absolute right-[8%] top-[12%] h-28 w-[34%] rotate-[-11deg] rounded-[999px] border border-white/12 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_56%,transparent_76%)] blur-[1px]"
            initial={{ opacity: 0, x: reduceMotion ? 0 : 18, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: reduceMotion ? 0.22 : 0.62, delay: reduceMotion ? 0 : 0.12, ease: "easeOut" }}
          />
          {!reduceMotion ? (
            <motion.div
              className="absolute left-[-18%] top-[14%] h-32 w-[52%] rotate-[-18deg] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)] blur-md mix-blend-screen"
              initial={{ x: "-24vw", opacity: 0 }}
              animate={{ x: ["-24vw", "52vw", "118vw"], opacity: [0, 0.68, 0] }}
              transition={{ duration: 2.4, delay: 0.7, repeat: Infinity, repeatDelay: 5.6, ease: "easeInOut" }}
            />
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function GoggleLift({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0.42 : 1.18;

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-40 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={
              reduceMotion
                ? { opacity: [0, 0.42, 0] }
                : { opacity: [0, 0.16, 0.68, 0.22, 0] }
            }
            transition={
              reduceMotion
                ? { duration, ease: "easeInOut" }
                : { duration, times: [0, 0.28, 0.54, 0.78, 1], ease: "easeInOut" }
            }
          />
          <motion.div
            className="absolute inset-x-[-8%] top-[-18vh] h-[38vh] rounded-b-[50%] bg-black/[0.82] blur-[2px]"
            initial={{ y: "-14vh" }}
            animate={{ y: reduceMotion ? "-7vh" : ["-14vh", "-4vh", "-7vh"] }}
            transition={{ duration: reduceMotion ? 0.34 : 0.84, times: [0, 0.62, 1], ease: cinematicEase }}
          />
          <motion.div
            className="absolute inset-x-[-8%] bottom-[-18vh] h-[38vh] rounded-t-[50%] bg-black/[0.86] blur-[2px]"
            initial={{ y: "14vh" }}
            animate={{ y: reduceMotion ? "7vh" : ["14vh", "4vh", "7vh"] }}
            transition={{ duration: reduceMotion ? 0.34 : 0.84, times: [0, 0.62, 1], ease: cinematicEase }}
          />
          <motion.div
            className="absolute inset-x-[-10%] bottom-[-7vh] mx-auto h-[72vh] max-h-[650px] min-h-[370px] w-[122vw] max-w-[1180px]"
            initial={{ y: "64vh", scale: 0.9, rotateX: 12, opacity: 0.1 }}
            animate={
              reduceMotion
                ? { y: "2vh", scale: 1, rotateX: 0, opacity: 1 }
                : {
                    y: ["62vh", "11vh", "-0.75vh", "0vh"],
                    scale: [0.92, 1.025, 0.996, 1],
                    rotateX: [10, -1.2, 0, 0],
                    opacity: [0.1, 1, 1, 1],
                  }
            }
            exit={{ y: "-10vh", opacity: 0 }}
            transition={
              reduceMotion
                ? { duration: 0.42, ease: "easeOut" }
                : { duration: 0.98, times: [0, 0.58, 0.82, 1], ease: cinematicEase }
            }
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="absolute inset-x-[1%] top-[-12%] h-[29%] rounded-b-[50%] bg-[linear-gradient(180deg,rgba(0,0,0,0.98),rgba(0,0,0,0.86))] shadow-[0_24px_90px_rgba(0,0,0,0.58)] blur-[2px]"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: [0, 0.7, 0.96], y: [-40, -8, 0] }}
              transition={{ duration: reduceMotion ? 0.24 : 0.58, delay: reduceMotion ? 0 : 0.08, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-x-[1%] bottom-[-8%] h-[29%] rounded-t-[50%] bg-[linear-gradient(0deg,rgba(0,0,0,0.98),rgba(0,0,0,0.86))] shadow-[0_-24px_90px_rgba(0,0,0,0.58)] blur-[2px]"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: [0, 0.76, 0.98], y: [34, 8, 0] }}
              transition={{ duration: reduceMotion ? 0.24 : 0.58, delay: reduceMotion ? 0 : 0.08, ease: "easeOut" }}
            />
            <motion.div
              className="absolute left-[5.5%] top-[16%] h-[60%] w-[42%] overflow-hidden rounded-[50%] border-[13px] border-black/[0.92] bg-[radial-gradient(ellipse_at_48%_42%,rgba(235,251,255,0.28),rgba(255,255,255,0.08)_34%,rgba(0,0,0,0.12)_68%,rgba(0,0,0,0.52)_100%)] shadow-[inset_0_0_54px_rgba(255,255,255,0.18),inset_0_-26px_44px_rgba(0,0,0,0.3),0_24px_72px_rgba(0,0,0,0.56)] sm:border-[17px]"
              initial={{ x: -110, rotate: -7, opacity: 0, scale: 0.78 }}
              animate={
                reduceMotion
                  ? { x: 0, rotate: 0, opacity: 0.9, scale: 1 }
                  : {
                      x: [-110, 8, -2, 0],
                      rotate: [-7, 1.2, -0.4, 0],
                      opacity: [0, 0.98, 0.9, 0.9],
                      scale: [0.78, 1.055, 0.994, 1],
                    }
              }
              transition={{ duration: reduceMotion ? 0.32 : 0.78, delay: reduceMotion ? 0 : 0.03, times: [0, 0.65, 0.86, 1], ease: cinematicEase }}
            >
              <div className="absolute inset-[8%] rounded-[50%] border border-white/18 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),transparent_62%)]" />
              <motion.div
                className="absolute left-[-18%] top-[12%] h-16 w-[72%] rotate-[-22deg] rounded-full bg-white/20 blur-md"
                initial={{ x: "-30%" }}
                animate={{ x: reduceMotion ? "30%" : ["-30%", "95%"] }}
                transition={{ duration: reduceMotion ? 0.24 : 0.68, delay: reduceMotion ? 0 : 0.26, ease: "easeInOut" }}
              />
            </motion.div>
            <motion.div
              className="absolute right-[5.5%] top-[16%] h-[60%] w-[42%] overflow-hidden rounded-[50%] border-[13px] border-black/[0.92] bg-[radial-gradient(ellipse_at_52%_42%,rgba(235,251,255,0.28),rgba(255,255,255,0.08)_34%,rgba(0,0,0,0.12)_68%,rgba(0,0,0,0.52)_100%)] shadow-[inset_0_0_54px_rgba(255,255,255,0.18),inset_0_-26px_44px_rgba(0,0,0,0.3),0_24px_72px_rgba(0,0,0,0.56)] sm:border-[17px]"
              initial={{ x: 110, rotate: 7, opacity: 0, scale: 0.78 }}
              animate={
                reduceMotion
                  ? { x: 0, rotate: 0, opacity: 0.9, scale: 1 }
                  : {
                      x: [110, -8, 2, 0],
                      rotate: [7, -1.2, 0.4, 0],
                      opacity: [0, 0.98, 0.9, 0.9],
                      scale: [0.78, 1.055, 0.994, 1],
                    }
              }
              transition={{ duration: reduceMotion ? 0.32 : 0.78, delay: reduceMotion ? 0 : 0.03, times: [0, 0.65, 0.86, 1], ease: cinematicEase }}
            >
              <div className="absolute inset-[8%] rounded-[50%] border border-white/18 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),transparent_62%)]" />
              <motion.div
                className="absolute left-[-18%] top-[12%] h-16 w-[72%] rotate-[-22deg] rounded-full bg-white/20 blur-md"
                initial={{ x: "-30%" }}
                animate={{ x: reduceMotion ? "30%" : ["-30%", "95%"] }}
                transition={{ duration: reduceMotion ? 0.24 : 0.68, delay: reduceMotion ? 0 : 0.28, ease: "easeInOut" }}
              />
            </motion.div>
            <motion.div
              className="absolute left-1/2 top-[38%] h-[19%] w-[16%] -translate-x-1/2 rounded-b-[52%] border-b-[16px] border-black/[0.92] shadow-[0_12px_36px_rgba(0,0,0,0.34)]"
              initial={{ opacity: 0, y: 24, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: reduceMotion ? 0.22 : 0.42, delay: reduceMotion ? 0 : 0.26, ease: "easeOut" }}
            />
            <motion.div
              className="absolute left-1/2 top-[46%] h-7 w-[10%] -translate-x-1/2 rounded-full bg-white/12 blur-md"
              initial={{ opacity: 0, scaleX: 0.4 }}
              animate={{ opacity: [0, 0.65, 0.18], scaleX: [0.4, 1.16, 1] }}
              transition={{ duration: reduceMotion ? 0.22 : 0.48, delay: reduceMotion ? 0 : 0.46, ease: "easeOut" }}
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,rgba(0,0,0,0.12)_40%,rgba(0,0,0,0.9)_100%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: reduceMotion ? [0, 0.5, 0] : [0, 0, 0.68, 0.22, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.4 : 1.02, times: [0, 0.42, 0.62, 0.84, 1], ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-[-26%] top-[18%] h-28 w-[64%] rotate-[-17deg] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.42),rgba(138,222,255,0.22),transparent)] blur-md mix-blend-screen"
            initial={{ x: "-20vw", opacity: 0 }}
            animate={{ x: reduceMotion ? "45vw" : ["-20vw", "48vw", "125vw"], opacity: reduceMotion ? [0, 0.45, 0] : [0, 1, 0] }}
            transition={{ duration: reduceMotion ? 0.36 : 0.82, delay: reduceMotion ? 0 : 0.34, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: reduceMotion ? [0, 0.24, 0] : [0, 0, 0.42, 0] }}
            transition={{ duration: reduceMotion ? 0.36 : 0.86, times: [0, 0.62, 0.72, 1], ease: "easeOut" }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function LensCalibration({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0.42 : 1.02;

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0, clipPath: "ellipse(95% 82% at 50% 50%)" }}
            animate={
              reduceMotion
                ? {
                    opacity: [0, 0.45, 0],
                    clipPath: "ellipse(76% 64% at 50% 50%)",
                  }
                : {
                    opacity: [0, 0.48, 0.52, 0],
                    clipPath: [
                      "ellipse(95% 82% at 50% 50%)",
                      "ellipse(52% 42% at 50% 50%)",
                      "ellipse(32% 24% at 50% 50%)",
                      "ellipse(92% 76% at 50% 50%)",
                    ],
                  }
            }
            transition={
              reduceMotion
                ? { duration, ease: "easeInOut" }
                : { duration, times: [0, 0.4, 0.58, 1], ease: [0.76, 0, 0.24, 1] }
            }
          />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_0%,rgba(229,246,255,0.08)_36%,rgba(0,0,0,0.46)_78%,rgba(0,0,0,0.86)_100%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: reduceMotion ? [0, 0.46, 0] : [0, 0.7, 0.22, 0] }}
            transition={{ duration, times: reduceMotion ? [0, 0.5, 1] : [0, 0.4, 0.78, 1], ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 opacity-45 mix-blend-screen [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(93,220,255,0.14),transparent_18%,transparent_82%,rgba(255,114,91,0.14))] [background-size:100%_4px,100%_100%]"
            initial={{ y: -26, opacity: 0 }}
            animate={{ y: reduceMotion ? 0 : [-22, 10, 0], opacity: [0, 0.34, 0] }}
            transition={{ duration: reduceMotion ? 0.34 : 0.64, delay: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
          />
          <motion.div
            className="absolute left-0 right-0 top-1/2 h-16 -translate-y-1/2 bg-[linear-gradient(180deg,transparent,rgba(217,242,255,0.32),transparent)] blur-sm"
            initial={{ y: "-62vh", opacity: 0 }}
            animate={{ y: reduceMotion ? "0vh" : ["-58vh", "6vh", "58vh"], opacity: [0, 0.92, 0] }}
            transition={{ duration: reduceMotion ? 0.34 : 0.62, delay: reduceMotion ? 0 : 0.32, ease: cinematicEase }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[52vh] w-[76vw] max-w-[790px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/18 shadow-[0_0_70px_rgba(200,230,255,0.18),inset_0_0_42px_rgba(255,255,255,0.08)]"
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: [0, 0.62, 0], scale: reduceMotion ? [0.9, 1, 1.03] : [0.72, 1.02, 1.08] }}
            transition={{ duration: reduceMotion ? 0.34 : 0.62, delay: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[34vh] w-[58vw] max-w-[610px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-cyan-100/18 shadow-[0_0_90px_rgba(103,232,249,0.2)]"
            initial={{ opacity: 0, scale: 0.55 }}
            animate={{ opacity: [0, 0.74, 0], scale: reduceMotion ? [0.88, 1, 1.02] : [0.55, 1.1, 1.24] }}
            transition={{ duration: reduceMotion ? 0.34 : 0.68, delay: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
          />
          <motion.div
            className="absolute bottom-[14vh] left-1/2 h-1 w-40 -translate-x-1/2 overflow-hidden rounded-full border border-white/20 bg-white/10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -2] }}
            transition={{ duration: reduceMotion ? 0.4 : 0.72, delay: reduceMotion ? 0 : 0.26, times: [0, 0.25, 0.78, 1], ease: "easeOut" }}
          >
            <motion.span
              className="block h-full bg-white/70"
              initial={{ width: "8%" }}
              animate={{ width: "100%" }}
              transition={{ duration: reduceMotion ? 0.24 : 0.42, delay: reduceMotion ? 0 : 0.36, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function PutOnGogglesPrompt({ onClick }: { onClick: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute inset-x-0 bottom-[12vh] z-20 flex justify-center px-6"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.48, ease: "easeOut" }}
    >
      <motion.button
        type="button"
        onClick={onClick}
        className="group rounded-full border border-white/28 bg-black/28 px-5 py-3 text-sm font-semibold text-white/92 shadow-[0_18px_55px_rgba(0,0,0,0.3)] backdrop-blur-md transition hover:border-white/55 hover:bg-black/45 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black"
        whileHover={reduceMotion ? undefined : { y: -2, scale: 1.025 }}
        whileTap={reduceMotion ? undefined : { y: 1, scale: 0.985 }}
        transition={{ type: "spring", stiffness: 520, damping: 30 }}
      >
        <span className="mr-3 inline-block h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_18px_rgba(255,222,151,0.82)] transition group-hover:scale-110" />
        Put on goggles.
      </motion.button>
    </motion.div>
  );
}

function ModernSiteLink({ phase }: { phase: ExperiencePhase }) {
  if (phase !== "outside") return null;

  return (
    <motion.a
      href="/"
      className="absolute bottom-5 right-5 z-30 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-xs font-semibold text-white/80 shadow-[0_14px_36px_rgba(0,0,0,0.22)] backdrop-blur-md transition hover:border-white/45 hover:bg-black/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black sm:bottom-6 sm:right-6 sm:text-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
    >
      View portfolio
      <span className="ml-2" aria-hidden="true">
        -&gt;
      </span>
    </motion.a>
  );
}

const goggleNavItems: Array<{ label: string; href: string; external?: boolean }> = [
  { label: "Portfolio", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Projects", href: "/projects" },
  { label: "AI Lab", href: "/ai-lab" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

function GoggleNav({ phase }: { phase: ExperiencePhase }) {
  const reduceMotion = useReducedMotion();

  if (phase !== "inside") return null;

  return (
    <motion.nav
      className="pointer-events-none absolute bottom-3 left-16 right-2.5 z-30 flex justify-center md:inset-x-0 md:bottom-auto md:top-6"
      initial={{ opacity: 0, y: reduceMotion ? 0 : -12, scale: reduceMotion ? 1 : 0.98 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.36, delay: reduceMotion ? 0 : 0.08, ease: "easeOut" }}
      aria-label="Goggles navigation"
    >
      <div className="pointer-events-auto flex w-full items-center justify-center gap-0.5 overflow-hidden rounded-[18px] border border-white/18 bg-black/32 p-1 text-white shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl md:w-auto md:max-w-none md:justify-start md:gap-1.5 md:rounded-[22px] md:bg-black/24 md:p-2">
        <a
          href="/goggles"
          className="mr-1 hidden shrink-0 items-center gap-2 rounded-full border border-white/14 bg-white/10 px-3 py-2 text-xs font-semibold text-white/86 transition hover:border-white/35 hover:bg-white/16 lg:flex"
          aria-label="Esteban OS home"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(165,243,252,0.82)]" />
          Esteban OS
        </a>

        {goggleNavItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="shrink-0 rounded-full border border-white/10 bg-black/16 px-1.5 py-2 text-[9px] font-semibold leading-none text-white/78 transition hover:border-white/35 hover:bg-white/12 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70 sm:px-2 sm:text-xs md:px-3"
          >
            {item.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}

function WorldSelector({
  selectedWorldId,
  phase,
  pickerOpen,
  onTogglePicker,
  onSelect,
}: {
  selectedWorldId: WorldId;
  phase: ExperiencePhase;
  pickerOpen: boolean;
  onTogglePicker: () => void;
  onSelect: (worldId: WorldId) => void;
}) {
  const reduceMotion = useReducedMotion();

  if (phase !== "inside") return null;

  const selectedWorld =
    worldOptions.find((world) => world.id === selectedWorldId) ?? worldOptions[0];
  const quickWorlds = featuredWorldIds
    .map((worldId) => worldOptions.find((world) => world.id === worldId))
    .filter((world): world is WorldOption => Boolean(world));

  return (
    <motion.div
      className="absolute left-3 right-3 top-3 z-30 md:left-6 md:right-auto md:top-6 md:w-[19rem]"
      initial={{ opacity: 0, y: reduceMotion ? 0 : -12, scale: reduceMotion ? 1 : 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.36, ease: "easeOut" }}
      aria-label="World selector"
    >
      <div className="rounded-[18px] border border-white/20 bg-black/32 p-2 text-white shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl md:rounded-[22px] md:bg-black/24 md:p-2.5">
        <div className="flex items-center justify-between gap-2 px-0.5 md:gap-3 md:px-1">
          <div className="flex min-w-0 items-center gap-2.5 md:gap-3">
            <span
              className="h-9 w-12 shrink-0 rounded-lg border border-white/18 bg-cover bg-center shadow-[inset_0_0_18px_rgba(0,0,0,0.28)] md:h-10 md:w-14"
              style={{ backgroundImage: `url(${selectedWorld.image})` }}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
                World
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-white/84">
                {selectedWorld.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onTogglePicker}
            className="shrink-0 rounded-full border border-white/12 bg-black/18 px-3 py-2 text-[11px] font-semibold text-white/78 transition hover:border-white/35 hover:bg-white/12 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            {pickerOpen ? "Done" : "Change"}
          </button>
        </div>
        <div className="mt-2 hidden flex-wrap gap-1.5 md:flex">
          {quickWorlds.map((world) => {
            const active = world.id === selectedWorldId;

            return (
              <button
                key={world.id}
                type="button"
                onClick={() => onSelect(world.id)}
                className={`flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 text-left transition focus:outline-none focus:ring-2 focus:ring-white/70 ${
                  active
                    ? "border-white/65 bg-white/22 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                    : "border-white/12 bg-black/18 text-white/68 hover:border-white/35 hover:bg-white/10 hover:text-white"
                }`}
                aria-pressed={active}
              >
                <span
                  className="h-5 w-7 rounded-full border border-white/16 bg-cover bg-center shadow-[inset_0_0_10px_rgba(0,0,0,0.35)]"
                  style={{ backgroundImage: `url(${world.image})` }}
                  aria-hidden="true"
                />
                <span className="block text-[11px] font-semibold leading-none">
                  {world.shortName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {pickerOpen ? (
          <motion.div
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] max-h-[56svh] overflow-y-auto rounded-[18px] border border-white/18 bg-black/40 p-2.5 text-white shadow-[0_22px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl md:rounded-[22px] md:bg-black/30 md:p-3"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -8, scale: reduceMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -6, scale: reduceMotion ? 1 : 0.985 }}
            transition={{ duration: reduceMotion ? 0.16 : 0.24, ease: "easeOut" }}
          >
            <div className="mb-2 px-1 text-[10px] uppercase tracking-[0.18em] text-white/52">
              Full world browser
            </div>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
              {worldOptions.map((world) => {
                const active = world.id === selectedWorldId;

                return (
                  <button
                    key={world.id}
                    type="button"
                    onClick={() => onSelect(world.id)}
                    className={`overflow-hidden rounded-md border text-left transition focus:outline-none focus:ring-2 focus:ring-white/70 ${
                      active
                        ? "border-white/65 bg-white/22 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                        : "border-white/12 bg-black/18 text-white/68 hover:border-white/35 hover:bg-white/10 hover:text-white"
                    }`}
                    aria-pressed={active}
                  >
                    <span
                      className="block h-14 bg-cover bg-center"
                      style={{ backgroundImage: `url(${world.image})` }}
                      aria-hidden="true"
                    />
                    <span className="block px-2.5 py-2">
                      <span className="block text-xs font-semibold leading-none">
                        {world.shortName}
                      </span>
                      <span className="mt-1 block text-[10px] leading-none text-white/48">
                        {world.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function TransitionStatus({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-[10vh] z-[55] flex justify-center px-6"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8, scale: reduceMotion ? 1 : 0.96 }}
          animate={{ opacity: [0, 1, 1, 0], y: reduceMotion ? 0 : [8, 0, 0, -6], scale: reduceMotion ? 1 : [0.96, 1, 1, 0.98] }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
          transition={{ duration: reduceMotion ? 0.42 : 1.02, times: [0, 0.18, 0.74, 1], ease: "easeOut" }}
          aria-hidden="true"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/16 bg-black/24 px-3 py-2 text-white shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-md">
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                className="h-1.5 w-1.5 rounded-full bg-white/55"
                animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.18, 0.9] }}
                transition={{ duration: reduceMotion ? 0.28 : 0.5, delay: index * 0.08, repeat: reduceMotion ? 0 : 2, ease: "easeInOut" }}
              />
            ))}
            <div className="h-1 w-40 overflow-hidden rounded-full border border-white/16 bg-white/8">
              <motion.span
                className="block h-full rounded-full bg-white/80"
                initial={{ width: "10%" }}
                animate={{ width: ["10%", "52%", "100%"] }}
                transition={{ duration: reduceMotion ? 0.24 : 0.72, times: [0, 0.62, 1], ease: cinematicEase }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function WorldChangeWash({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[18] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.04)_34%,rgba(0,0,0,0.22)_100%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: reduceMotion ? [0, 0.24, 0] : [0, 0.5, 0.24, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.22 : 0.52, times: reduceMotion ? [0, 0.5, 1] : [0, 0.24, 0.64, 1], ease: "easeInOut" }}
          aria-hidden="true"
        />
      ) : null}
    </AnimatePresence>
  );
}

function ArrivalBloom({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[36] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: reduceMotion ? 0.34 : 0.86, times: [0, 0.24, 1], ease: "easeOut" }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.34)_0%,rgba(218,245,255,0.14)_24%,rgba(0,0,0,0)_66%)] mix-blend-screen"
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{
              scale: reduceMotion ? [0.96, 1.02] : [0.82, 1.08, 1.18],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: reduceMotion ? 0.3 : 0.78, ease: "easeOut" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[54vh] w-[78vw] max-w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/22 shadow-[0_0_110px_rgba(210,240,255,0.26),inset_0_0_60px_rgba(255,255,255,0.12)]"
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{
              scale: reduceMotion ? [0.96, 1.02] : [0.82, 1.12, 1.22],
              opacity: [0, 0.74, 0],
            }}
            transition={{ duration: reduceMotion ? 0.3 : 0.78, delay: reduceMotion ? 0 : 0.04, ease: "easeOut" }}
          />
          <motion.div
            className="absolute left-[-28%] top-[20%] h-36 w-[70%] rotate-[-16deg] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.42),rgba(115,226,255,0.18),transparent)] blur-md mix-blend-screen"
            initial={{ x: "-14vw", opacity: 0 }}
            animate={{
              x: reduceMotion ? "45vw" : ["-14vw", "48vw", "126vw"],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: reduceMotion ? 0.28 : 0.72, delay: reduceMotion ? 0 : 0.08, ease: "easeInOut" }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ClassicTitleBar({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-8 grid-cols-[56px_1fr_32px] items-center border-b-2 border-black bg-[#d8d8d8] px-1.5 font-mono text-[11px] text-black sm:grid-cols-[96px_1fr_96px] sm:px-3 sm:text-xs">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="grid h-4 w-4 place-items-center border border-black bg-[#f2f2f2] text-[9px] leading-none shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset]">
          x
        </span>
        <span className="grid h-4 w-4 place-items-center border border-black bg-[#f2f2f2] text-[11px] leading-none shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset]">
          -
        </span>
        <span className="hidden h-4 w-4 border border-black bg-[#f2f2f2] shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset] sm:block" />
      </div>
      <div className="relative flex h-full items-center justify-center overflow-hidden font-bold">
        <span className="absolute inset-x-1 top-1 bottom-1 [background-image:repeating-linear-gradient(0deg,rgba(0,0,0,0.34)_0_1px,transparent_1px_3px)]" />
        <span className="relative max-w-full truncate bg-[#d8d8d8] px-3">
          {children}
        </span>
      </div>
      <div className="flex justify-end">
        <span className="grid h-4 w-4 place-items-center border border-black bg-[#f2f2f2] shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset]">
          <span className="h-2 w-2 border-y border-black" />
        </span>
      </div>
    </div>
  );
}

function FinderIcon({ kind }: { kind: IconKind }) {
  if (kind === "disk") {
    return (
      <span className="finder-icon relative mx-auto block h-12 w-12 border-2 border-black bg-[#f7f7ef] shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
        <span className="absolute left-2 top-1.5 h-4 w-7 border border-black bg-black" />
        <span className="absolute left-3 top-7 h-2 w-6 border border-black bg-white" />
      </span>
    );
  }

  if (kind === "lab") {
    return (
      <span className="finder-icon relative mx-auto block h-12 w-12 border-2 border-black bg-[#fbfbf3] shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
        <span className="absolute left-2 top-2 h-4 w-7 border border-black bg-white" />
        <span className="absolute left-3 top-6 h-1.5 w-2 bg-black" />
        <span className="absolute left-6 top-6 h-1.5 w-2 bg-black" />
        <span className="absolute bottom-2 left-3 h-2 w-6 border-x border-b border-black" />
      </span>
    );
  }

  if (kind === "contact") {
    return (
      <span className="finder-icon relative mx-auto block h-12 w-10 border-2 border-black bg-[#fbfbf3] shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
        {[0, 1, 2, 3].map((index) => (
          <span key={index} className="absolute -left-1 h-1.5 w-2 border border-black bg-white" style={{ top: 7 + index * 8 }} />
        ))}
        <span className="absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 rounded-full border border-black bg-black" />
        <span className="absolute bottom-3 left-1/2 h-3 w-5 -translate-x-1/2 rounded-t-full border border-black bg-black" />
      </span>
    );
  }

  if (kind === "assistant") {
    return (
      <span className="finder-icon relative mx-auto block h-12 w-14 border-2 border-black bg-[#fbfbf3] shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
        <span className="absolute inset-x-2 top-2 h-7 border-2 border-black bg-white" />
        <span className="absolute bottom-2 left-5 h-3 w-3 border-b-2 border-l-2 border-black bg-white" />
        <span className="absolute left-5 top-5 h-1.5 w-1.5 bg-black" />
        <span className="absolute left-7 top-5 h-1.5 w-1.5 bg-black" />
        <span className="absolute left-9 top-5 h-1.5 w-1.5 bg-black" />
      </span>
    );
  }

  if (kind === "document") {
    return (
      <span className="finder-icon relative mx-auto block h-12 w-10 border-2 border-black bg-[#fbfbf3] shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
        <span className="absolute right-[-2px] top-[-2px] h-4 w-4 border-b-2 border-l-2 border-black bg-white" />
        {[0, 1, 2, 3].map((index) => (
          <span key={index} className="absolute left-2 h-px w-5 bg-black" style={{ top: 19 + index * 6 }} />
        ))}
      </span>
    );
  }

  return (
    <span className="finder-icon relative mx-auto block h-12 w-14 border-2 border-black bg-[#f2f2e8] shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
      <span className="absolute left-[-2px] top-[-8px] h-3 w-7 border-2 border-b-0 border-black bg-[#f2f2e8]" />
      <span className="absolute inset-x-2 bottom-2 h-5 border border-black bg-white/70" />
    </span>
  );
}

function FinderItem({
  label,
  kind,
  active,
  onOpen,
}: {
  label: string;
  kind: IconKind;
  active?: boolean;
  onOpen: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className={`group grid min-h-[74px] place-items-center border px-1 py-1.5 text-center transition hover:border-black hover:bg-[#efefef] focus:outline-none focus:ring-2 focus:ring-black/70 [&_.finder-icon]:origin-bottom [&_.finder-icon]:scale-[0.82] sm:min-h-[98px] sm:px-2 sm:py-3 sm:[&_.finder-icon]:scale-100 ${
        active ? "border-black bg-white" : "border-transparent"
      }`}
      aria-label={`Open ${label} in Esteban OS`}
      whileHover={reduceMotion ? undefined : { y: -4, rotateX: 5, rotateY: -4 }}
      whileTap={reduceMotion ? undefined : { y: 1, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 440, damping: 30 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <FinderIcon kind={kind} />
      <span className="mt-1 max-w-20 font-mono text-[10px] font-semibold leading-tight text-black sm:mt-3 sm:max-w-28 sm:text-[13px]">
        {label}
      </span>
      <span className="mt-0.5 h-px w-8 bg-black/0 transition group-hover:bg-black/70 sm:mt-1" />
    </motion.button>
  );
}

function FinderDesktop({
  activeSection,
  onOpen,
}: {
  activeSection: SectionId | null;
  onOpen: (section: SectionId) => void;
}) {
  return (
    <div className="h-[min(56svh,440px)] overflow-y-auto bg-[#c4c4c4] px-3 py-3 shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#7a7a7a] sm:h-auto sm:min-h-[326px] sm:px-8 sm:py-8">
      <div className="mb-3 flex items-center justify-between gap-2 border border-black bg-[#eeeeee] px-2 py-1 font-mono text-[9px] shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset] sm:mb-4 sm:text-[10px]">
        <span>Macintosh HD: Esteban Field Notes</span>
        <span>{portfolioItems.length} items</span>
      </div>
      <p className="mb-3 max-w-2xl border border-black bg-[#f7f7f7] px-3 py-2 font-mono text-[11px] font-bold leading-relaxed shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset,2px_2px_0_rgba(0,0,0,0.32)] sm:mb-4 sm:text-xs">
        <span className="sm:hidden">
          Ask a question, or open proof points, role fit, credentials, and AI notes.
        </span>
        <span className="hidden sm:inline">
          Ask a direct question, or open the files I would use in an interview:
          shipped systems, proof points, role fit, credentials, and AI-native
          product notes.
        </span>
      </p>
      <div className="grid grid-cols-3 gap-x-1 gap-y-1.5 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-5 md:grid-cols-6">
        {portfolioItems.map((item) => (
          <FinderItem
            key={item.href}
            active={activeSection === item.id}
            label={item.label}
            kind={item.kind}
            onOpen={() => onOpen(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

function SectionShell({
  section,
  children,
  onBack,
}: {
  section: (typeof portfolioItems)[number];
  children: ReactNode;
  onBack: () => void;
}) {
  return (
    <div className="h-[min(56svh,440px)] overflow-y-auto bg-[#c4c4c4] px-3 py-3 font-mono text-black shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#7a7a7a] sm:h-[min(67svh,500px)] sm:px-5 sm:py-5">
      <div className="mb-3 flex items-center justify-between gap-2 border border-black bg-[#e9e9e9] px-2 py-2 shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset] sm:mb-4 sm:gap-3">
        <button
          type="button"
          onClick={onBack}
          className="border border-black bg-[#f7f7f7] px-2 py-1 text-[10px] font-bold shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset,1px_1px_0_rgba(0,0,0,0.5)] transition active:translate-x-px active:translate-y-px active:shadow-none"
        >
          Desktop
        </button>
        <div className="flex min-w-0 items-center gap-1.5 text-right sm:gap-2">
          <span className="hidden sm:block">
            <FinderIcon kind={section.kind} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[10px] uppercase tracking-[0.18em] text-black/60">
              Esteban OS
            </p>
            <h2 className="truncate text-sm font-black sm:text-lg">
              {section.label}
            </h2>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

function WorkView() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-black/60">
          Field notes
        </p>
        <h3 className="mt-1 max-w-2xl text-xl font-black leading-tight sm:text-2xl">
          Where developer friction becomes product signal.
        </h3>
      </div>
      <p className="max-w-2xl text-sm leading-relaxed text-black/75">
        The thread across these roles is being close enough to customers to see
        what breaks, technical enough to fix the path, and product-minded enough
        to turn patterns into roadmap evidence.
      </p>
      <div className="grid gap-3">
        {workRows.map((row) => (
          <article key={row.title} className="border border-black/55 bg-white/55 p-3 shadow-[2px_2px_0_rgba(0,0,0,0.45)]">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h4 className="font-black">{row.title}</h4>
              <p className="text-[10px] uppercase tracking-[0.12em] text-black/55">
                {row.meta}
              </p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-black/70">{row.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProjectsView() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-black/60">
          Build log
        </p>
        <h3 className="mt-1 text-xl font-black leading-tight sm:text-2xl">
          Projects that make a technical decision easier.
        </h3>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {projectRows.map((project, index) => (
          <div
            key={project.title}
            className="flex gap-3 border border-black/55 bg-white/55 p-3 shadow-[2px_2px_0_rgba(0,0,0,0.38)]"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center border border-black bg-white text-[10px] font-black">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-sm font-black leading-tight">{project.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-black/68">
                {project.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AILabView() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-black/60">
          Workbench
        </p>
        <h3 className="mt-1 text-xl font-black leading-tight sm:text-2xl">
          AI work that has to survive contact with users.
        </h3>
      </div>
      <p className="max-w-2xl text-sm leading-relaxed text-black/75">
        The interesting part is not making a flashy prototype. It is finding the
        narrow path where the model, workflow, UI, and user expectation all line
        up well enough to ship.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {labRows.map((item) => (
          <div key={item.label} className="border border-black/55 bg-white/55 p-3 shadow-[2px_2px_0_rgba(0,0,0,0.38)]">
            <p className="text-sm font-black">{item.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-black/68">
              {item.detail}
            </p>
            <div className="mt-3 h-2 border border-black bg-white">
              <div className="h-full w-2/3 bg-black" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactView() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-black/60">
          Open channel
        </p>
        <h3 className="mt-1 text-xl font-black leading-tight sm:text-2xl">
          Useful conversations start with a concrete workflow.
        </h3>
      </div>
      <p className="max-w-2xl text-sm leading-relaxed text-black/75">
        The strongest fit is a team that needs someone to sit between users,
        engineering, product, and go-to-market, then turn technical ambiguity
        into shipped work.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Contact form", "/contact"],
          ["LinkedIn", "https://www.linkedin.com/in/esteban-chirinos/"],
          ["GitHub", "https://github.com/echirinos"],
        ].map(([label, href]) => (
          <a
            key={href}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="border border-black bg-white/65 p-3 text-center text-sm font-black shadow-[2px_2px_0_rgba(0,0,0,0.45)] transition hover:bg-black hover:text-white"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

function ResumeView() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-black/60">
          Role fit
        </p>
        <h3 className="mt-1 text-xl font-black leading-tight sm:text-2xl">
          The overlapping roles I can credibly play.
        </h3>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {resumeRows.map((strength) => (
          <div key={strength.label} className="flex gap-2 border border-black/55 bg-white/55 px-3 py-2 shadow-[2px_2px_0_rgba(0,0,0,0.35)]">
            <span className="h-2 w-2 shrink-0 bg-black" />
            <span>
              <span className="block text-sm font-black">{strength.label}</span>
              <span className="mt-1 block text-xs leading-relaxed text-black/68">
                {strength.detail}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProofPointsView() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-black/60">
          Receipts
        </p>
        <h3 className="mt-1 text-xl font-black leading-tight sm:text-2xl">
          Numbers that explain the shape of the work.
        </h3>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {proofPointRows.map((row) => (
          <article
            key={row.label}
            className="border border-black bg-[#f7f7f7] p-3 shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset,2px_2px_0_rgba(0,0,0,0.35)]"
          >
            <p className="font-mono text-2xl font-black leading-none">{row.value}</p>
            <p className="mt-1 text-[11px] font-black uppercase tracking-[0.12em]">
              {row.label}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-black/72">
              {row.detail}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function EducationView() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-black/60">
          Credentials
        </p>
        <h3 className="mt-1 text-xl font-black leading-tight sm:text-2xl">
          Product training on top of engineering depth.
        </h3>
      </div>
      <div className="grid gap-3">
        {educationRows.map((row) => (
          <article
            key={row.label}
            className="border border-black bg-[#f7f7f7] p-3 shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset,2px_2px_0_rgba(0,0,0,0.35)]"
          >
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-black/58">
              {row.label}
            </p>
            <p className="mt-1 text-lg font-black">{row.value}</p>
            <p className="mt-2 text-xs leading-relaxed text-black/72">
              {row.detail}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function AIShippingView() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-black/60">
          Shipping notes
        </p>
        <h3 className="mt-1 text-xl font-black leading-tight sm:text-2xl">
          How I think about AI-native product work.
        </h3>
      </div>
      <div className="grid gap-2">
        {aiShippingRows.map((row, index) => (
          <article
            key={row.label}
            className="flex gap-3 border border-black bg-[#f7f7f7] p-3 shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset,2px_2px_0_rgba(0,0,0,0.35)]"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center border border-black bg-white text-[10px] font-black">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-sm font-black">{row.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-black/72">
                {row.detail}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function SectionView({
  activeSection,
  onBack,
}: {
  activeSection: SectionId;
  onBack: () => void;
}) {
  const section = portfolioItems.find((item) => item.id === activeSection);

  if (!section) return null;

  return (
    <SectionShell section={section} onBack={onBack}>
      {activeSection === "ask" ? <AskEstebanChat /> : null}
      {activeSection === "work" ? <WorkView /> : null}
      {activeSection === "projects" ? <ProjectsView /> : null}
      {activeSection === "ai-lab" ? <AILabView /> : null}
      {activeSection === "contact" ? <ContactView /> : null}
      {activeSection === "resume" ? <ResumeView /> : null}
      {activeSection === "proof-points" ? <ProofPointsView /> : null}
      {activeSection === "education" ? <EducationView /> : null}
      {activeSection === "ai-shipping" ? <AIShippingView /> : null}
    </SectionShell>
  );
}

function EstebanOS({ pointer }: { pointer: PointerState }) {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const reduceMotion = useReducedMotion();
  const transform = reduceMotion
    ? "none"
    : `perspective(1200px) rotateX(${pointer.y * -2.2}deg) rotateY(${pointer.x * 3.4}deg) translate3d(${pointer.x * 12}px, ${pointer.y * 6}px, 0)`;
  const activeItem = portfolioItems.find((item) => item.id === activeSection);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-20 flex items-start justify-center px-2 pb-[4.75rem] pt-[5.9rem] sm:px-4 sm:pb-20 sm:pt-24 md:grid md:place-items-center md:px-8 md:py-12"
      initial={{
        opacity: 0,
        scale: reduceMotion ? 1 : 0.95,
        y: reduceMotion ? 0 : 22,
        filter: reduceMotion ? "blur(0px)" : "blur(14px)",
      }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.98, filter: reduceMotion ? "blur(0px)" : "blur(8px)" }}
      transition={{ duration: reduceMotion ? 0.22 : 0.62, ease: cinematicEase }}
    >
      <div className="pointer-events-auto w-full sm:w-auto">
        <div
          className="relative w-full max-h-[calc(100svh-10.65rem)] overflow-hidden border-2 border-black bg-[#bdbdbd] text-black shadow-[3px_3px_0_rgba(0,0,0,0.45),0_24px_90px_rgba(18,12,7,0.34)] sm:w-[min(94vw,900px)] sm:max-h-[78svh] sm:shadow-[6px_6px_0_rgba(0,0,0,0.45),0_34px_120px_rgba(18,12,7,0.32)] md:max-h-none"
          style={{ transform, transformStyle: "preserve-3d", willChange: reduceMotion ? "auto" : "transform" }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.24),rgba(255,255,255,0)_42%),repeating-linear-gradient(45deg,rgba(255,255,255,0.1)_0_1px,rgba(0,0,0,0.03)_1px_3px)]" />
          <div className="relative">
            <ClassicTitleBar>{activeItem?.label ?? "Esteban OS 8"}</ClassicTitleBar>
            <div className="flex items-center gap-2 border-b-2 border-black bg-[#efefef] px-2 py-1.5 font-mono text-[10px] text-black shadow-[0_1px_0_#ffffff_inset] sm:gap-3 sm:px-4">
              <span className="font-black">Mac OS 8 Finder</span>
              <span className="hidden font-bold sm:inline">File</span>
              <span className="hidden font-bold sm:inline">Edit</span>
              <span className="hidden font-bold sm:inline">View</span>
              <span className="hidden font-bold sm:inline">Special</span>
              {portfolioItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`hidden whitespace-nowrap hover:underline xl:inline ${activeSection === item.id ? "font-bold underline" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSection ?? "desktop"}
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 10,
                  scale: reduceMotion ? 1 : 0.985,
                  filter: reduceMotion ? "blur(0px)" : "blur(4px)",
                }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{
                  opacity: 0,
                  y: reduceMotion ? 0 : -8,
                  scale: reduceMotion ? 1 : 0.99,
                  filter: reduceMotion ? "blur(0px)" : "blur(3px)",
                }}
                transition={{ duration: reduceMotion ? 0.14 : 0.22, ease: "easeOut" }}
              >
                {activeSection ? (
                  <SectionView
                    activeSection={activeSection}
                    onBack={() => setActiveSection(null)}
                  />
                ) : (
                  <FinderDesktop
                    activeSection={activeSection}
                    onOpen={setActiveSection}
                  />
                )}
              </motion.div>
            </AnimatePresence>
            <div className="flex items-center justify-between gap-3 border-t-2 border-black bg-[#d8d8d8] px-3 py-2 font-mono text-[9px] text-black/75 shadow-[0_1px_0_#ffffff_inset] sm:px-4 sm:text-[10px]">
              <span>{activeSection ? "1 window open" : `${portfolioItems.length} items`}</span>
              <span className="hidden min-w-0 truncate sm:block">
                {activeItem?.href ?? "Ask questions, scan proof, inspect shipped systems"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AmbientHud({ phase }: { phase: ExperiencePhase }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,rgba(255,224,171,0.02)_0%,rgba(20,14,8,0)_38%,rgba(10,7,4,0.34)_100%)]" />
      {phase === "inside" ? (
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:100%_3px]" />
      ) : null}
    </div>
  );
}

export function EstebanWorld() {
  const [phase, setPhase] = useState<ExperiencePhase>("outside");
  const [selectedWorldId, setSelectedWorldId] = useState<WorldId>("yosemite");
  const [worldWashActive, setWorldWashActive] = useState(false);
  const [worldPickerOpen, setWorldPickerOpen] = useState(false);
  const [canvasDpr, setCanvasDpr] = useState(1.35);
  const reduceMotion = useReducedMotion();
  const pointer = usePointerParallax();
  const worldWashTimeout = useRef<number | null>(null);
  const worldSelectTimeout = useRef<number | null>(null);
  const worldImagePreloads = useRef<HTMLImageElement[]>([]);
  const gogglesOn = phase !== "outside";
  const selectedWorld =
    worldOptions.find((world) => world.id === selectedWorldId) ?? worldOptions[0];

  useEffect(() => {
    if (phase !== "transition") return;

    const timeout = window.setTimeout(() => {
      setPhase("inside");
    }, reduceMotion ? reducedTransitionDurationMs : transitionDurationMs);

    return () => window.clearTimeout(timeout);
  }, [phase, reduceMotion]);

  useEffect(() => {
    const updateDpr = () => {
      const width = window.innerWidth;
      const maxDpr = width < 640 ? 1.12 : width < 1024 ? 1.28 : 1.5;
      setCanvasDpr(Math.min(window.devicePixelRatio || 1, maxDpr));
    };

    updateDpr();
    window.addEventListener("resize", updateDpr, { passive: true });

    return () => {
      window.removeEventListener("resize", updateDpr);
    };
  }, []);

  useEffect(() => {
    const savedWorldId = window.localStorage.getItem("esteban-world");
    const savedWorld = worldOptions.find((world) => world.id === savedWorldId);

    if (savedWorld) {
      setSelectedWorldId(savedWorld.id);
    }
  }, []);

  useEffect(() => {
    worldImagePreloads.current = worldOptions.map((world) => {
      useTexture.preload(world.image);

      const preloadImage = new window.Image();
      preloadImage.decoding = "async";
      preloadImage.src = world.image;
      return preloadImage;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (worldWashTimeout.current) {
        window.clearTimeout(worldWashTimeout.current);
      }
      if (worldSelectTimeout.current) {
        window.clearTimeout(worldSelectTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (phase !== "inside" && worldPickerOpen) {
      setWorldPickerOpen(false);
    }
  }, [phase, worldPickerOpen]);

  const handleWorldSelect = (worldId: WorldId) => {
    if (worldId === selectedWorldId) return;

    setWorldPickerOpen(false);
    setWorldWashActive(true);

    if (worldWashTimeout.current) {
      window.clearTimeout(worldWashTimeout.current);
    }
    if (worldSelectTimeout.current) {
      window.clearTimeout(worldSelectTimeout.current);
    }

    const applyWorld = () => {
      setSelectedWorldId(worldId);
      window.localStorage.setItem("esteban-world", worldId);
    };

    if (reduceMotion) {
      applyWorld();
    } else {
      worldSelectTimeout.current = window.setTimeout(applyWorld, 92);
    }

    worldWashTimeout.current = window.setTimeout(() => {
      setWorldWashActive(false);
    }, reduceMotion ? 240 : 560);
  };

  return (
    <section className="relative left-1/2 h-svh min-h-[620px] w-screen -translate-x-1/2 overflow-hidden bg-[#0c0a07]">
      <motion.div
        className="absolute inset-0 z-0"
        animate={
          phase === "transition" && !reduceMotion
            ? {
                scale: [1, 1.035, 1.012],
                filter: [
                  "blur(0px) saturate(1) contrast(1)",
                  "blur(10px) saturate(1.22) contrast(1.08)",
                  "blur(1px) saturate(1.08) contrast(1.03)",
                ],
              }
            : { scale: 1, filter: "blur(0px) saturate(1) contrast(1)" }
        }
        transition={
          phase === "transition" && !reduceMotion
            ? { duration: 1.18, times: [0, 0.56, 1], ease: cinematicEase }
            : { duration: reduceMotion ? 0.24 : 0.62, ease: cinematicEase }
        }
      >
        <Canvas
          className="h-full w-full"
          dpr={[1, canvasDpr]}
          camera={{ position: [0, 1.18, 4.18], fov: 50, near: 0.1, far: 70 }}
          gl={{ antialias: canvasDpr > 1.2, alpha: false, powerPreference: "high-performance" }}
          performance={{ min: 0.65, debounce: 220 }}
        >
          <WorldScene gogglesOn={gogglesOn} phase={phase} world={selectedWorld} />
        </Canvas>
      </motion.div>

      <AmbientHud phase={phase} />
      <LensFrame phase={phase} />
      <WorldChangeWash active={worldWashActive} />
      <GoggleLift active={phase === "transition"} />
      <LensCalibration active={phase === "transition"} />
      <TransitionStatus active={phase === "transition"} />
      <ArrivalBloom active={phase === "inside"} />
      <WorldSelector
        selectedWorldId={selectedWorld.id}
        phase={phase}
        pickerOpen={worldPickerOpen}
        onTogglePicker={() => setWorldPickerOpen((open) => !open)}
        onSelect={handleWorldSelect}
      />
      <GoggleNav phase={phase} />

      <AnimatePresence mode="wait">
        {phase === "outside" ? (
          <PutOnGogglesPrompt key="prompt" onClick={() => setPhase("transition")} />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "inside" ? <EstebanOS key="esteban-os" pointer={pointer} /> : null}
      </AnimatePresence>
      <ModernSiteLink phase={phase} />
    </section>
  );
}

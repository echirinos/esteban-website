"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import * as THREE from "three";

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
    image: "/images/world-yosemite-immersive.png",
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
    image: "/images/world-biolume-canopy-immersive.png",
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
    image: "/images/world-sky-reef-immersive.png",
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
    image: "/images/world-coastal-dusk-immersive.png",
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
    image: "/images/world-alpine-glass-immersive.png",
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
    image: "/images/world-desert-observatory-immersive.png",
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
    image: "/images/world-orbital-horizon-immersive.png",
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
    image: "/images/world-aurora-tundra-immersive.png",
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
    image: "/images/world-cloud-rainforest-immersive.png",
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
    image: "/images/world-neon-overlook-immersive.png",
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

type AskMessage = {
  role: "user" | "assistant";
  content: string;
  provider?: string;
  sources?: string[];
  setup?: string;
};

const askEstebanPrompts = [
  "Why is Esteban a fit for AI product roles?",
  "Summarize his Coinbase work.",
  "What proof points should a recruiter know?",
  "How technical is he?",
  "What roles is he best aligned with?",
  "Show me PM-relevant experience.",
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

function CameraRig({ gogglesOn }: { gogglesOn: boolean }) {
  const { camera, pointer } = useThree();
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const targetLookAt = useMemo(() => new THREE.Vector3(), []);
  const elapsed = useRef(0);

  useFrame((_state, delta) => {
    elapsed.current += delta;
    const drift = Math.sin(elapsed.current * 0.26) * 0.018;

    targetPosition.set(
      pointer.x * 0.18,
      1.18 + pointer.y * 0.08 + drift,
      gogglesOn ? 4.03 : 4.18
    );
    targetLookAt.set(pointer.x * 0.32, 1.62 + pointer.y * 0.12, -8.2);

    camera.position.lerp(targetPosition, 0.045);
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
  world,
}: {
  gogglesOn: boolean;
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
      <CameraRig gogglesOn={gogglesOn} />
      <Suspense fallback={null}>
        <WorldBackdrop world={world} />
      </Suspense>
      <Atmosphere gogglesOn={gogglesOn} world={world} />
    </>
  );
}

function LensFrame({ phase }: { phase: ExperiencePhase }) {
  const visible = phase === "inside";

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,244,220,0.08)_0%,rgba(255,244,220,0.02)_34%,rgba(9,7,5,0.08)_58%,rgba(0,0,0,0.72)_100%)]" />
          <div className="absolute inset-x-[-8%] top-[-6.5rem] h-40 rounded-b-[50%] bg-black/70 blur-sm md:top-[-7.8rem] md:h-48" />
          <div className="absolute inset-x-[-8%] bottom-[-6.2rem] h-40 rounded-t-[50%] bg-black/75 blur-sm md:bottom-[-7.8rem] md:h-48" />
          <div className="absolute left-[-7rem] top-[-5%] h-[110%] w-48 rounded-r-[50%] bg-black/50 blur-md md:w-64" />
          <div className="absolute right-[-7rem] top-[-5%] h-[110%] w-48 rounded-l-[50%] bg-black/50 blur-md md:w-64" />
          <div className="absolute left-[8%] top-[9%] h-32 w-[46%] rotate-[-9deg] rounded-[999px] border border-white/15 bg-white/5 blur-[1px]" />
          <div className="absolute right-[10%] top-[13%] h-24 w-[32%] rotate-[-11deg] rounded-[999px] border border-white/10 bg-white/5 blur-[1px]" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function GoggleLift({ active }: { active: boolean }) {
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
            className="absolute inset-x-[-10%] bottom-[-7vh] mx-auto h-[70vh] max-h-[620px] min-h-[360px] w-[120vw] max-w-[1160px]"
            initial={{ y: "60vh", scale: 0.92, opacity: 0.1 }}
            animate={{
              y: ["60vh", "12vh", "0vh"],
              scale: [0.92, 1.02, 1],
              opacity: [0.1, 1, 1],
            }}
            exit={{ y: "-10vh", opacity: 0 }}
            transition={{ duration: 1.12, times: [0, 0.72, 1], ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="absolute inset-x-[2%] top-[-12%] h-[28%] rounded-b-[50%] bg-black/90 blur-[2px]"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: [0, 0.7, 0.92], y: [-40, -8, 0] }}
              transition={{ duration: 0.86, delay: 0.18, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-x-[2%] bottom-[-8%] h-[28%] rounded-t-[50%] bg-black/92 blur-[2px]"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: [0, 0.76, 0.95], y: [34, 8, 0] }}
              transition={{ duration: 0.86, delay: 0.18, ease: "easeOut" }}
            />
            <motion.div
              className="absolute left-[6%] top-[18%] h-[56%] w-[41%] rounded-[50%] border-[12px] border-black/88 bg-[radial-gradient(ellipse_at_center,rgba(228,246,255,0.2),rgba(255,255,255,0.06)_38%,rgba(0,0,0,0.16)_76%,rgba(0,0,0,0.48)_100%)] shadow-[inset_0_0_46px_rgba(255,255,255,0.16),0_24px_72px_rgba(0,0,0,0.5)] sm:border-[16px]"
              initial={{ x: -86, rotate: -4, opacity: 0, scale: 0.82 }}
              animate={{ x: 0, rotate: 0, opacity: [0, 0.95, 0.86], scale: [0.82, 1.04, 1] }}
              transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="absolute right-[6%] top-[18%] h-[56%] w-[41%] rounded-[50%] border-[12px] border-black/88 bg-[radial-gradient(ellipse_at_center,rgba(228,246,255,0.2),rgba(255,255,255,0.06)_38%,rgba(0,0,0,0.16)_76%,rgba(0,0,0,0.48)_100%)] shadow-[inset_0_0_46px_rgba(255,255,255,0.16),0_24px_72px_rgba(0,0,0,0.5)] sm:border-[16px]"
              initial={{ x: 86, rotate: 4, opacity: 0, scale: 0.82 }}
              animate={{ x: 0, rotate: 0, opacity: [0, 0.95, 0.86], scale: [0.82, 1.04, 1] }}
              transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="absolute left-1/2 top-[42%] h-[14%] w-[15%] -translate-x-1/2 rounded-b-[50%] border-b-[14px] border-black/88"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.42, ease: "easeOut" }}
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.1)_40%,rgba(0,0,0,0.88)_100%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.62, 0.18, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.34, times: [0, 0.45, 0.64, 0.86, 1], ease: "easeInOut" }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function LensCalibration({ active }: { active: boolean }) {
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
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_0%,rgba(229,246,255,0.08)_36%,rgba(0,0,0,0.46)_78%,rgba(0,0,0,0.86)_100%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.82, 0.28, 0] }}
            transition={{ duration: 1.18, times: [0, 0.42, 0.78, 1], ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:100%_4px]"
            initial={{ y: -26, opacity: 0 }}
            animate={{ y: [-26, 14, 0], opacity: [0, 0.42, 0] }}
            transition={{ duration: 0.94, delay: 0.28, ease: "easeOut" }}
          />
          <motion.div
            className="absolute left-0 right-0 top-1/2 h-16 -translate-y-1/2 bg-[linear-gradient(180deg,transparent,rgba(217,242,255,0.32),transparent)] blur-sm"
            initial={{ y: "-62vh", opacity: 0 }}
            animate={{ y: ["-58vh", "6vh", "58vh"], opacity: [0, 0.92, 0] }}
            transition={{ duration: 0.92, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[52vh] w-[76vw] max-w-[790px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/18 shadow-[0_0_70px_rgba(200,230,255,0.18),inset_0_0_42px_rgba(255,255,255,0.08)]"
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: [0, 0.62, 0], scale: [0.72, 1.02, 1.08] }}
            transition={{ duration: 0.95, delay: 0.4, ease: "easeOut" }}
          />
          <motion.div
            className="absolute bottom-[14vh] left-1/2 h-1 w-40 -translate-x-1/2 overflow-hidden rounded-full border border-white/20 bg-white/10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -2] }}
            transition={{ duration: 0.98, delay: 0.4, times: [0, 0.25, 0.78, 1], ease: "easeOut" }}
          >
            <motion.span
              className="block h-full bg-white/70"
              initial={{ width: "8%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.62, delay: 0.58, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function PutOnGogglesPrompt({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      className="absolute inset-x-0 bottom-[12vh] z-20 flex justify-center px-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <button
        type="button"
        onClick={onClick}
        className="group rounded-full border border-white/25 bg-black/25 px-5 py-3 text-sm font-medium text-white/90 shadow-[0_16px_50px_rgba(0,0,0,0.26)] backdrop-blur-md transition hover:border-white/50 hover:bg-black/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black"
      >
        <span className="mr-3 inline-block h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_18px_rgba(255,222,151,0.82)] transition group-hover:scale-110" />
        Put on goggles.
      </button>
    </motion.div>
  );
}

function ModernSiteLink({ phase }: { phase: ExperiencePhase }) {
  if (phase !== "outside") return null;

  return (
    <motion.a
      href="/modern"
      className="absolute bottom-5 right-5 z-30 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-xs font-semibold text-white/80 shadow-[0_14px_36px_rgba(0,0,0,0.22)] backdrop-blur-md transition hover:border-white/45 hover:bg-black/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black sm:bottom-6 sm:right-6 sm:text-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
    >
      View modern site
      <span className="ml-2" aria-hidden="true">
        -&gt;
      </span>
    </motion.a>
  );
}

const goggleNavItems: Array<{ label: string; href: string; external?: boolean }> = [
  { label: "Modern", href: "/modern" },
  { label: "Work", href: "/work" },
  { label: "Projects", href: "/projects" },
  { label: "AI Lab", href: "/ai-lab" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

function GoggleNav({ phase }: { phase: ExperiencePhase }) {
  if (phase !== "inside") return null;

  return (
    <motion.nav
      className="absolute inset-x-4 bottom-4 z-30 flex justify-center md:inset-x-0 md:bottom-auto md:top-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.46, delay: 0.08, ease: "easeOut" }}
      aria-label="Goggles navigation"
    >
      <div className="flex w-full max-w-[32rem] items-center gap-1.5 overflow-x-auto rounded-[22px] border border-white/18 bg-black/24 p-2 text-white shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl md:w-auto md:max-w-none">
        <a
          href="/"
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
            className="shrink-0 rounded-full border border-white/10 bg-black/16 px-3 py-2 text-[11px] font-semibold text-white/72 transition hover:border-white/35 hover:bg-white/12 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70 sm:text-xs"
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
  if (phase !== "inside") return null;

  const selectedWorld =
    worldOptions.find((world) => world.id === selectedWorldId) ?? worldOptions[0];
  const quickWorlds = featuredWorldIds
    .map((worldId) => worldOptions.find((world) => world.id === worldId))
    .filter((world): world is WorldOption => Boolean(world));

  return (
    <motion.div
      className="absolute bottom-20 left-4 right-4 z-30 md:bottom-auto md:left-6 md:right-auto md:top-6 md:w-[19rem]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.46, ease: "easeOut" }}
      aria-label="World selector"
    >
      <div className="rounded-[22px] border border-white/20 bg-black/24 p-2.5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 px-1">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
              World
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-white/84">
              {selectedWorld.name}
            </p>
          </div>
          <button
            type="button"
            onClick={onTogglePicker}
            className="rounded-full border border-white/12 bg-black/16 px-3 py-2 text-[11px] font-semibold text-white/72 transition hover:border-white/35 hover:bg-white/12 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70"
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
                className={`rounded-full border px-3 py-1.5 text-left transition focus:outline-none focus:ring-2 focus:ring-white/70 ${
                  active
                    ? "border-white/65 bg-white/22 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                    : "border-white/12 bg-black/18 text-white/68 hover:border-white/35 hover:bg-white/10 hover:text-white"
                }`}
                aria-pressed={active}
              >
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
            className="absolute bottom-[calc(100%+0.5rem)] left-0 right-0 rounded-[22px] border border-white/18 bg-black/30 p-3 text-white shadow-[0_22px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl md:bottom-auto md:top-[calc(100%+0.5rem)]"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
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
                    className={`rounded-md border px-2.5 py-2 text-left transition focus:outline-none focus:ring-2 focus:ring-white/70 ${
                      active
                        ? "border-white/65 bg-white/22 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                        : "border-white/12 bg-black/18 text-white/68 hover:border-white/35 hover:bg-white/10 hover:text-white"
                    }`}
                    aria-pressed={active}
                  >
                    <span className="block text-xs font-semibold leading-none">
                      {world.shortName}
                    </span>
                    <span className="mt-1 block text-[10px] leading-none text-white/48">
                      {world.description}
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
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-[11vh] z-[55] flex justify-center px-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          <div className="rounded-full border border-white/16 bg-black/28 px-4 py-3 text-center text-white shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-md">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/58">
              Calibrating optics
            </p>
            <div className="mt-3 h-1 w-40 overflow-hidden rounded-full border border-white/16 bg-white/8">
              <motion.span
                className="block h-full rounded-full bg-white/80"
                initial={{ width: "10%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.08, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function WorldChangeWash({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[18] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.04)_34%,rgba(0,0,0,0.22)_100%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.42, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.58, ease: "easeInOut" }}
          aria-hidden="true"
        />
      ) : null}
    </AnimatePresence>
  );
}

function ClassicTitleBar({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-8 grid-cols-[78px_1fr_78px] items-center border-b-2 border-black bg-[#d8d8d8] px-2 font-mono text-[11px] text-black sm:grid-cols-[96px_1fr_96px] sm:px-3 sm:text-xs">
      <div className="flex items-center gap-2">
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
      <span className="relative mx-auto block h-12 w-12 border-2 border-black bg-[#f7f7ef] shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
        <span className="absolute left-2 top-1.5 h-4 w-7 border border-black bg-black" />
        <span className="absolute left-3 top-7 h-2 w-6 border border-black bg-white" />
      </span>
    );
  }

  if (kind === "lab") {
    return (
      <span className="relative mx-auto block h-12 w-12 border-2 border-black bg-[#fbfbf3] shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
        <span className="absolute left-2 top-2 h-4 w-7 border border-black bg-white" />
        <span className="absolute left-3 top-6 h-1.5 w-2 bg-black" />
        <span className="absolute left-6 top-6 h-1.5 w-2 bg-black" />
        <span className="absolute bottom-2 left-3 h-2 w-6 border-x border-b border-black" />
      </span>
    );
  }

  if (kind === "contact") {
    return (
      <span className="relative mx-auto block h-12 w-10 border-2 border-black bg-[#fbfbf3] shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
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
      <span className="relative mx-auto block h-12 w-14 border-2 border-black bg-[#fbfbf3] shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
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
      <span className="relative mx-auto block h-12 w-10 border-2 border-black bg-[#fbfbf3] shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
        <span className="absolute right-[-2px] top-[-2px] h-4 w-4 border-b-2 border-l-2 border-black bg-white" />
        {[0, 1, 2, 3].map((index) => (
          <span key={index} className="absolute left-2 h-px w-5 bg-black" style={{ top: 19 + index * 6 }} />
        ))}
      </span>
    );
  }

  return (
    <span className="relative mx-auto block h-12 w-14 border-2 border-black bg-[#f2f2e8] shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
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
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group grid min-h-[86px] place-items-center border px-1.5 py-2.5 text-center transition hover:border-black hover:bg-[#efefef] focus:outline-none focus:ring-2 focus:ring-black/70 sm:min-h-[98px] sm:px-2 sm:py-3 ${
        active ? "border-black bg-white" : "border-transparent"
      }`}
      aria-label={`Open ${label} in Esteban OS`}
    >
      <FinderIcon kind={kind} />
      <span className="mt-2 max-w-24 font-mono text-[11px] font-semibold leading-tight text-black sm:mt-3 sm:max-w-28 sm:text-[13px]">
        {label}
      </span>
      <span className="mt-1 h-px w-8 bg-black/0 transition group-hover:bg-black/70" />
    </button>
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
    <div className="h-[min(48svh,390px)] overflow-y-auto bg-[#c4c4c4] px-4 py-5 shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#7a7a7a] sm:h-auto sm:min-h-[326px] sm:px-8 sm:py-8">
      <div className="mb-4 flex items-center justify-between border border-black bg-[#eeeeee] px-2 py-1 font-mono text-[10px] shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset]">
        <span>Macintosh HD: Esteban Field Notes</span>
        <span>{portfolioItems.length} items</span>
      </div>
      <p className="mb-4 max-w-2xl border border-black bg-[#f7f7f7] px-3 py-2 font-mono text-xs font-bold leading-relaxed shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset,2px_2px_0_rgba(0,0,0,0.32)]">
        Ask a direct question, or open the files I would use in an interview:
        shipped systems, proof points, role fit, credentials, and AI-native
        product notes.
      </p>
      <div className="grid grid-cols-3 gap-x-1 gap-y-3 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-5 md:grid-cols-6">
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
    <div className="h-[min(48svh,390px)] overflow-y-auto bg-[#c4c4c4] px-4 py-4 font-mono text-black shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#7a7a7a] sm:h-[min(67svh,500px)] sm:px-5 sm:py-5">
      <div className="mb-4 flex items-center justify-between gap-3 border border-black bg-[#e9e9e9] px-2 py-2 shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset]">
        <button
          type="button"
          onClick={onBack}
          className="border border-black bg-[#f7f7f7] px-2 py-1 text-[10px] font-bold shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset,1px_1px_0_rgba(0,0,0,0.5)] transition active:translate-x-px active:translate-y-px active:shadow-none"
        >
          Desktop
        </button>
        <div className="flex min-w-0 items-center gap-2 text-right">
          <FinderIcon kind={section.kind} />
          <div className="min-w-0">
            <p className="truncate text-[10px] uppercase tracking-[0.18em] text-black/60">
              Esteban OS
            </p>
            <h2 className="truncate text-base font-black sm:text-lg">
              {section.label}
            </h2>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

function AskEstebanView() {
  const [messages, setMessages] = useState<AskMessage[]>([
    {
      role: "assistant",
      content:
        "Ask me what a recruiter or hiring manager would want to know: role fit, Coinbase work, product judgment, technical depth, proof points, or education.",
      sources: ["Role Fit", "Receipts.txt"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isPending, setIsPending] = useState(false);
  const messageListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isPending]);

  const submitQuestion = async (question: string) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isPending) return;

    const nextMessages: AskMessage[] = [
      ...messages,
      { role: "user", content: trimmedQuestion },
    ];

    setMessages(nextMessages);
    setInput("");
    setIsPending(true);

    try {
      const response = await fetch("/api/ask-esteban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const data = (await response.json()) as {
        answer?: string;
        error?: string;
        provider?: string;
        sources?: string[];
        setup?: string;
      };

      if (!response.ok || !data.answer) {
        throw new Error(data.error || "Ask Esteban is unavailable.");
      }

      const answer = data.answer;

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: answer,
          provider: data.provider,
          sources: data.sources,
          setup: data.setup,
        },
      ]);
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Ask Esteban could not answer right now.",
        },
      ]);
    } finally {
      setIsPending(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitQuestion(input);
  };

  return (
    <div className="space-y-3">
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-black/60">
          Ask Esteban OS
        </p>
        <h3 className="mt-1 max-w-2xl text-lg font-black leading-tight sm:text-xl">
          Skip the browsing. Ask for the signal directly.
        </h3>
      </div>
      <p className="max-w-2xl text-xs leading-relaxed text-black/75">
        A grounded assistant for questions about Esteban's work, proof points,
        role fit, education, and technical depth.
      </p>

      <div className="grid gap-3 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {askEstebanPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => void submitQuestion(prompt)}
              className="border border-black bg-[#f7f7f7] px-3 py-2 text-left text-xs font-black leading-snug shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset,2px_2px_0_rgba(0,0,0,0.35)] transition hover:bg-black hover:text-white disabled:opacity-50"
              disabled={isPending}
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <div
            ref={messageListRef}
            className="max-h-[152px] space-y-2 overflow-y-auto border border-black bg-[#efefef] p-2 shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset] sm:max-h-[172px] lg:max-h-[214px]"
          >
            {messages.map((message, index) => (
              <article
                key={`${message.role}-${index}`}
                className={`border border-black p-2 shadow-[2px_2px_0_rgba(0,0,0,0.28)] ${
                  message.role === "user"
                    ? "ml-auto max-w-[86%] bg-black text-white"
                    : "mr-auto max-w-[96%] bg-[#f7f7f7] text-black"
                }`}
              >
                <p className="text-[10px] font-black uppercase tracking-[0.14em] opacity-65">
                  {message.role === "user" ? "You" : "Ask Esteban"}
                  {message.provider ? ` / ${message.provider}` : ""}
                </p>
                <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed">
                  {message.content}
                </p>
                {message.sources?.length ? (
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] opacity-60">
                    Sources: {message.sources.join(", ")}
                  </p>
                ) : null}
                {message.setup ? (
                  <p className="mt-2 border-t border-black/20 pt-2 text-[10px] leading-relaxed opacity-70">
                    {message.setup}
                  </p>
                ) : null}
              </article>
            ))}
            {isPending ? (
              <article className="mr-auto max-w-[92%] border border-black bg-[#f7f7f7] p-2 text-black shadow-[2px_2px_0_rgba(0,0,0,0.28)]">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] opacity-65">
                  Ask Esteban
                </p>
                <p className="mt-2 text-xs font-bold">Thinking...</p>
              </article>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor="ask-esteban-input">
              Ask Esteban a question
            </label>
            <input
              id="ask-esteban-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Coinbase, PM fit, technical depth..."
              className="min-h-10 flex-1 border border-black bg-white px-3 py-2 text-sm font-bold outline-none shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset] placeholder:text-black/40 focus:ring-2 focus:ring-black"
              maxLength={500}
            />
            <button
              type="submit"
              disabled={isPending || input.trim().length === 0}
              className="border border-black bg-black px-4 py-2 text-sm font-black text-white shadow-[2px_2px_0_rgba(0,0,0,0.32)] transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>
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
      {activeSection === "ask" ? <AskEstebanView /> : null}
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
  const transform = `perspective(1200px) rotateX(${pointer.y * -2.8}deg) rotateY(${pointer.x * 4.2}deg) translate3d(${pointer.x * 18}px, ${pointer.y * 8}px, 0)`;
  const activeItem = portfolioItems.find((item) => item.id === activeSection);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-20 grid place-items-center px-4 pb-32 pt-20 md:px-8 md:py-12"
      initial={{ opacity: 0, scale: 0.94, y: 26, filter: "blur(16px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
      transition={{ duration: 0.86, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="pointer-events-auto">
        <div
          className="relative w-[min(94vw,900px)] max-h-[78svh] overflow-hidden border-2 border-black bg-[#bdbdbd] text-black shadow-[6px_6px_0_rgba(0,0,0,0.45),0_34px_120px_rgba(18,12,7,0.32)] sm:max-h-none"
          style={{ transform }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.24),rgba(255,255,255,0)_42%),repeating-linear-gradient(45deg,rgba(255,255,255,0.1)_0_1px,rgba(0,0,0,0.03)_1px_3px)]" />
          <div className="relative">
            <ClassicTitleBar>{activeItem?.label ?? "Esteban OS 8"}</ClassicTitleBar>
            <div className="flex items-center gap-3 border-b-2 border-black bg-[#efefef] px-3 py-1.5 font-mono text-[10px] text-black shadow-[0_1px_0_#ffffff_inset] sm:px-4">
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
            <div className="flex items-center justify-between border-t-2 border-black bg-[#d8d8d8] px-3 py-2 font-mono text-[9px] text-black/75 shadow-[0_1px_0_#ffffff_inset] sm:px-4 sm:text-[10px]">
              <span>{activeSection ? "1 window open" : `${portfolioItems.length} items`}</span>
              <span>{activeItem?.href ?? "Ask questions, scan proof, inspect shipped systems"}</span>
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
  const pointer = usePointerParallax();
  const worldWashTimeout = useRef<number | null>(null);
  const worldImagePreloads = useRef<HTMLImageElement[]>([]);
  const gogglesOn = phase !== "outside";
  const selectedWorld =
    worldOptions.find((world) => world.id === selectedWorldId) ?? worldOptions[0];

  useEffect(() => {
    if (phase !== "transition") return;

    const timeout = window.setTimeout(() => {
      setPhase("inside");
    }, 1620);

    return () => window.clearTimeout(timeout);
  }, [phase]);

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
    };
  }, []);

  useEffect(() => {
    if (phase !== "inside" && worldPickerOpen) {
      setWorldPickerOpen(false);
    }
  }, [phase, worldPickerOpen]);

  const handleWorldSelect = (worldId: WorldId) => {
    if (worldId === selectedWorldId) return;

    setSelectedWorldId(worldId);
    setWorldPickerOpen(false);
    window.localStorage.setItem("esteban-world", worldId);
    setWorldWashActive(true);

    if (worldWashTimeout.current) {
      window.clearTimeout(worldWashTimeout.current);
    }

    worldWashTimeout.current = window.setTimeout(() => {
      setWorldWashActive(false);
    }, 620);
  };

  return (
    <section className="relative left-1/2 h-svh min-h-[620px] w-screen -translate-x-1/2 overflow-hidden bg-[#0c0a07]">
      <Canvas
        className="absolute inset-0 z-0"
        dpr={[1, 1.7]}
        camera={{ position: [0, 1.18, 4.18], fov: 50, near: 0.1, far: 70 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <WorldScene gogglesOn={gogglesOn} world={selectedWorld} />
      </Canvas>

      <AmbientHud phase={phase} />
      <LensFrame phase={phase} />
      <WorldChangeWash active={worldWashActive} />
      <GoggleLift active={phase === "transition"} />
      <LensCalibration active={phase === "transition"} />
      <TransitionStatus active={phase === "transition"} />
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

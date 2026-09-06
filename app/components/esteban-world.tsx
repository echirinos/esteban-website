"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { AskEstebanChat } from "./ask-esteban-chat";

type ExperiencePhase = "outside" | "transition" | "inside";
type IconKind =
  "folder" | "disk" | "lab" | "contact" | "document" | "assistant";
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
  {
    id: "proof-points",
    label: "Receipts.txt",
    href: "#proof-points",
    kind: "document",
  },
  {
    id: "education",
    label: "Credentials.txt",
    href: "#education",
    kind: "document",
  },
  {
    id: "ai-shipping",
    label: "Shipping Notes.txt",
    href: "#ai-shipping",
    kind: "document",
  },
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

const featuredWorldIds: WorldId[] = [
  "yosemite",
  "biolume",
  "skyreef",
  "orbital",
];
const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const transitionDurationMs = 1800;
const reducedTransitionDurationMs = 540;

const workRows = [
  {
    title: "Privy · Stripe",
    meta: "Founding Solutions Engineer",
    detail:
      "Privy's first SE, building the solutions engineering function from the ground up as Privy scales inside Stripe — embedded wallets and crypto infrastructure for teams shipping onchain.",
  },
  {
    title: "Coinbase",
    meta: "Developer platform / AI workflows",
    detail:
      "Owned partner integrations and developer friction across Onramp, wallets, trading, x402, AgentKit, and CDP, then turned repeated questions into demos, docs, tools, and product recommendations.",
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
    detail:
      "2,000+ monthly developer users evaluating fiat-to-crypto flows before they integrate.",
  },
  {
    title: "Onramp Asset Checker",
    detail:
      "A preflight tool that makes asset, region, payment, and eligibility issues easier to debug.",
  },
  {
    title: "x402 / AgentKit / CDP demos",
    detail:
      "Reference paths for teams trying to understand what new Coinbase developer primitives can actually ship.",
  },
  {
    title: "NFT Deployment Workflow",
    detail:
      "A practical reference implementation for minting, deployment, and marketplace-adjacent use cases.",
  },
  {
    title: "True Rank Pickleball",
    detail:
      "A founder project turned acquired product, with ranking logic and local-market operations behind it.",
  },
  {
    title: "Roofing ops automation",
    detail:
      "Internal software for a real service business, built around estimates, follow-up, and operator speed.",
  },
];

const labRows = [
  {
    label: "Current-model product fit",
    detail:
      "Design flows around what the model reliably does today, not what a future model might solve.",
  },
  {
    label: "Developer experience agents",
    detail:
      "Use agents where they reduce integration ambiguity: setup, docs, debugging, migration, and support loops.",
  },
  {
    label: "Customer workflow automation",
    detail:
      "Move repeated Salesforce, Slack, docs, and support work into workflows that can be measured and improved.",
  },
  {
    label: "Launchable prototypes",
    detail:
      "Build demos as product probes: fast enough to test, polished enough to teach, concrete enough to sell.",
  },
];

const resumeRows = [
  {
    label: "Applied AI Architect",
    detail:
      "Can turn fuzzy AI use cases into working demos, workflow automations, and evaluation criteria.",
  },
  {
    label: "Technical Product Manager",
    detail:
      "Already converts weekly developer signal into product recommendations, prioritization, and launch feedback.",
  },
  {
    label: "Developer Experience",
    detail:
      "Has owned docs, SDK migration guidance, sample apps, onboarding paths, and developer support loops.",
  },
  {
    label: "Demo Engineering",
    detail:
      "Ships reference implementations that make complex APIs understandable before a sales or partner call.",
  },
  {
    label: "Partner Solutions",
    detail:
      "Has led partner integrations where technical architecture, customer context, and revenue impact all matter.",
  },
  {
    label: "AI Deployment",
    detail:
      "Comfortable connecting LLM workflows to real operations instead of keeping prototypes in a sandbox.",
  },
];

const proofPointRows = [
  {
    value: "$30M",
    label: "revenue impact supported",
    detail:
      "Strategic partner integrations across Onramp, Embedded Wallets, and Advanced Trade.",
  },
  {
    value: "30+",
    label: "strategic partner integrations",
    detail:
      "Coinbase partner launches across payments, wallets, trading, and developer-platform products.",
  },
  {
    value: "30%",
    label: "escalation reduction",
    detail:
      "AI-enabled workflows across Salesforce, Slack, developer docs, and support operations.",
  },
  {
    value: "2,000+",
    label: "monthly demo users",
    detail:
      "Coinbase Onramp demo app usage from developers evaluating fiat-to-crypto flows.",
  },
  {
    value: "100+",
    label: "developer insights translated",
    detail:
      "Weekly developer signals converted into product recommendations and documentation improvements.",
  },
  {
    value: "35%",
    label: "checkout-time reduction",
    detail:
      "Apple Pay optimization recommendation that reduced Onramp checkout time.",
  },
  {
    value: "58k+",
    label: "demo and tooling LOC",
    detail:
      "Production-grade demos, reference implementations, and integration tooling across Coinbase developer products.",
  },
  {
    value: "60+",
    label: "technical discovery sessions",
    detail:
      "TRM Labs customer discovery across financial institutions and public sector teams.",
  },
  {
    value: "40+",
    label: "custom API solutions delivered",
    detail:
      "Regulated customer integrations, rollout paths, and implementation guidance.",
  },
  {
    value: "10+",
    label: "dashboard tools built",
    detail:
      "Internal and customer-facing tools to make workflows easier to operate.",
  },
  {
    value: "8+",
    label: "companies shipped at",
    detail:
      "Privy (Stripe), Coinbase, TRM Labs, Polygon Labs, OpenSea, Google, Microsoft, and JPMorgan Chase.",
  },
];

const educationRows = [
  {
    label: "Berkeley Haas",
    value: "MBA, expected 2028",
    detail:
      "The product and leadership layer: strategy, customer judgment, markets, and go-to-market execution.",
  },
  {
    label: "Florida International University",
    value: "B.S. Computer Science, 2019",
    detail:
      "The engineering layer: enough CS depth to reason about APIs, platforms, cloud architecture, and AI systems.",
  },
  {
    label: "Certifications",
    value: "GCP PCA / AWS SA / Azure Fundamentals",
    detail:
      "Cloud credentials plus Hack Reactor training, useful for technical discovery with engineering teams.",
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

/*
 * Pointer parallax as motion values: spring-smoothed and applied via style
 * transforms, so pointer movement never re-renders the React tree.
 */
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
  const currentLookAt = useMemo(() => new THREE.Vector3(0, 1.62, -8.2), []);
  const elapsed = useRef(0);

  useFrame((_state, delta) => {
    if (_state.frameloop !== "always") return;
    delta = Math.min(delta, 0.05);
    elapsed.current += delta;
    const drift = Math.sin(elapsed.current * 0.26) * 0.018;
    const targetZ = phase === "transition" ? 3.58 : gogglesOn ? 4.03 : 4.18;

    targetPosition.set(
      pointer.x * 0.18,
      1.18 + pointer.y * 0.08 + drift,
      targetZ,
    );
    targetLookAt.set(pointer.x * 0.32, 1.62 + pointer.y * 0.12, -8.2);

    // Frame-rate independent smoothing (identical feel at 60Hz and 120Hz).
    const lambda = 2.8;
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      targetPosition.x,
      lambda,
      delta,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      targetPosition.y,
      lambda,
      delta,
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetPosition.z,
      lambda,
      delta,
    );

    currentLookAt.x = THREE.MathUtils.damp(
      currentLookAt.x,
      targetLookAt.x,
      lambda,
      delta,
    );
    currentLookAt.y = THREE.MathUtils.damp(
      currentLookAt.y,
      targetLookAt.y,
      lambda,
      delta,
    );
    currentLookAt.z = THREE.MathUtils.damp(
      currentLookAt.z,
      targetLookAt.z,
      lambda,
      delta,
    );

    if (camera instanceof THREE.PerspectiveCamera) {
      const targetFov = phase === "transition" ? 40 : 50;
      camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, 2.4, delta);
      camera.updateProjectionMatrix();
    }

    camera.lookAt(currentLookAt);
  });

  return null;
}

function WorldBackdrop({
  world,
  onReady,
}: {
  world: WorldOption;
  onReady: () => void;
}) {
  const texture = useTexture(world.image);
  const { viewport, camera, gl } = useThree();
  const distance = camera.position.z + 8.9;
  const visibleHeight =
    2 * Math.tan(THREE.MathUtils.degToRad(50 / 2)) * distance;
  const source = texture.image as HTMLImageElement;
  const aspect = source.width / source.height;
  const height =
    Math.max(visibleHeight, (visibleHeight * viewport.aspect) / aspect) * 1.16;

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy());
    texture.needsUpdate = true;
    onReady();
    // Each world owns its texture; release GPU memory when switching worlds.
    return () => {
      useTexture.clear(world.image);
      texture.dispose();
    };
  }, [texture, gl, onReady, world.image]);

  return (
    <mesh position={[0, 1.62, -8.9]}>
      <planeGeometry args={[height * aspect, height]} />
      <meshBasicMaterial map={texture} toneMapped={false} fog={false} />
    </mesh>
  );
}

function DepthParticles({
  world,
  gogglesOn,
}: {
  world: WorldOption;
  gogglesOn: boolean;
}) {
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
    if (_state.frameloop !== "always") return;
    delta = Math.min(delta, 0.05);
    elapsed.current += delta;
    if (!points.current) return;
    const targetX = pointer.x * 0.42;
    const targetY = pointer.y * 0.12 + Math.sin(elapsed.current * 0.24) * 0.025;
    points.current.position.x = THREE.MathUtils.damp(
      points.current.position.x,
      targetX,
      4,
      delta,
    );
    points.current.position.y = THREE.MathUtils.damp(
      points.current.position.y,
      targetY,
      4,
      delta,
    );
    points.current.rotation.z = THREE.MathUtils.damp(
      points.current.rotation.z,
      pointer.x * 0.012,
      4,
      delta,
    );
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

function WorldScene({
  gogglesOn,
  phase,
  world,
  onReady,
}: {
  gogglesOn: boolean;
  phase: ExperiencePhase;
  world: WorldOption;
  onReady: () => void;
}) {
  return (
    <>
      <CameraRig gogglesOn={gogglesOn} phase={phase} />
      <Suspense fallback={null}>
        <WorldBackdrop key={world.id} world={world} onReady={onReady} />
        <DepthParticles world={world} gogglesOn={gogglesOn} />
      </Suspense>
    </>
  );
}

class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function SceneLifecycle({ onError }: { onError: () => void }) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const onLost = (event: Event) => {
      event.preventDefault();
      onError();
    };
    gl.domElement.addEventListener("webglcontextlost", onLost);
    return () => gl.domElement.removeEventListener("webglcontextlost", onLost);
  }, [gl, onError]);
  return null;
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
        className="draft-btn lens-enter-button"
        whileHover={reduceMotion ? undefined : { y: -2, scale: 1.025 }}
        whileTap={reduceMotion ? undefined : { y: 1, scale: 0.985 }}
        transition={{ type: "spring", stiffness: 520, damping: 30 }}
      >
        <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse bg-white shadow-[0_0_14px_rgba(255,255,255,0.85)] transition group-hover:scale-125 motion-reduce:animate-none" />
        Put on goggles
      </motion.button>
    </motion.div>
  );
}

function LensIntroPanel({ phase }: { phase: ExperiencePhase }) {
  if (phase !== "outside") return null;
  return (
    <div className="lens-intro">
      <p>Esteban’s little escape</p>
      <h1>A change of scenery.</h1>
      <p>Ten worlds. A few things I’ve built. Room to look around.</p>
    </div>
  );
}

function ModernSiteLink({ phase }: { phase: ExperiencePhase }) {
  if (phase !== "outside") return null;

  return (
    <motion.a
      href="/"
      className="annotation absolute bottom-5 right-5 z-30 rounded-[2px] border border-white/30 bg-[#0b1533]/60 px-4 py-3 text-white/85 shadow-[0_14px_36px_rgba(0,0,0,0.24)] backdrop-blur-md transition hover:border-white/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black sm:bottom-6 sm:right-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
    >
      View portfolio
      <span className="ml-2" aria-hidden="true">
        →
      </span>
    </motion.a>
  );
}

const goggleNavItems: Array<{
  label: string;
  href: string;
  external?: boolean;
}> = [
  { label: "Portfolio", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Projects", href: "/projects" },
  { label: "Ask AI", href: "/ai-lab" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

function GoggleNav({ phase }: { phase: ExperiencePhase }) {
  const reduceMotion = useReducedMotion();

  if (phase !== "inside") return null;

  return (
    <motion.nav
      className="pointer-events-none absolute bottom-3 left-16 right-2.5 z-30 flex justify-center md:inset-x-0 md:bottom-auto md:top-6"
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : -12,
        scale: reduceMotion ? 1 : 0.98,
      }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
      transition={{
        duration: reduceMotion ? 0.2 : 0.36,
        delay: reduceMotion ? 0 : 0.08,
        ease: "easeOut",
      }}
      aria-label="Lens navigation"
    >
      <div className="pointer-events-auto flex w-full items-center justify-center gap-0.5 rounded-[2px] border border-white/25 bg-[#0b1533]/64 p-1 text-white shadow-[0_18px_50px_rgba(0,0,0,0.26)] backdrop-blur-xl md:w-auto md:max-w-none md:justify-start md:gap-1 md:p-1.5">
        <a
          href="/goggles"
          className="mr-1 hidden shrink-0 items-center gap-2 rounded-[2px] border border-white/25 bg-white/10 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/85 transition hover:border-white/50 hover:bg-white/15 lg:flex"
          aria-label="Esteban OS home"
        >
          <span className="h-1.5 w-1.5 bg-[#ff7e4b] shadow-[0_0_12px_rgba(255,126,75,0.85)]" />
          Esteban OS
        </a>

        {goggleNavItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="shrink-0 rounded-[2px] px-1.5 py-2 font-mono text-[9px] font-semibold uppercase leading-none tracking-[0.1em] text-white/75 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70 sm:px-2 sm:text-[11px] md:px-3"
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
    worldOptions.find((world) => world.id === selectedWorldId) ??
    worldOptions[0];
  const quickWorlds = featuredWorldIds
    .map((worldId) => worldOptions.find((world) => world.id === worldId))
    .filter((world): world is WorldOption => Boolean(world));

  return (
    <motion.div
      className="absolute left-3 right-3 top-3 z-[60] md:left-6 md:right-auto md:top-6 md:w-[19rem]"
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : -12,
        scale: reduceMotion ? 1 : 0.98,
      }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.36, ease: "easeOut" }}
      data-lenis-prevent=""
      aria-label="World selector"
    >
      <div className="rounded-[2px] border border-white/25 bg-[#0b1533]/64 p-2 text-white shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl md:p-2.5">
        <div className="flex items-center justify-between gap-2 px-0.5 md:gap-3 md:px-1">
          <div className="flex min-w-0 items-center gap-2.5 md:gap-3">
            <span
              className="h-9 w-12 shrink-0 rounded-[2px] border border-white/25 bg-cover bg-center shadow-[inset_0_0_18px_rgba(0,0,0,0.28)] md:h-10 md:w-14"
              style={{ backgroundImage: `url(${selectedWorld.image})` }}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="annotation text-white/55">World</p>
              <p className="mt-1 truncate text-sm font-semibold text-white/85">
                {selectedWorld.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onTogglePicker}
            aria-expanded={pickerOpen}
            aria-controls="world-browser"
            className="shrink-0 rounded-[2px] border border-white/25 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/80 transition hover:border-white/55 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            {pickerOpen ? "Done" : "Change"}
          </button>
        </div>
        <div className="mt-2 hidden flex-wrap gap-1 md:flex">
          {quickWorlds.map((world) => {
            const active = world.id === selectedWorldId;

            return (
              <button
                key={world.id}
                type="button"
                onClick={() => onSelect(world.id)}
                className={`flex items-center gap-2 rounded-[2px] border py-1.5 pl-1.5 pr-3 text-left transition focus:outline-none focus:ring-2 focus:ring-white/70 ${
                  active
                    ? "border-[#ff7e4b]/80 bg-white/15 text-white"
                    : "border-white/15 bg-black/15 text-white/65 hover:border-white/40 hover:bg-white/10 hover:text-white"
                }`}
                aria-pressed={active}
              >
                <span
                  className="h-5 w-7 rounded-[1px] border border-white/20 bg-cover bg-center shadow-[inset_0_0_10px_rgba(0,0,0,0.35)]"
                  style={{ backgroundImage: `url(${world.image})` }}
                  aria-hidden="true"
                />
                <span className="block font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.08em]">
                  {world.shortName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {pickerOpen ? (
          <motion.button
            type="button"
            aria-label="Close world browser"
            onClick={onTogglePicker}
            className="fixed inset-0 z-[59] cursor-default bg-black/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {pickerOpen ? (
          <motion.div
            id="world-browser"
            role="region"
            aria-label="Choose a world"
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-[61] max-h-[56svh] overflow-y-auto rounded-[2px] border border-white/25 bg-[#0a1330] p-2.5 text-white shadow-[0_22px_60px_rgba(0,0,0,0.5)] md:p-3"
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : -8,
              scale: reduceMotion ? 1 : 0.98,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: reduceMotion ? 0 : -6,
              scale: reduceMotion ? 1 : 0.985,
            }}
            transition={{
              duration: reduceMotion ? 0.16 : 0.24,
              ease: "easeOut",
            }}
          >
            <div className="annotation mb-2 px-1 text-white/55">
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
                    className={`overflow-hidden rounded-[2px] border text-left transition focus:outline-none focus:ring-2 focus:ring-white/70 ${
                      active
                        ? "border-[#ff7e4b]/80 bg-white/15 text-white"
                        : "border-white/15 bg-black/15 text-white/65 hover:border-white/40 hover:bg-white/10 hover:text-white"
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
                      <span className="mt-1 block text-[10px] leading-none text-white/65">
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
          transition={{
            duration: reduceMotion ? 0.22 : 0.52,
            times: reduceMotion ? [0, 0.5, 1] : [0, 0.24, 0.64, 1],
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
      ) : null}
    </AnimatePresence>
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
          <span
            key={index}
            className="absolute -left-1 h-1.5 w-2 border border-black bg-white"
            style={{ top: 7 + index * 8 }}
          />
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
          <span
            key={index}
            className="absolute left-2 h-px w-5 bg-black"
            style={{ top: 19 + index * 6 }}
          />
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
          <article
            key={row.title}
            className="border border-black/55 bg-white/55 p-3 shadow-[2px_2px_0_rgba(0,0,0,0.45)]"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h4 className="font-black">{row.title}</h4>
              <p className="text-[10px] uppercase tracking-[0.12em] text-black/55">
                {row.meta}
              </p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-black/70">
              {row.detail}
            </p>
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
              <p className="text-sm font-black leading-tight">
                {project.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-black/70">
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
          <div
            key={item.label}
            className="border border-black/55 bg-white/55 p-3 shadow-[2px_2px_0_rgba(0,0,0,0.38)]"
          >
            <p className="text-sm font-black">{item.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-black/70">
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
          <div
            key={strength.label}
            className="flex gap-2 border border-black/55 bg-white/55 px-3 py-2 shadow-[2px_2px_0_rgba(0,0,0,0.35)]"
          >
            <span className="h-2 w-2 shrink-0 bg-black" />
            <span>
              <span className="block text-sm font-black">{strength.label}</span>
              <span className="mt-1 block text-xs leading-relaxed text-black/70">
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
            <p className="font-mono text-2xl font-black leading-none">
              {row.value}
            </p>
            <p className="mt-1 text-[11px] font-black uppercase tracking-[0.12em]">
              {row.label}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-black/70">
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
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-black/65">
              {row.label}
            </p>
            <p className="mt-1 text-lg font-black">{row.value}</p>
            <p className="mt-2 text-xs leading-relaxed text-black/70">
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
              <p className="mt-1 text-xs leading-relaxed text-black/70">
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

function EstebanOS() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const activeItem = portfolioItems.find((item) => item.id === activeSection);
  return (
    <div className="lens-workspace-position">
      <section
        className="lens-workspace"
        aria-label="Portfolio explorer"
        data-lenis-prevent=""
      >
        <header className="lens-workspace-header">
          <span className="workspace-lights" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <h2>{activeItem?.label ?? "A few things from my world"}</h2>
          <span>Esteban’s desk</span>
        </header>
        {activeSection ? (
          <SectionView
            activeSection={activeSection}
            onBack={() => setActiveSection(null)}
          />
        ) : (
          <div className="lens-desktop">
            <p>Make yourself at home. Open something that interests you.</p>
            <div className="lens-file-grid">
              {portfolioItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="lens-file"
                >
                  <FinderIcon kind={item.kind} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <p className="lens-desktop-note">
              Built things, learned things. Still curious.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function AmbientHud() {
  return <div className="lens-vignette" aria-hidden="true" />;
}

export function EstebanWorld() {
  const [phase, setPhase] = useState<ExperiencePhase>("outside");
  const [selectedWorldId, setSelectedWorldId] = useState<WorldId>("yosemite");
  const [worldWashActive, setWorldWashActive] = useState(false);
  const [worldPickerOpen, setWorldPickerOpen] = useState(false);
  const [canvasDpr, setCanvasDpr] = useState(1.35);
  const reduceMotion = useReducedMotion();
  const [sceneFailed, setSceneFailed] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [deskVisible, setDeskVisible] = useState(true);
  const motionEnabled = !reduceMotion && !paused && pageVisible;
  const handleSceneReady = useCallback(() => setSceneReady(true), []);
  const handleSceneError = useCallback(() => {
    setSceneFailed(true);
    setSceneReady(false);
  }, []);
  const worldWashTimeout = useRef<number | null>(null);
  const worldSelectTimeout = useRef<number | null>(null);

  const gogglesOn = phase !== "outside";
  const selectedWorld =
    worldOptions.find((world) => world.id === selectedWorldId) ??
    worldOptions[0];

  useEffect(() => {
    if (phase !== "transition") return;

    const timeout = window.setTimeout(
      () => {
        setPhase("inside");
      },
      reduceMotion ? reducedTransitionDurationMs : transitionDurationMs,
    );

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
    try {
      const saved = window.localStorage.getItem("esteban-world");
      const world = worldOptions.find((item) => item.id === saved);
      if (world) setSelectedWorldId(world.id);
    } catch {
      /* World selection works even when storage is unavailable. */
    }
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && worldPickerOpen) setWorldPickerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [worldPickerOpen]);

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
    if (worldId === selectedWorldId) {
      setWorldPickerOpen(false);
      return;
    }

    setWorldPickerOpen(false);
    setWorldWashActive(true);

    if (worldWashTimeout.current) {
      window.clearTimeout(worldWashTimeout.current);
    }
    if (worldSelectTimeout.current) {
      window.clearTimeout(worldSelectTimeout.current);
    }

    const applyWorld = () => {
      setSceneReady(false);
      setSelectedWorldId(worldId);
      try {
        window.localStorage.setItem("esteban-world", worldId);
      } catch {
        /* In-session selection still works. */
      }
    };

    if (reduceMotion) {
      applyWorld();
    } else {
      worldSelectTimeout.current = window.setTimeout(applyWorld, 92);
    }

    worldWashTimeout.current = window.setTimeout(
      () => {
        setWorldWashActive(false);
      },
      reduceMotion ? 240 : 560,
    );
  };

  return (
    <section
      className="lens-experience"
      data-motion={motionEnabled ? "on" : "off"}
      data-renderer={
        sceneFailed ? "fallback" : sceneReady ? "ready" : "loading"
      }
    >
      <div
        className="lens-photo-fallback"
        style={{ backgroundImage: `url(${selectedWorld.image})` }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0 z-0"
        animate={
          phase === "transition" && !reduceMotion
            ? {
                scale: [1, 1.085, 1.015],
                filter: [
                  "blur(0px) saturate(1) contrast(1)",
                  "blur(14px) saturate(1.3) contrast(1.1)",
                  "blur(1px) saturate(1.08) contrast(1.03)",
                ],
              }
            : { scale: 1, filter: "blur(0px) saturate(1) contrast(1)" }
        }
        transition={
          phase === "transition" && !reduceMotion
            ? { duration: 1.62, times: [0, 0.52, 1], ease: cinematicEase }
            : { duration: reduceMotion ? 0.24 : 0.62, ease: cinematicEase }
        }
      >
        {!sceneFailed ? (
          <SceneBoundary onError={handleSceneError}>
            <Canvas
              className="h-full w-full"
              style={{
                opacity: sceneReady ? 1 : 0,
                transition: "opacity .6s ease",
              }}
              dpr={[1, canvasDpr]}
              frameloop={motionEnabled ? "always" : "demand"}
              camera={{
                position: [0, 1.18, 4.18],
                fov: 50,
                near: 0.1,
                far: 70,
              }}
              gl={{ antialias: false, alpha: true, powerPreference: "default" }}
              onCreated={({ camera }) => camera.lookAt(0, 1.62, -8.2)}
              fallback={<span>Scenic image mode</span>}
            >
              <SceneLifecycle onError={handleSceneError} />
              <WorldScene
                gogglesOn={gogglesOn}
                phase={phase}
                world={selectedWorld}
                onReady={handleSceneReady}
              />
            </Canvas>
          </SceneBoundary>
        ) : null}
      </motion.div>

      <AmbientHud />

      <LensIntroPanel phase={phase} />
      <WorldChangeWash active={worldWashActive} />

      {phase === "transition" ? (
        <div className="lens-arrival" role="status">
          Welcome to {selectedWorld.name}.
        </div>
      ) : null}

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
          <PutOnGogglesPrompt
            key="prompt"
            onClick={() => setPhase("transition")}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "inside" && deskVisible ? (
          <EstebanOS key="esteban-os" />
        ) : null}
      </AnimatePresence>
      <ModernSiteLink phase={phase} />
      {phase === "inside" ? (
        <div className="lens-tools">
          <button
            type="button"
            aria-pressed={!deskVisible}
            onClick={() => setDeskVisible((visible) => !visible)}
          >
            {deskVisible ? "Enjoy the view" : "Open my desk"}
          </button>
          <button
            type="button"
            aria-pressed={paused || !!reduceMotion}
            disabled={!!reduceMotion}
            onClick={() => setPaused((value) => !value)}
          >
            {paused || reduceMotion ? "Motion paused" : "Pause motion"}
          </button>
        </div>
      ) : null}
      {sceneFailed ? (
        <p className="lens-render-status" role="status">
          Scenic image mode · You can still explore every world.
        </p>
      ) : null}
    </section>
  );
}

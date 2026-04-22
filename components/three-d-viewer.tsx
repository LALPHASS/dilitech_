"use client";

import { Suspense, Component, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Image from "next/image";
import { ComputerModel } from "./computer-model";
import { CameraController } from "./camera-controller";
import { STORY_PHASES } from "@/lib/constants";

// ── Types ───────────────────────────────────────────────────

interface ThreeDViewerProps {
  currentPhase: number;
  reducedMotion: boolean;
}

// ── WebGL detection ─────────────────────────────────────────

function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

// ── Static fallback ─────────────────────────────────────────

function StaticFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Image
        src="/mac.jpg"
        alt="Ordinateur Dilitech"
        width={600}
        height={400}
        className="object-contain rounded-lg"
        priority
      />
      <div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(2,163,218,0.15) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

// ── Loading spinner ─────────────────────────────────────────

function LoadingSpinner() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="size-10 rounded-full border-2 border-muted border-t-primary animate-spin"
        role="status"
        aria-label="Chargement du modèle 3D"
      />
    </div>
  );
}

// ── Error boundary ──────────────────────────────────────────

interface ErrorBoundaryState {
  hasError: boolean;
}

class ViewerErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <StaticFallback />;
    return this.props.children;
  }
}


// ── Main viewer ─────────────────────────────────────────────

export default function ThreeDViewer({
  currentPhase,
  reducedMotion,
}: ThreeDViewerProps) {
  const phase = STORY_PHASES[currentPhase] ?? STORY_PHASES[0];

  if (!isWebGLAvailable()) {
    return <StaticFallback />;
  }

  return (
    <ViewerErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas
          camera={{ position: phase.cameraPosition, fov: 50 }}
          className="absolute! inset-0"
          gl={{ antialias: true, alpha: true }}
        >
          <Environment preset="studio" />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <CameraController
            targetPosition={phase.cameraPosition}
            targetLookAt={phase.cameraTarget}
          />
          <ComputerModel
            reducedMotion={reducedMotion}
            phase={currentPhase}
          />
        </Canvas>
      </Suspense>
    </ViewerErrorBoundary>
  );
}

"use client";

import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ComputerModelProps {
  reducedMotion: boolean;
  phase?: number;
}

export function ComputerModel({ reducedMotion, phase = 0 }: ComputerModelProps) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF("/animation.glb");
  const isMobile = useMediaQuery("(max-width: 767px)");

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion || phase !== 0) return;
    groupRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.7 : 1}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/animation.glb");

"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraControllerProps {
  targetPosition: [number, number, number];
  targetLookAt: [number, number, number];
}

export function CameraController({ targetPosition, targetLookAt }: CameraControllerProps) {
  const { camera } = useThree();
  const posVec = useRef(new THREE.Vector3(...targetPosition));
  const lookVec = useRef(new THREE.Vector3(...targetLookAt));

  useFrame(() => {
    posVec.current.set(...targetPosition);
    lookVec.current.set(...targetLookAt);

    camera.position.lerp(posVec.current, 0.05);

    const currentLook = new THREE.Vector3();
    camera.getWorldDirection(currentLook);
    currentLook.add(camera.position);
    currentLook.lerp(lookVec.current, 0.05);
    camera.lookAt(currentLook);
  });

  return null;
}

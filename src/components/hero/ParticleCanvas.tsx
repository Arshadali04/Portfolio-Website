"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 600;

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const { size, mouse } = useThree();

  const [positions, randoms] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const rand = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      rand[i] = Math.random();
    }
    return [pos, rand];
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = mouse.x * 0.06 + t * 0.02;
    meshRef.current.rotation.x = -mouse.y * 0.04;
    meshRef.current.position.x = mouse.x * 0.25;
    meshRef.current.position.y = mouse.y * 0.15;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#FF6B4A"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.12 - mouse.y * 0.08;
    meshRef.current.rotation.y = t * 0.18 + mouse.x * 0.08;
    meshRef.current.position.x = mouse.x * 0.4;
    meshRef.current.position.y = mouse.y * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <torusKnotGeometry args={[1.8, 0.35, 120, 20]} />
      <meshStandardMaterial
        color="#FF6B4A"
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
  );
}

export default function ParticleCanvas() {
  return (
    <Canvas
      camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 8] }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={1.5} color="#FF6B4A" />
      <Particles />
      <FloatingBlob />
    </Canvas>
  );
}

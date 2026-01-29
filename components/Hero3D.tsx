"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Environment, Float, Preload } from "@react-three/drei";
import * as THREE from "three";

// Simpler distort blob - more reliable
function SimpleGlassBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 32]} />
        <MeshDistortMaterial
          color="#ffffff"
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.1}
          roughness={0}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[2, 16, 16]} />
      <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} wireframe />
    </mesh>
  );
}

// Scene component with lights
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#ff8866" />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#6688ff" />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#88ff66" />
      
      <Suspense fallback={<LoadingFallback />}>
        <SimpleGlassBlob />
        <Environment preset="city" />
      </Suspense>
      
      <Preload all />
    </>
  );
}

export function Hero3D() {
  const [mounted, setMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Don't render until client-side mounted
  if (!mounted) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-accent/10 animate-pulse" />
      </div>
    );
  }

  // Show fallback on error
  if (hasError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        onError={() => setHasError(true)}
        frameloop="always"
        fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 blur-3xl" />
          </div>
        }
      >
        <Scene />
      </Canvas>
    </div>
  );
}

// Alias for backwards compatibility
export const Hero3DPremium = Hero3D;

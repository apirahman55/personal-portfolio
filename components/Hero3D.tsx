"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, MeshTransmissionMaterial, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

// Iridescent Blob - Azizkhaldi style glass/rainbow effect
function IridescentBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth rotation
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.2;
    
    // Follow mouse smoothly
    const targetX = pointer.x * 0.5;
    const targetY = pointer.y * 0.3;
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.02;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.02;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.4}
      floatIntensity={0.6}
    >
      <mesh ref={meshRef} scale={2.8}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={1}
          roughness={0.1}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={1}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.2}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#ffffff"
        />
      </mesh>
    </Float>
  );
}

// Simpler distort blob as fallback
function SimpleGlassBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={2.5}>
        <icosahedronGeometry args={[1, 64]} />
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

export function Hero3D() {
  return (
    <div className="absolute inset-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting for iridescent effect */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#ff8866" />
        <pointLight position={[5, -5, 5]} intensity={0.5} color="#6688ff" />
        <pointLight position={[0, 5, 0]} intensity={0.3} color="#88ff66" />
        
        {/* Use simpler blob for better performance, but still looks glassy */}
        <SimpleGlassBlob />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

// Full iridescent version (more GPU intensive)
export function Hero3DPremium() {
  return (
    <div className="absolute inset-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#ff8866" />
        <pointLight position={[5, -5, 5]} intensity={0.5} color="#6688ff" />
        
        <IridescentBlob />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}


import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D } from '@react-three/drei';
import * as THREE from 'three';

const FloatingIcon = ({ position, rotation, color }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.001;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </mesh>
    </Float>
  );
};

const CodeSymbol = ({ position }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.005;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.001;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.3, 0.1, 8, 16]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.1} />
      </mesh>
    </Float>
  );
};

const FloatingIcons = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        
        {/* Floating cubes */}
        <FloatingIcon position={[-4, 3, -2]} rotation={[0, 0, 0]} color="#3b82f6" />
        <FloatingIcon position={[4, -2, -1]} rotation={[0.5, 0.5, 0]} color="#8b5cf6" />
        <FloatingIcon position={[-2, -3, -3]} rotation={[1, 0, 0.5]} color="#06b6d4" />
        <FloatingIcon position={[3, 4, -2]} rotation={[0.3, 0.7, 0.2]} color="#f59e0b" />
        
        {/* Code symbols */}
        <CodeSymbol position={[-5, 0, -1]} />
        <CodeSymbol position={[5, 2, -2]} />
        <CodeSymbol position={[0, -4, -1]} />
      </Canvas>
    </div>
  );
};

export default FloatingIcons;

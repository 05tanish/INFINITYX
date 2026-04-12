import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingMediaFrameProps {
  position?: [number, number, number];
  scale?: number;
}

const FloatingMediaFrame = ({ position = [0, 0, 0], scale = 1 }: FloatingMediaFrameProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const playRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Cinematic bobbing and turning
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.4;
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      groupRef.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 0.4) * 0.1;
    }
    
    if (ringRef.current) {
      ringRef.current.rotation.z -= 0.01;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Media Window / Film Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 1.5, 0.1]} />
        <meshStandardMaterial
          color="#1A2332"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Screen Outline / Bezel */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.6, 1.6, 0.05]} />
        <meshStandardMaterial
          color="#2D3748"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Outer Rotating Ring (Creative Focus Dial) */}
      <mesh ref={ringRef} position={[0, 0, 0.1]}>
        <torusGeometry args={[0.5, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#8A2BE2"
          emissive="#8A2BE2"
          emissiveIntensity={0.5}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Play Button Triangle */}
      <mesh ref={playRef} position={[0.05, 0, 0.15]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.2, 0.4, 3]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={0.8}
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Progress Bar (Decoration) */}
      <mesh position={[0, -0.6, 0.1]}>
        <planeGeometry args={[2, 0.05]} />
        <meshStandardMaterial color="#4A5568" />
      </mesh>
      
      {/* Active Progress */}
      <mesh position={[-0.5, -0.6, 0.11]}>
        <planeGeometry args={[1, 0.05]} />
        <meshStandardMaterial color="#4A90E2" emissive="#4A90E2" />
      </mesh>
    </group>
  );
};

export default FloatingMediaFrame;

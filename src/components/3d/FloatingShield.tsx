import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface FloatingShieldProps {
  position?: [number, number, number];
  scale?: number;
}

const FloatingShield = ({ position = [0, 0, 0], scale = 1 }: FloatingShieldProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.6) * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  // Create shield shape
  const shieldShape = new THREE.Shape();
  shieldShape.moveTo(0, 1);
  shieldShape.lineTo(0.7, 0.7);
  shieldShape.lineTo(0.7, -0.5);
  shieldShape.lineTo(0, -1);
  shieldShape.lineTo(-0.7, -0.5);
  shieldShape.lineTo(-0.7, 0.7);
  shieldShape.closePath();

  const extrudeSettings = {
    depth: 0.2,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 3,
  };

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <extrudeGeometry args={[shieldShape, extrudeSettings]} />
      <meshStandardMaterial
        color="#D4AF37"
        metalness={0.9}
        roughness={0.1}
        emissive="#D4AF37"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

export default FloatingShield;

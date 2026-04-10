import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface FloatingSphereProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}

const FloatingSphere = ({ position = [0, 0, 0], scale = 1, color = '#D4AF37' }: FloatingSphereProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.8) * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
};

export default FloatingSphere;

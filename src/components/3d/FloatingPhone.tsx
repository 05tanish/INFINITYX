import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

interface FloatingPhoneProps {
  position?: [number, number, number];
  scale?: number;
}

const FloatingPhone = ({ position = [0, 0, 0], scale = 1 }: FloatingPhoneProps) => {
  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.7 + 1) * 0.25;
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.15;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Phone Body */}
      <mesh>
        <boxGeometry args={[0.6, 1.2, 0.1]} />
        <meshStandardMaterial
          color="#1A2332"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Phone Screen */}
      <mesh position={[0, 0, 0.051]}>
        <boxGeometry args={[0.55, 1.1, 0.01]} />
        <meshStandardMaterial
          color="#4A90E2"
          emissive="#4A90E2"
          emissiveIntensity={0.4}
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
      
      {/* Camera Notch */}
      <mesh position={[0, 0.5, 0.06]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
        <meshStandardMaterial
          color="#000000"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
    </group>
  );
};

export default FloatingPhone;

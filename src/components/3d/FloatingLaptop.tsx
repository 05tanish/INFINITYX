import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';


interface FloatingLaptopProps {
  position?: [number, number, number];
  scale?: number;
}

const FloatingLaptop = ({ position = [0, 0, 0], scale = 1 }: FloatingLaptopProps) => {
  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Laptop Base */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[2, 1.5, 0.1]} />
        <meshStandardMaterial
          color="#2D3748"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Laptop Screen */}
      <mesh position={[0, 0.75, -0.7]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[2, 1.3, 0.05]} />
        <meshStandardMaterial
          color="#1A2332"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Screen Display */}
      <mesh position={[0, 0.75, -0.675]} rotation={[-0.3, 0, 0]}>
        <planeGeometry args={[1.8, 1.1]} />
        <meshStandardMaterial
          color="#4A90E2"
          emissive="#4A90E2"
          emissiveIntensity={0.3}
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
    </group>
  );
};

export default FloatingLaptop;

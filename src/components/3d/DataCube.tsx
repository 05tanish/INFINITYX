import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';


interface DataCubeProps {
  position?: [number, number, number];
  scale?: number;
}

const DataCube = ({ position = [0, 0, 0], scale = 1 }: DataCubeProps) => {
  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.6) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main Cube */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#2D3748"
          metalness={0.7}
          roughness={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Inner Glowing Core */}
      <mesh scale={0.5}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#4A90E2"
          emissive="#4A90E2"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Corner Spheres */}
      {[
        [0.5, 0.5, 0.5],
        [-0.5, 0.5, 0.5],
        [0.5, -0.5, 0.5],
        [-0.5, -0.5, 0.5],
        [0.5, 0.5, -0.5],
        [-0.5, 0.5, -0.5],
        [0.5, -0.5, -0.5],
        [-0.5, -0.5, -0.5],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.9}
            roughness={0.1}
            emissive="#D4AF37"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

export default DataCube;

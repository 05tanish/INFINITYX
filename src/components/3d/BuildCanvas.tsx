import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import FloatingLaptop from './FloatingLaptop';
import DataCube from './DataCube';

interface BuildCanvasProps {
  isHovered: boolean;
}

const BuildScene = ({ isHovered }: { isHovered: boolean }) => {
  const speedRef = useRef(1.0);
  const shapesRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.GridHelper>(null);

  // Geometric shapes definitions
  const shapes = useMemo(() => {
    return [
      {
        position: [-1.4, 0.8, -0.6] as [number, number, number],
        color: '#E5C07B',
        type: 'tetrahedron' as const,
        scale: 0.25,
      },
      {
        position: [1.5, -0.6, -0.8] as [number, number, number],
        color: '#3E63DD',
        type: 'octahedron' as const,
        scale: 0.2,
      },
      {
        position: [1.3, 0.9, 0.4] as [number, number, number],
        color: '#E5C07B',
        type: 'icosahedron' as const,
        scale: 0.22,
      },
    ];
  }, []);

  useFrame((state) => {
    const targetSpeed = isHovered ? 2.5 : 1.0;
    speedRef.current = THREE.MathUtils.lerp(speedRef.current, targetSpeed, 0.08);

    if (shapesRef.current) {
      shapesRef.current.rotation.y = state.clock.getElapsedTime() * 0.4 * speedRef.current;
    }

    if (gridRef.current) {
      gridRef.current.position.y = -1.2 + Math.sin(state.clock.getElapsedTime() * 0.4) * 0.05;
    }
  });

  return (
    <group>
      {/* Dynamic Digital Dev Grid at the bottom */}
      <gridHelper
        ref={gridRef}
        args={[10, 10, '#E5C07B', '#1C1C1F']}
        position={[0, -1.2, 0]}
        rotation={[0.1, 0, 0]}
      />

      {/* Main Floating Laptop */}
      <group position={[0, -0.2, 0]}>
        <Float speed={1.6 * speedRef.current} rotationIntensity={0.2} floatIntensity={0.3}>
          <FloatingLaptop scale={0.9} />
        </Float>
      </group>

      {/* Glowing Core Code DataCube hovering above laptop screen */}
      <group position={[0, 0.9, -0.4]}>
        <Float speed={2.5 * speedRef.current} rotationIntensity={0.5} floatIntensity={0.5}>
          <DataCube scale={0.45} />
        </Float>
      </group>

      {/* Orbiting Coding Geometries */}
      <group ref={shapesRef}>
        {shapes.map((s, i) => (
          <mesh key={i} position={s.position} scale={s.scale}>
            {s.type === 'tetrahedron' && <tetrahedronGeometry />}
            {s.type === 'octahedron' && <octahedronGeometry />}
            {s.type === 'icosahedron' && <icosahedronGeometry />}
            <meshStandardMaterial
              color={s.color}
              metalness={0.8}
              roughness={0.2}
              emissive={s.color}
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

const BuildCanvas = ({ isHovered }: BuildCanvasProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-brand-navy/10 animate-pulse" />;
  }

  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 50 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-4, 4, 2]} intensity={2.0} color="#E5C07B" />
        <pointLight position={[4, -4, -2]} intensity={1.5} color="#3E63DD" />

        <BuildScene isHovered={isHovered} />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default BuildCanvas;

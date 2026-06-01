import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import FloatingPhone from './FloatingPhone';
import FloatingMediaFrame from './FloatingMediaFrame';

interface GrowthCanvasProps {
  isHovered: boolean;
}

const GrowthScene = ({ isHovered }: { isHovered: boolean }) => {
  const speedRef = useRef(1.0);
  const particlesRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const particleCount = 120;

  // Orbiting particles configuration
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 4;
      const radius = 2.0 + Math.random() * 1.5;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    // Smoothly transition speed multiplier based on hover
    const targetSpeed = isHovered ? 2.5 : 1.0;
    speedRef.current = THREE.MathUtils.lerp(speedRef.current, targetSpeed, 0.08);

    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.15 * speedRef.current;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.25 * speedRef.current;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dynamic Ambient Orbiting Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#3E63DD"
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Floating Agency Models */}
      <group position={[-0.8, -0.2, 0.5]}>
        <Float speed={1.5 * speedRef.current} rotationIntensity={0.3} floatIntensity={0.4}>
          <FloatingPhone scale={0.75} />
        </Float>
      </group>

      <group position={[0.7, 0.3, -0.2]}>
        <Float speed={2.0 * speedRef.current} rotationIntensity={0.5} floatIntensity={0.6}>
          <FloatingMediaFrame scale={0.65} />
        </Float>
      </group>
    </group>
  );
};

const GrowthCanvas = ({ isHovered }: GrowthCanvasProps) => {
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
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-3, -3, 2]} intensity={2.0} color="#3E63DD" />
        <pointLight position={[3, 3, -2]} intensity={1.5} color="#8A2BE2" />

        <GrowthScene isHovered={isHovered} />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default GrowthCanvas;

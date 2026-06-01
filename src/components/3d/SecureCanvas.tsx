import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import FloatingShield from './FloatingShield';

interface SecureCanvasProps {
  isHovered: boolean;
}

const SecureScene = ({ isHovered }: { isHovered: boolean }) => {
  const speedRef = useRef(1.0);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;

  // Orbiting particles configuration
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = (i / particleCount) * Math.PI * 2;
      const radius = 1.8 + Math.random() * 0.6;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 2] = Math.sin(theta) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const targetSpeed = isHovered ? 2.5 : 1.0;
    speedRef.current = THREE.MathUtils.lerp(speedRef.current, targetSpeed, 0.08);

    if (ring1Ref.current) {
      ring1Ref.current.rotation.y = state.clock.getElapsedTime() * 0.6 * speedRef.current;
      ring1Ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.3;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = state.clock.getElapsedTime() * 0.4 * speedRef.current;
      ring2Ref.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.3;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = -state.clock.getElapsedTime() * 0.2 * speedRef.current;
    }
  });

  return (
    <group>
      {/* Dynamic Security Node Particle Ring */}
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
          color="#8A2BE2"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Central Floating Extruded Shield */}
      <Float speed={1.8 * speedRef.current} rotationIntensity={0.2} floatIntensity={0.4}>
        <FloatingShield scale={1.1} position={[0, -0.1, 0]} />
      </Float>

      {/* Concentric Cryptographic Glowing Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.5, 0.03, 12, 64]} />
        <meshStandardMaterial
          color="#8A2BE2"
          emissive="#8A2BE2"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.7, 0.02, 8, 48]} />
        <meshStandardMaterial
          color="#3E63DD"
          emissive="#3E63DD"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
};

const SecureCanvas = ({ isHovered }: SecureCanvasProps) => {
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
        camera={{ position: [0, 0, 4.0], fov: 50 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[3, 3, 3]} intensity={2.0} color="#8A2BE2" />
        <pointLight position={[-3, -3, -3]} intensity={1.5} color="#3E63DD" />

        <SecureScene isHovered={isHovered} />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default SecureCanvas;

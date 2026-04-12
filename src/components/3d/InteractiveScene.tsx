import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

import FloatingLaptop from './FloatingLaptop';
import FloatingShield from './FloatingShield';
import FloatingPhone from './FloatingPhone';

// Particle field for background
const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
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
        size={0.05}
        color="#8A2BE2"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

interface InteractiveSceneProps {
  className?: string;
  variant?: 'hero' | 'services' | 'minimal';
}

const InteractiveScene = ({ className = '', variant = 'hero' }: InteractiveSceneProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4A90E2" />
          <pointLight position={[5, 5, 5]} intensity={0.3} color="#D4AF37" />
          <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.3} penumbra={1} color="#4A90E2" />
          
          {/* Meaningful Agency Elements replacing the fallback cubes */}
          {variant === 'hero' && (
            <>
              <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <FloatingLaptop position={[-2, 1, 0]} scale={0.9} />
              </Float>
              <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
                <FloatingShield position={[2, -1, -2]} scale={0.7} />
              </Float>
              <ParticleField />
            </>
          )}
          
          {variant === 'services' && (
            <>
              <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
                <FloatingPhone position={[0, 0, 0]} scale={0.8} />
              </Float>
            </>
          )}
          
          {variant === 'minimal' && (
            <>
              <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <FloatingShield position={[0, 0, 0]} scale={0.7} />
              </Float>
            </>
          )}
          
          {/* Environment */}
          <Environment preset="city" />
          
          {/* Interactive Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default InteractiveScene;

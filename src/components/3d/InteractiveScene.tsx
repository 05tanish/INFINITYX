import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

// Interactive Sphere that responds to mouse
const InteractiveSphere = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      // Subtle rotation
      meshRef.current.rotation.y += 0.002;
      
      // React to hover
      const scale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={hovered ? '#D4AF37' : '#4A90E2'}
          metalness={0.9}
          roughness={0.1}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
};

// Interactive Torus
const InteractiveTorus = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <torusGeometry args={[1.5, 0.4, 32, 64]} />
      <meshStandardMaterial
        color={hovered ? '#D4AF37' : '#4A90E2'}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

// Interactive Cube with distortion
const InteractiveCube = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      // Pulse effect when clicked
      if (clicked) {
        const scale = 1 + Math.sin(state.clock.getElapsedTime() * 5) * 0.1;
        meshRef.current.scale.set(scale, scale, scale);
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh
        ref={meshRef}
        position={position}
        onClick={() => setClicked(!clicked)}
      >
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <MeshDistortMaterial
          color={clicked ? '#D4AF37' : '#2D3748'}
          metalness={0.7}
          roughness={0.3}
          distort={0.4}
          speed={3}
        />
      </mesh>
    </Float>
  );
};

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
        color="#4A90E2"
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
          
          {/* Interactive Objects */}
          {variant === 'hero' && (
            <>
              <InteractiveSphere position={[0, 0, 0]} />
              <InteractiveTorus position={[0, 0, -3]} />
              <InteractiveCube position={[-3, 1, -1]} />
              <InteractiveCube position={[3, -1, -2]} />
              <ParticleField />
            </>
          )}
          
          {variant === 'services' && (
            <>
              <InteractiveSphere position={[0, 0, 0]} />
              <InteractiveTorus position={[0, 0, -2]} />
            </>
          )}
          
          {variant === 'minimal' && (
            <>
              <InteractiveSphere position={[0, 0, 0]} />
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

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

// Animated wireframe sphere
const WireframeSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial
        color="#4A90E2"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

// Orbiting small spheres
const OrbitingSpheres = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  const spheres = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 3;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle * 2) * 0.5,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        color: i % 2 === 0 ? '#4A90E2' : '#D4AF37',
      };
    });
  }, []);

  return (
    <group ref={groupRef}>
      {spheres.map((sphere, i) => (
        <mesh key={i} position={sphere.position}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={sphere.color}
            metalness={0.9}
            roughness={0.1}
            emissive={sphere.color}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

// Floating geometric shapes
const GeometricShapes = () => {
  return (
    <>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[-2, 1.5, -1]}>
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[2, -1.5, -1]}>
          <tetrahedronGeometry args={[0.6]} />
          <meshStandardMaterial
            color="#4A90E2"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[0, 2, -2]}>
          <icosahedronGeometry args={[0.4]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </>
  );
};

// Animated grid
const AnimatedGrid = () => {
  const gridRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  const lines = useMemo(() => {
    const lineArray = [];
    const size = 10;
    const divisions = 20;
    const step = size / divisions;

    for (let i = 0; i <= divisions; i++) {
      const pos = -size / 2 + i * step;
      lineArray.push({
        start: [pos, -size / 2, -3] as [number, number, number],
        end: [pos, size / 2, -3] as [number, number, number],
      });
      lineArray.push({
        start: [-size / 2, pos, -3] as [number, number, number],
        end: [size / 2, pos, -3] as [number, number, number],
      });
    }
    return lineArray;
  }, []);

  return (
    <group ref={gridRef}>
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...line.start, ...line.end])}
              itemSize={3}
              args={[new Float32Array([...line.start, ...line.end]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#4A90E2" transparent opacity={0.1} />
        </line>
      ))}
    </group>
  );
};

// Particle swirl
const ParticleSwirl = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 4;
      const radius = (i / particleCount) * 5;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.1;
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
        size={0.03}
        color="#D4AF37"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const ServicesScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4A90E2" />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#D4AF37" />

        {/* 3D Objects */}
        <WireframeSphere />
        <OrbitingSpheres />
        <GeometricShapes />
        <AnimatedGrid />
        <ParticleSwirl />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default ServicesScene;

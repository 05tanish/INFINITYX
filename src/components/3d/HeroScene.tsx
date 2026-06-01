import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

import FloatingLaptop from './FloatingLaptop';
import FloatingMediaFrame from './FloatingMediaFrame';
import FloatingShield from './FloatingShield';
import FloatingPhone from './FloatingPhone';

// Scroll & Mouse Tracking Camera Controller
const CinematicCamera = () => {
  const { camera } = useThree();
  const targetCameraPos = useRef(new THREE.Vector3(0, 0, 8));
  
  useFrame((state) => {
    // Read global scroll for extremely fast, non-blocking sync
    const scrollY = document.documentElement.scrollTop;
    const windowH = window.innerHeight;
    
    // Normalized scroll progress (0 to 1) over the 4 sections
    const progress = Math.min(Math.max(scrollY / (windowH * 3), 0), 1);

    // Normalized mouse movement coordinates from -1 to 1 (with lerping and scaling)
    const mouseX = state.pointer.x * 0.8;
    const mouseY = state.pointer.y * 0.6;

    // Apple Cinematic Choreography blended with mouse parallax, pitched slightly higher to reveal grid
    if (progress < 0.3) {
      // Phase 1: Wide shot showing the vast cyber-grid floor
      targetCameraPos.current.set(mouseX, mouseY + 0.6, 8 - (progress * 4));
    } else if (progress < 0.6) {
      // Phase 2: Dolly zoom in slightly closer to the core ecosystem
      targetCameraPos.current.set(mouseX, mouseY + 0.3, 6.5);
    } else {
      // Phase 3: Panning shot
      targetCameraPos.current.set(
        Math.sin((progress - 0.6) * 5) * 4 + mouseX, 
        (progress - 0.6) * 3 + mouseY, 
        6
      );
    }

    camera.position.lerp(targetCameraPos.current, 0.05);

    // Satisfying lookAt parallax: look slightly towards the mouse direction
    const targetLookAt = new THREE.Vector3(mouseX * 0.4, mouseY * 0.4 - 0.2, 0);
    camera.lookAt(targetLookAt);
  });

  return null;
};

// Central Rotating Object Container driven by Scroll and Mouse Coordinates
const ScrollDrivenEcosystem = () => {
  const groupRef = useRef<THREE.Group>(null);
  const laptopRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const scrollY = document.documentElement.scrollTop;
    const windowH = window.innerHeight;
    const progress = Math.min(Math.max(scrollY / (windowH * 3), 0), 1);

    // Micro mouse rotation to add organic depth
    const mouseX = state.pointer.x * 0.2;
    const mouseY = state.pointer.y * 0.15;

    if (groupRef.current) {
      // Base Y rotation mapped exactly to scroll + micro mouse cursor rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        progress * Math.PI * 2 + mouseX,
        0.05
      );
      // Micro X rotation mapped exactly to mouse Y coordinate
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseY,
        0.05
      );
    }

    if (laptopRef.current) {
      // Laptop pushes to the center of the screen as we scroll deep
      const scaleTarget = 0.8 + progress * 0.4;
      laptopRef.current.scale.lerp(new THREE.Vector3(scaleTarget, scaleTarget, scaleTarget), 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Hero Object */}
      <group ref={laptopRef} position={[0, 0, 0]}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <FloatingLaptop position={[0, 0, 0]} scale={1} />
        </Float>
      </group>

      {/* Orbiting Elements */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <FloatingMediaFrame position={[3, -1, -2]} scale={0.7} />
      </Float>

      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <FloatingShield position={[-3, 2, -1]} scale={0.6} />
      </Float>
      
      <Float speed={1} rotationIntensity={0.6} floatIntensity={0.8}>
        <FloatingPhone position={[-1.5, -3, 2]} scale={0.5} />
      </Float>
    </group>
  );
};

// Futuristic 3D Cyber-Grid floor with scroll and mouse coordinate tilting
const CyberGrid = () => {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const scrollY = document.documentElement.scrollTop;
    const windowH = window.innerHeight;
    const progress = Math.min(Math.max(scrollY / (windowH * 3), 0), 1);
    
    // Smooth grid tilt based on mouse cursor coordinates
    const mouseX = state.pointer.x * 0.08;
    const mouseY = state.pointer.y * 0.05;

    if (gridRef.current) {
      // Flat grid rotating and shifting in perspective
      gridRef.current.rotation.y = progress * 0.4 + mouseX;
      gridRef.current.rotation.x = mouseY;
    }
  });

  return (
    <group ref={gridRef} position={[0, -2.6, 0]}>
      {/* Double layered cyan and violet cybergrid grids */}
      <gridHelper 
        args={[40, 40, '#3E63DD', '#141416']} 
        position={[0, 0, 0]} 
      />
      <gridHelper 
        args={[40, 20, '#8A2BE2', '#0A0A0B']} 
        position={[0, -0.01, 0]} 
      />
    </group>
  );
};

// Particle ambient background layer
const AmbientParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 500;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20 - 2; // offset lower to blend with grid floor
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    return pos;
  }, []);

  useFrame(({ clock, pointer }) => {
    const scrollY = document.documentElement.scrollTop;
    if (particlesRef.current) {
      // Base rotation + Fast Star Wars warp effect when heavily scrolling down + slight mouse influence
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05 + (scrollY * 0.001) + (pointer.x * 0.02);
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.1 + (pointer.y * 0.02);
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
        size={0.04}
        color="#8A2BE2"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const HeroScene = () => {
  const [mounted, setMounted] = useState(false);
  
  // Prevents SSR mismatch tracking issues bounds
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-[100vh] fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        {/* Depth Fog - Essential to fade grid into dark infinite horizon */}
        <fog attach="fog" args={['#030303', 4, 15]} />

        {/* Cinematic Lighting Setup */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <spotLight position={[-10, 0, 10]} intensity={2.5} angle={0.4} penumbra={1} color="#3E63DD" /> 
        <pointLight position={[5, -5, -5]} intensity={2.5} color="#8A2BE2" /> 

        {/* Cinematic Logic Controllers */}
        <CinematicCamera />
        <ScrollDrivenEcosystem />
        <CyberGrid />
        <AmbientParticles />
        
      </Canvas>
    </div>
  );
};

export default HeroScene;

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import FloatingLaptop from './FloatingLaptop';
import FloatingShield from './FloatingShield';
import FloatingPhone from './FloatingPhone';
import AbstractRing from './AbstractRing';
import DataCube from './DataCube';

interface Scene3DProps {
  className?: string;
  variant?: 'hero' | 'services' | 'minimal';
}

const Scene3D = ({ className = '', variant = 'hero' }: Scene3DProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4A90E2" />
          <pointLight position={[5, 5, 5]} intensity={0.3} color="#D4AF37" />
          
          {/* 3D Objects based on variant */}
          {variant === 'hero' && (
            <>
              {/* Center - Data Cube (Technology) */}
              <DataCube position={[0, 0, 0]} scale={1.2} />
              
              {/* Left - Laptop (Content/Development) */}
              <FloatingLaptop position={[-3.5, 0.5, -1]} scale={0.6} />
              
              {/* Right - Shield (Security) */}
              <FloatingShield position={[3.5, 0, -1]} scale={0.8} />
              
              {/* Top Right - Phone (Mobile) */}
              <FloatingPhone position={[2, 2.5, -2]} scale={0.7} />
              
              {/* Background Rings */}
              <AbstractRing position={[-2, -1.5, -3]} scale={0.8} color="#4A90E2" />
              <AbstractRing position={[2.5, -2, -4]} scale={0.6} color="#D4AF37" />
            </>
          )}
          
          {variant === 'services' && (
            <>
              <DataCube position={[0, 0, 0]} scale={1} />
              <AbstractRing position={[0, 0, -2]} scale={1.5} color="#4A90E2" />
            </>
          )}
          
          {variant === 'minimal' && (
            <>
              <FloatingShield position={[0, 0, 0]} scale={1} />
              <AbstractRing position={[0, 0, -1]} scale={1.2} color="#4A90E2" />
            </>
          )}
          
          {/* Environment */}
          <Environment preset="city" />
          
          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;

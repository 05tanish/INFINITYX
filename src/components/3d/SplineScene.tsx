import Spline from '@splinetool/react-spline';
import { useState } from 'react';

interface SplineSceneProps {
  sceneUrl: string;
  className?: string;
}

const SplineScene = ({ sceneUrl, className = '' }: SplineSceneProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    console.log('✅ Spline scene loaded:', sceneUrl);
    setIsLoading(false);
    setError(false);
  };

  const handleError = (err: any) => {
    console.error('❌ Spline scene failed to load:', err);
    setError(true);
    setIsLoading(false);
  };

  if (error) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-navy/10 gap-2">
          <p className="text-sm text-gray-500">3D Scene Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-navy/20 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-400">Loading 3D Experience...</p>
          </div>
        </div>
      )}
      <Spline
        scene={sceneUrl}
        onLoad={handleLoad}
        onError={handleError}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default SplineScene;

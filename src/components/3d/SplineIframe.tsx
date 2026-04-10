import { useState, lazy, Suspense } from 'react';

// Fallback to React Three Fiber scene if Spline fails
const InteractiveScene = lazy(() => import('./InteractiveScene'));

interface SplineIframeProps {
  sceneId: string;
  className?: string;
  fallbackToR3F?: boolean;
}

const SplineIframe = ({ sceneId, className = '', fallbackToR3F = true }: SplineIframeProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadTimeout, setLoadTimeout] = useState(false);

  const handleLoad = () => {
    console.log('✅ Spline iframe loaded:', sceneId);
    setIsLoading(false);
    setError(false);
  };

  const handleError = () => {
    console.error('❌ Spline iframe failed to load:', sceneId);
    setError(true);
    setIsLoading(false);
  };

  // Set a timeout to show fallback if loading takes too long
  useState(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        console.warn('⏱️ Spline iframe load timeout, showing fallback');
        setLoadTimeout(true);
        setIsLoading(false);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timer);
  });

  // Show React Three Fiber fallback if enabled and there's an error or timeout
  if ((error || loadTimeout) && fallbackToR3F) {
    console.log('🎨 Using React Three Fiber fallback scene');
    return (
      <Suspense fallback={
        <div className="w-full h-full bg-brand-navy/20 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <InteractiveScene />
      </Suspense>
    );
  }

  // Show error message if fallback is disabled
  if (error && !fallbackToR3F) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-navy/10 gap-2">
          <p className="text-sm text-gray-500">3D Scene unavailable</p>
          <p className="text-xs text-gray-600">Scene ID: {sceneId.substring(0, 8)}...</p>
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
      <iframe
        src={`https://my.spline.design/${sceneId}`}
        frameBorder="0"
        width="100%"
        height="100%"
        onLoad={handleLoad}
        onError={handleError}
        style={{ 
          border: 'none', 
          display: 'block',
          width: '100%',
          height: '100%'
        }}
        title="3D Scene"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};

export default SplineIframe;

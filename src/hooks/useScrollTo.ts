import { useCallback } from 'react';

export const useScrollTo = () => {
  const scrollTo = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    
    if (!element) {
      console.error(`Section with id "${sectionId}" not found`);
      return;
    }

    // Check if smooth scroll is supported
    const supportsSmooth = 'scrollBehavior' in document.documentElement.style;
    
    try {
      if (supportsSmooth) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Fallback for browsers without smooth scroll support
        element.scrollIntoView();
      }
    } catch (error) {
      console.error('Error scrolling to section:', error);
      // Final fallback
      element.scrollIntoView();
    }
  }, []);

  return scrollTo;
};

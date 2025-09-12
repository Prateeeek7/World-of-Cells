import { useState, useEffect, useCallback } from 'react';

// Custom hook for responsive behavior
export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    // Add event listener with passive option for better performance
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Memoized responsive breakpoints
  const isMobile = windowSize.width < 640;
  const isSmallScreen = windowSize.width < 760;
  const isMediumScreen = windowSize.width < 740;
  const isTablet = windowSize.width >= 640 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;
  const isHamburgerMenu = windowSize.width < 1100; // New breakpoint for hamburger menu

  return {
    windowSize,
    isMobile,
    isSmallScreen,
    isMediumScreen,
    isTablet,
    isDesktop,
    isHamburgerMenu,
  };
};

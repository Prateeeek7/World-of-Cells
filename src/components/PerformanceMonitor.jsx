import React, { useEffect, useState } from 'react';

// Performance monitoring component for development
const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: null,
    loadTime: 0,
  });
  const [isVisible, setIsVisible] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('performanceMonitorVisible');
    return saved ? JSON.parse(saved) : true;
  });

  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                       process.env.NODE_ENV === undefined ||
                       window.location.hostname === 'localhost' ||
                       window.location.hostname === '127.0.0.1';

  // Save visibility preference to localStorage
  useEffect(() => {
    localStorage.setItem('performanceMonitorVisible', JSON.stringify(isVisible));
  }, [isVisible]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isDevelopment) return;

    const handleKeyPress = (e) => {
      // Ctrl/Cmd + Shift + P to toggle performance monitor
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isDevelopment]);

  useEffect(() => {
    // Only run in development mode
    if (!isDevelopment) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (currentTime - lastTime))
        }));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    // Measure initial load time
    if (performance.timing) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      setMetrics(prev => ({ ...prev, loadTime }));
    }

    // Start FPS monitoring
    measureFPS();

    // Memory monitoring (if available)
    const memoryInterval = setInterval(() => {
      if (performance.memory) {
        setMetrics(prev => ({
          ...prev,
          memory: {
            used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
            total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
            limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024),
          }
        }));
      }
    }, 1000);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      clearInterval(memoryInterval);
    };
  }, [isDevelopment]);

  // Don't render if not in development
  if (!isDevelopment) return null;

  // Don't render if manually hidden
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold">Performance Monitor (Dev)</span>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-2 text-white hover:text-gray-300 text-lg leading-none"
          title="Hide Performance Monitor (Ctrl/Cmd + Shift + P to toggle)"
        >
          ×
        </button>
      </div>
      <div>FPS: {metrics.fps}</div>
      {metrics.memory && (
        <div>Memory: {metrics.memory.used}MB / {metrics.memory.total}MB</div>
      )}
      {metrics.loadTime > 0 && (
        <div>Load: {metrics.loadTime}ms</div>
      )}
      <div className="mt-2 text-xs opacity-70">
        {process.env.NODE_ENV || 'undefined'}
      </div>
      <div className="mt-1 text-xs opacity-50">
        Ctrl/Cmd + Shift + P to toggle
      </div>
    </div>
  );
};

export default PerformanceMonitor;

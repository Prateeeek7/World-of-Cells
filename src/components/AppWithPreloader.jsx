import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './Preloader';

const AppWithPreloader = ({ children }) => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Show preloader on every page refresh/load
    setShowPreloader(true);
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setIsAppReady(true);
  };

  return (
    <main className="relative">
      <AnimatePresence mode="wait">
        {showPreloader && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>
      {isAppReady && children}
    </main>
  );
};

export default AppWithPreloader;

import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PerformanceMonitor from "./components/PerformanceMonitor";
import AppWithPreloader from "./components/AppWithPreloader";
import { ThemeProvider } from "./contexts/ThemeContext";
import { usePWA } from "./hooks/usePWA";

// Lazy load components for better performance
const GroupPage = React.lazy(() => import("./pages/GroupPage"));
const CellPage = React.lazy(() => import("./pages/CellPage"));
const HumanCellIntro = React.lazy(() => import("./pages/HumanCellIntro"));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#5a2328]"></div>
  </div>
);

// PWA Install Banner Component
const PWAInstallBanner = () => {
  const { showInstallPrompt, installApp, dismissInstallPrompt } = usePWA();

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-40 md:left-auto md:right-4 md:max-w-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm">Install World of Cells</h3>
          <p className="text-xs opacity-90">Get quick access and work offline</p>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={installApp}
            className="px-3 py-1 bg-white text-blue-600 rounded text-xs font-medium hover:bg-gray-100 transition-colors"
          >
            Install
          </button>
          <button
            onClick={dismissInstallPrompt}
            className="px-3 py-1 text-white hover:bg-blue-700 rounded text-xs transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

// Offline Indicator Component
const OfflineIndicator = () => {
  const { isOnline } = usePWA();

  if (isOnline) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg z-40">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">You're offline - Some features may be limited</span>
      </div>
    </div>
  );
};

function App() {
  const { isOnline } = usePWA();

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  return (
    <ThemeProvider>
      <AppWithPreloader>
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/human-cell" element={<HumanCellIntro />} />
              <Route path="/group/:groupName" element={<GroupPage />} />
              <Route path="/cell/:cellName" element={<CellPage />} />
            </Routes>
          </Suspense>
          <PerformanceMonitor />
          <PWAInstallBanner />
          <OfflineIndicator />
        </Router>
      </AppWithPreloader>
    </ThemeProvider>
  );
}

export default App; 
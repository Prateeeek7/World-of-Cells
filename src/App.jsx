import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PerformanceMonitor from "./components/PerformanceMonitor";
import { ThemeProvider } from "./contexts/ThemeContext";

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

function App() {
  return (
    <ThemeProvider>
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
      </Router>
    </ThemeProvider>
  );
}

export default App; 
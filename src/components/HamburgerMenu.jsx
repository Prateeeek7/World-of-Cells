import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import OptimizedImage from './OptimizedImage';
import ThemeToggle from './ThemeToggle';

const HamburgerMenu = ({ 
  onAISearch, 
  onComparison, 
  onTimeline, 
  isOpen, 
  onClose 
}) => {
  const { isDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (action) => {
    action();
    setIsMenuOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Hamburger Button */}
      <button
        onClick={handleMenuToggle}
        className={`w-12 h-12 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center ${
          isDarkMode 
            ? "bg-gray-800 hover:bg-gray-700 text-white" 
            : "bg-white hover:bg-gray-100 text-gray-900"
        }`}
        title="Menu"
      >
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <div className={`absolute top-full left-0 mt-2 w-64 rounded-xl shadow-2xl border z-50 ${
          isDarkMode 
            ? "bg-gray-800 border-gray-700" 
            : "bg-white border-gray-200"
        }`}>
          {/* Logo Section */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <OptimizedImage
                src="/images/logo.png"
                alt="World of Cells Logo"
                className="w-12 h-8"
              />
              <span className={`font-semibold text-lg ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                World of Cells
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {/* AI Search */}
            <button
              onClick={() => handleMenuItemClick(onAISearch)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                isDarkMode 
                  ? "text-gray-200 hover:bg-gray-700" 
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4L19 9Z" fill="currentColor"/>
                  <circle cx="12" cy="15" r="3" fill="currentColor"/>
                  <path d="M12 13.5C12.83 13.5 13.5 12.83 13.5 12S12.83 10.5 12 10.5 10.5 11.17 10.5 12 11.17 13.5 12 13.5Z" fill="white"/>
                </svg>
              </div>
              <div>
                <div className="font-semibold">AI Search</div>
                <div className="text-sm opacity-75">Smart cell discovery</div>
              </div>
            </button>

            {/* Cell Comparison */}
            <button
              onClick={() => handleMenuItemClick(onComparison)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                isDarkMode 
                  ? "text-gray-200 hover:bg-gray-700" 
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 2V22H5V2H7ZM19 2V22H17V2H19ZM3 8H9V6H3V8ZM11 8H21V6H11V8ZM3 12H9V10H3V12ZM11 12H21V10H11V12ZM3 16H9V14H3V16ZM11 16H21V14H11V16Z" fill="currentColor"/>
                  <circle cx="6" cy="5" r="1.5" fill="white"/>
                  <circle cx="18" cy="5" r="1.5" fill="white"/>
                  <circle cx="6" cy="11" r="1.5" fill="white"/>
                  <circle cx="18" cy="11" r="1.5" fill="white"/>
                  <circle cx="6" cy="17" r="1.5" fill="white"/>
                  <circle cx="18" cy="17" r="1.5" fill="white"/>
                </svg>
              </div>
              <div>
                <div className="font-semibold">Compare Cells</div>
                <div className="text-sm opacity-75">Side-by-side analysis</div>
              </div>
            </button>

            {/* Timeline */}
            <button
              onClick={() => handleMenuItemClick(onTimeline)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                isDarkMode 
                  ? "text-gray-200 hover:bg-gray-700" 
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H12V15H7V10Z" fill="currentColor"/>
                  <circle cx="5" cy="6" r="1" fill="white"/>
                  <circle cx="19" cy="6" r="1" fill="white"/>
                  <rect x="9" y="12" width="3" height="2" fill="white"/>
                </svg>
              </div>
              <div>
                <div className="font-semibold">Timeline</div>
                <div className="text-sm opacity-75">Research history</div>
              </div>
            </button>

            {/* Theme Toggle */}
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className={`font-semibold ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                }`}>
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;

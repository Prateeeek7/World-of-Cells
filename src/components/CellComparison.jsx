import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import OptimizedImage from './OptimizedImage';
import { CellCardSkeleton } from './SkeletonLoader';

const CellComparison = ({ cells = [], onClose, isOpen }) => {
  const { isDarkMode } = useTheme();
  const [selectedCells, setSelectedCells] = useState([]);
  const [comparisonView, setComparisonView] = useState('side-by-side');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCells, setFilteredCells] = useState(cells);

  // Comparison fields to display
  const comparisonFields = useMemo(() => [
    { key: 'name', label: 'Cell Name', type: 'text' },
    { key: 'location', label: 'Location', type: 'text' },
    { key: 'function', label: 'Function', type: 'text' },
    { key: 'life_span', label: 'Life Span', type: 'text' },
    { key: 'adherent', label: 'Adherent', type: 'text' },
    { key: 'related_disease', label: 'Related Diseases', type: 'text' },
    { key: 'embryonic_origin', label: 'Embryonic Origin', type: 'text' }
  ], []);

  const handleCellSelect = useCallback((cell) => {
    setSelectedCells(prev => {
      const isSelected = prev.find(c => c.name === cell.name);
      if (isSelected) {
        return prev.filter(c => c.name !== cell.name);
      } else if (prev.length < 3) {
        return [...prev, cell];
      }
      return prev;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedCells([]);
  }, []);

  // Filter cells based on search query
  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCells(cells);
    } else {
      const filtered = cells.filter(cell =>
        cell.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cell.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cell.function && cell.function.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (cell.location && cell.location.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredCells(filtered);
    }
  }, [searchQuery, cells]);

  // Handle search input
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-1 sm:p-4">
      <div className={`bg-white dark:bg-gray-900 rounded-lg sm:rounded-2xl shadow-2xl max-w-7xl w-full h-[98vh] sm:h-[95vh] overflow-hidden flex flex-col ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {/* Header */}
        <div className="flex justify-between items-start p-3 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-2xl font-bold truncate">Cell Comparison Tool</h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 hidden sm:block">
              Select up to 3 cells to compare their properties
            </p>
          </div>
          <div className="flex gap-1 sm:gap-2">
            <button
              onClick={clearSelection}
              disabled={selectedCells.length === 0}
              className="px-2 sm:px-4 py-1 sm:py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-xs sm:text-sm"
            >
              Clear
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Cell Selection */}
        <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <h3 className="text-sm sm:text-base font-semibold">Select Cells to Compare</h3>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {filteredCells.length} of {cells.length} cells
            </div>
          </div>
          
          {/* Search Input */}
          <div className="mb-2 sm:mb-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search cells..."
                className={`w-full px-3 py-2 pl-8 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                🔍
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-1 sm:gap-2 max-h-24 sm:max-h-32 overflow-y-auto">
            {filteredCells.length > 0 ? (
              filteredCells.map((cell, index) => {
                const isSelected = selectedCells.find(c => c.name === cell.name);
                return (
                  <button
                    key={`${cell.name}-${index}`}
                    onClick={() => handleCellSelect(cell)}
                    disabled={!isSelected && selectedCells.length >= 3}
                    className={`p-1 sm:p-2 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    } ${!isSelected && selectedCells.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <OptimizedImage
                      src={cell.icon}
                      alt={cell.name}
                      className="w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-1"
                    />
                    <p className="text-xs text-center font-medium truncate leading-tight">{cell.name}</p>
                  </button>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                <div className="text-4xl mb-2">🔍</div>
                <p className="text-center">No cells found matching "{searchQuery}"</p>
                <p className="text-sm text-center mt-1">Try a different search term</p>
              </div>
            )}
          </div>
        </div>

        {/* Selected Cells Preview */}
        {selectedCells.length > 0 && (
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20 flex-shrink-0">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 text-sm">
                Selected Cells ({selectedCells.length}/3)
              </h4>
              <button
                onClick={() => setComparisonView(comparisonView === 'side-by-side' ? 'table' : 'side-by-side')}
                className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs transition-colors"
              >
                {comparisonView === 'side-by-side' ? 'Table View' : 'Side View'}
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {selectedCells.map((cell) => (
                <div key={cell.name} className="flex items-center gap-1 bg-white dark:bg-gray-800 px-2 py-1 rounded border border-blue-200 dark:border-blue-700">
                  <OptimizedImage
                    src={cell.icon}
                    alt={cell.name}
                    className="w-4 h-4"
                  />
                  <span className="text-xs font-medium">{cell.name}</span>
                  <button
                    onClick={() => handleCellSelect(cell)}
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200 text-xs ml-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison View - Only show when cells are selected */}
        {selectedCells.length > 0 && (
          <div className="p-8 overflow-auto flex-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Comparison Results</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setComparisonView('side-by-side')}
                  className={`px-4 py-2 rounded-lg ${
                    comparisonView === 'side-by-side'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Side by Side
                </button>
                <button
                  onClick={() => setComparisonView('table')}
                  className={`px-4 py-2 rounded-lg ${
                    comparisonView === 'table'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Table View
                </button>
              </div>
            </div>

            {comparisonView === 'side-by-side' ? (
              <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${selectedCells.length}, 1fr)` }}>
                {selectedCells.map((cell) => (
                  <div key={cell.name} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 h-fit bg-gray-50 dark:bg-gray-800">
                    <div className="text-center mb-6">
                      <OptimizedImage
                        src={cell.image || cell.icon}
                        alt={cell.name}
                        className="w-24 h-24 mx-auto mb-3"
                      />
                      <h4 className="font-bold text-lg">{cell.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{cell.group}</p>
                    </div>
                    
                    <div className="space-y-3">
                      {comparisonFields.map((field) => (
                        <div key={field.key} className="break-words">
                          <h5 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">
                            {field.label}:
                          </h5>
                          <p className="text-sm leading-relaxed max-h-32 overflow-y-auto bg-white dark:bg-gray-700 p-2 rounded">
                            {cell[field.key] || 'Not specified'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left p-3 font-semibold min-w-32">Property</th>
                      {selectedCells.map((cell) => (
                        <th key={cell.name} className="text-left p-3 font-semibold min-w-48">
                          <div className="flex items-center gap-2">
                            <OptimizedImage
                              src={cell.icon}
                              alt={cell.name}
                              className="w-6 h-6"
                            />
                            <span className="truncate">{cell.name}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFields.map((field) => (
                      <tr key={field.key} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="p-3 font-medium text-sm min-w-32">{field.label}</td>
                        {selectedCells.map((cell) => (
                          <td key={cell.name} className="p-3 text-sm min-w-48">
                            <div className="max-h-24 overflow-y-auto break-words">
                              {cell[field.key] || 'Not specified'}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Empty State - Show when no cells are selected */}
        {selectedCells.length === 0 && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <div className="text-6xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold mb-2">Select Cells to Compare</h3>
              <p className="text-sm max-w-md mx-auto">
                Choose up to 3 cells from the grid above to start comparing their properties, functions, and characteristics.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CellComparison;

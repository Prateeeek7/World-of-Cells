import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useSearchIndex } from '../hooks/useSearchIndex';

const AISearch = ({ cells = [], onCellSelect, onClose, isOpen }) => {
  const { isDarkMode } = useTheme();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMode, setSearchMode] = useState('smart'); // smart, exact, fuzzy

  const { search } = useSearchIndex(cells, ['name', 'function', 'location', 'related_disease']);

  // AI-powered search suggestions
  const searchSuggestions = useMemo(() => [
    "cells that fight infection",
    "cells in the brain",
    "cells that produce energy",
    "cells involved in blood clotting",
    "cells that regenerate tissue",
    "cells in the digestive system",
    "cells that respond to injury",
    "cells involved in reproduction"
  ], []);

  // Natural language processing for search queries
  const processQuery = useCallback((query) => {
    const lowerQuery = query.toLowerCase();
    
    // Define search patterns
    const patterns = {
      infection: ['immune', 'macrophage', 'neutrophil', 'lymphocyte', 't cell', 'b cell'],
      brain: ['neuron', 'astrocyte', 'oligodendrocyte', 'microglia', 'nervous'],
      energy: ['mitochondria', 'metabolism', 'atp', 'glucose'],
      blood: ['erythrocyte', 'platelet', 'hemoglobin', 'hematopoietic'],
      regeneration: ['stem', 'progenitor', 'regeneration', 'repair'],
      digestive: ['enterocyte', 'goblet', 'pancreatic', 'liver', 'hepatocyte'],
      injury: ['fibroblast', 'macrophage', 'inflammation', 'wound'],
      reproduction: ['sperm', 'oocyte', 'reproductive', 'gamete']
    };

    // Find matching patterns
    const matchedPatterns = [];
    Object.entries(patterns).forEach(([key, terms]) => {
      if (lowerQuery.includes(key)) {
        matchedPatterns.push(...terms);
      }
    });

    return matchedPatterns;
  }, []);

  // Enhanced search function
  const performSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 500));

      let results = [];

      if (searchMode === 'smart') {
        // AI-powered semantic search
        const patterns = processQuery(searchQuery);
        
        if (patterns.length > 0) {
          // Search for cells matching the patterns
          results = cells.filter(cell => {
            const cellText = `${cell.name} ${cell.function} ${cell.location} ${cell.related_disease}`.toLowerCase();
            return patterns.some(pattern => cellText.includes(pattern));
          });
        } else {
          // Fallback to regular search
          results = search(searchQuery);
        }
      } else if (searchMode === 'exact') {
        // Exact string matching
        results = cells.filter(cell => 
          cell.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else if (searchMode === 'fuzzy') {
        // Fuzzy matching (simple implementation)
        results = cells.filter(cell => {
          const cellName = cell.name.toLowerCase();
          const query = searchQuery.toLowerCase();
          
          // Simple fuzzy matching - check if most characters match
          let matches = 0;
          for (let i = 0; i < query.length; i++) {
            if (cellName.includes(query[i])) matches++;
          }
          
          return matches / query.length > 0.6;
        });
      }

      // Sort by relevance
      results.sort((a, b) => {
        const aRelevance = a.name.toLowerCase().indexOf(searchQuery.toLowerCase());
        const bRelevance = b.name.toLowerCase().indexOf(searchQuery.toLowerCase());
        return aRelevance - bRelevance;
      });

      setSearchResults(results.slice(0, 20)); // Limit to 20 results
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [cells, search, searchMode, processQuery]);

  // Handle search input
  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      performSearch(value);
    } else {
      setSearchResults([]);
    }
  }, [performSearch]);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion) => {
    setQuery(suggestion);
    performSearch(suggestion);
  }, [performSearch]);

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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-hidden ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold">AI-Powered Cell Search</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Ask questions in natural language to find cells
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Search Modes */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <button
              onClick={() => setSearchMode('smart')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                searchMode === 'smart'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              🧠 Smart Search
            </button>
            <button
              onClick={() => setSearchMode('exact')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                searchMode === 'exact'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              📝 Exact Match
            </button>
            <button
              onClick={() => setSearchMode('fuzzy')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                searchMode === 'fuzzy'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              🔍 Fuzzy Search
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="p-6">
          <div className="relative mb-4">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Ask me anything about cells... (e.g., 'cells that fight infection')"
              className={`w-full px-4 py-3 pr-12 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            {isLoading && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>

          {/* Search Suggestions */}
          {!query && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Try asking:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`p-3 rounded-lg text-left text-sm transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-800 hover:bg-gray-700 border border-gray-600' 
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    💡 {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Search Results ({searchResults.length})
              </h3>
              
              {searchResults.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {searchResults.map((cell, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        onCellSelect(cell);
                        onClose();
                      }}
                      className={`w-full p-4 rounded-lg text-left transition-colors hover:shadow-md ${
                        isDarkMode 
                          ? 'bg-gray-800 hover:bg-gray-700 border border-gray-600' 
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                            {cell.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-600 dark:text-blue-400">
                            {cell.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {cell.group} • {cell.function?.substring(0, 100)}...
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : !isLoading && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <div className="text-4xl mb-2">🔍</div>
                  <p>No cells found matching your query.</p>
                  <p className="text-sm mt-1">Try a different search term or use the suggestions above.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AISearch;

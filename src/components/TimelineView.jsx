import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import timelineData from '../data/timeline.json';

const TimelineView = ({ cells = [], onClose, isOpen }) => {
  const { isDarkMode } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showIndianDiscoveries, setShowIndianDiscoveries] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  // Process timeline data from JSON
  const processedTimelineData = useMemo(() => {
    const allDiscoveries = [];
    
    // Add foundational discoveries
    if (timelineData.cellDiscoveryTimeline.foundationalDiscoveries) {
      timelineData.cellDiscoveryTimeline.foundationalDiscoveries.forEach(discovery => {
        allDiscoveries.push({
          year: discovery.year,
          title: discovery.cellType,
          description: discovery.notes,
          scientist: discovery.discoverer,
          significance: 'Foundational discovery',
          category: 'Foundational',
          cells: []
        });
      });
    }

    // Add nervous system cells
    if (timelineData.cellDiscoveryTimeline.nervousSystemCells) {
      timelineData.cellDiscoveryTimeline.nervousSystemCells.forEach(discovery => {
        allDiscoveries.push({
          year: discovery.year,
          title: discovery.cellType,
          description: discovery.notes,
          scientist: discovery.discoverer,
          significance: 'Nervous system discovery',
          category: 'Nervous System',
          cells: cells.filter(c => c.group === 'Nervous & Sensory')
        });
      });
    }

    // Add blood and immune system cells
    if (timelineData.cellDiscoveryTimeline.bloodAndImmuneSystemCells) {
      timelineData.cellDiscoveryTimeline.bloodAndImmuneSystemCells.forEach(discovery => {
        allDiscoveries.push({
          year: discovery.year,
          title: discovery.cellType,
          description: discovery.notes,
          scientist: discovery.discoverer,
          significance: 'Blood and immune system discovery',
          category: 'Blood & Immune',
          cells: cells.filter(c => c.group === 'Hematopoietic' || c.group === 'Immune')
        });
      });
    }

    // Add epithelial and glandular cells
    if (timelineData.cellDiscoveryTimeline.epithelialAndGlandularCells) {
      timelineData.cellDiscoveryTimeline.epithelialAndGlandularCells.forEach(discovery => {
        allDiscoveries.push({
          year: discovery.year,
          title: discovery.cellType,
          description: discovery.notes,
          scientist: discovery.discoverer,
          significance: 'Epithelial and glandular discovery',
          category: 'Epithelial & Glandular',
          cells: cells.filter(c => c.group === 'Epithelial')
        });
      });
    }

    // Add muscle and connective tissue cells
    if (timelineData.cellDiscoveryTimeline.muscleAndConnectiveTissueCells) {
      timelineData.cellDiscoveryTimeline.muscleAndConnectiveTissueCells.forEach(discovery => {
        allDiscoveries.push({
          year: discovery.year,
          title: discovery.cellType,
          description: discovery.notes,
          scientist: discovery.discoverer,
          significance: 'Muscle and connective tissue discovery',
          category: 'Muscle & Connective',
          cells: cells.filter(c => c.group === 'Muscular' || c.group === 'Connective & Support')
        });
      });
    }

    // Add reproductive cells
    if (timelineData.cellDiscoveryTimeline.reproductiveCells) {
      timelineData.cellDiscoveryTimeline.reproductiveCells.forEach(discovery => {
        allDiscoveries.push({
          year: discovery.year,
          title: discovery.cellType,
          description: discovery.notes,
          scientist: discovery.discoverer,
          significance: 'Reproductive system discovery',
          category: 'Reproductive',
          cells: cells.filter(c => c.group === 'Reproductive')
        });
      });
    }

    // Add sensory organ cells
    if (timelineData.cellDiscoveryTimeline.sensoryOrganCells) {
      timelineData.cellDiscoveryTimeline.sensoryOrganCells.forEach(discovery => {
        allDiscoveries.push({
          year: discovery.year,
          title: discovery.cellType,
          description: discovery.notes,
          scientist: discovery.discoverer,
          significance: 'Sensory organ discovery',
          category: 'Sensory',
          cells: cells.filter(c => c.group === 'Nervous & Sensory')
        });
      });
    }

    // Add specialized and endothelial cells
    if (timelineData.cellDiscoveryTimeline.specializedAndEndothelialCells) {
      timelineData.cellDiscoveryTimeline.specializedAndEndothelialCells.forEach(discovery => {
        allDiscoveries.push({
          year: discovery.year,
          title: discovery.cellType,
          description: discovery.notes,
          scientist: discovery.discoverer,
          significance: 'Specialized and endothelial discovery',
          category: 'Specialized & Endothelial',
          cells: cells.filter(c => c.group === 'Endothelial & Vascular' || c.group === 'Specialized')
        });
      });
    }

    // Add Indian discoveries if enabled
    if (showIndianDiscoveries) {
      // Add Indian discoveries from timeline.json
      if (timelineData.cellDiscoveryTimeline.indianDiscoveries) {
        timelineData.cellDiscoveryTimeline.indianDiscoveries.forEach(discovery => {
          allDiscoveries.push({
            year: discovery.year,
            title: discovery.cellType,
            description: discovery.notes,
            scientist: discovery.discoverer,
            significance: 'Indian Cell Biology Contribution',
            category: 'Indian Cell Biology',
            cells: discovery.cells_related || [],
            isIndian: true
          });
        });
      }
    }
    
    const sortedDiscoveries = allDiscoveries.sort((a, b) => {
      // Extract year for sorting, handling "c." prefix and BCE/CE
      const yearA = parseInt(a.year.replace(/[^\d]/g, ''));
      const yearB = parseInt(b.year.replace(/[^\d]/g, ''));
      
      // Handle BCE dates (negative years)
      const yearAWithBCE = a.year.includes('BCE') ? -yearA : yearA;
      const yearBWithBCE = b.year.includes('BCE') ? -yearB : yearB;
      
      return yearAWithBCE - yearBWithBCE;
    });
    
    return sortedDiscoveries;
  }, [cells, showIndianDiscoveries]);

  const periods = [
    { key: 'all', label: 'All Time', range: '1665-2024' },
    { key: 'classical', label: 'Classical Period', range: '1665-1855' },
    { key: 'modern', label: 'Modern Era', range: '1855-1950' },
    { key: 'contemporary', label: 'Contemporary', range: '1950-2024' }
  ];

  const categories = [
    { key: 'all', label: 'All Categories' },
    { key: 'Foundational', label: 'Foundational' },
    { key: 'Nervous System', label: 'Nervous System' },
    { key: 'Blood & Immune', label: 'Blood & Immune' },
    { key: 'Epithelial & Glandular', label: 'Epithelial & Glandular' },
    { key: 'Muscle & Connective', label: 'Muscle & Connective' },
    { key: 'Reproductive', label: 'Reproductive' },
    { key: 'Sensory', label: 'Sensory' },
    { key: 'Specialized & Endothelial', label: 'Specialized & Endothelial' },
    { key: 'Indian Cell Biology', label: '🇮🇳 Indian Cell Biology' }
  ];

  const filteredTimeline = useMemo(() => {
    let filtered = processedTimelineData;
    
    // Filter by period
    if (selectedPeriod !== 'all') {
      const ranges = {
        classical: [1665, 1855],
        modern: [1855, 1950],
        contemporary: [1950, 2024]
      };
      
      const [start, end] = ranges[selectedPeriod] || [1665, 2024];
      filtered = filtered.filter(item => {
        const year = parseInt(item.year.replace(/[^\d]/g, ''));
        return year >= start && year < end;
      });
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => {
        return item.category === selectedCategory;
      });
    }
    
    return filtered;
  }, [processedTimelineData, selectedPeriod, selectedCategory]);

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
      <div className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold">Cell Biology Timeline</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Explore the evolution of cell biology research
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          {/* Indian Discoveries Toggle */}
          <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-200">
                  🇮🇳 Indian Discoveries
                </h3>
                <p className="text-xs text-orange-600 dark:text-orange-300 mt-1">
                  Include contributions from Indian scientists throughout history
                </p>
              </div>
              <button
                onClick={() => setShowIndianDiscoveries(!showIndianDiscoveries)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showIndianDiscoveries
                    ? 'bg-orange-500 text-white'
                    : 'bg-orange-200 dark:bg-orange-800 text-orange-700 dark:text-orange-300 hover:bg-orange-300 dark:hover:bg-orange-700'
                }`}
              >
                {showIndianDiscoveries ? 'Hide' : 'Show'} Indian Discoveries
              </button>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Filter by Period:</h3>
            <div className="flex gap-2 flex-wrap">
              {periods.map((period) => (
                <button
                  key={period.key}
                  onClick={() => setSelectedPeriod(period.key)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedPeriod === period.key
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {period.label}
                  <span className="block text-xs opacity-75">{period.range}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Filter by Category:</h3>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === category.key
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="p-6 overflow-y-auto max-h-96">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800"></div>
            
            <div className="space-y-8">
              {filteredTimeline.map((event, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline dot */}
                  <div className={`absolute left-6 w-4 h-4 rounded-full border-4 border-white dark:border-gray-900 z-10 ${
                    event.isIndian ? 'bg-orange-500' : 'bg-blue-500'
                  }`}></div>
                  
                  {/* Content */}
                  <div className={`ml-16 rounded-lg p-4 flex-1 hover:shadow-md transition-shadow ${
                    event.isIndian 
                      ? 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800' 
                      : 'bg-gray-50 dark:bg-gray-800'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-lg font-bold ${
                        event.isIndian 
                          ? 'text-orange-600 dark:text-orange-400' 
                          : 'text-blue-600 dark:text-blue-400'
                      }`}>
                        {event.year} - {event.title}
                        {event.isIndian && <span className="ml-2">🇮🇳</span>}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-2 py-1 rounded">
                        {event.year}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {event.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-gray-600 dark:text-gray-400">Scientist:</span>
                        <span className="ml-1">{event.scientist}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-600 dark:text-gray-400">Category:</span>
                        <span className={`ml-1 px-2 py-1 rounded text-xs ${
                          event.category === 'Foundational' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' :
                          event.category === 'Nervous System' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
                          event.category === 'Blood & Immune' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' :
                          event.category === 'Epithelial & Glandular' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                          event.category === 'Muscle & Connective' ? 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300' :
                          event.category === 'Reproductive' ? 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300' :
                          event.category === 'Sensory' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' :
                          event.category === 'Indian Cell Biology' ? 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300' :
                          'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300'
                        }`}>
                          {event.category}
                        </span>
                      </div>
                    </div>

                    {/* Related cells */}
                    {event.cells.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                          Related Cells ({event.cells.length}):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {event.cells.slice(0, 5).map((cell, cellIndex) => (
                            <button
                              key={cellIndex}
                              onClick={() => setSelectedCell(cell)}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                            >
                              {cell.name}
                            </button>
                          ))}
                          {event.cells.length > 5 && (
                            <span className="px-2 py-1 text-gray-500 text-xs">
                              +{event.cells.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cell Detail Modal */}
        {selectedCell && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
            <div className={`bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{selectedCell.name}</h3>
                <button
                  onClick={() => setSelectedCell(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                <strong>Group:</strong> {selectedCell.group}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                <strong>Discovery:</strong> {selectedCell.discovery?.scientist} ({selectedCell.discovery?.year})
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Function:</strong> {selectedCell.function?.substring(0, 200)}...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineView;

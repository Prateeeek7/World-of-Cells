import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import cellsData from "../data/cells.json";
import { useTheme } from "../contexts/ThemeContext";
import OptimizedImage from "../components/OptimizedImage";
import CellAI from "../components/CellAI";

const CellPage = () => {
  const { cellName } = useParams();
  const [cell, setCell] = useState(null);
  const [showCellAI, setShowCellAI] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  // Memoize the normalized cell name to prevent recalculation
  const normalizedCellName = useMemo(() => 
    cellName.replace(/-/g, ' ').toLowerCase(), 
    [cellName]
  );

  // Memoize the cell search to prevent recalculation on every render
  const foundCell = useMemo(() => {
    // First try exact match
    let cell = cellsData.find(c => c.name.toLowerCase() === normalizedCellName);
    
    // If not found, try more flexible matching
    if (!cell) {
      cell = cellsData.find(c => {
        const cellNameLower = c.name.toLowerCase();
        const searchName = normalizedCellName;
        
        // Handle special characters and variations
        const normalizedCellNameFlexible = cellNameLower
          .replace(/[()]/g, '') // Remove parentheses
          .replace(/\s+/g, ' ') // Normalize spaces
          .trim();
        
        const searchNameFlexible = searchName
          .replace(/[()]/g, '') // Remove parentheses
          .replace(/\s+/g, ' ') // Normalize spaces
          .trim();
        
        // Additional check: handle the case where URL removes parentheses but JSON keeps them
        // Try matching by removing all special characters and comparing core words
        const coreWords1 = normalizedCellNameFlexible
          .replace(/[^a-z0-9\s]/g, '') // Remove all special chars except spaces
          .split(/\s+/)
          .filter(word => word.length > 0)
          .sort()
          .join(' ');
          
        const coreWords2 = searchNameFlexible
          .replace(/[^a-z0-9\s]/g, '') // Remove all special chars except spaces
          .split(/\s+/)
          .filter(word => word.length > 0)
          .sort()
          .join(' ');
        
        // Try both methods
        const exactMatch = normalizedCellNameFlexible === searchNameFlexible;
        const coreMatch = coreWords1 === coreWords2;
        
        return exactMatch || coreMatch;
      });
    }
    
    return cell;
  }, [normalizedCellName]);

  useEffect(() => {
    setCell(foundCell);
  }, [foundCell]);

  // Mapping function to convert cells.json group names to URL group names
  const getGroupUrl = useCallback((groupName) => {
    // Normalize the group name to lowercase and handle special characters
    const normalizedGroup = groupName.toLowerCase().replace(/[&]/g, ' and ').replace(/\s+/g, ' ');
    
    // Direct mapping to GroupPage group names
    const groupMapping = {
      "epithelial": "epithelial",
      "muscular": "muscular", 
      "nervous and sensory": "nervous and sensory",
      "hematopoietic": "hematopoietic",
      "stem and progenitory": "stem & progenitory",
      "connective": "connective",
      "reproductive": "reproductive",
      "skeletal": "skeletal",
      "gastrointestinal": "gastrointestinal",
      "thoracic": "thoracic",
      "secretory and hormone": "secretory & hormone",
      "immune": "immune"
    };
    
    // Return the mapped group or null if not found
    return groupMapping[normalizedGroup] || null;
  }, []);

  // Memoize event handlers to prevent recreation on every render
  const handleBackClick = useCallback(() => {
    if (cell && cell.group) {
      const groupUrl = getGroupUrl(cell.group);
      // If no valid group found, go to homepage
      if (groupUrl === null) {
        navigate('/');
      } else {
        navigate(`/group/${groupUrl}`);
      }
    } else {
      navigate('/');
    }
  }, [navigate, cell, getGroupUrl]);

  if (!cell) {
    return (
      <div className={`min-h-screen flex flex-col items-center p-4 pb-16 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}>
        <h1 className="text-4xl font-bold mb-4 capitalize">{cellName.replace(/-/g, ' ')}</h1>
        <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Loading or cell not found.</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-0 ${
      isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
    }`}>
      <div
        className="min-h-screen border-[12px] border-[#5a2328] box-border p-4 md:p-8"
        style={{ borderRadius: '24px', margin: '2px 0' }}
      >
        {/* Back button */}
        <div className="w-full flex justify-start mt-8 md:mt-8">
          <button
            onClick={handleBackClick}
            className="bg-[#5a2328] hover:bg-[#43181c] text-white font-bold rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#7a3b3f] transition-all duration-200 flex items-center justify-center text-2xl mb-4 ml-2 md:ml-8
              w-11 h-11 md:w-[44px] md:h-[44px]"
            aria-label={cell && cell.group ? "Back to Group" : "Back to Home"}
            style={{ minWidth: '2.5rem', minHeight: '2.5rem' }}
          >
            <span className="flex items-center justify-center w-full h-full">&#8592;</span>
          </button>
        </div>
        <h1 className="text-4xl font-bold mb-4 capitalize text-center">{cell.name}</h1>
        {cell.image && (
          <div className="flex justify-center">
            <OptimizedImage
              src={cell.image}
              alt={cell.name + ' diagram'}
              className="w-96 h-96 md:w-[32rem] md:h-[32rem] object-contain rounded shadow mb-10"
            />
          </div>
        )}
        <div className="max-w-[96rem] space-y-10 px-2 md:px-10 lg:px-20 mx-auto">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Embryonic Origin</h2>
            <div className={`text-lg md:text-xl leading-relaxed ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}>
              <ReactMarkdown 
                components={{
                  strong: ({children}) => <strong className="font-bold">{children}</strong>,
                  em: ({children}) => <em className="italic">{children}</em>,
                  code: ({children}) => <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                  p: ({children}) => <p className="mb-2">{children}</p>
                }}
              >
                {cell.embryonic_origin || 'Unknown'}
              </ReactMarkdown>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Discovery</h2>
            <p className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
              <span className="font-semibold">Scientist:</span> {cell.discovery?.scientist || 'Unknown'}<br />
              <span className="font-semibold">Year:</span> {cell.discovery?.year || 'Unknown'}<br />
              <span className="font-semibold">Stain:</span> {cell.discovery?.stain || 'Unknown'}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Location</h2>
            <div className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
              <ReactMarkdown 
                components={{
                  strong: ({children}) => <strong className="font-bold">{children}</strong>,
                  em: ({children}) => <em className="italic">{children}</em>,
                  code: ({children}) => <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                  p: ({children}) => <p className="mb-2">{children}</p>
                }}
              >
                {cell.location || 'Unknown'}
              </ReactMarkdown>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Function</h2>
            <div className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
              <ReactMarkdown 
                components={{
                  strong: ({children}) => <strong className="font-bold">{children}</strong>,
                  em: ({children}) => <em className="italic">{children}</em>,
                  code: ({children}) => <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                  p: ({children}) => <p className="mb-2">{children}</p>
                }}
              >
                {cell.function || 'Unknown'}
              </ReactMarkdown>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Life Span</h2>
            <div className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
              <ReactMarkdown 
                components={{
                  strong: ({children}) => <strong className="font-bold">{children}</strong>,
                  em: ({children}) => <em className="italic">{children}</em>,
                  code: ({children}) => <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                  p: ({children}) => <p className="mb-2">{children}</p>
                }}
              >
                {cell.life_span || 'Unknown'}
              </ReactMarkdown>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Adherent</h2>
            <div className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
              <ReactMarkdown 
                components={{
                  strong: ({children}) => <strong className="font-bold">{children}</strong>,
                  em: ({children}) => <em className="italic">{children}</em>,
                  code: ({children}) => <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                  p: ({children}) => <p className="mb-2">{children}</p>
                }}
              >
                {cell.adherent || 'Unknown'}
              </ReactMarkdown>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Effect of Ageing</h2>
            <div className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
              <ReactMarkdown 
                components={{
                  strong: ({children}) => <strong className="font-bold">{children}</strong>,
                  em: ({children}) => <em className="italic">{children}</em>,
                  code: ({children}) => <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                  p: ({children}) => <p className="mb-2">{children}</p>
                }}
              >
                {cell.effect_of_ageing || 'Unknown'}
              </ReactMarkdown>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Related Disease</h2>
            <div className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
              <ReactMarkdown 
                components={{
                  strong: ({children}) => <strong className="font-bold">{children}</strong>,
                  em: ({children}) => <em className="italic">{children}</em>,
                  code: ({children}) => <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                  p: ({children}) => <p className="mb-2">{children}</p>
                }}
              >
                {cell.related_disease || 'Unknown'}
              </ReactMarkdown>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">History of Evolution</h2>
            <div className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
              <ReactMarkdown 
                components={{
                  strong: ({children}) => <strong className="font-bold">{children}</strong>,
                  em: ({children}) => <em className="italic">{children}</em>,
                  code: ({children}) => <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                  p: ({children}) => <p className="mb-2">{children}</p>
                }}
              >
                {cell.history_of_evolution || 'Unknown'}
              </ReactMarkdown>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Relevance to Tissue Development</h2>
            <div className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
              <ReactMarkdown 
                components={{
                  strong: ({children}) => <strong className="font-bold">{children}</strong>,
                  em: ({children}) => <em className="italic">{children}</em>,
                  code: ({children}) => <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                  p: ({children}) => <p className="mb-2">{children}</p>
                }}
              >
                {cell.relevance_to_tissue_development || 'Unknown'}
              </ReactMarkdown>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Tissue Engineering Research</h2>
            <div className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
              <ReactMarkdown 
                components={{
                  strong: ({children}) => <strong className="font-bold">{children}</strong>,
                  em: ({children}) => <em className="italic">{children}</em>,
                  code: ({children}) => <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                  p: ({children}) => <p className="mb-2">{children}</p>
                }}
              >
                {cell.tissue_engineering_research || 'Unknown'}
              </ReactMarkdown>
            </div>
          </section>

          {/* References Section */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold mb-6 text-[#5a2328]">References & Further Reading</h2>
            
            {/* Individual Cell Links Section */}
            <div className={`p-6 rounded-xl border-2 ${
              isDarkMode 
                ? "bg-gray-800 border-gray-600" 
                : "bg-gray-50 border-gray-200"
            }`}>
              <h3 className="text-lg font-semibold mb-4 text-[#5a2328] flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Curated Research Links for {cell.name}
              </h3>
              <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Hand-picked research papers, articles, and resources specifically about {cell.name.toLowerCase()}
              </p>
              
              {/* Scrollable Links Container */}
              <div className={`max-h-64 overflow-y-auto pr-2 ${
                isDarkMode ? "scrollbar-dark" : "scrollbar-light"
              }`}>
                <div className="space-y-3">
                  {cell.references && cell.references.length > 0 ? (
                    cell.references.map((reference, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${
                        isDarkMode 
                          ? "bg-gray-700 border-gray-500 hover:bg-gray-600" 
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      } transition-colors`}>
                        <a 
                          href={reference.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className={`font-medium text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                {reference.title}
                              </p>
                              <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                {reference.source} • {reference.year} • {reference.type}
                              </p>
                            </div>
                            <svg className="w-4 h-4 mt-1 text-[#5a2328] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                            </svg>
                          </div>
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className={`p-4 text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      <p className="text-sm">No specific references available for {cell.name} yet.</p>
                      <p className="text-xs mt-1">Check back later for curated research links.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className={`mt-8 p-6 rounded-xl text-center ${
            isDarkMode 
              ? "bg-gray-800 border border-gray-600" 
              : "bg-gray-50 border border-gray-300"
          }`}>
            <h3 className="text-lg font-semibold mb-3 text-[#5a2328]">Want to Learn More?</h3>
            <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Explore the latest research on {cell.name.toLowerCase()} and related cell types
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button 
                onClick={() => window.open(`https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(cell.name)}`, '_blank')}
                className="px-4 py-2 bg-[#5a2328] hover:bg-[#43181c] text-white rounded-lg transition-colors text-sm font-medium"
              >
                Search PubMed for {cell.name}
              </button>
              <button 
                onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(cell.name + ' cell biology research')}`, '_blank')}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Search Web for {cell.name}
              </button>
              <button 
                onClick={() => navigate(`/group/${cell.group?.toLowerCase()}`)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                View {cell.group} Cell Group
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chatbot Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <div className="relative group">
          {/* Tagline Popup */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block">
            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap border border-gray-200 dark:border-gray-700">
              Ask me about {cell?.name || 'cells'}! 🧬
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800"></div>
            </div>
          </div>
          
          {/* Chatbot Button */}
          <button
            onClick={() => {
              console.log('CellAI button clicked');
              setShowCellAI(true);
            }}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group-hover:scale-110 hover:shadow-xl chatbot-float chatbot-pulse"
            title="Cell-AI Chatbot"
          >
            <img 
              src="/icons/ChatAI.png" 
              alt="ChatAI" 
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              onError={(e) => {
                // Fallback to SVG if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="hidden"
            >
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="currentColor"/>
              <circle cx="8" cy="10" r="1" fill="white"/>
              <circle cx="12" cy="10" r="1" fill="white"/>
              <circle cx="16" cy="10" r="1" fill="white"/>
            </svg>
          </button>
        </div>
      </div>

      <CellAI
        onClose={() => setShowCellAI(false)}
        isOpen={showCellAI}
      />
    </div>
  );
};

export default CellPage;


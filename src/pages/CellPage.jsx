import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cellsData from "../data/cells.json";
import { useTheme } from "../contexts/ThemeContext";

const CellPage = () => {
  const { cellName } = useParams();
  const [cell, setCell] = useState(null);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  // Memoize the normalized cell name to prevent recalculation
  const normalizedCellName = useMemo(() => 
    cellName.replace(/-/g, ' ').toLowerCase(), 
    [cellName]
  );

  // Memoize the cell search to prevent recalculation on every render
  const foundCell = useMemo(() => {
    return cellsData.find(c => c.name.toLowerCase() === normalizedCellName);
  }, [normalizedCellName]);

  useEffect(() => {
    setCell(foundCell);
  }, [foundCell]);

  // Memoize event handlers to prevent recreation on every render
  const handleBackClick = useCallback(() => {
    if (cell && cell.group) {
      navigate(`/group/${cell.group.toLowerCase()}`);
    }
  }, [navigate, cell]);

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
        {cell && cell.group && (
          <div className="w-full flex justify-start mt-8 md:mt-8">
            <button
              onClick={handleBackClick}
              className="bg-[#5a2328] hover:bg-[#43181c] text-white font-bold rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#7a3b3f] transition-all duration-200 flex items-center justify-center text-2xl mb-4 ml-2 md:ml-8
                w-11 h-11 md:w-[44px] md:h-[44px]"
              aria-label="Back to Group"
              style={{ minWidth: '2.5rem', minHeight: '2.5rem' }}
            >
              <span className="flex items-center justify-center w-full h-full">&#8592;</span>
            </button>
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4 capitalize text-center">{cell.name}</h1>
        {cell.image && (
          <div className="flex justify-center">
            <img
              src={cell.image}
              alt={cell.name + ' diagram'}
              className="w-96 h-96 md:w-[32rem] md:h-[32rem] object-contain rounded shadow mb-10"
            />
          </div>
        )}
        <div className="max-w-[96rem] space-y-10 px-2 md:px-10 lg:px-20 mx-auto">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Embryonic Origin</h2>
            <p className={`text-lg md:text-xl leading-relaxed ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}>{cell.embryonic_origin || 'Unknown'}</p>
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
            <p className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>{cell.location || 'Unknown'}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Function</h2>
            <p className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>{cell.function || 'Unknown'}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Life Span</h2>
            <p className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>{cell.life_span || 'Unknown'}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Adherent</h2>
            <p className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>{cell.adherent || 'Unknown'}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Effect of Ageing</h2>
            <p className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>{cell.effect_of_ageing || 'Unknown'}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Related Disease</h2>
            <p className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>{cell.related_disease || 'Unknown'}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">History of Evolution</h2>
            <p className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>{cell.history_of_evolution || 'Unknown'}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Relevance to Tissue Development</h2>
            <p className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>{cell.relevance_to_tissue_development || 'Unknown'}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Tissue Engineering Research</h2>
            <p className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>{cell.tissue_engineering_research || 'Unknown'}</p>
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
    </div>
  );
};

export default CellPage;


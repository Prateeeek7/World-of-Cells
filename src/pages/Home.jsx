import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../hooks/useResponsive";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

// Move cellGroups outside component to prevent recreation on every render
const cellGroups = [
  { name: "Epithelial", icon: "icons/epithelial-cell.png" },
  { name: "Muscular", icon: "icons/muscles.png" },
  { name: "Stem & Progenitory", icon: "icons/stem-cells.png" },
  { name: "Nervous & Sensory", icon: "icons/neuron.png" },
  { name: "Secretory & Endocrine", icon: "icons/thyroid.png" },
  { name: "Hematopoietic", icon: "icons/red-blood-cells.png" },
  { name: "Immune", icon: "icons/immune.png" },
  { name: "Connective", icon: "icons/living-tissue.png" },
  { name: "Reproductive", icon: "icons/uterus.png" },
  { name: "Skeletal", icon: "icons/skeleton.png" },
  { name: "Gastrointestinal", icon: "icons/disease.png" },
  { name: "Thoracic", icon: "icons/chest.png" }
];

// Move allCellTypes outside component to prevent recreation on every render
const allCellTypes = [
  // Epithelial
  "Keratinocytes", "Merkel cell","Langerhans cell (skin)","Hair shaft cell","Nail bed basal cell","Corneal epithelial cell","Goblet cell","Enterocyte","Paneth cell","Parietal cell (stomach)","Chief cell (stomach)","Gallbladder epithelial cell","Kidney proximal tubule cell","Kidney distal tubule cell","Urinary bladder epithelial cell","Mesothelial cell","Alveolar type I cell","Alveolar type II cell","Ciliated airway cell","Club cell","Hepatocyte","Cholangiocyte","Collecting duct principal cell","Intercalated cell (kidney)","Oral keratinocyte","Salivary gland acinar cell","Salivary gland duct cell","Urothelial cell","Syncytiotrophoblast","Medullary hair shaft cell","Cortical hair shaft cell","Cuticular hair shaft cell","Cuticular hair root sheath cell","Huxley's layer hair root sheath cell","Henle's layer hair root sheath cell","Inner root sheath cell","Matrix hair follicle cell","Bulge cell (hair follicle stem cell)","Dermal papilla cell","Apocrine gland epithelial cell","Sebocyte","Eccrine gland duct cell","Eccrine gland secretory cell","Odontoblast","Ameloblast","Cementoblast","Periodontal ligament cell","Taste bud cell","Respiratory epithelial cell","Pulmonary neuroendocrine cell","Enteroendocrine cell","Microfold cell (M cell","Intestinal stem cell","Retinal pigment epithelium (RPE) cell","Lens epithelial cell","Lens fiber cell","Corneal endothelial cell","Corneal stromal cell","Olfactory sustentacular cell","Olfactory basal cell",
  // Muscular
  "Skeletal Muscle", "Cardiac Muscle","Rhabdomyoblast", "Smooth Muscle", "Myosatellite","Purkinje fiber","Cardiomyocyte","Smooth muscle cell (vascular)","Smooth muscle cell (visceral)","Smooth muscle cell (iris)","Myoblast","Myocyte","Cardiomyocyte","Myosatellite",
  // Nervous
 "Neuron", "Olfactory receptor neuron", "Taste bud cell", "Retinal ganglion cell", "Purkinje cell (cerebellum)", "Bipolar retinal cell", "Vestibular hair cell", "Proprioceptive neuron", "Nociceptor (pain receptor)", "Thermoreceptor", "Carotid body cell", "GABAergic interneuron", "Glutamatergic neuron", "Motor neuron", "Sensory neuron", "Astrocyte", "Müller cell", "Oligodendrocyte", "Microglia", "Ependymal cell", "Schwann cell", "Satellite glial cell", "Rod cell", "Cone cell", "Inner hair cell", "Outer hair cell", "Amacrine cell",
  // Blood
  "Erythrocyte", "Platelet", "Neutrophil", "Eosinophil", "Basophil", "Monocyte", "Hematopoietic stem cell", "Erythroblast", "Reticulocyte", "Megakaryocyte", "Myeloblast", "Proerythroblast", "Normoblast", "Metamyelocyte", "Promyelocyte","Marginal zone B cell",
  // Stem
  "Embryonic stem cell", "Hematopoietic stem cell", "Mesenchymal stem cell", "Endothelial progenitor cell", "Oligodendrocyte progenitor cell", "Bulge cell (hair follicle)", "Neural stem cell", "Intestinal stem cell", "Epidermal stem cell", "Satellite cell (muscle stem cell)", "Spermatogonial stem cell", "Oogonial stem cell", "Hepatic progenitor cell", "Pancreatic progenitor cell", "Lung progenitor cell","Hemangioblast",
  // Connective
  "Fibroblast", "Adipocyte (white)","Corneal fibroblasts (corneal keratocytes)", "Adipocyte (brown)", "Chondrocyte", "Osteoblast", "Osteocyte", "Preadipocyte", "Podocyte", "Stromal cell", "Myofibroblast", "Chondroprogenitor cell", "Adventitial fibroblast", "Dermal fibroblast", "Tendon fibroblast", "Ligament fibroblast", "Synovial fibroblast",
  // Secretory
  "Pancreatic beta cell", "Pancreatic alpha cell", "Pancreatic delta cell", "Chromaffin cell", "Parafollicular cell", "Pinealocyte", "Gonadotrope", "Somatotrope", "Corticotrope", "Lactotrope", "Thyrotrope", "Juxtaglomerular cell", "Macula densa cell", "Parathyroid chief cell", "Parathyroid oxyphil cell", "Zona glomerulosa cell", "Zona fasciculata cell", "Zona reticularis cell", "Salivary gland acinar cell", "Salivary gland duct cell",
  // Reproductive
  "Spermatozoon", "Oocyte", "Sertoli cell", "Leydig cell", "Granulosa cell", "Theca cell", "Spermatogonium", "Spermatocyte", "Spermatid", "Oogonium",
  // Skeletal
  "Osteoblast", "Osteocyte", "Chondrocyte", "Osteoprogenitor cell", "Bone lining cell", "Osteoclast", "Chondroclast", "Osteochondroprogenitor Cell",
  //thoracic
  "Pneumocyte type I", "Pneumocyte type II", "Pulmonary neuroendocrine cell", "Club cell", "Ciliated airway cell", "Goblet cell (respiratory)", "Bronchial epithelial cell", "Alveolar macrophage", "Pulmonary endothelial cell", "Tracheal epithelial cell",
  //immune
  "Macrophage", "Dendritic cell", "B cell", "Plasma cell", "CD4+ T cell", "CD8+ T cell", "Regulatory T cell", "Natural killer (NK) cell", "Mast cell", "Microglia", "Kupffer cell", "Langerhans cell", "Follicular dendritic cell", "Gamma-delta T cell", "MAIT cell", "Innate lymphoid cell (ILC1/2/3)", "Tissue-resident memory T cell", "Effector memory T cell", "Plasmacytoid dendritic cell", "Marginal zone B cell", "Memory B cell", "Naive B cell", "CX3CR1+ monocyte", "Ly6C+ monocyte", "Immature dendritic cell", "Decidual NK cell", "T follicular helper (Tfh) cell", "CXCR5+ T cell", "CCR7+ T cell", "Hofbauer cell", "Alveolar macrophage", "Peritoneal macrophage", "Osteoclast", "Mesangial cell (immune function)", "Pericyte (immune modulation)", "Myeloid-derived suppressor cell (MDSC)",
//Gastroinstinal
"Enteroendocrine cell", "Tuft cell", "Enterochromaffin cell", "Gastric parietal cell", "Gastric chief cell", "Intestinal stem cell", "Paneth-like cell", "Gastric chief cell", "Gastric parietal cell", "Enterochromaffin cell", "Goblet cell (intestinal)", "Cholecystocyte",
];

// Custom hook for debounced search
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Home = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hideLogo, setHideLogo] = useState(false);

  // Use custom responsive hook instead of inline window.innerWidth checks
  const { isMobile, isSmallScreen, isMediumScreen } = useResponsive();
  const { isDarkMode } = useTheme();

  // Debounce search input to reduce unnecessary filtering
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  // Memoize search results to prevent recalculation on every render
  const searchResults = useMemo(() => {
    if (debouncedSearch.trim() === "") {
      return [];
    }
    
    const searchLower = debouncedSearch.toLowerCase();
    const groupMatches = cellGroups
      .filter(g => g.name.toLowerCase().includes(searchLower))
      .map(g => ({ type: "group", name: g.name }));
    
    const cellMatches = allCellTypes
      .filter(c => c.toLowerCase().includes(searchLower))
      .map(c => ({ type: "cell", name: c }));
    
    return [...groupMatches, ...cellMatches];
  }, [debouncedSearch]);

  // Update results when search results change
  useEffect(() => {
    setResults(searchResults);
    setShowDropdown(searchResults.length > 0);
  }, [searchResults]);

  // Memoize event handlers to prevent recreation on every render
  const handleResultClick = useCallback((result) => {
    setShowDropdown(false);
    setSearch("");
    if (result.type === "group") {
      navigate(`/group/${result.name.toLowerCase()}`);
    } else if (result.type === "cell") {
      navigate(`/cell/${result.name.toLowerCase().replace(/\s+/g, '-')}`);
    }
  }, [navigate]);

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleSearchFocus = useCallback(() => {
    if (search && results.length > 0) {
      setShowDropdown(true);
    }
  }, [search, results.length]);

  const handleSearchBlur = useCallback(() => {
    setTimeout(() => setShowDropdown(false), 150);
  }, []);

  const handleGroupClick = useCallback((groupName) => {
    navigate(`/group/${groupName.toLowerCase()}`);
  }, [navigate]);

  const handleHumanCellClick = useCallback(() => {
    navigate('/human-cell');
  }, [navigate]);

  // Memoize scroll handler
  const handleScroll = useCallback(() => {
    if (isMobile) {
      setHideLogo(window.scrollY > 40);
    } else {
      setHideLogo(false);
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden relative">
      {/* Background Video & Logo */}
      <div
        className={`absolute z-50 transition-opacity duration-500 ${
          hideLogo ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        id="logo-header"
        style={{
          top: isMobile ? "20px" : "40px",
          left: isMobile ? "20px" : "40px",
        }}
      >
        <div className={`flex items-center gap-3 ${isMobile ? "flex-row" : "flex-col"}`}>
          <img
            src="/images/logo.png"
            alt="World of Cells Logo"
            className={isMobile ? "w-20 h-12" : "w-32 h-24"}
          />
          {!isMobile && (
            <span className="font-semibold text-lg text-white text-center">World of Cells</span>
          )}
        </div>
      </div>

      {/* Theme Toggle Button */}
      <div 
        className="absolute z-50 transition-opacity duration-500"
        style={{
          top: isMobile ? "20px" : "40px",
          right: isMobile ? "20px" : "40px",
        }}
      >
        <ThemeToggle />
      </div>

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
          objectFit: "cover",
          objectPosition: "center",
          ...(isMobile
            ? { height: "100dvh", width: "100vw" }
            : {}),
        }}
      >
        <source src="/85064-587646864_medium.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Page-wide semi-transparent overlay */}
      <div className={`fixed inset-0 w-full h-full z-0 pointer-events-none ${
        isDarkMode ? "bg-gray-900/80" : "bg-gray-100/80"
      }`} />
      
      {/* Search Bar */}
      <div className="relative z-30 w-full flex justify-center pt-8 pb-2">
        <div
          className="w-full max-w-xs sm:max-w-xl relative"
          style={{
            marginLeft: isMobile ? "80px" : undefined,
          }}
        >
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search cell groups or cell types..."
            className={`w-full rounded-xl px-4 py-2 sm:px-5 sm:py-3 text-base sm:text-lg shadow focus:outline-none focus:ring-2 focus:ring-[#5a2328] border transition-colors ${
              isDarkMode 
                ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600" 
                : "bg-white text-gray-900 placeholder-gray-500 border-gray-200"
            }`}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          {showDropdown && results.length > 0 && (
            <div className={`absolute left-0 right-0 mt-2 rounded-xl shadow-lg border max-h-48 overflow-y-auto z-40 ${
              isDarkMode 
                ? "bg-gray-800 border-gray-600" 
                : "bg-white border-gray-200"
            }`}>
              {results.slice(0, 8).map((result, idx) => (
                <div
                  key={result.type + result.name + idx}
                  className={`px-4 py-2 cursor-pointer text-sm flex items-center gap-2 transition-colors border-b last:border-b-0 ${
                    isDarkMode 
                      ? "text-gray-200 hover:bg-gray-700 border-gray-600" 
                      : "text-gray-800 hover:bg-gray-100 border-gray-200"
                  }`}
                  onMouseDown={() => handleResultClick(result)}
                >
                  <span className="font-semibold text-[#5a2328] text-xs">{result.type === "group" ? "Group" : "Cell"}</span>
                  <span className="truncate">{result.name}</span>
                </div>
              ))}
              {results.length > 8 && (
                <div className={`px-4 py-2 text-xs text-center ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}>
                  +{results.length - 8} more results
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <main className="flex-grow">
        {/* Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-4 drop-shadow-lg">
            Welcome to the World of Cells – <br /> the Building Blocks of Life
          </h1>
          <p className="max-w-xl text-center text-base sm:text-lg md:text-2xl mb-16 drop-shadow-md">
            Explore the fascinating structure and diversity of human cells. Dive into the microscopic world that forms the foundation of all living beings, and discover the unique roles each cell group plays in the body.
          </p>
          {/* Centered Scroll Down Animation */}
          <div className="absolute left-1/2 bottom-10 -translate-x-1/2 flex justify-center w-full pointer-events-none">
            <span className="text-2xl animate-bounce">↓ Scroll Down</span>
          </div>
        </div>
        
        {/* Human Cell Intro Section */}
        <div className={`relative z-20 w-full flex flex-col items-center justify-center py-20 ${
          isDarkMode ? "bg-gray-900/95" : "bg-gray-100/95"
        }`}>
          <button
            onClick={handleHumanCellClick}
            className={`flex flex-col md:flex-row items-center gap-8 rounded-2xl shadow-lg px-6 sm:px-10 py-10 sm:py-12 md:py-16 mb-8 max-w-6xl w-full border transition-colors ${
              isDarkMode 
                ? "bg-gray-800 hover:bg-gray-700 border-gray-700" 
                : "bg-white hover:bg-gray-50 border-gray-300"
            }`}
          >
            <img
              src="/images/learn-more-cell.png"
              alt="Human Cell Diagram"
              className={`w-32 h-20 sm:w-40 sm:h-28 md:w-64 md:h-64 object-contain rounded-xl border ${
                isDarkMode 
                  ? "bg-gray-700 border-gray-600" 
                  : "bg-gray-100 border-gray-300"
              }`}
            />
            <div className="flex-1 text-left">
              <h2 className={`text-2xl md:text-4xl font-extrabold mb-4 tracking-wide uppercase drop-shadow-lg ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>Human Cells</h2>
              <p className={`text-base md:text-lg leading-relaxed mb-2 ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}>
                Discover the structure and function of human cells, the building blocks of life. Click to explore a detailed diagram and learn about the organelles and processes that keep our bodies alive.
              </p>
              <span className="inline-block mt-2 px-4 py-2 bg-[#5a2328] hover:bg-[#43181c] rounded-lg text-white font-semibold text-base transition-colors">Learn More</span>
            </div>
          </button>
        </div>
        
        {/* Scroll Down Section */}
        <div className={`relative z-20 min-h-screen flex flex-col items-center justify-center px-2 sm:px-6 ${
          isDarkMode ? "bg-gray-900/95" : "bg-gray-100/95"
        }`}>
          <h2 className={`text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-wide mb-8 drop-shadow-lg font-sans uppercase ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>Cell Groups</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl mt-4 mb-8">
            {cellGroups.map((group) => (
              <button
                key={group.name}
                onClick={() => handleGroupClick(group.name)}
                className="group w-full flex items-center justify-center gap-3 sm:gap-4 bg-[#5a2328] text-white rounded-2xl shadow-lg hover:bg-[#43181c] active:bg-[#2e0d10] focus:outline-none focus:ring-2 focus:ring-[#7a3b3f] transition-all duration-200 text-lg sm:text-xl font-semibold m-1 min-w-[140px] min-h-[56px] sm:min-w-[160px] sm:min-h-[64px] px-3 sm:px-4 py-2 sm:py-3"
              >
                <img src={group.icon} alt={group.name + ' icon'} className="w-10 h-10 sm:w-12 sm:h-12 object-contain flex-shrink-0 drop-shadow group-hover:scale-110 group-active:scale-95 transition-transform duration-200" />
                <span className="truncate">{group.name}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className={`w-full py-8 flex flex-col md:flex-row justify-between items-center text-center text-base md:text-lg font-medium border-t z-50 relative px-6 ${
        isDarkMode 
          ? "bg-gray-900 text-gray-200 border-gray-800" 
          : "bg-gray-100 text-gray-700 border-gray-300"
      }`}>
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <img src="/images/logo.png" alt="World of Cells Logo" className="w-14 h-10 mr-1" />
          <span className="font-semibold text-lg">World of Cells</span>
        </div>
        <div className="text-sm md:text-base">
          © {new Date().getFullYear()} World of Cells. All rights reserved.
        </div>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a
            href="https://github.com/Prateeeek7"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:pratik2002singh@gmail.com"
            className="hover:underline transition-colors"
          >
            Contact Owner
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home; 
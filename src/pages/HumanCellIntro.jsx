import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const HumanCellIntro = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Memoize event handler to prevent recreation on every render
  const handleBackClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={`relative min-h-[100dvh] min-h-screen flex flex-col md:flex-row items-center justify-center px-5 sm:px-4 md:px-8 py-8 sm:py-10 md:py-12 overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border-[8px] sm:border-[6px] md:border-[14px] border-[#5a2328] ${
      isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
    }`}>
      {/* Left: Diagram (now a GIF) */}
      <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0 bg-transparent relative">
        <img
          src="/cell-placeholder.gif"
          alt="Human Cell Diagram"
          className="w-48 h-48 sm:w-72 sm:h-72 md:w-[32rem] md:h-[32rem] object-cover bg-transparent"
          style={{ background: "transparent" }}
        />
      </div>
      {/* Right: Description */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start md:pl-12 md:pr-20 px-1 sm:px-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 sm:mb-6 tracking-wide uppercase drop-shadow-lg">Human Cells</h1>
        <p className={`text-base sm:text-lg md:text-xl leading-relaxed ${
          isDarkMode ? "text-gray-200" : "text-gray-700"
        }`}>
          Human cells are the fundamental structural and functional units of the human body. Each cell is a complex, self-sustaining system, containing specialized organelles that perform vital tasks such as energy production, waste removal, and genetic information storage. The plasma membrane surrounds the cell, regulating the movement of substances in and out, while the nucleus houses DNA and controls cellular activities. Organelles like mitochondria, endoplasmic reticulum, Golgi apparatus, and lysosomes work together to maintain cellular health and function. Human cells come in a remarkable variety of shapes and sizes, each adapted to specific roles—ranging from transmitting nerve impulses to contracting muscles or defending against pathogens. Understanding the structure and function of human cells is essential to comprehending how the body grows, heals, and responds to its environment.
          <br />
          <br/>
          <strong>There are over 200 different types of cells in the human body, each with a unique structure and function.</strong>
        <br />
          <br/> 
          <br />
          <br/>
        </p>
      </div>
      {/* Back Button: bottom left */}
      <button
        onClick={handleBackClick}
       className="absolute left-6 bottom-3 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#5a2328] hover:bg-[#43181c] active:bg-[#2e0d10] flex items-center justify-center shadow-lg transition-colors duration-200"

        aria-label="Go Back"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="white" className="w-6 h-6 sm:w-7 sm:h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
    </div>
  );
};

export default HumanCellIntro; 
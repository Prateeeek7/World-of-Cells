import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const words = [
    { text: "World of Cells", language: "English" },
    { text: "कोशिकाओं की दुनिया", language: "Hindi" },
    { text: "కణాల ప్రపంచం", language: "Telugu" },
    { text: "உயிரணுக்களின் உலகம்", language: "Tamil" },
    { text: "কোষের জগৎ", language: "Bengali" },
    { text: "पेशींचा जग", language: "Marathi" }
  ];

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => {
        const nextIndex = prev + 1;
        // Stop at the last language, don't repeat
        return nextIndex >= words.length ? prev : nextIndex;
      });
    }, 1333); // 8 seconds ÷ 6 languages = ~1.33 seconds per language

    const preloaderTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 1000);
    }, 8000);

    return () => {
      clearInterval(wordInterval);
      clearTimeout(preloaderTimer);
    };
  }, [words.length, onComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 1, ease: "easeInOut" }
    }
  };

  const textVariants = {
    hidden: { 
      y: 100, 
      opacity: 0,
      rotateX: 90
    },
    visible: { 
      y: 0, 
      opacity: 1,
      rotateX: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      y: -100, 
      opacity: 0,
      rotateX: -90,
      transition: { 
        duration: 0.6, 
        ease: "easeInOut" 
      }
    }
  };

  const languageVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      scale: 0.8,
      transition: { 
        duration: 0.4, 
        ease: "easeIn" 
      }
    }
  };

  const progressVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: { 
        duration: 6.5, 
        ease: "easeInOut",
        delay: 0.5
      }
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(147,51,234,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(34,197,94,0.1),transparent_50%)]"></div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center w-full px-4 sm:px-6 md:px-8">
            {/* Logo */}
            <motion.div
              className="mb-4 sm:mb-6 md:mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <img
                src="/images/logo.png"
                alt="World of Cells Logo"
                className="w-32 h-20 xs:w-40 xs:h-24 sm:w-48 sm:h-32 md:w-64 md:h-40 lg:w-80 lg:h-48 mx-auto object-contain"
              />
            </motion.div>

            {/* Main Text */}
            <div className="relative h-20 sm:h-24 md:h-28 lg:h-32 overflow-hidden w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWordIndex}
                  className="absolute inset-0 flex flex-col items-center justify-center w-full px-2"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-1 sm:mb-2 tracking-wide text-center break-words hyphens-auto max-w-full leading-tight">
                    {words[currentWordIndex].text}
                  </h1>
                  <motion.span
                    className="text-xs xs:text-sm sm:text-sm md:text-base text-blue-300 font-medium tracking-widest uppercase"
                    variants={languageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {words[currentWordIndex].language}
                  </motion.span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 w-48 sm:w-56 md:w-64 lg:w-72 h-0.5 sm:h-1 bg-gray-700 rounded-full overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full origin-left"
                variants={progressVariants}
                initial="hidden"
                animate="visible"
              />
            </div>

            {/* Loading Dots */}
            <div className="flex justify-center space-x-1 sm:space-x-2 mt-4 sm:mt-6 md:mt-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full"
                  variants={dotVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={i}
                />
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              className="mt-3 sm:mt-4 md:mt-6 text-gray-300 text-xs xs:text-sm sm:text-sm md:text-base font-light tracking-wide px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              Exploring the microscopic universe
            </motion.p>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full opacity-20"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

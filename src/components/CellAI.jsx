import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const CellAI = ({ isOpen, onClose }) => {
  console.log('CellAI component rendered, isOpen:', isOpen);
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm Cell-AI, your biology assistant. I can help you with questions about cells, anatomy, physiology, and biology. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isBiologyRelated = (text) => {
    const biologyKeywords = [
      'cell', 'cells', 'biology', 'biological', 'anatomy', 'physiology', 'tissue', 'organ', 'organism',
      'dna', 'rna', 'protein', 'enzyme', 'metabolism', 'respiration', 'photosynthesis', 'mitosis', 'meiosis',
      'nucleus', 'cytoplasm', 'membrane', 'mitochondria', 'ribosome', 'endoplasmic reticulum', 'golgi',
      'lysosome', 'vacuole', 'chloroplast', 'cell wall', 'chromosome', 'gene', 'allele', 'genotype', 'phenotype',
      'evolution', 'adaptation', 'ecosystem', 'habitat', 'species', 'classification', 'taxonomy', 'phylogeny',
      'digestive', 'circulatory', 'respiratory', 'nervous', 'endocrine', 'immune', 'reproductive', 'skeletal',
      'muscular', 'integumentary', 'urinary', 'lymphatic', 'cardiovascular', 'pulmonary', 'neural', 'hormone',
      'antibody', 'antigen', 'pathogen', 'bacteria', 'virus', 'fungus', 'parasite', 'infection', 'disease',
      'symptom', 'diagnosis', 'treatment', 'therapy', 'medicine', 'pharmaceutical', 'drug', 'vaccine',
      'biochemistry', 'molecular biology', 'cell biology', 'developmental biology', 'genetics', 'immunology',
      'microbiology', 'botany', 'zoology', 'human biology', 'plant biology', 'animal biology', 'hello', 'hi', 'test'
    ];
    
    const textLower = text.toLowerCase();
    console.log('Checking biology keywords for:', textLower);
    const isRelated = biologyKeywords.some(keyword => textLower.includes(keyword));
    console.log('Is biology related:', isRelated);
    return isRelated;
  };

  const sendMessage = async () => {
    console.log('sendMessage called, input:', input, 'isLoading:', isLoading);
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      console.log('Sending message:', userMessage.content);
      // Check if the question is biology-related
      if (!isBiologyRelated(userMessage.content)) {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: "I'm specialized in biology and cell-related topics. Please ask me questions about cells, anatomy, physiology, or any biological concepts. I'd be happy to help with those!",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        return;
      }

      const requestBody = {
        model: 'openai/gpt-oss-20b',
        messages: [
          {
            role: 'user',
            content: userMessage.content
          }
        ]
      };
      
      console.log('Request body:', JSON.stringify(requestBody, null, 2));
      console.log('API Key (first 10 chars):', process.env.REACT_APP_GROQ_API_KEY?.substring(0, 10) || 'Not set');
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        console.error('Response status:', response.status);
        console.error('Response statusText:', response.statusText);
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      const botResponse = data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.';

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Error calling Grok API:', err);
      console.error('Error details:', err.message);
      setError(`Sorry, I encountered an error: ${err.message}`);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: `I apologize, but I'm having trouble connecting right now. Error: ${err.message}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Hello! I'm Cell-AI, your biology assistant. I can help you with questions about cells, anatomy, physiology, and biology. What would you like to know?",
        timestamp: new Date()
      }
    ]);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className={`w-full max-w-4xl h-[90vh] sm:h-[80vh] rounded-2xl shadow-2xl flex flex-col ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 sm:p-6 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <img
              src="/icons/ChatAI.png"
              alt="ChatAI"
              className="w-10 h-10 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <svg
              width="40"
              height="40"
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
            <div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Cell-AI
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Your Biology Assistant
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              Clear Chat
            </button>
            <button
              onClick={onClose}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
                message.type === 'user'
                  ? `bg-blue-600 text-white`
                  : isDarkMode
                    ? 'bg-gray-800 text-gray-100'
                    : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="prose prose-sm max-w-none prose-headings:text-current prose-p:text-current prose-strong:text-current prose-code:text-current prose-pre:text-current prose-blockquote:text-current prose-li:text-current">
                  {message.type === 'bot' ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                      components={{
                        h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-current">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-base font-semibold mb-2 text-current">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 text-current">{children}</h3>,
                        p: ({ children }) => <p className="mb-2 text-current">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1 text-current">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1 text-current">{children}</ol>,
                        li: ({ children }) => <li className="text-current">{children}</li>,
                        code: ({ children }) => <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm text-current">{children}</code>,
                        pre: ({ children }) => <pre className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-sm overflow-x-auto text-current">{children}</pre>,
                        blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-current">{children}</blockquote>,
                        table: ({ children }) => <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-current">{children}</table>,
                        th: ({ children }) => <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-current">{children}</th>,
                        td: ({ children }) => <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-current">{children}</td>,
                        strong: ({ children }) => <strong className="font-semibold text-current">{children}</strong>,
                        em: ({ children }) => <em className="italic text-current">{children}</em>,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  )}
                </div>
                <div className={`text-xs mt-2 ${
                  message.type === 'user' 
                    ? 'text-blue-100' 
                    : isDarkMode 
                      ? 'text-gray-400' 
                      : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm">Cell-AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-6 py-2">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        )}

        {/* Input */}
        <div className={`p-4 sm:p-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about biology, cells, or anatomy..."
              className={`flex-1 resize-none rounded-xl px-3 py-2 sm:px-4 sm:py-3 border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                isDarkMode
                  ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600'
                  : 'bg-white text-gray-900 placeholder-gray-500 border-gray-200'
              }`}
              rows="2"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-medium transition-colors text-sm sm:text-base ${
                !input.trim() || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                </svg>
              )}
            </button>
          </div>
          <p className={`text-xs mt-2 text-center ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default CellAI;

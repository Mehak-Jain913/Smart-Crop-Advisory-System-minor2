import { useState } from 'react';
import { Accessibility, Type, Volume2, Contrast, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export const A11yPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { fontSize, setFontSize, highContrast, toggleHighContrast } = useStore();

  const handleVoiceRead = () => {
    const utterance = new SpeechSynthesisUtterance("Accessibility voice output activated.");
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60"
            />
            {/* Modal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-[90%] max-w-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 z-[101] flex flex-col overflow-hidden max-h-[90vh]"
            >
              <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-3 text-lg">
                  <Accessibility className="text-green-600" size={20} /> 
                  Accessibility Options
                </h3>
                <button 
                  aria-label="Close" 
                  onClick={() => setIsOpen(false)} 
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white p-1.5 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="space-y-6 overflow-y-auto">
                {/* Text Size */}
                <div>
                  <p className="text-xs font-bold mb-3 text-gray-500 dark:text-gray-400 uppercase">Adjust Font Size</p>
                  <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden p-1 gap-1 border border-gray-200 dark:border-gray-700">
                    {['normal', 'large', 'x-large'].map((size, idx) => (
                      <button 
                        key={size}
                        aria-label={`Set text size to ${size}`}
                        onClick={() => setFontSize(size)}
                        className={`flex-1 py-2 flex justify-center items-center rounded-md transition-all ${fontSize === size ? 'bg-white dark:bg-gray-700 shadow-sm text-green-600 font-bold' : 'hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'}`}
                      >
                        <Type size={16 + (idx * 4)} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* High Contrast */}
                <div>
                  <p className="text-xs font-bold mb-3 text-gray-500 dark:text-gray-400 uppercase">Display Profiles</p>
                  <button 
                    aria-label="Toggle High Contrast"
                    onClick={toggleHighContrast}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${highContrast ? 'bg-green-50 dark:bg-green-900/30 border-green-600 text-green-600 dark:text-green-400' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:border-green-600'}`}
                  >
                    <span className="font-semibold text-sm">High Contrast Mode</span>
                    <Contrast size={18} className={highContrast ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'} />
                  </button>
                </div>

                {/* Voice Read UI */}
                <div>
                  <p className="text-xs font-bold mb-3 text-gray-500 dark:text-gray-400 uppercase">Screen Reader</p>
                  <button 
                    aria-label="Read page aloud"
                    onClick={handleVoiceRead}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:border-green-600 transition-all group"
                  >
                    <span className="font-semibold text-sm">Read Aloud</span>
                    <Volume2 size={18} className="text-green-600 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <button 
        aria-label="Accessibility Options"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[90] w-12 h-12 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-green-600/50"
      >
        <Accessibility size={24} />
      </button>
    </>
  );
};

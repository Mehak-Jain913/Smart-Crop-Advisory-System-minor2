import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sun, Moon, Bell, Menu, Languages, CheckCircle2, AlertTriangle, Info, Search } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation, useLanguage } from '../hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { theme, toggleTheme, toggleSidebar } = useStore();
  const { lang, setLang } = useLanguage();
  const t = useTranslation();
  
  const [showLang, setShowLang] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const navLinks = [
    { key: 'dashboard', path: '/dashboard' },
    { key: 'weather', path: '/weather' },
    { key: 'market', path: '/market' },
    { key: 'recommend', path: '/recommend' },
    { key: 'chatbot', path: '/chatbot' },
    { key: 'pesticide', path: '/pesticide' },
    { key: 'schedule', path: '/schedule' }
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-white text-gray-900 dark:bg-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-4 lg:px-8 shadow-sm flex-shrink-0">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="xl:hidden p-2 mr-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-white">
          <Menu size={20} className="text-gray-800 dark:text-white" />
        </button>
        <Link to="/" className="flex items-center space-x-2 mr-8 group">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-primary-foreground font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
            SmartCrop
          </span>
        </Link>
        
        {/* Top Navigation Links */}
        <ul className="hidden xl:flex items-center space-x-6 text-sm font-semibold">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink 
                to={link.path} 
                className={({ isActive }) => 
                  `transition-colors duration-200 ${isActive ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-muted-foreground hover:text-primary'}`
                }
              >
                {t[link.key] || link.key}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-4 relative">
        
        {/* Search Bar */}
        <div className="hidden md:flex items-center relative mr-2">
          <input 
            type="text" 
            placeholder={t.searchPlaceholder || "Search..."}
            className="w-48 lg:w-64 pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-600/50 transition-all shadow-inner hover:shadow-md border border-gray-300 text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
          />
          <Search size={16} className="absolute left-3.5 text-gray-800 dark:text-white" />
        </div>

        {/* Language Selector */}
        <div className="relative">
          <button 
            onClick={() => { setShowLang(!showLang); setShowNotif(false); }}
            className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-white"
          >
            <Languages size={20} className="text-gray-800 dark:text-white" />
            <span className="text-sm font-medium hidden sm:block">{lang === 'hi' ? 'हिंदी' : 'EN'}</span>
          </button>
          
          <AnimatePresence>
            {showLang && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl rounded-xl overflow-hidden py-1 z-50"
              >
                <button onClick={() => {setLang('en'); setShowLang(false);}} className={`w-full text-left px-5 py-2.5 hover:bg-secondary text-sm transition-colors ${lang === 'en' ? 'text-primary font-bold bg-primary/5' : 'text-foreground'}`}>English</button>
                <button onClick={() => {setLang('hi'); setShowLang(false);}} className={`w-full text-left px-5 py-2.5 hover:bg-secondary text-sm transition-colors ${lang === 'hi' ? 'text-primary font-bold bg-primary/5' : 'text-foreground'}`}>हिंदी</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <div>
          <button 
            onClick={() => { setShowNotif(!showNotif); setShowLang(false); }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative text-gray-800 dark:text-white"
          >
            <Bell size={20} className="text-gray-800 dark:text-white" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-background rounded-full animate-pulse"></span>
          </button>

          <AnimatePresence>
            {showNotif && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-4 top-16 w-80 sm:w-96 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl z-50 overflow-hidden flex flex-col max-h-96"
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
                  <h3 className="font-bold text-foreground">{t.notifications || "Notifications"}</h3>
                  <span className="text-xs text-primary-foreground font-semibold bg-primary px-2.5 py-0.5 rounded-full shadow-sm">3 New</span>
                </div>
                <div className="overflow-y-auto flex-1 hidden-scrollbar pb-2">
                  
                  {/* Success - Green */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors flex gap-3 group">
                    <div className="mt-0.5 flex-shrink-0 bg-green-500/10 p-2 rounded-full h-fit group-hover:scale-110 transition-transform">
                      <CheckCircle2 size={18} className="text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground font-semibold mb-0.5">Payment Successful</p>
                      <p className="text-sm text-muted-foreground leading-snug">PM-Kisan installment of ₹2000 has been credited.</p>
                      <p className="text-xs text-muted-foreground/60 mt-1.5 font-medium">10 mins ago</p>
                    </div>
                  </div>

                  {/* Error - Red */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors flex gap-3 group">
                    <div className="mt-0.5 flex-shrink-0 bg-red-500/10 p-2 rounded-full h-fit group-hover:scale-110 transition-transform">
                      <AlertTriangle size={18} className="text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground font-semibold mb-0.5">Pest Warning</p>
                      <p className="text-sm text-muted-foreground leading-snug">High risk of Fall Armyworm detected in Maize crops nearby.</p>
                      <p className="text-xs text-muted-foreground/60 mt-1.5 font-medium">1 hour ago</p>
                    </div>
                  </div>

                  {/* Info - Blue */}
                  <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors flex gap-3 group mb-2">
                    <div className="mt-0.5 flex-shrink-0 bg-blue-500/10 p-2 rounded-full h-fit group-hover:scale-110 transition-transform">
                      <Info size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground font-semibold mb-0.5">Weather Update</p>
                      <p className="text-sm text-muted-foreground leading-snug">Heavy rain expected tomorrow. Delay harvesting.</p>
                      <p className="text-xs text-muted-foreground/60 mt-1.5 font-medium">2 hours ago</p>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-white"
        >
          {theme === 'dark' ? <Moon size={20} className="text-gray-800 dark:text-white" /> : <Sun size={20} className="text-gray-800 dark:text-white" />}
        </button>
        
        {/* User Profile Outline */}
        <Link to="/profile" className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 ml-2 border-2 border-background shadow-md cursor-pointer hidden sm:block hover:scale-105 transition-transform"></Link>
      </div>
    </nav>
  );
};

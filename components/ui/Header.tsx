import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Settings, Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  notifications: React.ReactNode;
  hasNewAlert: boolean;
  toggleNotification: () => void;
}

export default function Header({ notifications, hasNewAlert, toggleNotification }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
    toggleNotification();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b transition-all duration-300 hover:shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Menu Section */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-500 transition-transform duration-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-500 transition-transform duration-300" />
              )}
            </motion.button>
            
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent 
                        hover:from-indigo-600 hover:to-blue-600 transition-all duration-300"
            >
              Emergency Dashboard
            </motion.h1>
          </div>

          {/* Search Section */}
          <div className="hidden lg:flex flex-1 justify-center px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`relative w-96 transform transition-all duration-300 ${
                isSearchFocused ? 'scale-105' : ''
              }`}
            >
              <Search className={`absolute left-3 top-2.5 h-5 w-5 transition-colors duration-300 ${
                isSearchFocused ? 'text-blue-500' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search emergencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50/50 backdrop-blur-sm border rounded-lg 
                         transition-all duration-300 ease-in-out
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </motion.div>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                onClick={handleNotificationClick}
              >
                <Bell className="h-6 w-6 text-gray-600" />
                <AnimatePresence>
                  {hasNewAlert && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white 
                               animate-pulse"
                    />
                  )}
                </AnimatePresence>
              </motion.button>
              
              <AnimatePresence>
                {showNotification && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50 border"
                  >
                    {notifications}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
            >
              <Settings className="h-6 w-6 text-gray-600" />
            </motion.button>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 
                        flex items-center justify-center cursor-pointer"
            >
              <span className="text-sm font-medium text-white">DR</span>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}
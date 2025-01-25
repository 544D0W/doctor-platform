import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TextAnimate } from './text-animate';

interface HeaderProps {
  notifications: React.ReactNode;
  hasNewAlert: boolean;
  toggleNotification: () => void;
  doctorName: string;
}

const HeaderTitle = memo(() => (
  <TextAnimate 
    by="character"
    animation="blurInDown"
    className="text-3xl font-bold text-blue-500"
    startOnView={false}
    once={true}
  >
    Emergency Dashboard
  </TextAnimate>
));

HeaderTitle.displayName = 'HeaderTitle';

export default function Header({ notifications, hasNewAlert, toggleNotification, doctorName }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();

  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
    setShowUserMenu(false);
    toggleNotification();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b transition-all duration-300 hover:shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
        <HeaderTitle />

          {/* Search Section */}
          <div className="flex-1 max-w-xl mx-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`relative transform transition-all duration-300 ${
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
                      className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white animate-pulse"
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
            
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotification(false);
                }}
                className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 
                          flex items-center justify-center cursor-pointer"
              >
                <span className="text-sm font-medium text-white">DR</span>
              </motion.div>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border py-1"
                  >
                    <div className="px-4 py-2 text-sm text-gray-900 border-b">
                      {doctorName}
                    </div>
                    <button
                      onClick={() => router.push('/account')}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      Update Account
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
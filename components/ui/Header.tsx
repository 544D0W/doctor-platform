import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, LogOut, User, UserRound, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TextAnimate } from './text-animate';
import Link from 'next/link';

interface HeaderProps {
  notifications: React.ReactNode;
  hasNewAlert: boolean;
  toggleNotification: () => void;
  doctorName: string;
}

const HeaderTitle = memo(() => (
  <Link href="/dashboard" className="group flex items-center space-x-2">
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-2 
                    shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 
                    transition-all duration-300 mr-2">
      <span className="text-white font-bold text-xl">LL</span>
    </div>
    <TextAnimate 
      by="character"
      animation="blurInDown"
      className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
                 bg-clip-text text-transparent"
      startOnView={false}
      once={true}
    >
      LifeLink.ae
    </TextAnimate>
  </Link>
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
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 
                    transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <HeaderTitle />

          {/* Search Section */}
          <div className="flex-1 max-w-xl mx-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none 
                              transition-all duration-300 ${isSearchFocused ? 'scale-90' : ''}`}>
                <Search className={`h-5 w-5 transition-colors duration-300 
                                  ${isSearchFocused ? 'text-blue-600' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                placeholder="Search emergencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border-gray-200/50 rounded-2xl
                          transition-all duration-300 ease-out placeholder:text-gray-400
                          focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white
                          focus:shadow-lg focus:shadow-blue-500/20"
              />
            </motion.div>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/doctors">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r 
                          from-blue-500/10 to-indigo-500/10 text-blue-600 hover:from-blue-500/20 
                          hover:to-indigo-500/20 transition-all duration-300"
              >
                <UserRound className="w-4 h-4" />
                <span className="text-sm font-medium">Doctors</span>
              </motion.button>
            </Link>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 
                          transition-all duration-300"
                onClick={handleNotificationClick}
              >
                <Bell className="h-5 w-5 text-gray-600" />
                <AnimatePresence>
                  {hasNewAlert && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-0 right-0 block h-3 w-3 rounded-full 
                                bg-red-500 ring-2 ring-white"
                    >
                      <span className="absolute inset-0 rounded-full animate-ping 
                                     bg-red-400 opacity-75" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              
              <AnimatePresence>
                {showNotification && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-96 bg-white rounded-2xl 
                              shadow-xl shadow-gray-200/20 z-50 border border-gray-100 
                              overflow-hidden"
                  >
                    {notifications}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotification(false);
                }}
                className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
                          flex items-center justify-center cursor-pointer shadow-lg 
                          shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300"
              >
                <span className="text-sm font-medium text-white">DR</span>
              </motion.div>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-xl 
                              shadow-gray-200/20 z-50 border border-gray-100 overflow-hidden"
                  >
                    <div className="px-4 py-3 bg-gray-50/50 backdrop-blur-sm">
                      <p className="text-sm font-medium text-gray-900">{doctorName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Emergency Department</p>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={() => router.push('/account')}
                        className="w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 
                                  flex items-center gap-2 transition-colors duration-200"
                      >
                        <Settings className="h-4 w-4" />
                        Account Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 
                                  flex items-center gap-2 transition-colors duration-200"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
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
import { useState } from 'react';
import { Bell, Settings, Search, Menu } from 'lucide-react';

interface HeaderProps {
  notifications: React.ReactNode;
  hasNewAlert: boolean;
  toggleNotification: () => void;
}

export default function Header({ notifications, hasNewAlert, toggleNotification }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
    toggleNotification();
  };

  return (
    <nav className="bg-white border-b transition-all duration-300 hover:shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center group">
            <Menu className="h-6 w-6 text-gray-500 mr-4 lg:hidden hover:rotate-180 transition-transform duration-300" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent 
                          transform transition-transform duration-300 group-hover:scale-105">
              Emergency Dashboard
            </h1>
          </div>

          <div className="hidden lg:flex flex-1 justify-center px-8">
            <div className={`relative w-96 transform transition-all duration-300 ${
              isSearchFocused ? 'scale-105' : ''
            }`}>
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
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg 
                         transition-all duration-300 ease-in-out
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-300 
                           hover:rotate-12 active:rotate-0"
                onClick={handleNotificationClick}
              >
                <Bell className="h-6 w-6 text-gray-600" />
                {hasNewAlert && (
                  <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white 
                                 animate-pulse" />
                )}
              </button>
              {showNotification && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
                  {notifications}
                </div>
              )}
            </div>
            
            <button className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 
                              hover:rotate-90">
              <Settings className="h-6 w-6 text-gray-600" />
            </button>
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center 
                          transform transition-transform duration-300 hover:scale-110">
              <span className="text-sm font-medium text-white">DR</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
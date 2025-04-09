import React from 'react';
import { Bell, Moon, Sun } from 'lucide-react';
import { User } from '../types/user';

interface DashboardHeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: User | null;
  sidebarOpen: boolean;
  membershipType: string;
  getBadgeColor: () => string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  darkMode,
  toggleDarkMode,
  user,
  sidebarOpen,
  membershipType,
  getBadgeColor
}) => {
  return (
    <header className={`sticky top-0 z-40 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm px-6 py-3`}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Home</h1>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Bell className="h-5 w-5" />
          </button>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="relative">
              <img 
                src={user?.photoURL || "https://ui-avatars.com/api/?name=User"}
                alt="Profile" 
                className="h-10 w-10 rounded-full object-cover border-2 border-blue-500"
              />
              <div className="absolute -bottom-1 -right-1">
                <div className={`${getBadgeColor()} text-[10px] px-2 py-0.5 rounded-full text-white font-medium`}>
                  {membershipType}
                </div>
              </div>
            </div>
            {sidebarOpen && (
              <div className="hidden md:block">
                <p className="font-medium">{user?.displayName || "User"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 
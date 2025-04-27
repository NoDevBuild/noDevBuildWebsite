import React from 'react';
import { Menu, Moon, Sun, Bell } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import Avatar from '../common/Avatar';

interface DashboardHeaderProps {
  title: string;
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: any;
  sidebarOpen: boolean;
  membershipType: string;
  getBadgeColor: () => string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  darkMode,
  toggleDarkMode,
  user,
  sidebarOpen,
  membershipType,
  getBadgeColor
}) => {
  const { setSidebarOpen } = useDashboard();

  return (
    <header className={`sticky top-0 z-40 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm px-6 py-3`}>
      <div className="flex items-center justify-between">
        {/* Mobile menu button - leftmost */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold flex-1 md:flex-none">{title}</h1>
        <div className="flex items-center gap-4">
          {/* Notifications */}
          {/* <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button> */}

          {/* Dark mode toggle */}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* User profile */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Avatar 
                name={user?.displayName || "User"}
                size="sm"
                className="border-2 border-blue-500"
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
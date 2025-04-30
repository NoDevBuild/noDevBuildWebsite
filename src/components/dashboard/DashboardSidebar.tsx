import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  User, 
  LogOut, 
  Database, 
  Users, 
  ChevronRight,
  HelpCircle,
  X
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Avatar from '../common/Avatar';
import { authService } from '../../services/authService';
import Tippy from '@tippyjs/react';

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  darkMode?: boolean;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  activeSection,
  setActiveSection,
  darkMode = false
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  
  // Update active section based on current path
  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('/dashboard')) {
      const section = path.split('/dashboard/')[1] || 'dashboard';
      setActiveSection(section);
    }
  }, [location, setActiveSection]);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      {/* Mobile overlay when sidebar is open */}
      {sidebarOpen && (
        <div 
          className={`fixed inset-0 z-40 md:hidden ${darkMode ? 'bg-gray-900/90' : 'bg-black/50'}`}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full 
        ${sidebarOpen ? 'w-64' : 'w-20'} 
        ${darkMode 
          ? 'bg-gray-900' 
          : 'bg-gradient-to-b from-blue-600 via-blue-700 to-purple-800'
        } text-white 
        transition-all duration-300 z-50
        md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Mobile close button */}
        <button 
          onClick={() => setSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 text-white p-1 rounded-full hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>

      <div className={`p-4 flex items-center justify-between ${darkMode ? 'bg-gray-800' : ''}`}>
        {sidebarOpen ? (
          <Link to="/" className="flex items-center">
            <img src="/main_logo.png" alt="NoDevBuild" className="h-10" />
          </Link>
        ) : (
          <div className="mx-auto w-12 flex justify-center">
            <img src="/noDevBuildFavicon.png" alt="Logo" className="h-10 w-10 object-contain" />
          </div>
        )}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white p-1 rounded-full hover:bg-white/10 hidden md:block"
        >
          <ChevronRight className={`h-5 w-5 transform transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="mt-8">
        <nav>
          <ul className="space-y-2 px-2">
            <li>
              <Tippy content="Home" disabled={sidebarOpen} placement="right" theme="light-border" animation="none" arrow={true} delay={[0, 0]} moveTransition="" duration={0} hideOnClick={true} interactive={false} touch={false}>
                <Link 
                  to="/dashboard"
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex items-center gap-3 py-3 rounded-lg transition-colors
                    ${sidebarOpen ? 'justify-start px-4 w-full' : 'justify-center'}
                    ${
                      activeSection === 'dashboard' 
                        ? darkMode 
                          ? 'bg-gray-800 text-gray-100' 
                          : 'bg-white/10 text-white'
                        : darkMode
                          ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <Home className="h-5 w-5" />
                  {sidebarOpen && <span>Home</span>}
                </Link>
              </Tippy>
            </li>
            <li>
              <Tippy content="My Courses" disabled={sidebarOpen} placement="right" theme="light-border" animation="none" arrow={true} delay={[0, 0]} moveTransition="" duration={0} hideOnClick={true} interactive={false} touch={false}>
                <Link 
                  to="/dashboard/my-courses"
                  onClick={() => handleNavClick('my-courses')}
                  className={`flex items-center gap-3 py-3 rounded-lg transition-colors
                    ${sidebarOpen ? 'justify-start px-4 w-full' : 'justify-center'}
                    ${
                      activeSection === 'my-courses'
                        ? darkMode
                          ? 'bg-gray-800 text-gray-100'
                          : 'bg-white/10 text-white'
                        : darkMode
                          ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <BookOpen className="h-5 w-5" />
                  {sidebarOpen && <span>My Courses</span>}
                </Link>
              </Tippy>
            </li>
          </ul>
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="space-y-2">
          <Tippy content="Profile" disabled={sidebarOpen} placement="right" theme="light-border" animation="none" arrow={true} delay={[0, 0]} moveTransition="" duration={0} hideOnClick={true} interactive={false} touch={false}>
            <Link 
              to="/dashboard/profile"
              onClick={() => handleNavClick('profile')}
              className={`flex items-center gap-3 py-3 rounded-lg transition-colors
                ${sidebarOpen ? 'justify-start px-4 w-full' : 'justify-center'}
                ${
                  activeSection === 'profile'
                    ? darkMode
                      ? 'bg-gray-800 text-gray-100'
                      : 'bg-white/10 text-white'
                    : darkMode
                      ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <User className="h-5 w-5" />
              {sidebarOpen && <span>Profile</span>}
            </Link>
          </Tippy>

          <Tippy content="Logout" disabled={sidebarOpen} placement="right" theme="light-border" animation="none" arrow={true} delay={[0, 0]} moveTransition="" duration={0} hideOnClick={true} interactive={false} touch={false}>
            <button 
              onClick={handleLogout}
              className={`flex items-center gap-3 py-3 rounded-lg transition-colors
                ${sidebarOpen ? 'justify-start px-4 w-full' : 'justify-center w-12 mx-auto'}
                ${
                  darkMode
                    ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <LogOut className="h-5 w-5" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </Tippy>

          <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-white/20'} my-4`}></div>

          <Tippy content={user?.displayName || "User"} disabled={sidebarOpen} placement="right" theme="light-border" animation="none" arrow={true} delay={[0, 0]} moveTransition="" duration={0} hideOnClick={true} interactive={false} touch={false}>
            <Link 
              to="/dashboard/profile"
              onClick={() => handleNavClick('profile')}
              className={`flex items-center gap-3 py-3 rounded-lg transition-colors
                ${sidebarOpen ? 'justify-start px-4 w-full' : 'justify-center'}
                ${
                  darkMode
                    ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <span className="w-10 h-10 flex items-center justify-center">
                <Avatar 
                  name={user?.displayName || "User"}
                  size="sm"
                  className={`border-2 ${darkMode ? 'border-gray-700' : 'border-white'}`}
                />
              </span>
              {sidebarOpen && (
                <div>
                  <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-white'}`}>{user?.displayName || "User"}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-white/60'}`}>{user?.email}</p>
                </div>
              )}
            </Link>
          </Tippy>
        </div>
      </div>
    </div>
    </>
  );
};

export default DashboardSidebar; 
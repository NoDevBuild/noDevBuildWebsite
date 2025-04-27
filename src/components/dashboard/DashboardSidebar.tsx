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

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  activeSection,
  setActiveSection
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
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full 
        ${sidebarOpen ? 'w-64' : 'w-20'} 
        bg-gradient-to-b from-blue-600 via-blue-700 to-purple-800 text-white 
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

        <div className="p-4 flex items-center justify-between">
          {sidebarOpen ? (
            <Link to="/" className="flex items-center">
              <img src="/main_logo.png" alt="NoDevBuild" className="h-10" />
            </Link>
          ) : (
            <div className="w-full flex justify-center">
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
                <Link 
                  to="/dashboard"
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full ${
                    activeSection === 'dashboard' ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  } transition-colors`}
                >
                  <Home className="h-5 w-5" />
                  {sidebarOpen && <span>Home</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/my-courses"
                  onClick={() => handleNavClick('my-courses')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full ${
                    activeSection === 'my-courses' ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  } transition-colors`}
                >
                  <BookOpen className="h-5 w-5" />
                  {sidebarOpen && <span>My Courses</span>}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="space-y-2">
            <Link 
              to="/dashboard/profile"
              onClick={() => handleNavClick('profile')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full ${
                activeSection === 'profile' ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
              } transition-colors`}
            >
              <User className="h-5 w-5" />
              {sidebarOpen && <span>Profile</span>}
            </Link>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5" />
              {sidebarOpen && <span>Logout</span>}
            </button>

            <div className="border-t border-white/20 my-4"></div>

            <Link 
              to="/dashboard/profile"
              onClick={() => handleNavClick('profile')}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Avatar 
                name={user?.displayName || "User"}
                size="sm"
                className="border-2 border-white"
              />
              {sidebarOpen && (
                <div>
                  <p className="text-white font-medium">{user?.displayName || "User"}</p>
                  <p className="text-white/60 text-sm">{user?.email}</p>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar; 
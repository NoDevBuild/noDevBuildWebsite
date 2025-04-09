import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  User, 
  Settings, 
  LogOut, 
  Star, 
  Database, 
  Users, 
  Rocket,
  ChevronRight
} from 'lucide-react';

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  handleLogout: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  handleLogout,
  activeSection,
  setActiveSection
}) => {
  const location = useLocation();
  
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
  };

  return (
    <div className={`fixed top-0 left-0 h-full ${sidebarOpen ? 'w-64' : 'w-20'} 
      bg-gradient-to-b from-blue-600 via-blue-700 to-purple-800 text-white transition-all duration-300 z-50`}>
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
          className="text-white p-1 rounded-full hover:bg-white/10"
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
                to="/dashboard/membership"
                onClick={() => handleNavClick('membership')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full ${
                  activeSection === 'membership' ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                } transition-colors`}
              >
                <Star className="h-5 w-5" />
                {sidebarOpen && <span>My Membership</span>}
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
            <li>
              <Link 
                to="/dashboard/startup-kit"
                onClick={() => handleNavClick('startup-kit')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full ${
                  activeSection === 'startup-kit' ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                } transition-colors`}
              >
                <Rocket className="h-5 w-5" />
                {sidebarOpen && <span>Startup Kit</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/investors" 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                  activeSection === 'investors' ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                } transition-colors`}
              >
                <Users className="h-5 w-5" />
                {sidebarOpen && <span>Founders Directory</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/ai-tools" 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                  activeSection === 'ai-tools' ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                } transition-colors`}
              >
                <Database className="h-5 w-5" />
                {sidebarOpen && <span>AI Tools</span>}
              </Link>
            </li>
            <li>
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
            </li>
            <li>
              <Link 
                to="/dashboard/settings"
                onClick={() => handleNavClick('settings')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full ${
                  activeSection === 'settings' ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                } transition-colors`}
              >
                <Settings className="h-5 w-5" />
                {sidebarOpen && <span>Settings</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar; 
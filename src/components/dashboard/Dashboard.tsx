import React, { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDashboard } from '../../contexts/DashboardContext';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import DashboardCourses from './DashboardCourses';
import DashboardCourseDetail from './DashboardCourseDetail';
import HomeContent from './HomeContent';
import ProfilePage from './ProfilePage';
import Avatar from '../common/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/authSlice';
import { authService } from '../../services/authService';
import { User } from '../../types/user';
import MembershipPage from './MembershipPage';
import type { RootState } from '../../store/store';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const courses = useSelector((state: RootState) => state.courses.items);
  const {
    darkMode,
    sidebarOpen,
    setSidebarOpen,
    activeSection,
    setActiveSection,
    toggleDarkMode,
    user,
    membershipType,
    getBadgeColor,
    daysRemaining,
    paymentHistory,
    isEditingName,
    newDisplayName,
    setNewDisplayName,
    isUpdating,
    handleUpdateDisplayName,
    handleCancelEdit,
    setIsEditingName,
    refreshUserData
  } = useDashboard();

  // Set initial active section based on URL and refresh user data
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/dashboard')) {
      const section = path.split('/dashboard/')[1] || 'dashboard';
      setActiveSection(section);
    }
  }, [location, setActiveSection]);

  // Refresh user data when component mounts
  useEffect(() => {
    refreshUserData();
  }, []); // Empty dependency array means this runs only once on mount

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(setUser(null));
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // If user is not available, redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Show loading state while user data is being fetched
  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Render different content based on active section
  const renderDashboardContent = () => {
    // Check if we're on a course detail page
    const path = location.pathname;
    if (path.includes('/dashboard/my-courses/') && path !== '/dashboard/my-courses') {
      return <DashboardCourseDetail darkMode={darkMode} />;
    }

    switch(activeSection) {
      case 'dashboard':
        return <HomeContent />;
      case 'profile':
        return <ProfilePage />;
      case 'membership':
        return <MembershipPage />;
      case 'my-courses':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Courses</h2>
            <DashboardCourses />
          </div>
        );

      case 'profile':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center mb-6">
                <Avatar 
                  name={user?.displayName || "User"} 
                  size="lg"
                  className="mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold">{user?.displayName || "User"}</h3>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold mb-2">Display Name</h4>
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newDisplayName}
                      onChange={(e) => setNewDisplayName(e.target.value)}
                      className={`flex-1 px-3 py-2 rounded-lg border ${
                        darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                      }`}
                    />
                    <button 
                      onClick={handleUpdateDisplayName}
                      disabled={isUpdating}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      {isUpdating ? 'Saving...' : 'Save'}
                    </button>
                    <button 
                      onClick={handleCancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p>{user?.displayName || "User"}</p>
                    <button 
                      onClick={() => setIsEditingName(true)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold mb-2">Membership</h4>
                <div className="flex items-center">
                  <div className={`${getBadgeColor()} text-white px-3 py-1 rounded-full mr-3`}>
                    {membershipType}
                  </div>
                  {membershipType !== "Lifetime" && (
                    <span>{daysRemaining} days remaining</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return <HomeContent />;
    }
  };

  // Map activeSection to a user-friendly title
  const getHeaderTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard/my-courses')) {
      return 'My Courses';
    }
    switch (activeSection) {
      case 'dashboard':
        return 'Home';
      case 'profile':
        return 'My Profile';
      case 'membership':
        return 'Membership';
      default:
        return 'Dashboard';
    }
  };

  // Get course name for subheader if on course detail page
  let courseSubheader = '';
  const path = location.pathname;
  if (path.includes('/dashboard/my-courses/') && path !== '/dashboard/my-courses') {
    const slug = path.split('/dashboard/my-courses/')[1];
    const course = courses.find(c => c.slug === slug);
    if (course) courseSubheader = course.title;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar */}
      <DashboardSidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'md:ml-64' : 'md:ml-20'} transition-all duration-300 min-h-screen`}>
        {/* Top Bar */}
        <DashboardHeader 
          title={getHeaderTitle()}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          user={user}
          sidebarOpen={sidebarOpen}
          membershipType={membershipType}
          getBadgeColor={getBadgeColor}
        />
        {/* Subheader for course detail */}
        {courseSubheader && (
          <div className="px-4 md:px-6 pt-2 text-sm text-gray-500 dark:text-gray-300 font-medium">
            {courseSubheader}
          </div>
        )}
        {/* Home Content */}
        <div className="p-4 md:p-6">
          {renderDashboardContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDashboard } from '../../contexts/DashboardContext';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import DashboardCourses from './DashboardCourses';
import DashboardCourseDetail from './DashboardCourseDetail';
import HomeContent from './HomeContent';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    setIsEditingName
  } = useDashboard();

  // Set initial active section based on URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/dashboard')) {
      const section = path.split('/dashboard/')[1] || 'dashboard';
      setActiveSection(section);
    }
  }, [location, setActiveSection]);

  const handleLogout = () => {
    navigate('/login');
  };

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
      case 'membership':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Membership</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <h3 className="text-xl font-bold mb-4">Current Plan</h3>
                <div className="flex items-center mb-4">
                  <div className={`${getBadgeColor()} text-white px-3 py-1 rounded-full mr-3`}>
                    {membershipType}
                  </div>
                  {membershipType !== "Lifetime" && (
                    <span>{daysRemaining} days remaining</span>
                  )}
                </div>
                <p className="mb-4">Enjoy all the benefits of your {membershipType} membership.</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Upgrade Plan
                </button>
              </div>
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <h3 className="text-xl font-bold mb-4">Payment History</h3>
                <div className="space-y-4">
                  {paymentHistory.map((payment: { id: number; date: string; amount: string; status: string; plan: string }) => (
                    <div key={payment.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{payment.plan}</p>
                        <p className="text-sm text-gray-500">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{payment.amount}</p>
                        <p className="text-sm text-green-500">{payment.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'my-courses':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Courses</h2>
            <DashboardCourses />
          </div>
        );
      case 'startup-kit':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Startup Kit</h2>
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <p className="mb-4">Access your startup resources and tools here.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-bold mb-2">Business Plan Template</h3>
                  <p className="text-sm mb-4">Download our comprehensive business plan template.</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-colors text-sm">
                    Download
                  </button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-bold mb-2">Financial Projections</h3>
                  <p className="text-sm mb-4">Excel templates for financial forecasting.</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-colors text-sm">
                    Download
                  </button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-bold mb-2">Pitch Deck Template</h3>
                  <p className="text-sm mb-4">Professional pitch deck template for investors.</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-colors text-sm">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center mb-6">
                <img 
                  src={user?.photoURL || "https://ui-avatars.com/api/?name=User"} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full mr-4"
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
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Appearance</h3>
                <div className="flex items-center">
                  <span className="mr-4">Dark Mode</span>
                  <button 
                    onClick={toggleDarkMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      darkMode ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="email" className="mr-2" defaultChecked />
                    <label htmlFor="email">Email Notifications</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="push" className="mr-2" defaultChecked />
                    <label htmlFor="push">Push Notifications</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Account</h3>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar */}
      <DashboardSidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleLogout={handleLogout}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 min-h-screen`}>
        {/* Top Bar */}
        <DashboardHeader 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          user={user}
          sidebarOpen={sidebarOpen}
          membershipType={membershipType}
          getBadgeColor={getBadgeColor}
        />

        {/* Home Content */}
        {renderDashboardContent()}
      </div>
    </div>
  );
};

export default Dashboard;
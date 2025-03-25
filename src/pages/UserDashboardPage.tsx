import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setUser } from '../store/authSlice';
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
  ChevronRight,
  Bell,
  Moon,
  Sun,
  Award,
  CreditCard,
  Clock,
  CheckCircle,
  Edit,
  ChevronDown,
  Save,
  X,
  FileText
} from 'lucide-react';
import { authService } from '../services/authService';
import { useToast } from '../contexts/ToastContext';

const UserDashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { user } = useSelector((state: RootState) => state.auth);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName || '');
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Mock data - in a real app, this would come from the backend
  const membershipType = "Premium"; // "Normal", "Premium", "Lifetime"
  const daysRemaining = 345; // Only relevant for annual plans
  const paymentHistory = [
    { id: 1, date: "2024-05-15", amount: "$199.99", status: "Paid", plan: "Annual Premium" },
    { id: 2, date: "2023-05-15", amount: "$149.99", status: "Paid", plan: "Annual Standard" }
  ];
  const achievements = [
    { id: 1, name: "First Login", completed: true, icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { id: 2, name: "Complete Profile", completed: true, icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { id: 3, name: "First Course Completed", completed: false, icon: <Clock className="w-5 h-5 text-gray-400" /> },
    { id: 4, name: "5 AI Tools Explored", completed: false, icon: <Clock className="w-5 h-5 text-gray-400" /> },
  ];
  const courseProgress = [
    { id: 1, name: "No-Code App Development", progress: 75, total: 12, completed: 9 },
    { id: 2, name: "AI Tools Masterclass", progress: 30, total: 10, completed: 3 },
  ];

  const handleUpdateDisplayName = async () => {
    if (!user?.uid || !newDisplayName.trim()) return;
    
    setIsUpdating(true);
    try {
      await authService.updateProfile(user.uid, { displayName: newDisplayName.trim() });
      
      // Update the user in Redux store
      dispatch(setUser({
        ...user,
        displayName: newDisplayName.trim()
      }));
      
      setIsEditingName(false);
      showToast('Profile name updated successfully!', 'success');
    } catch (error) {
      showToast('Failed to update profile name. Please try again.', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setNewDisplayName(user?.displayName || '');
    setIsEditingName(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  // Determine badge color based on membership type
  const getBadgeColor = () => {
    switch(membershipType) {
      case "Premium":
        return "bg-gradient-to-r from-blue-500 to-purple-600";
      case "Lifetime":
        return "bg-gradient-to-r from-yellow-500 to-amber-600";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar */}
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
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <Home className="h-5 w-5" />
                  {sidebarOpen && <span>Dashboard</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/membership" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Star className="h-5 w-5" />
                  {sidebarOpen && <span>My Membership</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/courses" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <BookOpen className="h-5 w-5" />
                  {sidebarOpen && <span>My Courses</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/startup-kit" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Rocket className="h-5 w-5" />
                  {sidebarOpen && <span>Startup Kit</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/investors" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Users className="h-5 w-5" />
                  {sidebarOpen && <span>Founders Directory</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/ai-tools" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Database className="h-5 w-5" />
                  {sidebarOpen && <span>AI Tools</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/profile" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <User className="h-5 w-5" />
                  {sidebarOpen && <span>Profile</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/settings" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
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

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 min-h-screen`}>
        {/* Top Bar */}
        <header className={`sticky top-0 z-40 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm px-6 py-3`}>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Dashboard</h1>
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

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Membership Card */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border-l-4 border-blue-500`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Membership</p>
                  <h3 className="text-xl font-bold mt-1">{membershipType}</h3>
                </div>
                <div className={`p-2 rounded-full ${getBadgeColor()} bg-opacity-10`}>
                  <Star className={`h-6 w-6 ${membershipType === "Lifetime" ? "text-amber-500" : "text-blue-500"}`} />
                </div>
              </div>
              {membershipType !== "Lifetime" && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Days Remaining</span>
                    <span className="font-medium">{daysRemaining}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${(daysRemaining / 365) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Courses Card */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border-l-4 border-green-500`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Courses</p>
                  <h3 className="text-xl font-bold mt-1">2 In Progress</h3>
                </div>
                <div className="p-2 rounded-full bg-green-500 bg-opacity-10">
                  <BookOpen className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Overall Progress</span>
                  <span className="font-medium">52%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: '52%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* AI Tools Card */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border-l-4 border-purple-500`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>AI Tools</p>
                  <h3 className="text-xl font-bold mt-1">12 Explored</h3>
                </div>
                <div className="p-2 rounded-full bg-purple-500 bg-opacity-10">
                  <Database className="h-6 w-6 text-purple-500" />
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  to="/ai-tools"
                  className="text-sm text-purple-500 hover:text-purple-700 flex items-center"
                >
                  <span>Explore more tools</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Achievements Card */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border-l-4 border-amber-500`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Achievements</p>
                  <h3 className="text-xl font-bold mt-1">2 of 4 Completed</h3>
                </div>
                <div className="p-2 rounded-full bg-amber-500 bg-opacity-10">
                  <Award className="h-6 w-6 text-amber-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Progress</span>
                  <span className="font-medium">50%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-amber-500 h-2.5 rounded-full" 
                    style={{ width: '50%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Progress Section */}
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm mb-8`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Course Progress</h2>
              <Link 
                to="/dashboard/courses"
                className="text-sm text-blue-500 hover:text-blue-700 flex items-center"
              >
                <span>View all</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-6">
              {courseProgress.map(course => (
                <div key={course.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{course.name}</h3>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {course.completed}/{course.total} lessons
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm mb-8`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Achievements</h2>
              <span className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded-full dark:bg-amber-900 dark:text-amber-300">
                2/4 Completed
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map(achievement => (
                <div 
                  key={achievement.id} 
                  className={`p-4 rounded-lg ${achievement.completed 
                    ? (darkMode ? 'bg-green-900/20' : 'bg-green-50') 
                    : (darkMode ? 'bg-gray-700' : 'bg-gray-50')
                  } flex items-center gap-3`}
                >
                  <div>
                    {achievement.icon}
                  </div>
                  <span className={`${achievement.completed ? 'font-medium' : ''}`}>
                    {achievement.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm mb-8`}>
            <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
            
            <div className="space-y-4">
              {/* Payment Activity */}
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <CreditCard className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Premium Membership Renewed</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Your membership has been renewed for another year
                  </p>
                  <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                </div>
              </div>

              {/* Course Progress Activity */}
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <BookOpen className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Course Progress</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Completed Module 3 in "No-Code App Development"
                  </p>
                  <p className="text-xs text-gray-400 mt-1">5 days ago</p>
                </div>
              </div>

              {/* Achievement Activity */}
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Award className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="font-medium">Achievement Unlocked</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Earned "Complete Profile" achievement
                  </p>
                  <p className="text-xs text-gray-400 mt-1">1 week ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Profile</h2>
              <Link 
                to="/dashboard/profile"
                className="text-sm text-blue-500 hover:text-blue-700 flex items-center"
              >
                <span>Edit Profile</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative">
                <img 
                  src={user?.photoURL || "https://ui-avatars.com/api/?name=User"}
                  alt="Profile" 
                  className="h-24 w-24 rounded-full object-cover border-4 border-blue-500"
                />
                <button className="absolute bottom-0 right-0 p-1.5 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <label className={`block text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                    Full Name
                  </label>
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newDisplayName}
                        onChange={(e) => setNewDisplayName(e.target.value)}
                        className={`flex-1 px-3 py-1.5 rounded-lg border ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Enter your name"
                        disabled={isUpdating}
                      />
                      <button
                        onClick={handleUpdateDisplayName}
                        disabled={isUpdating || !newDisplayName.trim()}
                        className={`p-1.5 rounded-lg ${
                          isUpdating || !newDisplayName.trim()
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600'
                        } text-white transition-colors`}
                      >
                        {isUpdating ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Save className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={isUpdating}
                        className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{user?.displayName || "User"}</p>
                      <button
                        onClick={() => setIsEditingName(true)}
                        className="p-1 text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className={`block text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                    Email
                  </label>
                  <p className="font-medium">{user?.email}</p>
                </div>
                
                <div>
                  <label className={`block text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                    Membership
                  </label>
                  <div className="flex items-center">
                    <span className={`${getBadgeColor()} text-xs px-2 py-0.5 rounded-full text-white font-medium mr-2`}>
                      {membershipType}
                    </span>
                    <span>
                      {membershipType === "Lifetime" 
                        ? "Lifetime access" 
                        : `${daysRemaining} days remaining`
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Payments Section */}
          <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Payments</h2>
              <Link 
                to="/dashboard/membership"
                className="text-sm text-blue-500 hover:text-blue-700 flex items-center"
              >
                <span>View all</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className={`border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Plan</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Invoice</th>
                  </tr>
                </thead>
                <tbody className={`${darkMode ? 'bg-gray-800' : 'bg-white'} divide-y divide-gray-200 dark:divide-gray-700`}>
                  {paymentHistory.map(payment => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.plan}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="flex items-center text-blue-500 hover:text-blue-700">
                          <FileText className="h-4 w-4 mr-1" />
                          <span>Download</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboardPage;
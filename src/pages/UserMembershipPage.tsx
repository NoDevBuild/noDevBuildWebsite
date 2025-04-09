import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
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
  CreditCard,
  Shield,
  CheckCircle,
  Download,
  FileText
} from 'lucide-react';

const UserMembershipPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Mock data - in a real app, this would come from the backend
  const membershipType = "Premium"; // "Normal", "Premium", "Lifetime"
  const daysRemaining = 345; // Only relevant for annual plans
  const paymentHistory = [
    { id: 1, date: "2024-05-15", amount: "$199.99", status: "Paid", plan: "Annual Premium", invoice: "INV-2024-001" },
    { id: 2, date: "2023-05-15", amount: "$149.99", status: "Paid", plan: "Annual Standard", invoice: "INV-2023-001" }
  ];
  
  const membershipPlans = [
    {
      id: 1,
      name: "Standard",
      price: "$149.99",
      period: "per year",
      current: false,
      features: [
        "Access to basic courses",
        "Community forum access",
        "Email support",
        "AI Tools directory"
      ]
    },
    {
      id: 2,
      name: "Premium",
      price: "$199.99",
      period: "per year",
      current: true,
      features: [
        "Access to all courses",
        "Community forum access",
        "Priority email support",
        "AI Tools directory",
        "Founders directory access",
        "Startup kit resources"
      ]
    },
    {
      id: 3,
      name: "Lifetime",
      price: "$499.99",
      period: "one-time payment",
      current: false,
      features: [
        "Lifetime access to all courses",
        "Community forum access",
        "Priority email support",
        "AI Tools directory",
        "Founders directory access",
        "Startup kit resources",
        "Future course updates",
        "Exclusive webinars"
      ]
    }
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, you would apply dark mode to the entire app
  };

  const handleLogout = () => {
    // Implement logout logic
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
              <img src="/noDevBuild-logo.png" alt="Logo" className="h-10 w-10" />
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
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Home className="h-5 w-5" />
                  {sidebarOpen && <span>Home</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/membership" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
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
            <h1 className="text-xl font-bold">My Membership</h1>
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

        {/* Membership Content */}
        <main className="p-6">
          {/* Current Membership Section */}
          <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h2 className="text-2xl font-bold mb-6">Current Membership</h2>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className={`p-6 rounded-xl ${getBadgeColor()} text-white flex-1`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{membershipType} Plan</h3>
                    <p className="text-white/80">
                      {membershipType === "Lifetime" 
                        ? "Lifetime access to all content" 
                        : `Renews on ${new Date(Date.now() + daysRemaining * 24 * 60 * 60 * 1000).toLocaleDateString()}`
                      }
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-white/10">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                {membershipType !== "Lifetime" && (
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/80">Days Remaining</span>
                      <span className="font-medium">{daysRemaining}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2.5">
                      <div 
                        className="bg-white h-2.5 rounded-full" 
                        style={{ width: `${(daysRemaining / 365) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="mt-6 flex flex-wrap gap-3">
                  {membershipType !== "Lifetime" && (
                    <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      Renew Plan
                    </button>
                  )}
                  <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                    Manage Payment Method
                  </button>
                </div>
              </div>
              
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex-1`}>
                <h3 className="text-lg font-bold mb-4">Membership Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Access to all courses and tutorials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Founders directory access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Startup kit resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Priority email support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>AI tools directory</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Membership Plans Section */}
          <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h2 className="text-2xl font-bold mb-6">Available Plans</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {membershipPlans.map(plan => (
                <div 
                  key={plan.id} 
                  className={`p-6 rounded-xl border-2 ${
                    plan.current 
                      ? 'border-blue-500 shadow-lg' 
                      : `${darkMode ? 'border-gray-700' : 'border-gray-200'}`
                  }`}
                >
                  {plan.current && (
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full dark:bg-blue-900 dark:text-blue-300">
                        Current Plan
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}> {plan.period}</span>
                  </div>
                  
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.current ? (
                    <button 
                      disabled
                      className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-lg cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                    >
                      Current Plan
                    </button>
                  ) : (
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      {plan.name === "Lifetime" ? "Upgrade to Lifetime" : "Switch Plan"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Billing History Section */}
          <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h2 className="text-2xl font-bold mb-6">Billing History</h2>
            
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
                        <button className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                          <FileText className="h-4 w-4 mr-1" />
                          <span>{payment.invoice}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Payment Methods</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add Payment Method
              </button>
            </div>
            
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-4`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-500 bg-opacity-10">
                    <CreditCard className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Visa ending in 4242</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Expires 05/2025
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full dark:bg-green-900 dark:text-green-300">
                    Default
                  </span>
                  <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-medium mb-2">How do I cancel my subscription?</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  You can cancel your subscription at any time from your membership page. Your access will continue until the end of your current billing period.
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-medium mb-2">What happens when I upgrade my plan?</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  When you upgrade, you'll be charged the prorated difference between your current plan and the new plan. You'll immediately get access to all the features of your new plan.
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-medium mb-2">Is there a refund policy?</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Yes, we offer a 30-day money-back guarantee on all plans. If you're not satisfied with your purchase, contact our support team within 30 days for a full refund.
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Link 
                to="/contact"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
              >
                <span>Need more help? Contact Support</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserMembershipPage;
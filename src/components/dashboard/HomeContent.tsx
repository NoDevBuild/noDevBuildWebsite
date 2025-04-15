import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  BookOpen, 
  Database, 
  Award, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  ChevronRight, 
  Calendar,
  TrendingUp,
  Users,
  Timer,
  Zap
} from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';

const HomeContent: React.FC = () => {
  const {
    darkMode,
    user,
    membershipType,
    daysRemaining,
    paymentHistory,
    achievements,
    courseProgress
  } = useDashboard();

  // Calculate membership duration in days
  const membershipDuration = user?.subscriptionStartDate 
    ? Math.floor((new Date().getTime() - new Date(user.subscriptionStartDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  // Calculate days until renewal
  const daysUntilRenewal = user?.subscriptionStartDate
    ? 365 - membershipDuration
    : 0;

  return (
    <main className="p-6">
      {/* Welcome Section */}
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {user?.displayName}! 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Here's what's happening with your learning journey
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/courses"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Courses
            </Link>
            <Link
              to="/ai-tools"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Database className="w-4 h-4 mr-2" />
              Explore AI Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Membership Status */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border-l-4 border-purple-500`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Membership</p>
              <h3 className="text-xl font-bold mt-1">{user?.planType === 'annual' ? 'Annual Plan' : 'Lifetime'}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Member for {membershipDuration} days
              </p>
            </div>
            <div className="p-2 rounded-full bg-purple-500/10">
              <Star className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          {user?.planType === 'annual' && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500 dark:text-gray-400">Days until renewal</span>
                <span className="font-medium">{daysUntilRenewal}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full" 
                  style={{ width: `${(membershipDuration / 365) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Info */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border-l-4 border-green-500`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Payment</p>
              <h3 className="text-xl font-bold mt-1">₹{user?.amountPaid}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {new Date(user?.lastPaymentDate || '').toLocaleDateString()}
              </p>
            </div>
            <div className="p-2 rounded-full bg-green-500/10">
              <CreditCard className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        {/* Learning Progress */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border-l-4 border-blue-500`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Course Progress</p>
              <h3 className="text-xl font-bold mt-1">2 Active Courses</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                52% completion rate
              </p>
            </div>
            <div className="p-2 rounded-full bg-blue-500/10">
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: '52%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Learning Time */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border-l-4 border-orange-500`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Learning Time</p>
              <h3 className="text-xl font-bold mt-1">12.5 Hours</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                This month
              </p>
            </div>
            <div className="p-2 rounded-full bg-orange-500/10">
              <Timer className="h-6 w-6 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <BookOpen className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="font-medium">Started "No-Code App Development"</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Completed Module 1: Introduction to No-Code
              </p>
              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Award className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="font-medium">Earned Achievement</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                "Quick Learner" - Complete first course module
              </p>
              <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Zap className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="font-medium">Completed Practice Exercise</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Built first no-code application
              </p>
              <p className="text-xs text-gray-400 mt-1">1 day ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Goals */}
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Learning Goals</h2>
          <button className="text-sm text-blue-500 hover:text-blue-600 flex items-center">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Complete No-Code Basics</h3>
              <span className="text-sm text-green-500">60% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Build First AI Project</h3>
              <span className="text-sm text-blue-500">30% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Launch MVP</h3>
              <span className="text-sm text-purple-500">15% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6`}>
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h2 className="text-xl font-bold mb-6">Upcoming Live Sessions</h2>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">AI Tools Workshop</h3>
                <span className="text-sm text-gray-500">Tomorrow, 2 PM</span>
              </div>
              <p className="text-sm text-gray-500">Learn how to integrate AI tools in your workflow</p>
            </div>
            
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">No-Code Q&A Session</h3>
                <span className="text-sm text-gray-500">Friday, 11 AM</span>
              </div>
              <p className="text-sm text-gray-500">Interactive session with expert mentors</p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h2 className="text-xl font-bold mb-6">Community Highlights</h2>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Active Discussions</h3>
              </div>
              <p className="text-sm text-gray-500">Join 15+ ongoing discussions about no-code development</p>
            </div>
            
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3 mb-2">
                <Award className="h-5 w-5 text-purple-500" />
                <h3 className="font-medium">Featured Projects</h3>
              </div>
              <p className="text-sm text-gray-500">See what other members are building</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeContent;
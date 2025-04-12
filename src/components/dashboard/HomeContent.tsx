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
  Edit, 
  Save, 
  X, 
  FileText 
} from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import Avatar from '../common/Avatar';

const HomeContent: React.FC = () => {
  const {
    darkMode,
    user,
    membershipType,
    daysRemaining,
    paymentHistory,
    achievements,
    courseProgress,
    isEditingName,
    newDisplayName,
    isUpdating,
    setNewDisplayName,
    handleUpdateDisplayName,
    handleCancelEdit,
    setIsEditingName,
    getBadgeColor
  } = useDashboard();

  return (
    <main className="p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Membership Card - Commented out
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
        */}

        {/* Courses Card - Commented out
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
        */}

        {/* AI Tools Card - Commented out
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
        */}

        {/* Achievements Card - Commented out
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
        */}
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
  );
};

export default HomeContent; 
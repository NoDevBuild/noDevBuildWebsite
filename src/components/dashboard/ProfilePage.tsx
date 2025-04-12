import React from 'react';
import { useDashboard } from '../../contexts/DashboardContext';
import Avatar from '../common/Avatar';
import { Edit, Save, X } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const {
    darkMode,
    user,
    membershipType,
    daysRemaining,
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative">
            <Avatar 
              name={user?.displayName || "User"}
              size="lg"
              className="border-4 border-blue-500"
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
    </div>
  );
};

export default ProfilePage; 
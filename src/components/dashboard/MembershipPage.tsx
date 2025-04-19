import React from 'react';
import { useDashboard } from '../../contexts/DashboardContext';
import { Star, CheckCircle, CreditCard, Download, FileText } from 'lucide-react';

const MembershipPage: React.FC = () => {
  const {
    darkMode,
    user,
    membershipType,
    daysRemaining,
    paymentHistory,
    getBadgeColor
  } = useDashboard();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Membership</h2>
      
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
              {paymentHistory.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {payment.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <span>{payment.invoice}</span>
                      <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
      </div>
    </div>
  );
};

export default MembershipPage; 
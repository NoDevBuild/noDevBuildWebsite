import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types/user';
import { MembershipType } from '../types/membership';
import { authService } from '../services/authService';
import { useToast } from './ToastContext';

// Define the shape of our context state
interface DashboardState {
  darkMode: boolean;
  sidebarOpen: boolean;
  isEditingName: boolean;
  newDisplayName: string;
  isUpdating: boolean;
  membershipType: MembershipType;
  activeSection: string;
  user: User | null;
  daysRemaining: number;
  paymentHistory: Array<{
    id: number;
    date: string;
    amount: string;
    status: string;
    plan: string;
  }>;
  achievements: Array<{
    id: number;
    name: string;
    completed: boolean;
    icon: React.ReactNode;
  }>;
  courseProgress: Array<{
    id: number;
    name: string;
    progress: number;
    total: number;
    completed: number;
  }>;
}

// Define the shape of our context value (state + functions)
interface DashboardContextType extends DashboardState {
  setDarkMode: (darkMode: boolean) => void;
  setSidebarOpen: (sidebarOpen: boolean) => void;
  setIsEditingName: (isEditingName: boolean) => void;
  setNewDisplayName: (newDisplayName: string) => void;
  setIsUpdating: (isUpdating: boolean) => void;
  setMembershipType: (membershipType: MembershipType) => void;
  setActiveSection: (activeSection: string) => void;
  setUser: (user: User | null) => void;
  setDaysRemaining: (daysRemaining: number) => void;
  setPaymentHistory: (paymentHistory: DashboardState['paymentHistory']) => void;
  setAchievements: (achievements: DashboardState['achievements']) => void;
  setCourseProgress: (courseProgress: DashboardState['courseProgress']) => void;
  toggleDarkMode: () => void;
  handleUpdateDisplayName: () => Promise<void>;
  handleCancelEdit: () => void;
  getBadgeColor: () => string;
}

// Create the context with a default value
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Create a provider component
interface DashboardProviderProps {
  children: ReactNode;
  initialUser: User | null;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children, initialUser }) => {
  const { showToast } = useToast();
  
  // Initialize state
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(initialUser?.displayName || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [membershipType, setMembershipType] = useState<MembershipType>("Premium");
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user, setUser] = useState<User | null>(initialUser);
  
  // Mock data - in a real app, this would come from the backend
  const [daysRemaining, setDaysRemaining] = useState(345); // Only relevant for annual plans
  const [paymentHistory, setPaymentHistory] = useState<DashboardState['paymentHistory']>([
    { id: 1, date: "2024-05-15", amount: "$199.99", status: "Paid", plan: "Annual Premium" },
    { id: 2, date: "2023-05-15", amount: "$149.99", status: "Paid", plan: "Annual Standard" }
  ]);
  
  const [achievements, setAchievements] = useState<DashboardState['achievements']>([
    { id: 1, name: "First Login", completed: true, icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { id: 2, name: "Complete Profile", completed: true, icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { id: 3, name: "First Course Completed", completed: false, icon: <Clock className="w-5 h-5 text-gray-400" /> },
    { id: 4, name: "5 AI Tools Explored", completed: false, icon: <Clock className="w-5 h-5 text-gray-400" /> },
  ]);
  
  const [courseProgress, setCourseProgress] = useState<DashboardState['courseProgress']>([
    { id: 1, name: "No-Code App Development", progress: 75, total: 12, completed: 9 },
    { id: 2, name: "AI Tools Masterclass", progress: 30, total: 10, completed: 3 },
  ]);

  // Functions
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleUpdateDisplayName = async () => {
    if (!user?.uid || !newDisplayName.trim()) return;
    
    setIsUpdating(true);
    try {
      await authService.updateProfile(user.uid, { displayName: newDisplayName.trim() });
      
      // Update the user in state
      setUser({
        ...user,
        displayName: newDisplayName.trim()
      });
      
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

  // Create the context value
  const contextValue: DashboardContextType = {
    // State
    darkMode,
    sidebarOpen,
    isEditingName,
    newDisplayName,
    isUpdating,
    membershipType,
    activeSection,
    user,
    daysRemaining,
    paymentHistory,
    achievements,
    courseProgress,
    
    // Setters
    setDarkMode,
    setSidebarOpen,
    setIsEditingName,
    setNewDisplayName,
    setIsUpdating,
    setMembershipType,
    setActiveSection,
    setUser,
    setDaysRemaining,
    setPaymentHistory,
    setAchievements,
    setCourseProgress,
    
    // Functions
    toggleDarkMode,
    handleUpdateDisplayName,
    handleCancelEdit,
    getBadgeColor,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

// Create a custom hook to use the dashboard context
export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

// Import the icons
import { CheckCircle, Clock } from 'lucide-react'; 
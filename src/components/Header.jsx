import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, LogOut, Settings, User, BookOpen, Menu, X, Rocket, Database } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useToast } from '../contexts/ToastContext';
import { getImageUrl } from '../utils/helpers';

const Header = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [showCoursesMenu, setShowCoursesMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { items: courses } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const userMenuRef = useRef(null);
  const userButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showCoursesMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowCoursesMenu(false);
      }
      if (
        showUserMenu &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        !userButtonRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCoursesMenu, showUserMenu]);

  // Close mobile menu on route change
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileMenu]);

  const handleCoursesClick = () => {
    setShowCoursesMenu(!showCoursesMenu);
  };

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handlePromoClick = async () => {
    try {
      await navigator.clipboard.writeText('SPRING30');
      showToast('Code SPRING30 has been copied', 'success');
      setShowBanner(false);
      navigate('/register');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Failed to copy text: ', err);
      showToast('Failed to copy code', 'error');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <header className='fixed w-full top-0 z-50 max-w-screen'>
      <div className="bg-white shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <img src="/main_logo.png" alt="noDevBuild" className="h-16 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <button 
                  ref={buttonRef}
                  className={`flex items-center text-gray-700 hover:text-blue-600 ${location.pathname.startsWith('/courses') ? 'text-blue-600' : ''}`}
                  onClick={handleCoursesClick}
                >
                  Courses
                  <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${showCoursesMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {showCoursesMenu && (
                  <div 
                    ref={menuRef}
                    className='absolute top-full left-0 w-[600px] bg-white rounded-lg shadow-lg py-6 mt-1 -translate-x-1/4 z-50'
                  >
                    <div className="px-6 mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Courses</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 px-4">
                      {courses.map((course) => (
                        <Link 
                          key={course.id}
                          to={`/courses/${course.slug}`}
                          className="flex items-center px-4 py-2 hover:bg-gray-50 rounded-lg group"
                          onClick={() => setShowCoursesMenu(false)}
                        >
                          <span className="w-10 h-10 mr-3">
                            <img 
                              src={getImageUrl(course?.icon)} 
                              alt={course.title}
                              className="w-full h-full object-contain"
                            />
                          </span>
                          <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                            {course.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="px-6 mt-4 pt-4 border-t">
                      <Link 
                        to="/courses"
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                        onClick={() => setShowCoursesMenu(false)}
                      >
                        Browse all tutorials →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Link 
                to="/ai-tools" 
                className={`text-gray-700 hover:text-blue-600 ${location.pathname.startsWith('/ai-tools') ? 'text-blue-600' : ''}`}
              >
                AI Tools
              </Link>
              <Link 
                to="/investors" 
                className={`text-gray-700 hover:text-blue-600 ${location.pathname === '/investors' ? 'text-blue-600' : ''}`}
              >
                Investors
              </Link>
              <Link 
                to="/startup-builder" 
                className={`text-gray-700 hover:text-blue-600 ${location.pathname === '/startup-builder' ? 'text-blue-600' : ''}`}
              >
                Startup Builder
              </Link>
              <Link 
                to="/admin" 
                className={`text-gray-700 hover:text-blue-600 ${location.pathname === '/admin' ? 'text-blue-600' : ''}`}
              >
                Admin
              </Link>

              {user ? (
                <div className="relative">
                  <button
                    ref={userButtonRef}
                    onClick={handleUserMenuClick}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white">
                      {user.photoURL ? (
                        <img
                          src={getImageUrl(user.photoURL)}
                          alt={user.displayName || 'User'}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-medium">
                          {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                        </span>
                      )}
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-600 transform transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showUserMenu && (
                    <div
                      ref={userMenuRef}
                      className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100 z-50'
                    >
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">
                          {user.displayName || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      
                      <Link
                        to="/courses"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        My Courses
                      </Link>
                      
                      {/* <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link> */}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={handleLoginClick}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setShowMobileMenu(true)}
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setShowMobileMenu(false)}>
          <div 
            ref={mobileMenuRef}
            className="absolute right-0 top-0 h-full w-[300px] bg-white shadow-xl transform transition-transform duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">Menu</span>
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <X className="h-6 w-6 text-gray-700" />
                </button>
              </div>
            </div>

            <div className="py-4">
              {user && (
                <div className="px-4 py-3 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white">
                      {user.photoURL ? (
                        <img
                          src={getImageUrl(user.photoURL)}
                          alt={user.displayName || 'User'}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-medium">
                          {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="px-2 py-3">
                <Link
                  to="/courses"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <BookOpen className="h-5 w-5 mr-3 text-gray-500" />
                  Courses
                </Link>

                <Link
                  to="/ai-tools"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Database className="h-5 w-5 mr-3 text-gray-500" />
                  AI Tools
                </Link>

                <Link
                  to="/investors"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <User className="h-5 w-5 mr-3 text-gray-500" />
                  Investors
                </Link>

                <Link
                  to="/startup-builder"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Rocket className="h-5 w-5 mr-3 text-gray-500" />
                  Startup Builder
                </Link>

                <Link
                  to="/admin"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Settings className="h-5 w-5 mr-3 text-gray-500" />
                  Admin
                </Link>
              </div>

              {user ? (
                <div className="px-2 py-3 border-t">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <User className="h-5 w-5 mr-3 text-gray-500" />
                    Profile
                  </Link>

                  <Link
                    to="/my-courses"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <BookOpen className="h-5 w-5 mr-3 text-gray-500" />
                    My Courses
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Settings className="h-5 w-5 mr-3 text-gray-500" />
                    Settings
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setShowMobileMenu(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="px-4 py-3 border-t">
                  <button
                    onClick={() => {
                      handleRegisterClick();
                      setShowMobileMenu(false);
                    }}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mb-2"
                  >
                    Register
                  </button>
                  <button
                    onClick={() => {
                      handleLoginClick();
                      setShowMobileMenu(false);
                    }}
                    className="w-full bg-white text-gray-900 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {showBanner && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-2 relative z-10">
          <button 
            onClick={handlePromoClick}
            className="w-full text-center text-white text-sm hover:opacity-80 transition-opacity"
          >
            🎉 Spring Sale: Get 30% off on all courses with code SPRING30
          </button>
          <button 
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors"
          >
            <span className="sr-only">Close</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
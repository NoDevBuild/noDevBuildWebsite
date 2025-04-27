import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { setUser, setInitialized } from './store/authSlice';
import { setLoading, setCourses, setError } from './store/coursesSlice';
import { RootState } from './store/store';
import { scrollToTop } from './utils/helpers';
import { courseService } from './services/courseService';
import { authService } from './services/authService';
import api from './services/api';
import SEO from './components/SEO';

// Components
import Header from './components/Header'
import Hero from './components/Hero'
import WhyNoCode from './components/WhyNoCode'
import Instructors from './components/Instructors'
import Courses from './components/Courses'
import PoweredBy from './components/PoweredBy'
import Benefits from './components/Benefits'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import StartupBuilder from './components/StartupBuilder'
import InvestorsSection from './components/InvestorsSection'

// Pages
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import CancellationRefund from './pages/CancellationRefund'
import ContactUs from './pages/ContactUs'
import AIToolsPage from './pages/AIToolsPage'
import AIToolDetailPage from './pages/AIToolDetailPage'
import InvestorsDirectoryPage from './pages/InvestorsDirectoryPage'
import UserDashboardPage from './pages/UserDashboardPage'
import UserMembershipPage from './pages/UserMembershipPage'
import PitchDeck from './pages/PitchDeck'
import PlacementsPage from './pages/PlacementsPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { initialized, user } = useSelector((state: RootState) => state.auth);
  const isLoginPage = location.pathname === '/login';
  const isDashboardPage = location.pathname.startsWith('/dashboard');
  const isPitchDeckPage = location.pathname === '/pitch-deck';

  // Scroll to top on route change
  useEffect(() => {
    scrollToTop({ behavior: 'instant' });
  }, [location.pathname]);

  // Initialize auth state from token
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Get the user ID from the token
          const response = await api.get('/auth/verify-token');
          if (response.data.uid) {
            // Fetch the user profile
            const userProfile = await authService.getProfile(response.data.uid);
            dispatch(setUser(userProfile));

            // Check for redirectAfterLogin in localStorage
            const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');
            
            // Handle redirection based on membership status and redirectAfterLogin
            if (redirectAfterLogin) {
              // If there's a stored redirect path, navigate there and clear it
              navigate(redirectAfterLogin);
              localStorage.removeItem('redirectAfterLogin');
            } else if (userProfile.membershipStatus === 'active') {
              if (isLoginPage && !location.pathname.includes('/register')) {
                navigate('/dashboard');
              }
            } else {
              // If user is not active, keep them on register page
              if (isDashboardPage) {
                navigate('/register');
              }
            }
          }
        } catch (error) {
          console.error('Error initializing auth:', error);
          localStorage.removeItem('token');
          if (isDashboardPage) {
            navigate('/login');
          }
        }
      } else {
        // If no token and trying to access dashboard, redirect to login
        if (isDashboardPage) {
          navigate('/login');
        }
      }
      dispatch(setInitialized(true));
    };

    initializeAuth();
  }, [dispatch, isLoginPage, isDashboardPage, navigate, location.pathname]);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(setLoading(true));
      try {
        const coursesData = await courseService.getAllCourses();
        dispatch(setCourses(coursesData));
      } catch (err) {
        dispatch(setError('Failed to load courses'));
        console.error('Error fetching courses:', err);
      }
    };

    fetchCourses();
  }, [dispatch]);

  if (!initialized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="relative w-96 h-96">
          {/* Logo Loader */}
          <img 
            src="/noDevBuildLogoLoader.gif" 
            alt="NoDevBuild Logo" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <SEO />
      <div className='min-h-screen bg-[#0d1117]'>
        {!isLoginPage && !isDashboardPage && !isPitchDeckPage && <Header />}
        <Routes>
          <Route path='/login' element={
            <>
              <SEO 
                title="Login"
                description="Sign in to your NoDevBuild account to access courses, AI tools, and more."
                keywords="login, sign in, account, authentication"
              />
              <LoginPage />
            </>
          } />
          <Route path='/register' element={
            <>
              <SEO 
                title="Register"
                description="Join NoDevBuild to learn no-code development and AI tools. Start your journey today!"
                keywords="register, sign up, membership, courses"
              />
              <RegisterPage />
            </>
          } />
          <Route path='/startup-builder' element={
            <>
              <SEO 
                title="Startup Builder"
                description="Build your startup with NoDevBuild's comprehensive startup builder toolkit."
                keywords="startup, founder, business, entrepreneurship"
              />
              <StartupBuilder />
            </>
          } />
          <Route path='/pitch-deck' element={
            <>
              <SEO 
                title="Pitch Deck"
                description="Create professional pitch decks for your startup with our AI-powered tools."
                keywords="pitch deck, presentation, startup, fundraising"
              />
              <PitchDeck />
            </>
          } />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/courses' element={
            <>
              <SEO 
                title="Courses"
                description="Explore our comprehensive courses on no-code development and AI tools."
                keywords="courses, learning, education, tutorials"
              />
              <CoursesPage />
            </>
          } />
          <Route path='/courses/:courseId' element={<CourseDetailPage />} />
          <Route path='/privacy-policy' element={
            <>
              <SEO 
                title="Privacy Policy"
                description="Learn about how NoDevBuild protects and handles your personal information."
                keywords="privacy, policy, data protection"
              />
              <PrivacyPolicy />
            </>
          } />
          <Route path='/terms-and-conditions' element={
            <>
              <SEO 
                title="Terms and Conditions"
                description="Read our terms and conditions for using NoDevBuild's services."
                keywords="terms, conditions, legal, agreement"
              />
              <TermsAndConditions />
            </>
          } />
          <Route path='/cancellation-refund' element={
            <>
              <SEO 
                title="Cancellation & Refund Policy"
                description="Learn about our cancellation and refund policies at NoDevBuild."
                keywords="cancellation, refund, policy"
              />
              <CancellationRefund />
            </>
          } />
          <Route path='/contact' element={
            <>
              <SEO 
                title="Contact Us"
                description="Get in touch with the NoDevBuild team for support and inquiries."
                keywords="contact, support, help, inquiry"
              />
              <ContactUs />
            </>
          } />
          <Route path='/ai-tools' element={
            <>
              <SEO 
                title="AI Tools Directory"
                description="Discover and learn about the best AI tools for your projects."
                keywords="AI tools, artificial intelligence, automation, productivity"
              />
              <AIToolsPage />
            </>
          } />
          <Route path='/ai-tools/:id' element={<AIToolDetailPage />} />
          <Route path='/investors' element={
            <>
              <SEO 
                title="Investors Directory"
                description="Connect with investors and find funding opportunities for your startup."
                keywords="investors, funding, venture capital, startup funding"
              />
              <InvestorsDirectoryPage />
            </>
          } />
          <Route path='/dashboard' element={<UserDashboardPage />} />
          <Route path='/dashboard/membership' element={<UserMembershipPage />} />
          <Route path='/dashboard/profile' element={<UserDashboardPage />} />
          <Route path='/dashboard/my-courses' element={<UserDashboardPage />} />
          <Route path='/dashboard/my-courses/:courseSlug' element={<UserDashboardPage />} />
          <Route path='/placements' element={
            <>
              <SEO 
                title="Placements"
                description="Find job opportunities and get placed in top companies after completing our courses."
                keywords="placements, jobs, career, employment"
              />
              <PlacementsPage />
            </>
          } />
          <Route path='/forgot-password' element={
            <>
              <SEO 
                title="Forgot Password"
                description="Reset your NoDevBuild account password securely."
                keywords="password reset, forgot password, account recovery"
              />
              <ForgotPasswordPage />
            </>
          } />
          <Route
            path='/'
            element={
              <>
                <SEO 
                  title="Home"
                  description="Master no-code development and AI tools with NoDevBuild. Learn to build apps, websites, and automate workflows without coding."
                  keywords="no-code, AI, development, coding, programming, web development, automation"
                  structuredData={{
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "NoDevBuild",
                    "url": "https://nodevbuild.com",
                    "description": "Master no-code development and AI tools with NoDevBuild",
                    "potentialAction": {
                      "@type": "SearchAction",
                      "target": "https://nodevbuild.com/search?q={search_term_string}",
                      "query-input": "required name=search_term_string"
                    }
                  }}
                />
                <main className='bg-[#0d1117]'>
                  <Hero />
                  <div className='bg-white'>
                    <PoweredBy />
                    <Courses />
                    <WhyNoCode />
                    {/* <Instructors /> */}
                    <Benefits />
                    <InvestorsSection />
                  </div>
                </main>
              </>
            }
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
        {!isLoginPage && !isDashboardPage && !isPitchDeckPage && <Footer />}
      </div>
    </HelmetProvider>
  );
}

export default App;
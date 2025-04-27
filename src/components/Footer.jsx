import React, { useState, useCallback } from 'react';
import { GraduationCap, Linkedin, Mail, Instagram } from 'lucide-react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { newsletterService } from '../services/newsletterService';
import { collaborationService } from '../services/collaborationService';
import { useToast } from '../contexts/ToastContext';
import { isValidEmail } from '../utils/validation';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { showToast } = useToast();

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    }
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubscribe = async () => {
    if (!validateEmail()) return;

    try {
      await newsletterService.subscribe(email);
      showToast("You've been subscribed to the NoDevBuild Newsletter!", 'success');
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      showToast('Failed to subscribe. Please try again.', 'error');
    }
  };

  const handleCollaboration = async () => {
    if (!validateEmail()) return;

    try {
      await collaborationService.submitEnquiry(email);
      showToast("Thanks for your interest! We'll be in touch soon.", 'success');
      setEmail('');
    } catch (error) {
      console.error('Collaboration enquiry error:', error);
      showToast('Failed to submit enquiry. Please try again.', 'error');
    }
  };

  const handleKeyPress = (e, handler) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handler();
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  return (
    <footer className="relative min-h-[400px] bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117] text-white py-12 overflow-hidden">
      {/* Particles Background */}
      <Particles
        id="footerParticles"
        init={particlesInit}
        className="absolute inset-0"
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: {
                enable: true,
                mode: "grab",
                parallax: { enable: true, force: 60, smooth: 10 }
              },
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              grab: {
                distance: 200,
                links: { opacity: 0.5, color: "#a855f7" }
              }
            },
          },
          particles: {
            color: { value: ["#c084fc", "#a855f7", "#7c3aed"] },
            links: {
              color: "#a855f7",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: { enable: true, area: 800 },
              value: 100,
            },
            opacity: { value: 0.7 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Social Links */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/online_logo.png" alt="noDevBuild" className="h-16 w-auto" />
            </div>
            <p className="text-gray-400 mb-4">
              Empowering the next generation of no-code developers and AI specialists.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/nodevbuild" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="mailto:contact@nodevbuild.com"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Mail className="h-6 w-6" />
              </a>
              <a 
                href="https://www.instagram.com/nodevbuild" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigate('/startup-builder')}
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Startup Builder
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/placements')}
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Placements by noDevBuild
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/register')}
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/cancellation-refund" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Cancellation & Refund
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter/Build with Us Section */}
          <div className="md:col-span-1">
            {user ? (
              <>
                <div className="space-y-4 relative">
                  {/* Fluid background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl blur-xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-purple-900/10 rounded-xl animate-pulse"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                      🚀 Build something amazing With Us!
                    </h3>
                    <div className="space-y-4 mt-4">
                      <p className="text-xl font-medium text-white">
                        Ready to bring your ideas to life?
                      </p>
                      <p className="text-gray-400 text-lg">
                        Join our Founders Hub and get expert guidance on your startup journey.
                      </p>
                      <div className="flex flex-col space-y-4">
                        <div className="space-y-2">
                          <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                            onKeyPress={(e) => handleKeyPress(e, handleCollaboration)}
                            className={`w-full px-4 py-3 rounded-lg bg-gray-800/50 backdrop-blur-sm border ${
                              emailError ? 'border-red-500' : 'border-gray-700'
                            } focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400`}
                          />
                          {emailError && (
                            <p className="text-red-500 text-sm">{emailError}</p>
                          )}
                        </div>
                        <button 
                          onClick={handleCollaboration}
                          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 transform hover:scale-[1.02] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Let's Build Together! 🚀
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-gray-400 mb-4">
                  Get the latest updates and resources delivered to your inbox.
                </p>
                <div className="space-y-2">
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                      onKeyPress={(e) => handleKeyPress(e, handleSubscribe)}
                      className={`flex-1 px-4 py-2 rounded-l-lg bg-gray-800/50 backdrop-blur-sm border ${
                        emailError ? 'border-red-500' : 'border-gray-700'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400`}
                    />
                    <button 
                      onClick={handleSubscribe}
                      className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Mail className="h-5 w-5" />
                    </button>
                  </div>
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-800/50 backdrop-blur-sm mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 noDevBuild. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
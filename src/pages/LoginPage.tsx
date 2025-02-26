import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, User } from 'lucide-react';
import AmongUsParticles from '../components/AmongUsParticles';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setLoading, setUser } from '../store/authSlice';
import { RootState } from '../store/store';
import { authService } from '../services/authService';

const LoginPage: React.FC = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(null));
    
    try {
      if (isSignup) {
        if (!fullName.trim()) {
          dispatch(setError('Please enter your full name'));
          return;
        }

        if (password !== confirmPassword) {
          dispatch(setError('Passwords do not match'));
          return;
        }

        if (password.length < 6) {
          dispatch(setError('Password must be at least 6 characters'));
          return;
        }

        const user = await authService.register(email, password, fullName);
        dispatch(setUser(user));
        navigate('/');
      } else {
        const user = await authService.login(email, password);
        dispatch(setUser(user));
        navigate('/');
      }
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    dispatch(setError(null));
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
  };

  const handleForgotPassword = async () => {
    if (!email) {
      dispatch(setError('Please enter your email address'));
      return;
    }

    dispatch(setLoading(true));
    try {
      await authService.resetPassword(email);
      dispatch(setError('Password reset link has been sent to your email'));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-black overflow-hidden px-4 py-8 md:px-0 md:py-0">
      <AmongUsParticles />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {isSignup ? 'Create Account' : 'Welcome Back!'}
              </h2>
              <p className="text-sm sm:text-base text-gray-300">
                {isSignup ? 'Sign up to get started' : 'Sign in to continue learning'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {isSignup && (
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-lg text-sm sm:text-base"
                      placeholder="John Doe"
                      required={isSignup}
                      disabled={loading}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-lg text-sm sm:text-base"
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-lg text-sm sm:text-base"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {isSignup && (
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-lg text-sm sm:text-base"
                      placeholder="••••••••"
                      required={isSignup}
                      disabled={loading}
                    />
                  </div>
                </div>
              )}

              {!isSignup && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-600 bg-black/30 text-purple-500 focus:ring-purple-500"
                      disabled={loading}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-gray-300 text-sm">
                      Remember me
                    </label>
                  </div>
                  <button 
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-purple-400 hover:text-purple-300 text-sm"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
                    <span>{isSignup ? 'Creating Account...' : 'Signing in...'}</span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>{isSignup ? 'Create Account' : 'Sign in'}</span>
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm sm:text-base text-gray-400">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button 
                onClick={toggleMode}
                disabled={loading}
                className="text-purple-400 hover:text-purple-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSignup ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
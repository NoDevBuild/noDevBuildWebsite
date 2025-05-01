import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../services/authService';
import { useToast } from '../contexts/ToastContext';
import { Lock, Eye, EyeOff, Check, X } from 'lucide-react';
import { isStrongPassword } from '../utils/validation';

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  const oobCode = searchParams.get('oobCode');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!oobCode || !email) {
      navigate('/forgot-password');
      showToast('Invalid reset link', 'error');
    }
  }, [oobCode, email, navigate, showToast]);

  const checkPasswordRequirements = (pass: string) => {
    setPasswordRequirements({
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /\d/.test(pass),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pass)
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordRequirements(newPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!oobCode || !email) {
        throw new Error('Invalid reset link');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const passwordValidation = isStrongPassword(password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.message);
      }

      await authService.confirmPasswordReset(oobCode, password);
      showToast('Password reset successfully', 'success');
      navigate('/login');
    } catch (error: any) {
      setError(error.message);
      showToast(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter your new password
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className="appearance-none rounded-none relative block w-full pl-10 pr-12 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="New password"
                required
              />
              {password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full pl-10 pr-12 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Confirm new password"
                required
              />
              {confirmPassword && (
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          </div>

          {password && (
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
              <div className="flex items-center text-xs">
                {passwordRequirements.length ? (
                  <Check className="h-3 w-3 text-green-400 mr-1 flex-shrink-0" />
                ) : (
                  <X className="h-3 w-3 text-red-400 mr-1 flex-shrink-0" />
                )}
                <span className={`${passwordRequirements.length ? "text-green-400" : "text-gray-400"} tracking-wide`}>
                  At least 8 characters long
                </span>
              </div>
              <div className="flex items-center text-xs">
                {passwordRequirements.uppercase ? (
                  <Check className="h-3 w-3 text-green-400 mr-1 flex-shrink-0" />
                ) : (
                  <X className="h-3 w-3 text-red-400 mr-1 flex-shrink-0" />
                )}
                <span className={`${passwordRequirements.uppercase ? "text-green-400" : "text-gray-400"} tracking-wide`}>
                  At least one uppercase letter
                </span>
              </div>
              <div className="flex items-center text-xs">
                {passwordRequirements.lowercase ? (
                  <Check className="h-3 w-3 text-green-400 mr-1 flex-shrink-0" />
                ) : (
                  <X className="h-3 w-3 text-red-400 mr-1 flex-shrink-0" />
                )}
                <span className={`${passwordRequirements.lowercase ? "text-green-400" : "text-gray-400"} tracking-wide`}>
                  At least one lowercase letter
                </span>
              </div>
              <div className="flex items-center text-xs">
                {passwordRequirements.number ? (
                  <Check className="h-3 w-3 text-green-400 mr-1 flex-shrink-0" />
                ) : (
                  <X className="h-3 w-3 text-red-400 mr-1 flex-shrink-0" />
                )}
                <span className={`${passwordRequirements.number ? "text-green-400" : "text-gray-400"} tracking-wide`}>
                  At least one number
                </span>
              </div>
              <div className="flex items-center text-xs">
                {passwordRequirements.special ? (
                  <Check className="h-3 w-3 text-green-400 mr-1 flex-shrink-0" />
                ) : (
                  <X className="h-3 w-3 text-red-400 mr-1 flex-shrink-0" />
                )}
                <span className={`${passwordRequirements.special ? "text-green-400" : "text-gray-400"} tracking-wide`}>
                  At least one special character
                </span>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : null}
              {isLoading ? 'Resetting password...' : 'Reset password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 
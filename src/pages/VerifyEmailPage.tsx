import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { applyActionCode } from 'firebase/auth';
import { useToast } from '../contexts/ToastContext';

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const oobCode = searchParams.get('oobCode');
        const mode = searchParams.get('mode');

        if (!oobCode) {
          setVerificationStatus('error');
          setErrorMessage('Invalid verification link');
          return;
        }

        // Handle password reset mode
        if (mode === 'resetPassword') {
          // Redirect to reset password page
          navigate(`/reset-password?oobCode=${oobCode}`);
          return;
        }

        // Verify email using Firebase client SDK
        await applyActionCode(auth, oobCode);
        
        setVerificationStatus('success');
        showToast('Email verified successfully', 'success');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error: any) {
        console.error('Email verification error:', error);
        setVerificationStatus('error');
        
        let errorMessage = 'Failed to verify email';
        if (error.code === 'auth/invalid-action-code') {
          errorMessage = 'Invalid or expired verification link';
        } else if (error.code === 'auth/expired-action-code') {
          errorMessage = 'Verification link has expired';
        }
        
        setErrorMessage(errorMessage);
        showToast(errorMessage, 'error');
      }
    };

    verifyEmail();
  }, [searchParams, navigate, showToast]);

  if (verificationStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto"></div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verifying Email
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please wait while we verify your email address...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verification Failed
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {errorMessage}
            </p>
            <div className="mt-4">
              <button
                onClick={() => navigate('/login')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verified
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your email has been successfully verified. Redirecting to login...
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage; 
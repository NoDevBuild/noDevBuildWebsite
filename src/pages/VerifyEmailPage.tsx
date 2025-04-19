import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, XCircle } from 'lucide-react';
import { authService } from '../services/authService';
import { useDispatch } from 'react-redux';
import { setError } from '../store/authSlice';

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const oobCode = searchParams.get('oobCode');
        
        if (!oobCode) {
          setVerificationStatus('error');
          setMessage('Invalid verification link. Please try again.');
          return;
        }

        // Call your backend verification endpoint
        await authService.verifyEmail(oobCode);
        
        setVerificationStatus('success');
        setMessage('Email verified successfully! You can now log in.');
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error: any) {
        setVerificationStatus('error');
        setMessage(error.message || 'Failed to verify email. Please try again.');
        dispatch(setError(error.message));
      }
    };

    verifyEmail();
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {verificationStatus === 'loading' && (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          )}
          
          {verificationStatus === 'success' && (
            <div className="flex flex-col items-center">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Email Verified!
              </h2>
            </div>
          )}
          
          {verificationStatus === 'error' && (
            <div className="flex flex-col items-center">
              <XCircle className="h-12 w-12 text-red-500" />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Verification Failed
              </h2>
            </div>
          )}
          
          <p className="mt-2 text-sm text-gray-600">
            {message}
          </p>
          
          {verificationStatus === 'error' && (
            <div className="mt-4">
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage; 
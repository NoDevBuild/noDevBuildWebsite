import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Mail, AlertCircle, Loader2 } from 'lucide-react';
import api from '../services/api';

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error' | 'warning'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [showResendButton, setShowResendButton] = useState<boolean>(false);
  const [membershipStatus, setMembershipStatus] = useState<string>('');
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [redirectPath, setRedirectPath] = useState<string>('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const oobCode = searchParams.get('oobCode');
        const mode = searchParams.get('mode');

        if (!oobCode) {
          setVerificationStatus('error');
          setErrorMessage('Invalid verification link. Please make sure you clicked the correct link from your email.');
          return;
        }

        // Call backend to verify email
        const response = await api.post('/auth/verify-email', { oobCode });
        
        if (response.data.success) {
          setVerificationStatus('success');
          setUserEmail(response.data.email);
          setMembershipStatus(response.data.membershipStatus || 'inactive');
          
          // Determine redirect path based on membership status
          const path = response.data.membershipStatus === 'active' ? '/dashboard' : '/register';
          setRedirectPath(path);
          
          // Start redirect countdown
          setIsRedirecting(true);
          setTimeout(() => {
            navigate(path);
          }, 3000);
        } else {
          handleErrorResponse(response.data);
        }
      } catch (error: any) {
        console.error('Email verification error:', error);
        handleErrorResponse(error.response?.data || { error: 'An error occurred during verification' });
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  const handleErrorResponse = (data: any) => {
    setVerificationStatus('error');
    
    switch (data.code) {
      case 'auth/email-already-verified':
        setVerificationStatus('warning');
        setErrorMessage('Your email is already verified. You will be redirected to complete your registration.');
        setShowResendButton(false);
        setRedirectPath('/register');
        setIsRedirecting(true);
        setTimeout(() => {
          navigate('/register');
        }, 3000);
        break;
      case 'auth/expired-action-code':
        setErrorMessage('This verification link has expired. Please request a new verification email.');
        setShowResendButton(true);
        break;
      case 'auth/invalid-action-code':
        setErrorMessage('This verification link is invalid. Please request a new verification email.');
        setShowResendButton(true);
        break;
      case 'auth/user-not-found':
        setErrorMessage('No account found with this email address. Please sign up again.');
        setShowResendButton(false);
        break;
      case 'auth/account-already-enabled':
        setVerificationStatus('warning');
        setErrorMessage('Your account is already enabled. You will be redirected to complete your registration.');
        setShowResendButton(false);
        setRedirectPath('/register');
        setIsRedirecting(true);
        setTimeout(() => {
          navigate('/register');
        }, 3000);
        break;
      case 'auth/network-request-failed':
        setErrorMessage('Network error. Please check your internet connection and try again.');
        setShowResendButton(true);
        break;
      case 'auth/too-many-requests':
        setErrorMessage('Too many verification attempts. Please try again later.');
        setShowResendButton(false);
        break;
      default:
        setErrorMessage(data.error || 'An error occurred during verification');
        setShowResendButton(true);
    }
  };

  const handleResendVerification = async () => {
    try {
      setVerificationStatus('loading');
      setShowResendButton(false);
      await api.post('/auth/resend-verification', { email: userEmail });
      setVerificationStatus('success');
      setErrorMessage('A new verification email has been sent. Please check your inbox.');
    } catch (error: any) {
      handleErrorResponse(error.response?.data || { error: 'Failed to resend verification email' });
    }
  };

  const handleManualRedirect = () => {
    if (redirectPath) {
      navigate(redirectPath);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {verificationStatus === 'loading' && (
            <div className="flex flex-col items-center">
              <Loader2 className="h-12 w-12 text-purple-600 animate-spin" />
              <p className="mt-4 text-gray-600">Verifying your email...</p>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div className="flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <h2 className="mt-4 text-2xl font-bold text-gray-900">Email Verified!</h2>
              <p className="mt-2 text-gray-600">
                Your email ({userEmail}) has been successfully verified. 
                {isRedirecting ? (
                  membershipStatus === 'active' 
                    ? ' Redirecting to dashboard...' 
                    : ' Redirecting to complete your registration...'
                ) : (
                  ' Please click the button below to continue.'
                )}
              </p>
              {!isRedirecting && (
                <button
                  onClick={handleManualRedirect}
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Continue
                </button>
              )}
            </div>
          )}

          {(verificationStatus === 'error' || verificationStatus === 'warning') && (
            <div className="flex flex-col items-center">
              {verificationStatus === 'error' ? (
                <XCircle className="h-12 w-12 text-red-500" />
              ) : (
                <AlertCircle className="h-12 w-12 text-yellow-500" />
              )}
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                {verificationStatus === 'error' ? 'Verification Failed' : 'Notice'}
              </h2>
              <p className="mt-2 text-gray-600">{errorMessage}</p>
              {showResendButton && (
                <button
                  onClick={handleResendVerification}
                  className="mt-4 flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <Mail className="h-4 w-4" />
                  Resend Verification Email
                </button>
              )}
              {!isRedirecting && (
                <button
                  onClick={handleManualRedirect}
                  className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Go to Login
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage; 
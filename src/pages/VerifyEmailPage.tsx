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
  const [retryCount, setRetryCount] = useState<number>(0);
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const [editedEmail, setEditedEmail] = useState<string>('');
  const maxRetries = 3;

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const oobCode = searchParams.get('oobCode');
        const email = searchParams.get('email');
        const mode = searchParams.get('mode');

        if (!oobCode) {
          setVerificationStatus('error');
          setErrorMessage('Invalid verification link. Please make sure you clicked the correct link from your email.');
          return;
        }

        // Set the email from URL if available
        if (email) {
          setUserEmail(email);
        }

        // Call backend to verify email
        const response = await api.post('/auth/verify-email', { oobCode, email });
        
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
          // Set user email from response even in error cases where it's available
          if (response.data.email) {
            setUserEmail(response.data.email);
          }
          handleErrorResponse(response.data);
        }
      } catch (error: any) {
        console.error('Email verification error:', error);
        
        // Handle network errors with retry logic
        if (error.response?.data?.code === 'auth/network-request-failed' && retryCount < maxRetries) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => {
            verifyEmail();
          }, 2000 * (retryCount + 1)); // Exponential backoff
          return;
        }
        
        handleErrorResponse(error.response?.data || { error: 'An error occurred during verification' });
      }
    };

    verifyEmail();
  }, [searchParams, navigate, retryCount]);

  const handleErrorResponse = (data: any) => {
    setVerificationStatus('error');
    
    switch (data.code) {
      case 'auth/email-already-verified':
        setVerificationStatus('warning');
        setErrorMessage('Your email is already verified. You will be redirected to complete your registration.');
        setShowResendButton(false);
        setUserEmail(data.email || '');
        setMembershipStatus(data.membershipStatus || 'inactive');
        setRedirectPath('/register');
        setIsRedirecting(true);
        setTimeout(() => {
          navigate('/register');
        }, 3000);
        break;
      case 'auth/expired-action-code':
        setErrorMessage('This verification link has expired. Please request a new verification email.');
        setShowResendButton(true);
        // Set user email from the action code info if available
        if (data.email) {
          setUserEmail(data.email);
        }
        break;
      case 'auth/invalid-action-code':
        setErrorMessage('This verification link is invalid. Please request a new verification email.');
        setShowResendButton(true);
        // Set user email from the action code info if available
        if (data.email) {
          setUserEmail(data.email);
        }
        break;
      case 'auth/user-not-found':
        setErrorMessage('No account found with this email address. Please sign up again.');
        setShowResendButton(false);
        break;
      case 'auth/account-already-enabled':
        setVerificationStatus('warning');
        setErrorMessage('Your account is already enabled. You will be redirected to complete your registration.');
        setShowResendButton(false);
        setUserEmail(data.email || '');
        setMembershipStatus(data.membershipStatus || 'inactive');
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
      case 'auth/server-error':
        setErrorMessage('Server error. Please try again later or contact support.');
        setShowResendButton(true);
        break;
      default:
        setErrorMessage(data.error || 'An error occurred during verification');
        setShowResendButton(true);
    }
  };

  const handleResendVerification = async () => {
    try {
      const emailToUse = isEditingEmail ? editedEmail : userEmail;
      
      if (!emailToUse) {
        setErrorMessage('Please enter your email address to resend verification.');
        return;
      }

      setVerificationStatus('loading');
      setShowResendButton(false);
      await api.post('/auth/resend-verification', { email: emailToUse });
      setVerificationStatus('success');
      setErrorMessage('A new verification email has been sent. Please check your inbox.');
      setIsEditingEmail(false);
    } catch (error: any) {
      handleErrorResponse(error.response?.data || { error: 'Failed to resend verification email' });
    }
  };

  const handleEditEmail = () => {
    setIsEditingEmail(true);
    setEditedEmail(userEmail);
  };

  const handleCancelEdit = () => {
    setIsEditingEmail(false);
    setEditedEmail('');
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
              <p className="mt-4 text-gray-600">
                {retryCount > 0 ? `Retrying verification (${retryCount}/${maxRetries})...` : 'Verifying your email...'}
              </p>
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
                <div className="w-full max-w-sm space-y-4">
                  {isEditingEmail ? (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={editedEmail}
                          onChange={(e) => setEditedEmail(e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Enter your email address"
                        />
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={handleResendVerification}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                          <Mail className="h-4 w-4" />
                          Resend Verification
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userEmail && (
                        <p className="text-sm text-gray-600">
                          Current email: {userEmail}
                        </p>
                      )}
                      <div className="flex space-x-4">
                        <button
                          onClick={handleResendVerification}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                          <Mail className="h-4 w-4" />
                          Resend Verification
                        </button>
                        <button
                          onClick={handleEditEmail}
                          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                          Edit Email
                        </button>
                      </div>
                    </div>
                  )}
                </div>
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
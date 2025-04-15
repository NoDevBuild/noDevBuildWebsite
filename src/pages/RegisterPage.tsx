import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Newspaper, Rocket, Users, Wrench, BookOpen, Tag, X, Check } from 'lucide-react';
import { paymentService } from '../services/paymentService';
import { referralService } from '../services/referralService';
import { useToast } from '../contexts/ToastContext';

interface VerificationResult {
  isValid: boolean;
  discountPercent?: number;
  error?: string;
}

interface PlanDetails {
  type: 'basicPlan' | 'premiumPlan';
  originalPrice: number;
  discountedPrice?: number;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth?.user);
  const { showToast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);
  const [referralCode, setReferralCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [codeError, setCodeError] = useState('');
  const [isCodeApplied, setIsCodeApplied] = useState(false);

  useEffect(() => {
    // Load Razorpay script when component mounts
    paymentService.loadRazorpay();

    // Handle payment success
    const handlePaymentSuccess = (event: CustomEvent) => {
      showToast('Payment successful! Welcome to NoDevBuild!', 'success');
      navigate('/dashboard');
    };

    // Handle payment error
    const handlePaymentError = (event: CustomEvent) => {
      showToast(event.detail.error || 'Payment failed. Please try again.', 'error');
    };

    // Handle payment cancellation
    const handlePaymentCancelled = () => {
      showToast('Payment cancelled', 'info');
    };

    // Add event listeners
    window.addEventListener('payment_success', handlePaymentSuccess as EventListener);
    window.addEventListener('payment_error', handlePaymentError as EventListener);
    window.addEventListener('payment_cancelled', handlePaymentCancelled);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('payment_success', handlePaymentSuccess as EventListener);
      window.removeEventListener('payment_error', handlePaymentError as EventListener);
      window.removeEventListener('payment_cancelled', handlePaymentCancelled);
    };
  }, [navigate, showToast]);

  const handlePlanSelect = (type: 'basicPlan' | 'premiumPlan') => {
    const originalPrice = type === 'basicPlan' ? 1800 : 5000;
    const discountedPrice = discountPercent > 0 
      ? originalPrice - (originalPrice * discountPercent / 100)
      : undefined;

    if (!user) {
      // Store the selected plan details in localStorage before redirecting
      localStorage.setItem('selectedPlanType', type);
      localStorage.setItem('selectedPlanPrice', originalPrice.toString());
      localStorage.setItem('redirectAfterLogin', '/register');
      navigate('/login');
      return;
    }

    setSelectedPlan({
      type,
      originalPrice,
      discountedPrice
    });
  };

  // Add useEffect to check for stored plan after login
  useEffect(() => {
    if (user) {
      const storedPlanType = localStorage.getItem('selectedPlanType') as 'basicPlan' | 'premiumPlan' | null;
      const storedPlanPrice = localStorage.getItem('selectedPlanPrice');
      
      if (storedPlanType && storedPlanPrice) {
        const originalPrice = parseInt(storedPlanPrice);
        const discountedPrice = discountPercent > 0 
          ? originalPrice - (originalPrice * discountPercent / 100)
          : undefined;

        setSelectedPlan({
          type: storedPlanType,
          originalPrice,
          discountedPrice
        });

        // Clear the stored plan data
        localStorage.removeItem('selectedPlanType');
        localStorage.removeItem('selectedPlanPrice');
        localStorage.removeItem('redirectAfterLogin');
      }
    }
  }, [user, discountPercent]);

  const handleVerifyCode = async () => {
    if (!referralCode.trim()) {
      setCodeError('Please enter a referral code');
      return;
    }

    if (!selectedPlan) {
      setCodeError('Please select a plan first');
      return;
    }

    setIsVerifying(true);
    setCodeError('');
    setVerificationResult(null);

    try {
      const response = await referralService.verifyCode(referralCode.trim(), selectedPlan.type);
      setVerificationResult(response);
      if (!response.isValid) {
        setCodeError(response.error || 'Invalid referral code');
      }
    } catch (error: any) {
      setCodeError(error.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleApplyCode = () => {
    if (!selectedPlan || !verificationResult?.isValid || !verificationResult.discountPercent) {
      return;
    }

    setDiscountPercent(verificationResult.discountPercent);
    const discountedPrice = selectedPlan.originalPrice - (selectedPlan.originalPrice * verificationResult.discountPercent / 100);
    setSelectedPlan({
      ...selectedPlan,
      discountedPrice
    });
    setIsCodeApplied(true);
    showToast(`Referral code applied! ${verificationResult.discountPercent}% discount`, 'success');
  };

  const handleRemoveCode = () => {
    setReferralCode('');
    setDiscountPercent(0);
    setIsCodeApplied(false);
    setVerificationResult(null);
    if (selectedPlan) {
      setSelectedPlan({
        ...selectedPlan,
        discountedPrice: undefined
      });
    }
  };

  const handlePayment = async () => {
    if (!selectedPlan) return;
    if (!user) {
      localStorage.setItem('selectedPlan', selectedPlan.type);
      navigate('/login');
      return;
    }

    try {
      await paymentService.initiatePayment(selectedPlan.type, user, isCodeApplied ? referralCode : undefined);
    } catch (error: any) {
      console.error('Payment initiation failed:', error);
      showToast(error.message || 'Failed to initiate payment. Please try again.', 'error');
    }
  };

  if (selectedPlan) {
    return (
      <div className="min-h-screen w-full bg-[#f8fafc] py-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Checkout</h2>
              <button 
                onClick={() => setSelectedPlan(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Selected Plan Details */}
            <div className="mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {selectedPlan.type === 'basicPlan' ? 'Basic Plan' : 'Premium Plan'}
                  </h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {selectedPlan.discountedPrice ? (
                        <>
                          <span className="text-gray-400 line-through text-lg mr-2">
                            ₹{selectedPlan.originalPrice}
                          </span>
                          ₹{selectedPlan.discountedPrice}
                        </>
                      ) : (
                        `₹${selectedPlan.originalPrice}`
                      )}
                    </div>
                    {selectedPlan.type === 'basicPlan' && (
                      <span className="text-sm text-gray-500">per year</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Referral Code Section */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Have a referral code?
              </label>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter code"
                    disabled={isCodeApplied}
                  />
                  {!isCodeApplied && !verificationResult && (
                    <button
                      onClick={handleVerifyCode}
                      disabled={isVerifying}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {isVerifying ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Verifying...
                        </>
                      ) : (
                        'Verify'
                      )}
                    </button>
                  )}
                  {verificationResult && !isCodeApplied && (
                    <button
                      onClick={handleApplyCode}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Apply
                    </button>
                  )}
                  {isCodeApplied && (
                    <button
                      onClick={handleRemoveCode}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                {verificationResult && !isCodeApplied && (
                  <div className={`p-3 rounded-lg ${verificationResult.isValid ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {verificationResult.isValid ? (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Valid code! {verificationResult.discountPercent}% discount available</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        <span>{verificationResult.error || 'Invalid referral code'}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {codeError && (
                  <p className="text-sm text-red-600">{codeError}</p>
                )}
                
                {isCodeApplied && (
                  <div className="p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{discountPercent}% discount applied!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold text-lg"
            >
              Pay Now
            </button>

            <p className="mt-4 text-sm text-gray-500 text-center">
              By proceeding, you agree to our{' '}
              <Link to="/terms" className="text-purple-600 hover:text-purple-700">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f8fafc]">
      <div className="pt-24 sm:pt-32 pb-12 sm:pb-16">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="flex flex-col gap-7 text-2xl sm:text-3xl md:text-[3.5rem] font-bold text-[#1e293b] mb-4 sm:mb-6">
              <span className="block">One Membership,</span>
              <span className="block italic font-serif">Unlimited Access</span>
            </h1>
            
            <div className="flex items-center justify-center gap-1 sm:gap-2 text-base sm:text-lg text-[#475569]">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 sm:w-6 h-5 sm:h-6 text-[#3b82f6]">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>All plans come with a <span className="font-medium">60-day money back guarantee</span></span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12">
            {/* Basic Plan */}
            <div className="relative bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-[#1e293b]">
              <div className="absolute -top-3 right-6 sm:right-8 bg-[#fbbf24] text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold">
                20% off
              </div>
              
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1e293b] mb-3 sm:mb-4">Basic Plan</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-gray-400 line-through text-xl sm:text-2xl">₹2,000</span>
                  <span className="text-3xl sm:text-4xl font-bold text-[#1e293b]">₹1,800</span>
                  <span className="text-lg sm:text-xl text-gray-600">/year</span>
                </div>
                {selectedPlan?.type === 'basicPlan' && selectedPlan?.discountedPrice && (
                  <div className="mt-2 text-green-600 font-semibold">
                    After discount: ₹{selectedPlan.discountedPrice}
                  </div>
                )}
              </div>

              <button
                onClick={() => handlePlanSelect('basicPlan')}
                className="w-full bg-[#1e293b] text-white rounded-lg py-3 sm:py-4 font-semibold hover:bg-[#334155] transition-colors text-base sm:text-lg"
              >
                Select Plan
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1e293b] mb-3 sm:mb-4">Premium Plan</h3>
                <div className="flex items-baseline">
                  <span className="text-gray-400 line-through text-xl sm:text-2xl">₹6,000</span>
                  <span className="text-3xl sm:text-4xl font-bold text-[#1e293b]">₹5,000</span>
                </div>
                {selectedPlan?.type === 'premiumPlan' && selectedPlan?.discountedPrice && (
                  <div className="mt-2 text-green-600 font-semibold">
                    After discount: ₹{selectedPlan.discountedPrice}
                  </div>
                )}
              </div>

              <button
                onClick={() => handlePlanSelect('premiumPlan')}
                className="w-full bg-white text-[#1e293b] border-2 border-[#1e293b] rounded-lg py-3 sm:py-4 font-semibold hover:bg-gray-50 transition-colors text-base sm:text-lg"
              >
                Select Plan
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-12 sm:mb-20">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {/* First Row */}
                {/* Newsletter */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Newspaper className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-[#1e293b] mb-2">Newsletters</h4>
                  <p className="text-sm sm:text-base text-gray-600">AI Tools & Weekly Startup Insiders</p>
                </div>

                {/* Startup Builder */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-[#1e293b] mb-2">Startup Builder Founders' Hub</h4>
                  <p className="text-sm sm:text-base text-gray-600">Expert-led startup strategies</p>
                </div>

                {/* Community */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-[#1e293b] mb-2">Exclusive NoDevBuild Community</h4>
                  <p className="text-sm sm:text-base text-gray-600">Network with top founders & investors</p>
                </div>

                {/* Second Row - Centered */}
                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:max-w-[66%] mx-auto">
                  {/* No-Code & AI Toolkit */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Wrench className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-[#1e293b] mb-2">The Ultimate No-Code & AI Toolkit</h4>
                    <p className="text-sm sm:text-base text-gray-600">Master the best tools in the industry</p>
                  </div>

                  {/* Real Projects */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-[#1e293b] mb-2">Build Real Projects</h4>
                    <p className="text-sm sm:text-base text-gray-600">Hands-on experience creating real apps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
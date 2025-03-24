import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Newspaper, Rocket, Users, Wrench, BookOpen } from 'lucide-react';
import Testimonials from '../components/Testimonials';
import { paymentService } from '../services/paymentService';
import { useToast } from '../contexts/ToastContext';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth?.user);
  const { showToast } = useToast();

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

  const handlePlanSelect = async (plan: 'annual' | 'lifetime') => {
    if (!user) {
      localStorage.setItem('selectedPlan', plan);
      navigate('/login');
      return;
    }

    try {
      await paymentService.initiatePayment(plan, user);
    } catch (error: any) {
      console.error('Payment initiation failed:', error);
      showToast(error.message || 'Failed to initiate payment. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc]">
      <div className="pt-24 sm:pt-32 pb-12 sm:pb-16">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-[3.5rem] font-bold text-[#1e293b] leading-[1.15] mb-4 sm:mb-6">
              One Membership,<br />
              <span className="italic font-serif">Unlimited Access</span>
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
            {/* Annual Plan */}
            <div className="relative bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-[#1e293b]">
              <div className="absolute -top-3 right-6 sm:right-8 bg-[#fbbf24] text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold">
                20% off
              </div>
              
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1e293b] mb-3 sm:mb-4">Annual</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-gray-400 line-through text-xl sm:text-2xl">₹2,000</span>
                  <span className="text-3xl sm:text-4xl font-bold text-[#1e293b]">₹1,800</span>
                  <span className="text-lg sm:text-xl text-gray-600">/year</span>
                </div>
              </div>

              <button
                onClick={() => handlePlanSelect('annual')}
                className="w-full bg-[#1e293b] text-white rounded-lg py-3 sm:py-4 font-semibold hover:bg-[#334155] transition-colors text-base sm:text-lg"
              >
                {user ? 'Proceed to Checkout' : 'Select Plan'}
              </button>
            </div>

            {/* Lifetime Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1e293b] mb-3 sm:mb-4">Lifetime</h3>
                <div className="flex items-baseline">
                  <span className="text-gray-400 line-through text-xl sm:text-2xl">₹6,000</span>
                  <span className="text-3xl sm:text-4xl font-bold text-[#1e293b]">₹5,000</span>
                </div>
              </div>

              <button
                onClick={() => handlePlanSelect('lifetime')}
                className="w-full bg-white text-[#1e293b] border-2 border-[#1e293b] rounded-lg py-3 sm:py-4 font-semibold hover:bg-gray-50 transition-colors text-base sm:text-lg"
              >
                {user ? 'Proceed to Checkout' : 'Select Plan'}
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

      {/* Testimonials Section */}
      {/* <div className="bg-gray-50">
        <Testimonials />
      </div> */}
    </div>
  );
};

export default RegisterPage;
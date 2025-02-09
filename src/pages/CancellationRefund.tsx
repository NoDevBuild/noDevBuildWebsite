import React from 'react';
import { RefreshCw, DollarSign, Clock, CheckSquare, AlertCircle } from 'lucide-react';
import { ParticlesBackground } from '../components/ParticlesBackground';

const CancellationRefund = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117] relative">
      <ParticlesBackground />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-6 animate-pulse">
            <RefreshCw className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Cancellation & Refund Policy</h1>
          <p className="text-gray-400 text-lg">We want you to be completely satisfied with your purchase</p>
        </div>

        <div className="space-y-8">
          {/* Money Back Guarantee */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-green-500/10 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">60-Day Money Back Guarantee</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We offer a 60-day money-back guarantee on all our courses. If you're not satisfied with your purchase, you can request a full refund within 60 days of the purchase date.</p>
                  <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                    <p className="text-green-400 font-medium">No questions asked, hassle-free refund process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Process */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-500/10 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Refund Process</h2>
                <div className="space-y-4 text-gray-300">
                  <p>To request a refund:</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Contact our support team via email or the contact form</li>
                    <li>Provide your order number and email address</li>
                    <li>State your reason for the refund (optional)</li>
                    <li>Refund will be processed within 5-7 business days</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-purple-500/10 group-hover:scale-110 transition-transform duration-300">
                <CheckSquare className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Cancellation Policy</h2>
                <div className="space-y-4 text-gray-300">
                  <p>For subscription-based services:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>You can cancel your subscription at any time</li>
                    <li>Access continues until the end of the current billing period</li>
                    <li>No partial refunds for unused time</li>
                    <li>Annual subscriptions may be eligible for partial refunds</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Exceptions */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-yellow-500/10 group-hover:scale-110 transition-transform duration-300">
                <AlertCircle className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Exceptions</h2>
                <div className="space-y-4 text-gray-300">
                  <p>Refunds may not be available in the following cases:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Promotional or discounted purchases</li>
                    <li>Bundle deals marked as non-refundable</li>
                    <li>After the 60-day guarantee period</li>
                    <li>Evidence of fraud or abuse</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">Last updated: March 15, 2024</p>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefund;
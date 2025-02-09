import React from 'react';
import { Scale, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { ParticlesBackground } from '../components/ParticlesBackground';

const TermsAndConditions = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117] relative">
      <ParticlesBackground />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-6 animate-pulse">
            <Scale className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Terms and Conditions</h1>
          <p className="text-gray-400 text-lg">Please read these terms carefully before using our services</p>
        </div>

        <div className="space-y-8">
          {/* Agreement Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-500/10 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Agreement to Terms</h2>
                <div className="space-y-4 text-gray-300">
                  <p>By accessing or using NoDev Build, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you disagree with any part of the terms, you may not access our services.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Intellectual Property Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-purple-500/10 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Intellectual Property Rights</h2>
                <div className="space-y-4 text-gray-300">
                  <p>The Service and its original content, features, and functionality are owned by NoDev Build and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Course content and materials are for personal use only</li>
                    <li>Redistribution or resale is strictly prohibited</li>
                    <li>You may not modify or copy our content</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* User Accounts Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-green-500/10 group-hover:scale-110 transition-transform duration-300">
                <AlertCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">User Accounts</h2>
                <div className="space-y-4 text-gray-300">
                  <p>When you create an account with us, you must provide accurate and complete information. You are responsible for:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Maintaining the security of your account</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized use</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Termination Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-red-500/10 group-hover:scale-110 transition-transform duration-300">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Termination</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We may terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason, including:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Violation of these Terms</li>
                    <li>Fraudulent or illegal activities</li>
                    <li>Non-payment of fees</li>
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

export default TermsAndConditions;
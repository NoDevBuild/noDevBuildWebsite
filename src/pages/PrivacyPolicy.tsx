import React from 'react';
import { Shield, Lock, Eye, FileCheck } from 'lucide-react';
import { ParticlesBackground } from '../components/ParticlesBackground';

const PrivacyPolicy = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117] relative">
      <ParticlesBackground />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 mb-6 animate-pulse">
            <Shield className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400 text-lg">Your privacy is our top priority</p>
        </div>

        <div className="space-y-8">
          {/* Information Collection Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-purple-500/10 group-hover:scale-110 transition-transform duration-300">
                <Lock className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Information We Collect</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We collect information that you provide directly to us, including:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Name and contact information</li>
                    <li>Account credentials</li>
                    <li>Payment information</li>
                    <li>Course progress and preferences</li>
                    <li>Communications with us</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Information Usage Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-500/10 group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">How We Use Your Information</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process your transactions</li>
                    <li>Send you technical notices and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Develop new products and services</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Information Sharing Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-green-500/10 group-hover:scale-110 transition-transform duration-300">
                <FileCheck className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Information Sharing and Disclosure</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We do not share your personal information except in the following limited circumstances:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>With your consent</li>
                    <li>To comply with laws</li>
                    <li>To protect rights and safety</li>
                    <li>With service providers under confidentiality agreements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Data Security Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-purple-500/10 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Data Security</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>
                  <p>However, no security system is impenetrable and we cannot guarantee the security of our systems 100%.</p>
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

export default PrivacyPolicy;
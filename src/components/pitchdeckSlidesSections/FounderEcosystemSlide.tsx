import React from 'react';
import { StarfieldBackground } from '../StarfieldBackground';
import { Users, Rocket, Lightbulb, Handshake, TrendingUp } from 'lucide-react';

const FounderEcosystemSlide = () => {
  return (
    <section className="snap-section flex items-center relative overflow-hidden bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117] h-screen">
      <div className="absolute inset-0">
        <StarfieldBackground />
      </div>
      
      <div className="w-full h-full flex flex-col">
        {/* Centered Heading and Label - Minimal top padding */}
        <div className="flex flex-col items-center pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full mb-3">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-xs font-medium">Founder Ecosystem</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-white text-center leading-tight">
            Powering Founders with{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Investor-Backed Growth
            </span>
          </h2>
        </div>

        {/* Main Content Container - Takes remaining height */}
        <div className="flex-1 flex items-stretch">
          {/* Left Side Content */}
          <div className="w-full md:w-1/4 px-4 md:pl-8 mb-8 md:mb-0 flex flex-col justify-center">
            <p className="text-base text-gray-300 mb-6">
              Unlock Exclusive Access to Our Founder Ecosystem
            </p>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2 group">
                  <div className="w-6 h-6 rounded-md bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-3 h-3 text-purple-400" />
                  </div>
                  <span className="text-white text-sm">Direct Investor Connections</span>
                </div>

                <div className="flex items-center gap-2 group">
                  <div className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Rocket className="w-3 h-3 text-blue-400" />
                  </div>
                  <span className="text-white text-sm">Funding Opportunities</span>
                </div>

                <div className="flex items-center gap-2 group">
                  <div className="w-6 h-6 rounded-md bg-yellow-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Lightbulb className="w-3 h-3 text-yellow-400" />
                  </div>
                  <span className="text-white text-sm">Expert Guidance</span>
                </div>

                <div className="flex items-center gap-2 group">
                  <div className="w-6 h-6 rounded-md bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Handshake className="w-3 h-3 text-green-400" />
                  </div>
                  <span className="text-white text-sm">Strategic Partnerships</span>
                </div>

                <div className="flex items-center gap-2 group">
                  <div className="w-6 h-6 rounded-md bg-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-3 h-3 text-cyan-400" />
                  </div>
                  <span className="text-white text-sm">Growth Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Image - Full height container */}
          <div className="hidden md:flex w-3/4 relative items-stretch">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="w-full h-full flex items-center justify-end">
              <img 
                src="/pitch-deck-images/investingRoadmap.png" 
                alt="Investment Roadmap" 
                className="w-full h-full object-contain relative z-10"
              />
            </div>
          </div>

          {/* Mobile Image Container */}
          <div className="md:hidden w-full flex items-center">
            <div className="relative w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <img 
                src="/pitch-deck-images/investingRoadmap.png" 
                alt="Investment Roadmap" 
                className="w-full h-full object-contain relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderEcosystemSlide;
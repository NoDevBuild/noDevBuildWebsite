import React from 'react';
import { StarfieldBackground } from '../StarfieldBackground';
import { Users, Rocket, Lightbulb, Handshake, TrendingUp } from 'lucide-react';

const FounderEcosystemSlide = () => {
  return (
    <section className="snap-section flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117] h-screen max-w-7xl mx-auto">
      <StarfieldBackground />
      
      <div className="w-full relative px-4 sm:px-6 lg:px-8 flex flex-col h-full">
        {/* Centered Heading and Label */}
        <div className="flex flex-col items-center mb-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-xs font-medium">Founder Ecosystem</span>
          </div>
          
          <h2 className="text-2xl xl:text-3xl font-bold text-white leading-tight text-center">
            Powering Founders with{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Investor-Backed Growth
            </span>
          </h2>
        </div>

        {/* Remaining Content Container */}
        <div className="flex flex-grow">
          <div className="w-1/3">
            <p className="text-base text-gray-300">
              Unlock Exclusive Access to Our Founder Ecosystem
            </p>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
              <div className="grid grid-cols-1 gap-1.5">
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

          {/* Image Container */}
          <div className="w-2/3 relative flex items-end justify-end h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
            <img 
              src="/pitch-deck-images/investingRoadmap.png" 
              alt="Investment Roadmap" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderEcosystemSlide;
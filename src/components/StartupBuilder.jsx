import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { StarfieldBackground } from './StarfieldBackground';

const StartupBuilder = () => {
  const navigate = useNavigate();
  const rocketRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!rocketRef.current || !pathRef.current) return;

      const pathRect = pathRef.current.getBoundingClientRect();
      const pathTop = pathRect.top;
      const pathHeight = pathRect.height;
      const windowHeight = window.innerHeight;

      let progress = (windowHeight - pathTop) / (pathHeight + windowHeight);
      progress = Math.max(0, Math.min(1, progress));

      const pathLength = pathRef.current.getTotalLength();
      const point = pathRef.current.getPointAtLength(pathLength * progress);

      if (rocketRef.current) {
        rocketRef.current.style.transform = `translate(${point.x}px, ${point.y}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="pt-32 pb-20 bg-[#0d1117] text-white relative min-h-screen overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0">
        <StarfieldBackground />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">Founders' Hub</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Your Startup Journey
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Follow our proven roadmap to success with expert guidance every step of the way.
            </p>

            <div className="flex items-center justify-center gap-4 text-2xl font-bold mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent animate-pulse">Build</span>
              <span className="text-gray-400">•</span>
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent animate-pulse [animation-delay:200ms]">Launch</span>
              <span className="text-gray-400">•</span>
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent animate-pulse [animation-delay:400ms]">Scale</span>
            </div>
          </div>

          {/* Roadmap Section */}
          <div className="relative max-w-4xl mx-auto">
            {/* SVG Path - Hidden on mobile */}
            <svg 
              className="absolute top-0 left-0 w-full h-[1200px] hidden md:block" 
              viewBox="0 0 400 1200" 
              fill="none" 
              preserveAspectRatio="xMidYMin meet"
            >
              <path
                ref={pathRef}
                d="M200,0 C300,100 100,200 200,300 C300,400 100,500 200,600 C300,700 100,800 200,900 C300,1000 100,1100 200,1200"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeDasharray="8 8"
                fill="none"
                className="animate-pulse"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>

            {/* Animated Rocket - Hidden on mobile */}
            <div 
              ref={rocketRef}
              className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block"
            >
              <img 
                src="/rocket-launch-transparent.png"
                alt="Rocket"
                className="w-24 h-24 object-contain"
              />
              <div className="absolute -bottom-2 -left-2 w-28 h-28 bg-purple-400/20 rounded-full blur-lg"></div>
            </div>

            {/* Roadmap Steps */}
            <div className="relative space-y-8 md:space-y-32">
              {/* Step 1: Ideation & Validation */}
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-full md:w-1/2 md:text-right opacity-0 animate-fade-in">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-purple-400">1. Ideation & Validation</h3>
                    <p className="text-gray-300 text-sm md:text-base">Work with experts to refine your idea and validate market demand through proven frameworks.</p>
                    <div className="mt-4 flex flex-wrap gap-2 md:justify-end">
                      <span className="px-3 py-1 bg-purple-400/20 rounded-full text-xs md:text-sm text-purple-300">Market Research</span>
                      <span className="px-3 py-1 bg-purple-400/20 rounded-full text-xs md:text-sm text-purple-300">Customer Interviews</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: MVP Development */}
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-full md:w-1/2"></div>
                <div className="w-full md:w-1/2 opacity-0 animate-fade-in [animation-delay:200ms]">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-blue-400">2. MVP Development</h3>
                    <p className="text-gray-300 text-sm md:text-base">Build your minimum viable product using no-code tools to get to market faster.</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-400/20 rounded-full text-xs md:text-sm text-blue-300">Rapid Prototyping</span>
                      <span className="px-3 py-1 bg-blue-400/20 rounded-full text-xs md:text-sm text-blue-300">No-Code Tools</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Launch Strategy */}
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-full md:w-1/2 md:text-right opacity-0 animate-fade-in [animation-delay:400ms]">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-cyan-400">3. Launch Strategy</h3>
                    <p className="text-gray-300 text-sm md:text-base">Create a comprehensive go-to-market strategy and prepare for a successful launch.</p>
                    <div className="mt-4 flex flex-wrap gap-2 md:justify-end">
                      <span className="px-3 py-1 bg-cyan-400/20 rounded-full text-xs md:text-sm text-cyan-300">Marketing Plan</span>
                      <span className="px-3 py-1 bg-cyan-400/20 rounded-full text-xs md:text-sm text-cyan-300">Growth Tactics</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Scale & Optimize */}
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-full md:w-1/2"></div>
                <div className="w-full md:w-1/2 opacity-0 animate-fade-in [animation-delay:600ms]">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-green-500/20 hover:border-green-500/40 transition-colors">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-green-400">4. Scale & Optimize</h3>
                    <p className="text-gray-300 text-sm md:text-base">Scale your startup with data-driven decisions and optimize for growth.</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-green-400/20 rounded-full text-xs md:text-sm text-green-300">Analytics</span>
                      <span className="px-3 py-1 bg-green-400/20 rounded-full text-xs md:text-sm text-green-300">Automation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center px-4">
            <div className="inline-block relative p-6 md:p-8 w-full max-w-2xl">
              {/* Fluid background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl blur-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 rounded-2xl animate-pulse"></div>
              
              {/* Content */}
              <div className="relative z-10 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-2xl">
                <h2 className="text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">Ready to Start Your Journey?</h2>
                <p className="text-gray-300 text-sm md:text-base mb-6">
                  Join hundreds of founders who've already launched successful startups through our program.
                </p>
                <button 
                  onClick={() => navigate('/register')}
                  className="px-6 md:px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                >
                  Join the Founders' Hub
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartupBuilder;
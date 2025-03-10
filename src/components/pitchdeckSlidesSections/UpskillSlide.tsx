import React from 'react';
import { GraduationCap, Rocket, Users, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UpskillSlide = () => {
  const navigate = useNavigate();

  return (
    <section className="snap-section flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117]">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <GraduationCap className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">Future of Learning</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Upskill. Innovate.{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Lead.
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Master no-code development and AI tools with hands-on projects.
              Launch your tech career without writing code.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Rocket className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-semibold">Rapid Learning</span>
                </div>
                <p className="text-gray-400 text-sm">Zero to MVP in weeks</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">Expert Network</span>
                </div>
                <p className="text-gray-400 text-sm">Industry leaders</p>
              </div>

              <div className="col-span-2 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span className="text-white font-semibold">Real Projects</span>
                </div>
                <p className="text-gray-400 text-sm">Build as you learn</p>
              </div>
            </div>

            <button 
              onClick={() => navigate('/register')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
            >
              Join the Revolution
              <span className="ml-2">→</span>
            </button>
          </div>

          {/* Right side - Image */}
          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
            <div className="relative w-full max-w-lg aspect-square">
              <img 
                src="/pitch-deck-images/courses-circle.png" 
                alt="Course Ecosystem" 
                className="w-full h-full object-contain animate-float"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
            <div className="text-3xl font-bold text-white mb-1">10+</div>
            <div className="text-gray-400">No-Code Tools</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
            <div className="text-3xl font-bold text-white mb-1">15+</div>
            <div className="text-gray-400">AI Integrations</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
            <div className="text-3xl font-bold text-white mb-1">20+</div>
            <div className="text-gray-400">Live Projects</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
            <div className="text-3xl font-bold text-white mb-1">24/7</div>
            <div className="text-gray-400">Expert Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpskillSlide;
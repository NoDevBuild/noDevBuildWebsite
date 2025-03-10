import React from 'react';
import { Rocket, Zap, Bot, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BuildLaunchSlide = () => {
  const navigate = useNavigate();

  return (
    <section className="snap-section flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white to-gray-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute -left-4 -top-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply opacity-70 animate-blob"></div>
        <div className="absolute -right-4 -top-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-full mb-4 border border-purple-100">
            <Rocket className="w-5 h-5 text-purple-600" />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold">
              Build • Launch • Scale
            </span>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Bring Your Ideas to Life
            </h2>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Without Writing Code
            </div>
          </div>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto mt-4 mb-8">
            Transform your vision into a fully functional AI-powered product in days, not months.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Build Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl transform transition-transform group-hover:scale-105 duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-purple-100 h-full transform transition-all duration-500 group-hover:translate-y-[-4px]">
              <div className="mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                  <Zap className="w-5 h-5 text-white transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Build</h3>
              <p className="text-sm text-gray-600 mb-3">Create powerful applications with our no-code tools and AI integration.</p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Visual Builder</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">AI Integration</span>
              </div>
            </div>
          </div>

          {/* Launch Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl transform transition-transform group-hover:scale-105 duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-blue-100 h-full transform transition-all duration-500 group-hover:translate-y-[-4px]">
              <div className="mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                  <Rocket className="w-5 h-5 text-white transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Launch</h3>
              <p className="text-sm text-gray-600 mb-3">Go from idea to live product in days, not months. Launch faster than ever.</p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Rapid MVP</span>
                <span className="px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">Quick Deploy</span>
              </div>
            </div>
          </div>

          {/* Scale Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-purple-100 rounded-2xl transform transition-transform group-hover:scale-105 duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-cyan-100 h-full transform transition-all duration-500 group-hover:translate-y-[-4px]">
              <div className="mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                  <Bot className="w-5 h-5 text-white transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Scale</h3>
              <p className="text-sm text-gray-600 mb-3">Scale your product with AI automation and proven growth strategies.</p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">AI Powered</span>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Auto Scale</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigate('/register')}
            className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 font-semibold text-base group shadow-xl shadow-purple-500/20"
          >
            Start Building Now
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-45 opacity-0 group-hover:opacity-100 group-hover:animate-[shine_1s_ease] rounded-full"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BuildLaunchSlide;
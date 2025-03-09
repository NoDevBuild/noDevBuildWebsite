import React from 'react';
import { Rocket, Code, Laptop, Bot, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BuildLaunchSlide = () => {
  const navigate = useNavigate();

  return (
    <section className="snap-section flex items-center py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -left-4 -top-4 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply opacity-70 animate-blob"></div>
        <div className="absolute -right-4 -top-4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
            <Rocket className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">Build & Launch</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Build & Launch MVPs with NoDevBuild!
          </h2>
          
          <p className="text-3xl text-gray-300 max-w-3xl mx-auto mb-4">
            No Code. No Limits. Just Build.
          </p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Turn your idea into a fully functional AI-powered product – without writing a single line of code!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                  <Code className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">No-Code + AI</h3>
              <p className="text-gray-300">Build smarter, faster with our integrated no-code and AI tools.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm">Visual Building</span>
                <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm">AI Integration</span>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-green-500/20">
                  <Laptop className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">MVP in Weeks</h3>
              <p className="text-gray-300">From idea to launch, hassle-free development process.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm">Rapid Development</span>
                <span className="px-3 py-1 bg-green-500/20 rounded-full text-green-300 text-sm">Quick Launch</span>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-purple-500/20">
                  <Bot className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">AI-Powered Automations</h3>
              <p className="text-gray-300">Scale effortlessly with intelligent automation.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-500/20 rounded-full text-green-300 text-sm">Smart Workflows</span>
                <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm">Auto-Scaling</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigate('/register')}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 font-semibold text-lg group"
          >
            Start Building Now
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BuildLaunchSlide;
import React from 'react';
import { Brain, Code, DollarSign, Rocket, Bot, Zap } from 'lucide-react';
import { StarfieldBackground } from '../StarfieldBackground';

const AIAdoptionChallengeSlide = () => {
  return (
    <section className="snap-section flex items-center relative overflow-hidden bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117] h-screen">
      <StarfieldBackground />
      
      <div className="absolute inset-0">
        {/* Neural network pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnptMCA2YzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2em0wIDZjMy4zMTQgMCA2LTIuNjg2IDYtNnMtMi42ODYtNi02LTYtNiAyLjY4Ni02IDYgMi42ODYgNiA2IDZ6IiBzdHJva2U9InJnYmEoMTQ3LCA1MSwgMjM0LCAwLjEpIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 backdrop-blur-sm rounded-full mb-6">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">The AI Revolution</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            People using AI will{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">out-play</span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-400 blur-sm"></div>
            </span>
            {' '}you
          </h2>
          <p className="text-xl text-gray-400">No matter the industry, AI adoption is no longer optional</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Entrepreneurs Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 h-full transform transition-transform duration-500 hover:-translate-y-2">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                  <Rocket className="w-6 h-6 text-purple-400 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Entrepreneurs' Challenge</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Code className="w-5 h-5 text-purple-400 mt-1" />
                  <p className="text-gray-300">Want to build AI-powered web apps but lack coding expertise</p>
                </div>
                <div className="flex items-start gap-2">
                  <Bot className="w-5 h-5 text-purple-400 mt-1" />
                  <p className="text-gray-300">Struggle to automate tasks and scale their business with AI</p>
                </div>
              </div>
            </div>
          </div>

          {/* Students Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 h-full transform transition-transform duration-500 hover:-translate-y-2">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                  <Brain className="w-6 h-6 text-blue-400 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Students' Struggle</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Code className="w-5 h-5 text-blue-400 mt-1" />
                  <p className="text-gray-300">Have theoretical knowledge but lack hands-on AI project experience</p>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-blue-400 mt-1" />
                  <p className="text-gray-300">Need to stand out with AI-based projects to secure Full Stack Developer jobs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Freelancers Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-green-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20 h-full transform transition-transform duration-500 hover:-translate-y-2">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-green-500/20 rounded-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                  <DollarSign className="w-6 h-6 text-cyan-400 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Freelancers' Roadblock</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Bot className="w-5 h-5 text-cyan-400 mt-1" />
                  <p className="text-gray-300">AI is reshaping the industry—clients expect AI-powered solutions</p>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-cyan-400 mt-1" />
                  <p className="text-gray-300">Need to upgrade skills to land high-paying AI-related gigs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 text-center">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-full blur-xl"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-8 py-4">
              <p className="text-xl text-white">
                <span className="font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">The Gap?</span>
                {' '}AI-powered development is the future, but most people don't know how to leverage it
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAdoptionChallengeSlide;
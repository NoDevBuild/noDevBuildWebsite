import React from 'react';
import { DollarSign, Clock, Users, Zap, BookOpen, Bot } from 'lucide-react';

const ProblemSolutionSlide = () => {
  return (
    <section className="snap-section flex items-center py-20 relative bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117] h-screen overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0">
        <div className="absolute -left-4 -top-4 w-72 h-72 bg-red-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -right-4 -top-4 w-72 h-72 bg-green-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Problem Section */}
          <div className="reveal space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 rounded-full mb-6">
              <DollarSign className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-medium">The Problem</span>
            </div>
            
            <div className="space-y-4">
              <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-red-500/10 group-hover:scale-110 transition-transform duration-300">
                    <DollarSign className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">High Development Costs</h3>
                    <p className="text-gray-400">Traditional development requires significant investment in technical teams and infrastructure.</p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-red-500/10 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Time to Market</h3>
                    <p className="text-gray-400">Long development cycles delay product launches and market validation.</p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-red-500/10 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Technical Barrier</h3>
                    <p className="text-gray-400">Non-technical founders struggle to bring their ideas to life.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Section */}
          <div className="reveal space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full mb-6">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Our Solution</span>
            </div>
            
            <div className="space-y-4">
              <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-green-500/10 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">No-Code Revolution</h3>
                    <p className="text-gray-400">Comprehensive platform teaching no-code tools and AI integration for rapid development.</p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-green-500/10 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Expert-Led Education</h3>
                    <p className="text-gray-400">Learn from industry experts with proven track records in no-code development.</p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-green-500/10 group-hover:scale-110 transition-transform duration-300">
                    <Bot className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">AI Integration</h3>
                    <p className="text-gray-400">Leverage cutting-edge AI tools to enhance productivity and capabilities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSlide;
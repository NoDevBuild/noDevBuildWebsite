import React from 'react';
import { DollarSign, Clock, Users, Zap, BookOpen, Bot } from 'lucide-react';

const ProblemSolutionSlide = () => {
  return (
    <section className="snap-section flex items-center py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <h2 className="text-3xl font-bold mb-6">The Problem</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <DollarSign className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">High Development Costs</h3>
                  <p className="text-gray-300">Traditional development requires significant investment in technical teams and infrastructure.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <Clock className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Time to Market</h3>
                  <p className="text-gray-300">Long development cycles delay product launches and market validation.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <Users className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Technical Barrier</h3>
                  <p className="text-gray-300">Non-technical founders struggle to bring their ideas to life.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal">
            <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <Zap className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">No-Code Revolution</h3>
                  <p className="text-gray-300">Comprehensive platform teaching no-code tools and AI integration for rapid development.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Expert-Led Education</h3>
                  <p className="text-gray-300">Learn from industry experts with proven track records in no-code development.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <Bot className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">AI Integration</h3>
                  <p className="text-gray-300">Leverage cutting-edge AI tools to enhance productivity and capabilities.</p>
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
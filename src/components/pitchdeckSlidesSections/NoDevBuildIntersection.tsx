import React from 'react';
import { Bot, Code, Rocket } from 'lucide-react';

const NoDevBuildIntersection = () => {
  return (
    <section className="snap-section flex items-center py-20 bg-white relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Left side - Text content (5 columns) */}
          <div className="md:col-span-5">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full mb-8">
              <Bot className="w-5 h-5 text-purple-600" />
              <span className="text-purple-600 text-sm font-medium">The Perfect Intersection</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              Where Innovation Meets Execution
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-purple-50 p-6 rounded-xl border border-purple-100 group hover:bg-purple-100/50 transition-colors">
                <Bot className="w-8 h-8 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-purple-700">AI Integration</h3>
                  <p className="text-gray-600">Powerful AI tools for automation</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-blue-50 p-6 rounded-xl border border-blue-100 group hover:bg-blue-100/50 transition-colors">
                <Code className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-700">No-Code Platform</h3>
                  <p className="text-gray-600">Build without coding</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-green-50 p-6 rounded-xl border border-green-100 group hover:bg-green-100/50 transition-colors">
                <Rocket className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-green-700">Startup Growth</h3>
                  <p className="text-gray-600">Scale with proven frameworks</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Venn diagram (7 columns) */}
          <div className="md:col-span-7 flex justify-center items-center">
            <div className="relative w-full max-w-[600px]">
              <div className="aspect-square relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/pitch-deck-images/nodevbuild-venn.png" 
                    alt="NoDevBuild Intersection" 
                    className="w-[120%] h-[120%] object-contain"
                  />
                </div>
                
                {/* Glowing orbs at intersection points */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-purple-400/50 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-8 h-8 bg-purple-400/50 rounded-full blur-lg animate-pulse animation-delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-blue-400/50 rounded-full blur-lg animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-green-400/50 rounded-full blur-lg animate-pulse animation-delay-3000"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoDevBuildIntersection;
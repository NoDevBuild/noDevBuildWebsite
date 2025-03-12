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
        <div className="flex flex-col md:grid md:grid-cols-12 gap-12 items-start md:items-center">
          {/* Header Section - Full width on mobile */}
          <div className="w-full text-center md:hidden mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full mb-6">
              <Bot className="w-5 h-5 text-purple-600" />
              <span className="text-purple-600 text-sm font-medium">The Perfect Intersection</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              Where Innovation Meets Execution
            </h2>
          </div>

          {/* Venn Diagram - Shows first on mobile */}
          <div className="w-full md:col-span-7 md:order-2 flex justify-center items-center">
            <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[600px]">
              <div className="aspect-square relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/pitch-deck-images/nodevbuild-venn.png" 
                    alt="NoDevBuild Intersection" 
                    className="w-[120%] h-[120%] object-contain animate-pulse-subtle"
                  />
                </div>
                
                {/* Glowing orbs at intersection points */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-purple-400/50 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 bg-purple-400/50 rounded-full blur-lg animate-pulse animation-delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 bg-blue-400/50 rounded-full blur-lg animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-1/4 right-1/3 w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 bg-green-400/50 rounded-full blur-lg animate-pulse animation-delay-3000"></div>
              </div>
            </div>
          </div>

          {/* Left side content - Shows second on mobile */}
          <div className="w-full md:col-span-5 md:order-1">
            {/* Header - Hidden on mobile, visible on desktop */}
            <div className="hidden md:block mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full mb-6">
                <Bot className="w-5 h-5 text-purple-600" />
                <span className="text-purple-600 text-sm font-medium">The Perfect Intersection</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                Where Innovation Meets Execution
              </h2>
            </div>
            
            <div className="space-y-6">
              {/* Each card takes full width on mobile */}
              <div className="flex flex-col items-center md:items-start p-6 bg-purple-50 rounded-xl border border-purple-100 group hover:bg-purple-100/50 transition-colors">
                <div className="mb-4 md:mb-0 md:mr-4">
                  <Bot className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-2 text-purple-700">AI Integration</h3>
                  <p className="text-gray-600">Powerful AI tools for automation</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-start p-6 bg-blue-50 rounded-xl border border-blue-100 group hover:bg-blue-100/50 transition-colors">
                <div className="mb-4 md:mb-0 md:mr-4">
                  <Code className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-2 text-blue-700">No-Code Platform</h3>
                  <p className="text-gray-600">Build without coding</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-start p-6 bg-green-50 rounded-xl border border-green-100 group hover:bg-green-100/50 transition-colors">
                <div className="mb-4 md:mb-0 md:mr-4">
                  <Rocket className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-2 text-green-700">Startup Growth</h3>
                  <p className="text-gray-600">Scale with proven frameworks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoDevBuildIntersection;
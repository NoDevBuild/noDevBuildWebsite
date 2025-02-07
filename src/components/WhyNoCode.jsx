import React from 'react';
import { Sparkles } from 'lucide-react';

const WhyNoCode = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[400px,1fr] gap-16">
          {/* Sticky Left Side */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 text-sm font-medium tracking-wide uppercase">
                Why No Code and AI?
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] mb-6 leading-tight">
              Build faster and at a fraction of the cost
            </h2>
            <p className="text-xl text-gray-600">
              Leverage the power of no-code tools and AI to build your next project faster, cheaper, and more efficiently than traditional development.
            </p>
          </div>

          {/* 2x2 Grid on Right */}
          <div className="grid md:grid-cols-2 gap-8 mt-12 lg:mt-0">
            {/* Build Cheaper */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <img src="/bubble-logo.svg" alt="Cost Icon" className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[#1e293b]">Build cheaper</h3>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Spend a fraction of the cost of hiring developers.
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <img 
                  src="/why-nocode-ai-images/BuildCheaper.png" 
                  alt="Cost Comparison" 
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Ship Faster */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <img src="/figma-logo.svg" alt="Speed Icon" className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[#1e293b]">Ship faster</h3>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Build prototypes and fully functional apps and websites in days, not months.
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <img 
                  src="/why-nocode-ai-images/ShipFaster.png" 
                  alt="Ship Faster Calendar" 
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Launch and Scale */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <img src="/flutterflow-logo.svg" alt="Scale Icon" className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[#1e293b]">Launch and scale</h3>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                No-code tools make it easy to launch and scale your business or workflows.
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <img 
                  src="/why-nocode-ai-images/LaunchScale.png" 
                  alt="Launch and Scale Metrics" 
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Automate Work */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <img src="/zapier-logo.svg" alt="Automation Icon" className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[#1e293b]">Automate work</h3>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Reclaim time in your business with automated processes.
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <img 
                  src="/why-nocode-ai-images/AutomateWork.png" 
                  alt="Automation Workflow" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyNoCode;
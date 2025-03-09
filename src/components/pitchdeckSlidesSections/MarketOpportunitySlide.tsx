import React from 'react';
import { Globe } from 'lucide-react';

const MarketOpportunitySlide = () => {
  return (
    <section className="snap-section flex items-center py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 rounded-full mb-6">
            <Globe className="w-4 h-4 text-purple-600" />
            <span className="text-purple-600 text-sm font-medium">Market Opportunity</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Growing Market Demand
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The AI industry is experiencing unprecedented growth and adoption
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-8 rounded-2xl text-white transform hover:scale-105 transition-transform duration-300">
            <div className="text-5xl font-bold mb-4">37.3%</div>
            <div className="text-xl font-semibold mb-2">CAGR Growth</div>
            <p className="text-white/80">AI industry expected to grow at 37.3% CAGR by 2030</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-2xl text-white transform hover:scale-105 transition-transform duration-300">
            <div className="text-5xl font-bold mb-4">72%</div>
            <div className="text-xl font-semibold mb-2">AI Adoption</div>
            <p className="text-white/80">Of companies prioritize AI and automation in their operations</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-8 rounded-2xl text-white transform hover:scale-105 transition-transform duration-300">
            <div className="text-5xl font-bold mb-4">200%</div>
            <div className="text-xl font-semibold mb-2">No-Code Growth</div>
            <p className="text-white/80">No-code tools are skyrocketing in adoption year over year</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketOpportunitySlide;
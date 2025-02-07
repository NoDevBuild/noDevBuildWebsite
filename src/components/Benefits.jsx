import React from 'react';
import { DollarSign, Zap, Rocket, Bot } from 'lucide-react';

const Benefits = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Us
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:bg-gradient-to-br group-hover:from-blue-200 group-hover:to-green-200">
              <DollarSign className="h-8 w-8 text-blue-600 transition-colors duration-300 group-hover:text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-blue-600">Cost Savings</h3>
            <p className="text-gray-600 transition-colors duration-300 group-hover:text-blue-700">Save thousands on development costs with no-code solutions</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] group-hover:bg-gradient-to-br group-hover:from-yellow-200 group-hover:to-orange-200">
              <Zap className="h-8 w-8 text-yellow-600 transition-colors duration-300 group-hover:text-yellow-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-yellow-600">Speed to Market</h3>
            <p className="text-gray-600 transition-colors duration-300 group-hover:text-yellow-700">Launch your projects 10x faster than traditional development</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] group-hover:bg-gradient-to-br group-hover:from-green-200 group-hover:to-emerald-200">
              <Rocket className="h-8 w-8 text-green-600 transition-colors duration-300 group-hover:text-green-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-green-600">Scale with Ease</h3>
            <p className="text-gray-600 transition-colors duration-300 group-hover:text-green-700">Built-in scalability for growing your business</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] group-hover:bg-gradient-to-br group-hover:from-blue-200 group-hover:to-purple-200">
              <Bot className="h-8 w-8 text-blue-600 transition-colors duration-300 group-hover:text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-purple-600">AI Integration</h3>
            <p className="text-gray-600 transition-colors duration-300 group-hover:text-purple-700">Leverage AI to automate and optimize your workflows</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
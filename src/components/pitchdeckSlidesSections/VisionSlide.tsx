import React from 'react';
import { Star, Rocket, Bot, Users } from 'lucide-react';

const VisionSlide = () => {
  return (
    <section className="snap-section flex items-center py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 rounded-full mb-6">
              <Star className="w-4 h-4 text-purple-600" />
              <span className="text-purple-600 text-sm font-medium">Our Vision</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Democratizing Tech Innovation
            </h2>
            <div className="space-y-6 text-gray-600 text-lg">
              <p>
                We believe that everyone should have the power to build their ideas, regardless of their technical background.
              </p>
              <p>
                NoDev Build is creating a future where innovation is limited only by imagination, not by coding ability.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-blue-100/20 rounded-3xl"></div>
            <div className="relative space-y-8 p-8 backdrop-blur-sm rounded-3xl border border-purple-500/10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation Without Limits</h3>
                  <p className="text-gray-600">Break free from technical constraints. Build sophisticated applications without writing a single line of code.</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Future</h3>
                  <p className="text-gray-600">Harness the power of artificial intelligence to automate workflows and create intelligent applications.</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Community-Driven Growth</h3>
                  <p className="text-gray-600">Join a thriving community of builders, entrepreneurs, and innovators shaping the future of technology.</p>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-full blur-2xl"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSlide;
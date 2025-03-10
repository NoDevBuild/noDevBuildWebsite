import React, { useState, useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';

const MarketOpportunitySlide = () => {
  const [cagr, setCagr] = useState(0);
  const [adoption, setAdoption] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Start counters
          const cagrInterval = setInterval(() => {
            setCagr(prev => prev < 37 ? prev + 2 : 37);
          }, 50);

          const adoptionInterval = setInterval(() => {
            setAdoption(prev => prev < 72 ? prev + 1 : 72);
          }, 30);

          const growthInterval = setInterval(() => {
            setGrowth(prev => prev < 200 ? prev + 3 : 200);
          }, 20);

          // Cleanup intervals when counters reach their targets
          return () => {
            clearInterval(cagrInterval);
            clearInterval(adoptionInterval);
            clearInterval(growthInterval);
          };
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="snap-section flex items-center py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 rounded-full mb-6">
                <Globe className="w-4 h-4 text-purple-600" />
                <span className="text-purple-600 text-sm font-medium">Market Opportunity</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Growing Market Demand
              </h2>
              <p className="text-xl text-gray-600">
                The AI industry is experiencing unprecedented growth and adoption
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-4 rounded-xl text-white transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-4xl font-bold">{cagr}%</div>
                  <div className="text-left">
                    <div className="text-lg font-medium">CAGR Growth</div>
                    <div className="text-sm text-white/80">by 2030</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-xl text-white transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-4xl font-bold">{adoption}%</div>
                  <div className="text-left">
                    <div className="text-lg font-medium">AI Adoption</div>
                    <div className="text-sm text-white/80">Of companies</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-4 rounded-xl text-white transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-4xl font-bold">{growth}%</div>
                  <div className="text-left">
                    <div className="text-lg font-medium">No-Code Growth</div>
                    <div className="text-sm text-white/80">adoption every year</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - AI Adoption Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-blue-100/20 rounded-3xl"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
              <img 
                src="/pitch-deck-images/aiAdoption.png" 
                alt="AI Industry Growth" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketOpportunitySlide;
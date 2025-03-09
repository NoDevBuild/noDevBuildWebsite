import React from 'react';
import { Rocket } from 'lucide-react';

interface CoverSlideProps {
  currentSlide: number;
}

const CoverSlide: React.FC<CoverSlideProps> = ({ currentSlide }) => {
  return (
    <section className="snap-section flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-600 to-blue-700">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
            <Rocket className="w-5 h-5 text-white" />
            <span className="text-white text-sm font-medium">NoDev Build</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white text-center">
            No-Code
            <br />
            <span className="bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
              Revolution
            </span>
          </h1>
          
          <p className="text-2xl text-white/80 max-w-3xl text-center">
            Empowering the next generation of builders with no-code and AI
          </p>

          {currentSlide === 0 && (
            <div className="fixed left-1/2 bottom-12 -translate-x-1/2 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-base animate-bounce">
                Press Space or Enter to continue
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CoverSlide;
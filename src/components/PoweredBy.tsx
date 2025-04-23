import React from 'react';

const PoweredBy = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-block px-3 py-1 bg-blue-50 rounded-full mb-12">
            <span className="text-blue-600 text-sm font-medium tracking-wide uppercase">Tech Empowering</span>
          </div>
          <div className="flex flex-row items-center justify-center gap-32">
            <a 
              href="https://www.bits-pilani.ac.in/dubai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src="/bits-dubai-campus-logo.png" 
                alt="BITS Dubai Campus" 
                className="h-24 w-auto object-contain"
              />
            </a>
            <a 
              href="https://pieds-bitspilani.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src="/pieds-bitspilani.png" 
                alt="PIEDS BITS Pilani" 
                className="h-36 w-auto object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoweredBy; 
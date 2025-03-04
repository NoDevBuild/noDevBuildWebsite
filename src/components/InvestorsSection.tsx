import React from 'react';
import { Link } from 'react-router-dom';

const InvestorsSection = () => (
  <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-4 -top-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply opacity-10 animate-blob"></div>
          <div className="absolute -right-4 -top-4 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main content container */}
        <div className="relative bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-yellow-50 opacity-50"></div>
          
          <div className="relative px-6 py-12 sm:px-12 sm:py-16 text-center">
            {/* Headline */}
            <div className="relative inline-block">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                Find <span className="text-purple-600">Investors</span> investors ready to
                <br />
                <span className="relative inline-block mt-2">
                  fund your startup idea
                  <div className="absolute inset-x-0 bottom-0 h-3 bg-yellow-200 -z-10 transform -rotate-1"></div>
                </span>
              </h2>
              <div className="absolute -top-6 -right-6 w-12 h-12 text-4xl animate-bounce">
                🚀
              </div>
            </div>

            {/* Subtitle */}
            <p className="mt-8 text-xl text-gray-600 max-w-2xl mx-auto">
              Search and connect with top angel investors all over Globe.
            </p>

            {/* CTA Button */}
            <div className="mt-10">
              <Link
                to="/investors"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-700 hover:to-blue-700 transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                Find investors
                <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            {/* dont remove the commented code */}
            {/* Logos Section */}
            {/* <div className="mt-16 relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative">
                <span className="bg-white px-4 text-sm text-gray-500">Our investors come from</span>
              </div>
            </div> */}

            {/* Company Logos */}
            {/* <div className="mt-8">
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all duration-300" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" alt="Airbnb" className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all duration-300" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all duration-300" />
                <img src="https://blume.vc/wp-content/uploads/2022/12/blume-logo.svg" alt="Blume" className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all duration-300" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg" alt="YouTube" className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all duration-300" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Adobe_logo.svg" alt="Adobe" className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all duration-300" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default InvestorsSection;
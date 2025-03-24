import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ParticlesBackground } from './ParticlesBackground';
import { useTypewriter } from '../hooks/useTypewriter';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/authSlice';

const Hero = () => {
  const typedText = useTypewriter(['Faster', 'Smarter', 'Cheaper'], 90, 2000);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleButtonClick = () => {
    if (!!user) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <section className='relative w-full max-w-full pt-32 md:pt-48 lg:pt-64 pb-20 min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117] overflow-hidden'>
      <div className='absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-purple-500/5 to-transparent'></div>
      <ParticlesBackground />
      
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <div className='md:max-w-2xl'>
          <div className='space-y-4 sm:space-y-6'>
            <h1 className='text-5xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] sm:leading-tight'>
              Master{' '}
              <span className='text-purple-400 relative'>
                No-Code
                <span className='absolute -bottom-2 left-0 w-full h-1 bg-purple-400/30 rounded-full'></span>
              </span>{' '}
              &{' '}
              <span className='text-purple-400 relative'>
                AI
                <span className='absolute -bottom-2 left-0 w-full h-1 bg-purple-400/30 rounded-full'></span>
              </span>
            </h1>
            <h2 className='text-5xl sm:text-4xl md:text-6xl font-bold text-white leading-[1.1] sm:leading-tight'>
              Build{' '}
              <span className='text-purple-400 relative inline-flex'>
                {typedText}
              </span>
            </h2>
          </div>

          <p className='text-lg sm:text-lg md:text-xl text-gray-300 mt-6 mb-8 leading-relaxed max-w-[90%] sm:max-w-full'>
            Learn from industry experts and build real-world projects.
            Launch your career in tech without writing code.
          </p>

          <button
            onClick={handleButtonClick}
            className='inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-8 py-4 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-700 
              text-white text-lg sm:text-lg font-semibold rounded-lg transform transition-all duration-200 ease-out 
              hover:scale-105 hover:shadow-lg hover:from-purple-500 hover:to-purple-600
              active:scale-95 relative overflow-hidden group animate-pulse-glow
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0d1117]
              touch-manipulation cursor-pointer select-none'
            type='button'
            role='button'
            aria-label={!!user ? 'Lessgoo!' : 'Register Now'}
          >
            <span className='relative z-10'>{!!user ? 'Lessgoo!' : 'Register Now'}</span>
            <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left'></div>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
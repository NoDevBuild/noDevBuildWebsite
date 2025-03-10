import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

// Import slide components
import CoverSlide from '../components/pitchdeckSlidesSections/CoverSlide';
import VisionSlide from '../components/pitchdeckSlidesSections/VisionSlide';
import NoDevBuildIntersection from '../components/pitchdeckSlidesSections/NoDevBuildIntersection';
import ProblemSolutionSlide from '../components/pitchdeckSlidesSections/ProblemSolutionSlide';
import BuildLaunchSlide from '../components/pitchdeckSlidesSections/BuildLaunchSlide';
import UpskillSlide from '../components/pitchdeckSlidesSections/UpskillSlide';
import MarketOpportunitySlide from '../components/pitchdeckSlidesSections/MarketOpportunitySlide';
import FounderEcosystemSlide from '../components/pitchdeckSlidesSections/FounderEcosystemSlide';
import ContactSlide from '../components/pitchdeckSlidesSections/ContactSlide';

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSlides = 9; // Updated to include new slide

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const slideHeight = window.innerHeight;
      const currentIndex = Math.round(scrollPosition / slideHeight);
      setCurrentSlide(currentIndex);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'ArrowDown') {
        e.preventDefault();
        if (currentSlide < totalSlides - 1) {
          const nextSlide = currentSlide + 1;
          setCurrentSlide(nextSlide);
          container.scrollTo({
            top: nextSlide * window.innerHeight,
            behavior: 'smooth'
          });
        }
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        if (currentSlide > 0) {
          const prevSlide = currentSlide - 1;
          setCurrentSlide(prevSlide);
          container.scrollTo({
            top: prevSlide * window.innerHeight,
            behavior: 'smooth'
          });
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentSlide]);

  const scrollToSlide = (index: number) => {
    containerRef.current?.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    });
    setCurrentSlide(index);
  };

  return (
    <div className="h-screen w-full bg-white overflow-hidden">
      <Link 
        to="/" 
        className="fixed top-6 left-6 z-50 transition-transform duration-200 hover:scale-110"
      >
        <img src="/noDevBuildFavicon.png" alt="NoDev Build" className="w-12 h-12" />
      </Link>

      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 space-y-2 z-50">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-purple-600 scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      <div ref={containerRef} className="snap-container hide-scrollbar">
        <CoverSlide currentSlide={currentSlide} />
        <NoDevBuildIntersection />
        <VisionSlide />
        <UpskillSlide />
        <BuildLaunchSlide />
        <FounderEcosystemSlide />
        <ProblemSolutionSlide />        
        <MarketOpportunitySlide />
        <ContactSlide />
      </div>
    </div>
  );
};

export default PitchDeck;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Star, Check, X, ChevronLeft, Shield, Clock, Tag } from 'lucide-react';
import { ParticlesBackground } from '../components/ParticlesBackground';
import { aiToolsService } from '../services/aiToolsService';
import { AITool } from '../types/AITool';

const AIToolDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [tool, setTool] = useState<AITool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(0);

  useEffect(() => {
    const fetchTool = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await aiToolsService.getToolById(id);
        setTool(data);
      } catch (err) {
        setError('Failed to load tool details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [id]);

  // Add scroll event listener to detect when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Activate glow effect when scrolled past a certain point (e.g., 200px)
      setIsScrolled(scrollPosition > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Measure the sidebar width on mount and window resize
  useEffect(() => {
    const updateSidebarWidth = () => {
      const sidebarElement = document.getElementById('sidebar-container');
      if (sidebarElement) {
        setSidebarWidth(sidebarElement.offsetWidth);
      }
    };

    // Initial measurement
    updateSidebarWidth();

    // Update on resize
    window.addEventListener('resize', updateSidebarWidth);
    return () => window.removeEventListener('resize', updateSidebarWidth);
  }, [loading]); // Re-measure when loading changes (content is rendered)

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117] relative">
        <ParticlesBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117] relative">
        <ParticlesBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-red-500 bg-red-100 p-4 rounded-lg mb-4">
              {error || "Tool not found"}
            </div>
            <Link 
              to="/ai-tools"
              className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to AI Tools
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117] relative">
      <ParticlesBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Back Link */}
        <div className="mb-6">
          <Link 
            to="/ai-tools"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to AI Tools
          </Link>
        </div>
        
        {/* Tool Header */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden">
              <img 
                src={tool.logo} 
                alt={`${tool.name} logo`} 
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/chatgpt-logo.svg'; // Fallback logo
                }}
              />
            </div>
            
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-white mb-2">{tool.name}</h1>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="inline-block px-3 py-1 bg-purple-900/30 text-purple-300 text-sm rounded-full">
                  {tool.category}
                </span>
                {tool.api_available && (
                  <span className="inline-block px-3 py-1 bg-green-900/30 text-green-300 text-sm rounded-full">
                    API Available
                  </span>
                )}
                {tool.pricing.free && (
                  <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-300 text-sm rounded-full">
                    Free Plan
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <div className="flex mr-2">
                  {renderStars(tool.rating)}
                </div>
                <span className="text-white">{tool.rating.toFixed(1)}</span>
                <span className="text-gray-400 ml-1">({tool.reviews_count} reviews)</span>
              </div>
            </div>
            
            <a 
              href={tool.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center whitespace-nowrap"
            >
              Visit Website
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">About {tool.name}</h2>
              <p className="text-gray-300 leading-relaxed">
                {tool.description}
              </p>
            </div>
            
            {/* Features */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tool.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mt-0.5 mr-3 flex-shrink-0">
                      <Check className="h-5 w-5 text-green-400" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tags */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag, index) => (
                  <div key={index} className="flex items-center px-3 py-1.5 bg-gray-800 rounded-full">
                    <Tag className="h-3.5 w-3.5 text-purple-400 mr-1.5" />
                    <span className="text-gray-300 text-sm">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reviews Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">User Reviews</h2>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                  Write a Review
                </button>
              </div>
              
              {/* Sample Reviews */}
              <div className="space-y-6">
                <div className="border-b border-gray-700 pb-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold mr-3">
                      JD
                    </div>
                    <div>
                      <h4 className="text-white font-medium">John Doe</h4>
                      <div className="flex items-center">
                        <div className="flex">
                          {renderStars(5)}
                        </div>
                        <span className="text-gray-400 text-sm ml-2">1 month ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    This tool has completely transformed my workflow. The interface is intuitive and the results are impressive. Highly recommended!
                  </p>
                </div>
                
                <div className="border-b border-gray-700 pb-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white font-semibold mr-3">
                      AS
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Alice Smith</h4>
                      <div className="flex items-center">
                        <div className="flex">
                          {renderStars(4)}
                        </div>
                        <span className="text-gray-400 text-sm ml-2">2 months ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    Great tool with lots of features. The only downside is that the free tier is quite limited, but the paid version is worth it.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold mr-3">
                      RJ
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Robert Johnson</h4>
                      <div className="flex items-center">
                        <div className="flex">
                          {renderStars(5)}
                        </div>
                        <span className="text-gray-400 text-sm ml-2">3 months ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    I've tried many similar tools, but this one stands out for its accuracy and speed. The customer support is also excellent.
                  </p>
                </div>
              </div>
              
              {/* View More Button */}
              <div className="mt-6 text-center">
                <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                  View All {tool.reviews_count} Reviews
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Sidebar */}
          <div id="sidebar-container" className="space-y-6">
            {/* Pricing Card with Glow Effect - Fixed position when scrolled */}
            <div className="relative">
              <div 
                className={`${
                  isScrolled 
                    ? 'fixed top-24' 
                    : 'relative'
                } transition-all duration-500 z-20`}
                style={{
                  width: isScrolled ? sidebarWidth : '100%'
                }}
              >
                {isScrolled ? (
                  // Simplified version when scrolled
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)] animate-[pulse_2s_infinite]">
                    <h2 className="text-xl font-bold text-white text-center mb-3">Try {tool.name} Now!</h2>
                    <a 
                      href={tool.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 text-center font-semibold transform hover:scale-105"
                    >
                      Visit Website
                    </a>
                  </div>
                ) : (
                  // Full version when not scrolled
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-semibold text-white mb-4">Pricing</h2>
                    
                    <div className="space-y-4 mb-6">
                      {tool.pricing.free && (
                        <div className="flex items-start">
                          <div className="mt-0.5 mr-3 flex-shrink-0">
                            <Check className="h-5 w-5 text-green-400" />
                          </div>
                          <div>
                            <span className="text-white font-medium">Free Plan Available</span>
                            <p className="text-gray-400 text-sm">Get started without a credit card</p>
                          </div>
                        </div>
                      )}
                      
                      {tool.pricing.paid && (
                        <div className="flex items-start">
                          <div className="mt-0.5 mr-3 flex-shrink-0">
                            <Check className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <span className="text-white font-medium">Paid Plans</span>
                            <p className="text-gray-400 text-sm">{tool.pricing.price_range}</p>
                          </div>
                        </div>
                      )}
                      
                      {!tool.pricing.free && !tool.pricing.paid && (
                        <div className="flex items-start">
                          <div className="mt-0.5 mr-3 flex-shrink-0">
                            <X className="h-5 w-5 text-red-400" />
                          </div>
                          <span className="text-gray-300">Pricing information not available</span>
                        </div>
                      )}
                    </div>
                    
                    <a 
                      href={tool.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-center"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            {/* Additional Info - Add margin-top when pricing card is fixed */}
            <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700 ${isScrolled ? 'mt-[120px]' : ''}`}>
              <h2 className="text-xl font-semibold text-white mb-4">Additional Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-0.5 mr-3 flex-shrink-0">
                    <Clock className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-white font-medium">Last Updated</span>
                    <p className="text-gray-400 text-sm">{tool.updated_at}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-0.5 mr-3 flex-shrink-0">
                    <Shield className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-white font-medium">API Available</span>
                    <p className="text-gray-400 text-sm">
                      {tool.api_available ? 'Yes, developer API available' : 'No API available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Similar Tools */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">Similar Tools</h2>
              
              <div className="space-y-4">
                {/* This would be dynamically populated with similar tools */}
                <div className="flex items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden mr-3">
                    <img 
                      src="/ai-logo.svg" 
                      alt="Similar tool logo" 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-white font-medium">Similar AI Tool 1</h4>
                    <div className="flex">
                      {renderStars(4.5)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden mr-3">
                    <img 
                      src="/ai-logo.svg" 
                      alt="Similar tool logo" 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-white font-medium">Similar AI Tool 2</h4>
                    <div className="flex">
                      {renderStars(4.2)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden mr-3">
                    <img 
                      src="/ai-logo.svg" 
                      alt="Similar tool logo" 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-white font-medium">Similar AI Tool 3</h4>
                    <div className="flex">
                      {renderStars(3.8)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIToolDetailPage;
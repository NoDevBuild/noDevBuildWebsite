import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, ExternalLink, ChevronDown, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ParticlesBackground } from '../components/ParticlesBackground';
import { aiToolsService } from '../services/aiToolsService';
import { AITool } from '../types/AITool';

const AIToolsPage = () => {
  const [tools, setTools] = useState<AITool[]>([]);
  const [filteredTools, setFilteredTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showApiOnly, setShowApiOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  
  // Categories derived from tools
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        const data = await aiToolsService.getAllTools();
        setTools(data);
        setFilteredTools(data);
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map(tool => tool.category)));
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Failed to load AI tools. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  // Apply filters when any filter changes
  useEffect(() => {
    let result = [...tools];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(query) || 
        tool.description.toLowerCase().includes(query) ||
        tool.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(tool => tool.category === selectedCategory);
    }
    
    // Apply free only filter
    if (showFreeOnly) {
      result = result.filter(tool => tool.pricing.free);
    }
    
    // Apply API only filter
    if (showApiOnly) {
      result = result.filter(tool => tool.api_available);
    }
    
    // Apply rating filter
    if (minRating > 0) {
      result = result.filter(tool => tool.rating >= minRating);
    }
    
    setFilteredTools(result);
  }, [searchQuery, selectedCategory, showFreeOnly, showApiOnly, minRating, tools]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setShowFreeOnly(false);
    setShowApiOnly(false);
    setMinRating(0);
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
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

  if (error) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117] relative">
        <ParticlesBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500 bg-red-100 p-4 rounded-lg">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117] relative">
      <ParticlesBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">AI Tools Directory</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the best AI tools for your projects. From chatbots to image generation, find the perfect tool to enhance your workflow.
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AI tools..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              {/* Filter Toggle Button (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Desktop Filters */}
              <div className="hidden md:flex items-center gap-4">
                {/* Category Dropdown */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
                
                {/* Free Only Checkbox */}
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={showFreeOnly}
                    onChange={() => setShowFreeOnly(!showFreeOnly)}
                    className="form-checkbox h-5 w-5 text-purple-600 rounded border-gray-600 bg-gray-800 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-white">Free Only</span>
                </label>
                
                {/* API Available Checkbox */}
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={showApiOnly}
                    onChange={() => setShowApiOnly(!showApiOnly)}
                    className="form-checkbox h-5 w-5 text-purple-600 rounded border-gray-600 bg-gray-800 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-white">API Available</span>
                </label>
                
                {/* Rating Filter */}
                <div className="flex items-center">
                  <span className="text-white mr-2">Min Rating:</span>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="appearance-none block w-20 px-3 py-2 border border-gray-600 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="0">Any</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="4.5">4.5+</option>
                  </select>
                </div>
                
                {/* Clear Filters Button */}
                {(searchQuery || selectedCategory || showFreeOnly || showApiOnly || minRating > 0) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center px-3 py-2 text-white hover:text-purple-300 transition-colors"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </button>
                )}
              </div>
            </div>
            
            {/* Mobile Filters (Expandable) */}
            {showFilters && (
              <div className="mt-4 md:hidden space-y-4 border-t border-gray-700 pt-4">
                {/* Category Dropdown */}
                <div className="relative">
                  <label className="block text-white text-sm font-medium mb-1">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {/* Free Only Checkbox */}
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={showFreeOnly}
                      onChange={() => setShowFreeOnly(!showFreeOnly)}
                      className="form-checkbox h-5 w-5 text-purple-600 rounded border-gray-600 bg-gray-800 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-white">Free Only</span>
                  </label>
                  
                  {/* API Available Checkbox */}
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={showApiOnly}
                      onChange={() => setShowApiOnly(!showApiOnly)}
                      className="form-checkbox h-5 w-5 text-purple-600 rounded border-gray-600 bg-gray-800 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-white">API Available</span>
                  </label>
                </div>
                
                {/* Rating Filter */}
                <div>
                  <label className="block text-white text-sm font-medium mb-1">Minimum Rating</label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="0">Any Rating</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                  </select>
                </div>
                
                {/* Clear Filters Button */}
                {(searchQuery || selectedCategory || showFreeOnly || showApiOnly || minRating > 0) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center justify-center w-full px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-6 text-gray-300">
          {filteredTools.length === 0 ? (
            <p>No tools found matching your criteria. Try adjusting your filters.</p>
          ) : (
            <p>Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}</p>
          )}
        </div>
        
        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <Link 
              key={tool.id} 
              to={`/ai-tools/${tool.id}`}
              className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden mr-3">
                    <img 
                      src={tool.logo} 
                      alt={`${tool.name} logo`} 
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/chatgpt-logo.svg'; // Fallback logo
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {tool.name}
                    </h3>
                    <span className="inline-block px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-full">
                      {tool.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 line-clamp-2">
                  {tool.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {renderStars(tool.rating)}
                    <span className="ml-2 text-gray-400 text-sm">({tool.reviews_count})</span>
                  </div>
                  
                  <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                    <span className="text-sm mr-1">Details</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 bg-white/5 backdrop-blur-sm rounded-xl mt-8">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Search className="h-10 w-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
            <p className="text-gray-400 text-center max-w-md mb-6">
              We couldn't find any AI tools matching your search criteria. Try adjusting your filters or search query.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIToolsPage;
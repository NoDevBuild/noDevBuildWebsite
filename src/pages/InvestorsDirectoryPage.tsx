import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, X, ExternalLink, Check, MapPin, Briefcase, Tag, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ParticlesBackground } from '../components/ParticlesBackground';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

// Define Investor type
interface Investor {
  id: string;
  name: string;
  headline: string;
  company: string;
  location: string;
  avatar: string;
  tags: string[];
  verified: boolean;
}

const InvestorsDirectoryPage = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [filteredInvestors, setFilteredInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const isPremium = false; // This would be determined from user data in a real app
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showViewed, setShowViewed] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Derived data
  const [locations, setLocations] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // const response = await api.get('/investors');
        // setInvestors(response.data);
        
        // Using mock data for now
        const mockInvestors = getMockInvestors();
        setInvestors(mockInvestors);
        setFilteredInvestors(mockInvestors);
        
        // Extract unique locations and industries
        const uniqueLocations = Array.from(new Set(mockInvestors.map(investor => investor.location)));
        setLocations(uniqueLocations);
        
        const allTags = mockInvestors.flatMap(investor => investor.tags);
        const uniqueIndustries = Array.from(new Set(allTags));
        setIndustries(uniqueIndustries);
      } catch (err) {
        setError('Failed to load investors. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestors();
  }, []);

  // Apply filters when any filter changes
  useEffect(() => {
    let result = [...investors];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(investor => 
        investor.name.toLowerCase().includes(query) || 
        investor.headline.toLowerCase().includes(query) ||
        investor.company.toLowerCase().includes(query)
      );
    }
    
    // Apply location filter
    if (selectedLocation) {
      result = result.filter(investor => investor.location === selectedLocation);
    }
    
    // Apply industry filter
    if (selectedIndustry) {
      result = result.filter(investor => investor.tags.includes(selectedIndustry));
    }
    
    // Apply verified only filter
    if (showVerifiedOnly) {
      result = result.filter(investor => investor.verified);
    }
    
    // In a real app, we would filter by viewed status based on user data
    // if (showViewed) {
    //   result = result.filter(investor => investor.viewed);
    // }
    
    setFilteredInvestors(result);
  }, [searchQuery, selectedLocation, selectedIndustry, showVerifiedOnly, showViewed, investors]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('');
    setSelectedIndustry('');
    setShowVerifiedOnly(false);
    setShowViewed(false);
  };

  const handleViewClick = () => {
    if (!user || !isPremium) {
      setShowRegisterModal(true);
    } else {
      // In a real app, this would navigate to the investor detail page
      // navigate(`/investors/${investorId}`);
    }
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(false);
    navigate('/register');
  };

  // Function to obscure name (e.g., "John Doe" -> "J**n D*e")
  const obscureName = (name: string) => {
    const parts = name.split(' ');
    return parts.map(part => {
      if (part.length <= 1) return part;
      const firstChar = part[0];
      const lastChar = part[part.length - 1];
      const middleChars = 'X'.repeat(part.length - 2);
      return firstChar + middleChars + lastChar;
    }).join(' ');
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredInvestors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvestors = filteredInvestors.slice(startIndex, endIndex);

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
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Investor database</h1>
          {/* <div className="flex items-center">
            <div className="flex items-center mr-4">
              <span className="inline-block w-5 h-5 bg-yellow-400 rounded-full mr-2"></span>
              <span className="text-gray-700">Credits: 0/0</span>
            </div>
            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg flex items-center">
              <span className="mr-2">⭐</span>
              Get more credits
            </button>
          </div> */}
        </div>
        
        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Location Dropdown */}
          <div className="relative w-full md:w-64">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          
          {/* Industry Dropdown */}
          <div className="relative w-full md:w-64">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Filter by industry...</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          
          {/* Show Viewed Toggle */}
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                disabled={true}
                checked={showViewed}
                onChange={() => setShowViewed(!showViewed)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-700">Show Viewed</span>
            </label>
          </div>
        </div>
        
        {/* Investors Table - Desktop */}
        <div className="hidden md:block bg-white shadow rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-gray-50 py-4 px-6 border-b">
            <div className="text-sm font-medium text-gray-500">INVESTOR NAME</div>
            <div className="text-sm font-medium text-gray-500">HEADLINE</div>
            <div className="text-sm font-medium text-gray-500">COMPANY</div>
            <div className="text-sm font-medium text-gray-500">LOCATION</div>
          </div>
          
          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {currentInvestors.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No investors found matching your criteria.
              </div>
            ) : (
              currentInvestors.map((investor) => (
                <div key={investor.id} className="grid grid-cols-4 py-4 px-6 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4 flex-shrink-0 relative">
                      {/* Blurred image with lock icon for non-premium users */}
                      <img 
                        src={investor.avatar} 
                        alt={investor.name} 
                        className={`h-full w-full object-cover ${!isPremium ? 'blur-sm' : ''}`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(investor.name);
                        }}
                      />
                      {!isPremium && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Lock className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">
                          {isPremium ? investor.name : obscureName(investor.name)}
                        </span>
                        {investor.verified && (
                          <span className="ml-2 text-blue-500">
                            <Check className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {investor.tags.slice(0, 2).map((tag, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                        {investor.tags.length > 2 && (
                          <span className="text-xs text-gray-500">+{investor.tags.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    {investor.headline}
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                    {investor.company}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-700">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      {investor.location}
                    </div>
                    <button 
                      onClick={handleViewClick}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Investors Cards - Mobile */}
        <div className="md:hidden space-y-4">
          {currentInvestors.length === 0 ? (
            <div className="py-8 text-center text-gray-500 bg-white shadow rounded-lg">
              No investors found matching your criteria.
            </div>
          ) : (
            currentInvestors.map((investor) => (
              <div key={investor.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4 flex-shrink-0 relative">
                      {/* Blurred image with lock icon for non-premium users */}
                      <img 
                        src={investor.avatar} 
                        alt={investor.name} 
                        className={`h-full w-full object-cover ${!isPremium ? 'blur-sm' : ''}`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(investor.name);
                        }}
                      />
                      {!isPremium && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Lock className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">
                          {isPremium ? investor.name : obscureName(investor.name)}
                        </span>
                        {investor.verified && (
                          <span className="ml-2 text-blue-500">
                            <Check className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {investor.tags.slice(0, 2).map((tag, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                        {investor.tags.length > 2 && (
                          <span className="text-xs text-gray-500">+{investor.tags.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-700 line-clamp-2">{investor.headline}</p>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-700 mb-2">
                    <Briefcase className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                    <span className="truncate">{investor.company}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-700">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>{investor.location}</span>
                    </div>
                    <button 
                      onClick={handleViewClick}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
          
        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-center border-t mt-4 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            {currentPage > 1 && (
              <button 
                className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
            )}
            <span className="text-gray-700">Page {currentPage} of 57</span>
            <button 
              className="px-3 py-1 border border-gray-300 rounded text-gray-700 opacity-50 cursor-not-allowed"
              disabled={true}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Feature</h3>
              <p className="text-gray-600">
                You need to register and upgrade to a premium account to view investor details.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowRegisterModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRegisterClick}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Mock data function
function getMockInvestors(): Investor[] {
  return [
    {
      id: "1",
      name: "Rajesh Kumar",
      headline: "Early Stage VC Investment Expert at Cedar-Ibsi Capital & Fintech Lab, specializing in Venture Capital and Private Equity. NMIMS graduate.",
      company: "Cedar-Ibsi Capital & Fintech Lab",
      location: "India",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      tags: ["Tech", "Consumer", "SaaS", "E-commerce"],
      verified: true
    },
    {
      id: "2",
      name: "Maya Venkatesan",
      headline: "Developing solutions @ Uber",
      company: "Uber",
      location: "Canada",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      tags: ["Fintech", "SaaS", "Tech", "Healthcare"],
      verified: false
    },
    {
      id: "3",
      name: "Marcus Nagtegaal",
      headline: "Former MessageBird COO Mayke Nagtegaal Leverages Success to Champion Global Startups in Investment Space",
      company: "Netherlands",
      location: "Netherlands",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      tags: ["Tech", "SaaS"],
      verified: false
    },
    {
      id: "4",
      name: "Maria Fernandez",
      headline: "Forbes 30 under 30 eCommerce",
      company: "Hypeal.Com (Abn Amro + Techstars '23)",
      location: "Netherlands",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      tags: ["E-commerce", "Tech", "Retail"],
      verified: true
    },
    {
      id: "5",
      name: "Uchida Takahashi",
      headline: "AI Engineer, Gen AI, at Valuence Technologies; IIT Kharagpur Alumni.",
      company: "Valuence Technologies",
      location: "Japan",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      tags: ["Tech", "AI", "Machine Learning"],
      verified: false
    },
    {
      id: "6",
      name: "Sofia Almeida",
      headline: "Founder and VP specializing in Consumer Credit Finance and Financial Services. Expert in Credit Collection Risk, loans, Fintech, and retail sectors.",
      company: "Correios",
      location: "Brazil",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      tags: ["Consumer", "Tech", "Fintech", "E-commerce"],
      verified: false
    },
    {
      id: "7",
      name: "George Fox",
      headline: "Focused entrepreneur and engineer at New Automotive, committed to creating long-term value and making a significant impact.",
      company: "New Automotive",
      location: "United Kingdom",
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
      tags: ["Tech", "Automotive", "Engineering"],
      verified: true
    },
    {
      id: "8",
      name: "Vikram Singh",
      headline: "Managing Partner at Venture Garage, guiding startups on their journey from $0 to $100mil.",
      company: "Venturegarage",
      location: "India",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      tags: ["Consumer", "Tech", "Healthcare", "Fintech"],
      verified: true
    },
    {
      id: "9",
      name: "Emma Lewis",
      headline: "As the Chief Revenue Officer at Linearity, I am responsible for spearheading strategies to drive growth and profitability.",
      company: "Linearity",
      location: "United Kingdom",
      avatar: "https://randomuser.me/api/portraits/women/9.jpg",
      tags: ["SaaS", "Tech", "Revenue Growth"],
      verified: true
    },
    {
      id: "10",
      name: "Catherine Green",
      headline: "Driving strategy for key accounts at Cognism.",
      company: "Cognism",
      location: "United Kingdom",
      avatar: "https://randomuser.me/api/portraits/women/10.jpg",
      tags: ["SaaS", "Sales", "B2B"],
      verified: true
    },
    {
      id: "11",
      name: "David Chen",
      headline: "Angel investor with 15+ investments in AI and SaaS startups. Former CTO at TechGiant.",
      company: "Independent",
      location: "Singapore",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
      tags: ["AI", "SaaS", "Tech", "Angel Investing"],
      verified: true
    },
    {
      id: "12",
      name: "Sarah Johnson",
      headline: "Partner at BlueOcean Ventures, focusing on healthcare innovation and biotech startups.",
      company: "BlueOcean Ventures",
      location: "United States",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      tags: ["Healthcare", "Biotech", "MedTech"],
      verified: true
    },
    {
      id: "13",
      name: "Michael Rodriguez",
      headline: "Seed investor specializing in climate tech and sustainable solutions. Backed 20+ startups in renewable energy.",
      company: "GreenFuture Capital",
      location: "Spain",
      avatar: "https://randomuser.me/api/portraits/men/13.jpg",
      tags: ["CleanTech", "Sustainability", "Renewable Energy"],
      verified: false
    },
    {
      id: "14",
      name: "Aisha Patel",
      headline: "Investment Director at TechStars, mentoring early-stage founders in the B2B SaaS space.",
      company: "TechStars",
      location: "United Arab Emirates",
      avatar: "https://randomuser.me/api/portraits/women/14.jpg",
      tags: ["B2B", "SaaS", "Accelerator", "Mentorship"],
      verified: true
    },
    {
      id: "15",
      name: "Thomas Schmidt",
      headline: "Managing Partner at European Innovation Fund, investing in deep tech across the continent.",
      company: "European Innovation Fund",
      location: "Germany",
      avatar: "https://randomuser.me/api/portraits/men/15.jpg",
      tags: ["DeepTech", "Hardware", "AI", "Robotics"],
      verified: true
    }
  ];
}

export default InvestorsDirectoryPage;
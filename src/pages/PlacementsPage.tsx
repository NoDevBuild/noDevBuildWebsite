import React from 'react';
import { Brain, Rocket, Star, Users, ChevronRight, CheckCircle, Briefcase, BookOpen, Award, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ParticlesBackground } from '../components/ParticlesBackground';

const PlacementsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-purple-600 to-blue-700 flex items-center">
        <ParticlesBackground />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left side content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
                <Brain className="w-5 h-5 text-purple-200" />
                <span className="text-purple-200 text-sm font-medium">NoDevBuild Placements</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Master AI Skills & Get Hired
                <span className="block text-purple-200">Your Dream Job Starts Here!</span>
              </h1>
              
              <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                Work on real-world AI projects, upskill with industry leaders, and get placed in top companies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 shadow-xl shadow-purple-900/20"
                >
                  Start Your Placement Journey!
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                
                {/* <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-200">
                  Learn More
                </button> */}
              </div>

              {/* Stats */}
              {/* <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">95%</div>
                  <div className="text-purple-200">Placement Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-purple-200">Students Placed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">50+</div>
                  <div className="text-purple-200">Partner Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">₹12L</div>
                  <div className="text-purple-200">Avg. Package</div>
                </div>
              </div> */}
            </div>

            {/* Right side image */}
            <div className="flex-1 relative">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Glowing orbs */}
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                
                {/* Main image */}
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80"
                    alt="Student working on AI projects"
                    className="rounded-2xl shadow-2xl shadow-purple-900/20 border-4 border-white/20 backdrop-blur-sm"
                  />
                  
                  {/* Floating badges */}
                  <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl rotate-6 hover:rotate-0 transition-transform duration-300">
                    <Star className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl -rotate-6 hover:rotate-0 transition-transform duration-300">
                    <Rocket className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/80">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1.5 h-1.5 bg-white/80 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div> */}
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose NoDevBuild Placements?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive program is designed to transform your skills and career prospects in the AI industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hands-on AI Projects</h3>
              <p className="text-gray-600">Develop and showcase industry-ready AI solutions.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Top-Tier Mentorship</h3>
              <p className="text-gray-600">Learn directly from experts at Google, Microsoft, OpenAI, and more.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Resume & Interview Training</h3>
              <p className="text-gray-600">Receive personalized guidance to secure top positions.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Exclusive Hiring Network</h3>
              <p className="text-gray-600">Connect with VC-backed startups and global enterprises.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mentorship Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left side image */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 rounded-3xl transform rotate-3"></div>
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80"
                  alt="Mentorship"
                  className="relative rounded-3xl shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Right side content */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Mentorship & Training by Industry Experts
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Learn directly from professionals at the world's leading tech companies who are shaping the future of AI.
              </p>
              <div className="space-y-4">
                {['Google', 'Microsoft', 'OpenAI', 'Amazon', 'Meta'].map((company) => (
                  <div key={company} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-lg text-gray-700">Expert mentors from {company}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Placement Success Roadmap
            </h2>
            <p className="text-xl text-gray-600">
              Follow our proven path to secure your dream job in the AI industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Upskill with AI Training</h3>
                <p className="text-gray-600">Master cutting-edge AI technologies through hands-on learning and expert-led workshops.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Rocket className="w-6 h-6 text-blue-600" />
                </div>
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Develop AI Projects</h3>
                <p className="text-gray-600">Build real-world AI applications that demonstrate your skills and solve industry challenges.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Resume & Interview Preparation</h3>
                <p className="text-gray-600">Receive personalized coaching to craft a standout resume and ace technical interviews.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Your Dream Job</h3>
                <p className="text-gray-600">Connect with our network of hiring partners and land a position at a top tech company.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlacementsPage;
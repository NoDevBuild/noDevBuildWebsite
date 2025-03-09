import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  Users, 
  Target, 
  TrendingUp, 
  Globe, 
  Zap,
  Award,
  DollarSign,
  BookOpen,
  Bot,
  BarChart3,
  ArrowRight,
  Clock,
  CheckCircle,
  Star,
  Briefcase,
  Building,
  GraduationCap,
  Laptop,
  Code
} from 'lucide-react';

const PitchDeck = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Cover Slide */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-600 to-blue-700">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
            <Rocket className="w-5 h-5 text-white" />
            <span className="text-white text-sm font-medium">NoDev Build</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white">
            No-Code
            <br />
            <span className="bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
              Revolution
            </span>
          </h1>
          
          <p className="text-2xl text-white/80 max-w-3xl mx-auto">
            Empowering the next generation of builders with no-code and AI
          </p>
        </div>
      </section>

      {/* Vision Slide */}
      <section className="min-h-screen flex items-center py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 rounded-full mb-6">
                <Star className="w-4 h-4 text-purple-600" />
                <span className="text-purple-600 text-sm font-medium">Our Vision</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Democratizing Tech Innovation
              </h2>
              <div className="space-y-6 text-gray-600 text-lg">
                <p>
                  We believe that everyone should have the power to build their ideas, regardless of their technical background.
                </p>
                <p>
                  NoDev Build is creating a future where innovation is limited only by imagination, not by coding ability.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-blue-100/20 rounded-3xl"></div>
              <div className="relative space-y-8 p-8 backdrop-blur-sm rounded-3xl border border-purple-500/10">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation Without Limits</h3>
                    <p className="text-gray-600">Break free from technical constraints. Build sophisticated applications without writing a single line of code.</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center">
                    <Bot className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Future</h3>
                    <p className="text-gray-600">Harness the power of artificial intelligence to automate workflows and create intelligent applications.</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Community-Driven Growth</h3>
                    <p className="text-gray-600">Join a thriving community of builders, entrepreneurs, and innovators shaping the future of technology.</p>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-full blur-2xl"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <h2 className="text-3xl font-bold mb-6">The Problem</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                  <DollarSign className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">High Development Costs</h3>
                    <p className="text-gray-300">Traditional development requires significant investment in technical teams and infrastructure.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                  <Clock className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Time to Market</h3>
                    <p className="text-gray-300">Long development cycles delay product launches and market validation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                  <Users className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Technical Barrier</h3>
                    <p className="text-gray-300">Non-technical founders struggle to bring their ideas to life.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal">
              <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                  <Zap className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">No-Code Revolution</h3>
                    <p className="text-gray-300">Comprehensive platform teaching no-code tools and AI integration for rapid development.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                  <BookOpen className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Expert-Led Education</h3>
                    <p className="text-gray-300">Learn from industry experts with proven track records in no-code development.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                  <Bot className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">AI Integration</h3>
                    <p className="text-gray-300">Leverage cutting-edge AI tools to enhance productivity and capabilities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Build & Launch MVPs Section */}
      <section className="min-h-screen flex items-center py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -left-4 -top-4 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply opacity-70 animate-blob"></div>
          <div className="absolute -right-4 -top-4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <Rocket className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">Build & Launch</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Build & Launch MVPs with NoDevBuild!
            </h2>
            
            <p className="text-3xl text-gray-300 max-w-3xl mx-auto mb-4">
              No Code. No Limits. Just Build.
            </p>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Turn your idea into a fully functional AI-powered product – without writing a single line of code!
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* No-Code + AI */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                    <Code className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-100 mb-4">No-Code + AI</h3>
                <p className="text-gray-300">Build smarter, faster with our integrated no-code and AI tools.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm">Visual Building</span>
                  <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm">AI Integration</span>
                </div>
              </div>
            </div>

            {/* MVP in Weeks */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-green-500/20">
                    <Laptop className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-100 mb-4">MVP in Weeks</h3>
                <p className="text-gray-300">From idea to launch, hassle-free development process.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm">Rapid Development</span>
                  <span className="px-3 py-1 bg-green-500/20 rounded-full text-green-300 text-sm">Quick Launch</span>
                </div>
              </div>
            </div>

            {/* AI-Powered Automations */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-purple-500/20">
                    <Bot className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-100 mb-4">AI-Powered Automations</h3>
                <p className="text-gray-300">Scale effortlessly with intelligent automation.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-500/20 rounded-full text-green-300 text-sm">Smart Workflows</span>
                  <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm">Auto-Scaling</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <button 
              onClick={() => navigate('/register')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 font-semibold text-lg group"
            >
              Start Building Now
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Market Size Slide */}
      <section className="min-h-screen flex items-center py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 rounded-full mb-6">
              <Globe className="w-4 h-4 text-purple-600" />
              <span className="text-purple-600 text-sm font-medium">Market Opportunity</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Growing Market Demand
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The AI industry is experiencing unprecedented growth and adoption
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-8 rounded-2xl text-white transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold mb-4">37.3%</div>
              <div className="text-xl font-semibold mb-2">CAGR Growth</div>
              <p className="text-white/80">AI industry expected to grow at 37.3% CAGR by 2030</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-2xl text-white transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold mb-4">72%</div>
              <div className="text-xl font-semibold mb-2">AI Adoption</div>
              <p className="text-white/80">Of companies prioritize AI and automation in their operations</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-8 rounded-2xl text-white transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold mb-4">200%</div>
              <div className="text-xl font-semibold mb-2">No-Code Growth</div>
              <p className="text-white/80">No-code tools are skyrocketing in adoption year over year</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Slide */}
      <section className="min-h-screen flex items-center py-20 bg-gradient-to-br from-purple-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Join the Revolution?
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-white/80 mb-12">
                Contact us to learn more about how NoDev Build can help you transform your ideas into reality.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-lg">
                  <p className="text-white">Email</p>
                  <p className="text-xl font-semibold text-white">contact@nodevbuild.com</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-lg">
                  <p className="text-white">Phone</p>
                  <p className="text-xl font-semibold text-white">+91 93445 66750</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PitchDeck;
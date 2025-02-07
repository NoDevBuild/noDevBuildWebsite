import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex Thompson',
    role: 'Startup Founder',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556',
    quote: 'The no-code courses helped me launch my MVP in just 2 weeks!',
    rating: 5
  },
  {
    name: 'Emily Chen',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1438761681033-6440ffad8d80',
    quote: 'Incredible value for money. The instructors are top-notch.',
    rating: 5
  },
  {
    name: 'Michael Rodriguez',
    role: 'Digital Entrepreneur',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    quote: 'The AI integration tutorials transformed my business workflow completely.',
    rating: 5
  },
  {
    name: 'Sarah Kim',
    role: 'UX Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    quote: 'Finally, a platform that teaches no-code tools from a design perspective!',
    rating: 5
  },
  {
    name: 'David Patel',
    role: 'Tech Consultant',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    quote: 'The community support and expert guidance are absolutely invaluable.',
    rating: 5
  },
  {
    name: 'Lisa Anderson',
    role: 'Marketing Director',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f',
    quote: 'Transformed our marketing stack with the automation courses. Game-changer!',
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          What Our Students Say
        </h2>
        
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          
          {/* Testimonials Slider */}
          <div className="group relative flex overflow-hidden">
            <div className="flex animate-[slide_35s_linear_infinite] group-hover:[animation-play-state:paused]">
              {/* First set of testimonials */}
              {testimonials.map((testimonial, index) => (
                <div 
                  key={`first-${index}`}
                  className="w-[400px] flex-shrink-0 px-4"
                >
                  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {testimonials.map((testimonial, index) => (
                <div 
                  key={`second-${index}`}
                  className="w-[400px] flex-shrink-0 px-4"
                >
                  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
import React from 'react';

const instructors = [
  {
    name: 'Dr. Sarah Chen',
    title: 'AI & Machine Learning Expert',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'Former Google AI researcher with 10+ years of experience in machine learning and deep learning.'
  },
  {
    name: 'James Wilson',
    title: 'No-Code Development Lead',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    bio: 'Helped 100+ startups launch their MVPs using no-code tools. Bubble.io certified expert.'
  },
  {
    name: 'Maria Rodriguez',
    title: 'Product Strategy Expert',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    bio: 'Ex-Product Lead at Airbnb. Specializes in product strategy and go-to-market execution.'
  }
];

const Instructors = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Learn from Industry Experts
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {instructors.map((instructor, index) => (
            <div key={index} className="text-center">
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900">{instructor.name}</h3>
              <p className="text-blue-600 mb-2">{instructor.title}</p>
              <p className="text-gray-600">{instructor.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
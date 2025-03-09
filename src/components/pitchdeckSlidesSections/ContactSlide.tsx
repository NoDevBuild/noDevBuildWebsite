import React from 'react';

const ContactSlide = () => {
  return (
    <section className="snap-section flex items-center py-20 bg-gradient-to-br from-purple-600 to-blue-700">
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
  );
};

export default ContactSlide;
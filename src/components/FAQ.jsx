import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = ({ faqs = [], darkMode = false }) => {
  const [openFaq, setOpenFaq] = useState(null);

  const defaultFaqs = [
    {
      question: "Who is this course for?",
      answer: "It's for beginners, entrepreneurs, marketers, operators, consultants, and intermediate Glide users who want to build no-code apps or websites."
    },
    {
      question: "What will I learn?",
      answer: "You'll learn to build websites with Webflow and Carrd, mobile apps with Glide, automations with Zapier, and workflows with Airtable. You'll also cover data structures, databases, design basics, and how to integrate no-code tools."
    },
    {
      question: "Who is No Dev Build for?",
      answer: "We serve students, startup founders, educators, and career coaches who want to build or offer tech-driven solutions without hiring developers."
    },
    {
      question: "What can I build with No Dev Build?",
      answer: "You can build apps, websites, AI tools, automation workflows, career portals, and even personalized study platforms — all without coding."
    },
    {
      question: "Do I need coding experience?",
      answer: "No. It's beginner-friendly and requires no prior coding knowledge."
    }
  ];

  const displayFaqs = faqs.length > 1 ? faqs : defaultFaqs;

  return (
    <div className="mb-8 sm:mb-12">
      <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Frequently Asked Questions
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {displayFaqs.map((faq, index) => (
          <div key={index} className={`border rounded-lg ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              className={`w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center text-left ${
                darkMode 
                  ? 'hover:bg-gray-800 text-gray-300' 
                  : 'hover:bg-gray-50 text-gray-900'
              }`}
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              <span className={`font-semibold text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                {faq.question}
              </span>
              {openFaq === index ? (
                <ChevronUp className={`w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0 ml-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              ) : (
                <ChevronDown className={`w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0 ml-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              )}
            </button>
            {openFaq === index && (
              <div className={`px-4 sm:px-6 py-3 sm:py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
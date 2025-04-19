import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
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

  return (
    <div className="mb-8 sm:mb-12">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg">
            <button
              className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center hover:bg-gray-50 text-left"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              <span className="font-semibold text-gray-900 text-sm sm:text-base">{faq.question}</span>
              {openFaq === index ? (
                <ChevronUp className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500 flex-shrink-0 ml-4" />
              ) : (
                <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500 flex-shrink-0 ml-4" />
              )}
            </button>
            {openFaq === index && (
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t">
                <p className="text-gray-600 text-sm sm:text-base">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
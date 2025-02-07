import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = ({ faqs, title = "FAQs" }) => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="mb-8 sm:mb-12">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
        {title}
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
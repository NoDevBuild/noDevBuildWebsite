interface FAQProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

declare const FAQ: React.FC<FAQProps>;
export default FAQ; 
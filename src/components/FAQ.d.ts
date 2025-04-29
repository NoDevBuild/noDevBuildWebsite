interface FAQProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  darkMode?: boolean;
}

declare const FAQ: React.FC<FAQProps>;
export default FAQ; 
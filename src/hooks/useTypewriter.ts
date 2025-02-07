import { useState, useEffect } from 'react';

export function useTypewriter(words: string[], typingSpeed = 150, delayBetweenWords = 2000) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(word.substring(0, currentText.length + 1));
        
        if (currentText === word) {
          setIsDeleting(true);
          setTimeout(() => {
            setIsDeleting(true);
          }, delayBetweenWords);
        }
      } else {
        setCurrentText(word.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((current) => (current + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, delayBetweenWords]);

  return currentText;
}
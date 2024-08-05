import React from 'react';
import './BaivietPages.css';

interface DotsProps {
  totalSlides: number;
  activeIndex: number;
  onClick: (index: number) => void;
}

const Dots: React.FC<DotsProps> = ({ totalSlides, activeIndex, onClick }) => {
  return (
    <div className="dots-container">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <span
          key={index}
          className={`dot ${index === activeIndex ? 'active' : ''}`}
          onClick={() => onClick(index)}
        ></span>
      ))}
    </div>
  );
};

export default Dots;

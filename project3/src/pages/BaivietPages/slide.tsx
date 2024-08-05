import React from 'react';
import './BaivietPages.css';

interface SlideProps {
  src: string;
  alt: string;
  isActive: boolean;
}

const Slide: React.FC<SlideProps> = ({ src, alt, isActive }) => {
  return (
    <img 
      className="slide" 
      src={src} 
      alt={alt} 
      style={{ display: isActive ? 'block' : 'none' }}
    />
  );
};

export default Slide;

import React from 'react';
import './BaivietPages.css';

interface DotsProps {
  totalSlides: number;
  activeIndex: number;
  onClick: (index: number) => void;
  dotImageUrl: string; // Đường dẫn ảnh dùng cho chấm đang được chọn
}

const Dots: React.FC<DotsProps> = ({ totalSlides, activeIndex, onClick, dotImageUrl }) => {
  return (
    <div className="dots-container">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <span
          key={index}
          className={`dot ${index === activeIndex ? 'active' : ''}`}
          onClick={() => onClick(index)}
        >
          {index === activeIndex && (
            <img src={dotImageUrl} alt={`Dot ${index + 1}`} className="dot-image" />
          )}
        </span>
      ))}
    </div>
  );
};

export default Dots;

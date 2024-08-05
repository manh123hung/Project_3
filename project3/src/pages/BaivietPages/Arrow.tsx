import React from 'react';

interface ArrowProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const Arrow: React.FC<ArrowProps> = ({ direction, onClick }) => {
  return (
    <a className={`arrow ${direction}`} onClick={onClick}>
      {direction === 'left' ? '❮' : '❯'}
    </a>
  );
};

export default Arrow;

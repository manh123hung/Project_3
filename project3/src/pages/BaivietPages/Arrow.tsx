import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface ArrowProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const Arrow: React.FC<ArrowProps> = ({ direction, onClick }) => {
  return (
    <a className={`arrow ${direction}`}  style={{color:"#3376B8"}} onClick={onClick}>
      {direction === 'left' ?       <FontAwesomeIcon icon={faAngleLeft} />:<FontAwesomeIcon icon={faAngleRight} style={{marginLeft:"-20px"}}/>
    }
    </a>
  );
};

export default Arrow;

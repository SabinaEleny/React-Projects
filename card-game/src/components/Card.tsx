import React from 'react';
import type { CardType } from '../App.tsx';

type CardProps = {
  card: CardType;
  isFlipped: boolean;
  onClick: () => void;
};

const Card: React.FC<CardProps> = ({ card, isFlipped, onClick }) => {
  return (
    <div
      className={`aspect-square w-full rounded-lg flex items-center justify-center cursor-pointer transition-transform duration-500 bg-[#e9eba7] hover:bg-[#b0b529] overflow-hidden`}
      style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      onClick={onClick}
    >
      <div
        className={`${isFlipped ? '' : 'hidden'}`}
        style={{ transform: 'rotateY(180deg)' }}
      >
        <img
          src={card.src}
          alt={card.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Card;

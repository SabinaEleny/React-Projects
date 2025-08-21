import React from 'react';
import Card from './Card.tsx';
import type { CardType } from '../App.tsx';

type GameGridProps = {
  cards: CardType[];
  onCardClick: (id: number) => void;
  gameState: 'initial' | 'playing' | 'finished';
  onStartGame: () => void;
  matchedCards: string[];
};

const GameGrid: React.FC<GameGridProps> = ({
  cards,
  onCardClick,
  gameState,
  onStartGame,
  matchedCards,
}) => {
  return (
    <div className="w-full">
      {gameState === 'initial' ? (
        <div className="flex justify-center items-center min-h-[350px]">
          <button
            onClick={onStartGame}
            className="px-10 py-5 bg-[#cad02f] text-black text-2xl font-bold rounded-lg hover:bg-[#b0b529]"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 p-4 bg-[#cad02f] rounded-lg">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              isFlipped={
                gameState === 'finished' ||
                card.isFlipped ||
                matchedCards.includes(card.name)
              }
              onClick={() => onCardClick(card.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GameGrid;

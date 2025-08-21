import React from 'react';

type HeaderProps = {
  moves: number;
  time: number;
  bestTime: number;
  onRestart: () => void;
  gameState: 'initial' | 'playing' | 'finished';
};

const Header: React.FC<HeaderProps> = ({
  moves,
  time,
  bestTime,
  onRestart,
  gameState,
}) => {
  return (
    <div className="w-full flex justify-between items-center">
      <h1 className="text-4xl font-bold">Memory Match</h1>
      <div className="flex items-center space-x-6">
        {gameState !== 'initial' && (
          <button
            onClick={onRestart}
            className="px-5 py-2 bg-[#cad02f] text-black rounded-md hover:bg-[#b0b529]"
          >
            Restart
          </button>
        )}
        <div className="flex space-x-4 text-lg">
          <span>
            Moves: <span className="font-semibold">{moves}</span>
          </span>
          <span>
            Time: <span className="font-semibold">{time}s</span>
          </span>
          <span>
            Best: <span className="font-semibold">{bestTime}s</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;

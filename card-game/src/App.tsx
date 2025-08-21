import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header.tsx';
import GameGrid from './components/Game.tsx';

const cardImages = [
  { name: 'i1', src: 'src/assets/i1.jpg' },
  { name: 'i2', src: 'src/assets/i2.jpg' },
  { name: 'i3', src: 'src/assets/i3.jpg' },
  { name: 'i4', src: 'src/assets/i4.jpg' },
  { name: 'i5', src: 'src/assets/i5.jpg' },
  { name: 'i6', src: 'src/assets/i6.jpg' },
  { name: 'i7', src: 'src/assets/i7.jpg' },
  { name: 'i8', src: 'src/assets/i8.jpg' },
];

export type CardType = {
  id: number;
  name: string;
  src: string;
  isFlipped: boolean;
};

function App() {
  const [gameId, setGameId] = useState(0);
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [bestTime, setBestTime] = useState<number>(() => {
    const savedBestTime = localStorage.getItem('bestTime');
    return savedBestTime ? parseInt(savedBestTime, 10) : 0;
  });
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [gameState, setGameState] = useState<
    'initial' | 'playing' | 'finished'
  >('initial');

  const startGame = useCallback(() => {
    const shuffled: CardType[] = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ id: index, ...card, isFlipped: false }));
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setGameState('playing');
    setTimerActive(true);
  }, []);

  const handleRestart = () => {
    setGameId((prevId) => prevId + 1);
    startGame();
  };

  const handlePlayAgain = () => {
    setGameState('initial');
    setGameId((prevId) => prevId + 1);
  };

  useEffect(() => {
    let timer: number | undefined;
    if (timerActive) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive]);

  const handleCardClick = (id: number) => {
    if (
      gameState !== 'playing' ||
      flippedCards.length === 2 ||
      cards.find((c) => c.id === id)?.isFlipped
    )
      return;

    setCards((currentCards) =>
      currentCards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards((currentFlipped) => [...currentFlipped, id]);

    if (flippedCards.length === 1) {
      setMoves((prev) => prev + 1);
      const firstCardId = flippedCards[0];
      const secondCardId = id;
      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.name === secondCard.name) {
        setMatchedCards((prev) => [...prev, firstCard.name]);
        setFlippedCards([]);
        if (matchedCards.length + 1 === cardImages.length) {
          setTimerActive(false);
          setGameState('finished');
          const finalTime = time + 1;
          if (finalTime < bestTime || bestTime === 0) {
            setBestTime(finalTime);
            localStorage.setItem('bestTime', finalTime.toString());
          }
        }
      } else {
        setTimeout(() => {
          setCards((currentCards) =>
            currentCards.map((card) =>
              card.id === firstCardId || card.id === secondCardId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 600);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#101004] flex flex-col items-center justify-center p-4 text-white">
      <header className="w-full max-w-2xl py-8">
        <Header
          moves={moves}
          time={time}
          bestTime={bestTime}
          onRestart={handleRestart}
          gameState={gameState}
        />
      </header>

      <main className="flex-grow flex flex-col items-center w-full gap-8">
        <div className="w-full max-w-md">
          <GameGrid
            key={gameId}
            cards={cards}
            onCardClick={handleCardClick}
            gameState={gameState}
            onStartGame={startGame}
            matchedCards={matchedCards}
          />
        </div>

        {gameState === 'finished' && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Great job! You finished in {moves} moves and {time}s.
            </h2>
            <button
              onClick={handlePlayAgain}
              className="px-8 py-4 bg-white text-black text-xl font-bold rounded-lg hover:bg-[#b0b529]"
            >
              Play Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Heart, Star, Sparkles, Zap, Music, Camera, Gift, Cake, RefreshCw, Trophy } from 'lucide-react';

interface Card {
  id: number;
  iconId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  onComplete?: () => void;
}

const ICONS = [
  { id: 1, component: Heart, color: 'text-red-400' },
  { id: 2, component: Star, color: 'text-yellow-400' },
  { id: 3, component: Sparkles, color: 'text-blue-400' },
  { id: 4, component: Zap, color: 'text-yellow-500' },
  { id: 5, component: Music, color: 'text-purple-400' },
  { id: 6, component: Camera, color: 'text-gray-500' },
  { id: 7, component: Gift, color: 'text-pink-500' },
  { id: 8, component: Cake, color: 'text-pink-400' },
];

export const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [isWon, setIsWon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const storedBest = localStorage.getItem('memory_best_score');
    if (storedBest) setBestScore(parseInt(storedBest));
    initializeGame();
  }, []);

  const initializeGame = () => {
    const duplicatedIcons = [...ICONS, ...ICONS];
    const shuffled = duplicatedIcons
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        iconId: icon.id,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(shuffled);
    setFlippedIndices([]);
    setMoves(0);
    setIsWon(false);
    setIsProcessing(false);
  };

  const handleCardClick = (index: number) => {
    if (
      isProcessing || 
      cards[index].isFlipped || 
      cards[index].isMatched
    ) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      setMoves(m => m + 1);
      checkForMatch(newFlipped);
    }
  };

  const checkForMatch = (indices: number[]) => {
    const [first, second] = indices;
    if (cards[first].iconId === cards[second].iconId) {
      // Match!
      setTimeout(() => {
        const newCards = [...cards];
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setCards(newCards);
        setFlippedIndices([]);
        setIsProcessing(false);
        checkWin(newCards);
      }, 500);
    } else {
      // No match
      setTimeout(() => {
        const newCards = [...cards];
        newCards[first].isFlipped = false;
        newCards[second].isFlipped = false;
        setCards(newCards);
        setFlippedIndices([]);
        setIsProcessing(false);
      }, 1000);
    }
  };

  const checkWin = (currentCards: Card[]) => {
    if (currentCards.every(card => card.isMatched)) {
      setIsWon(true);
      onComplete?.();
      const currentBest = bestScore;
      if (!currentBest || moves + 1 < currentBest) {
        setBestScore(moves + 1);
        localStorage.setItem('memory_best_score', (moves + 1).toString());
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border-4 border-y2k-pink shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-y2k-dark flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-y2k-purple" />
          Memory Match
        </h3>
        <div className="flex gap-4 text-sm font-bold text-gray-500">
          <span>Moves: {moves}</span>
          {bestScore && <span>Best: {bestScore}</span>}
        </div>
      </div>

      {isWon ? (
        <div className="text-center space-y-6 py-10">
          <Trophy className="w-20 h-20 text-yellow-400 mx-auto animate-bounce" />
          <h2 className="text-3xl font-bold text-y2k-dark">You Won! 🎉</h2>
          <p className="text-gray-600">Completed in {moves} moves</p>
          <button 
            onClick={initializeGame}
            className="bg-y2k-purple text-white px-8 py-3 rounded-full font-bold hover:bg-y2k-accent transition-colors flex items-center justify-center gap-2 mx-auto shadow-lg hover:scale-105 transform"
          >
            <RefreshCw className="w-5 h-5" /> Play Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {cards.map((card, index) => {
            const IconComponent = ICONS.find(i => i.id === card.iconId)?.component || Star;
            const iconColor = ICONS.find(i => i.id === card.iconId)?.color || 'text-gray-500';

            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`aspect-square rounded-xl border-2 transition-all duration-300 transform perspective-1000 relative
                  ${card.isFlipped || card.isMatched 
                    ? 'bg-white border-y2k-purple rotate-y-180' 
                    : 'bg-y2k-pattern bg-cover border-white hover:scale-105 shadow-md'
                  }`}
                disabled={card.isMatched}
              >
                {(card.isFlipped || card.isMatched) ? (
                  <div className="absolute inset-0 flex items-center justify-center animate-fadeIn">
                    <IconComponent className={`w-8 h-8 md:w-10 md:h-10 ${iconColor}`} />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-y2k-pink/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white opacity-50" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

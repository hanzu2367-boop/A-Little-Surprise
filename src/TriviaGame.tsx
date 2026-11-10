import React, { useState } from 'react';
import { Heart, Check, X, RefreshCw, Trophy } from 'lucide-react';
import { PHILIPPINES_QUESTIONS } from './components/trivia/philippinesQuestions';

interface TriviaGameProps {
  onComplete?: () => void;
}

export const TriviaGame: React.FC<TriviaGameProps> = ({ onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelected(index);
    setIsAnswered(true);
    
    if (index === PHILIPPINES_QUESTIONS[currentQ].correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQ < PHILIPPINES_QUESTIONS.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
        setIsAnswered(false);
      } else {
        setShowScore(true);
        onComplete?.();
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentQ(0);
    setScore(0);
    setShowScore(false);
    setSelected(null);
    setIsAnswered(false);
  };

  if (showScore) {
    return (
      <div className="bg-white rounded-2xl p-8 border-4 border-y2k-pink shadow-sm text-center space-y-6">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto animate-bounce" />
        <h2 className="text-2xl font-bold text-y2k-dark">Quiz Complete!</h2>
        <p className="text-lg">You scored <span className="font-bold text-y2k-purple">{score}</span> out of {PHILIPPINES_QUESTIONS.length}</p>
        <div className="text-gray-500">
          {score === PHILIPPINES_QUESTIONS.length ? "Perfect! You know the Philippines so well! 💖" : "Nice try! You learned something new! 🇵🇭"}
        </div>
        <button 
          onClick={resetGame}
          className="bg-y2k-purple text-white px-6 py-2 rounded-full font-bold hover:bg-y2k-accent transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" /> Play Again
        </button>
      </div>
    );
  }

  const question = PHILIPPINES_QUESTIONS[currentQ];

  return (
    <div className="bg-white rounded-2xl p-6 border-4 border-y2k-pink shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-y2k-dark flex items-center gap-2">
          <Heart className="w-5 h-5 text-y2k-purple" />
          Philippines Trivia
        </h3>
        <span className="text-xs font-bold bg-y2k-bg text-y2k-purple px-3 py-1 rounded-full">
          {currentQ + 1}/{PHILIPPINES_QUESTIONS.length}
        </span>
      </div>

      <div className="mb-6">
        <p className="text-lg font-medium text-gray-700">{question.text}</p>
      </div>

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all font-medium ";
          if (isAnswered) {
            if (idx === question.correct) {
              btnClass += "bg-green-100 border-green-400 text-green-700";
            } else if (idx === selected) {
              btnClass += "bg-red-100 border-red-400 text-red-700";
            } else {
              btnClass += "border-gray-100 text-gray-400 opacity-50";
            }
          } else {
            btnClass += "border-gray-200 hover:border-y2k-purple hover:bg-y2k-bg text-gray-600";
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={isAnswered}
              className={btnClass}
            >
              <div className="flex justify-between items-center">
                <span>{option}</span>
                {isAnswered && idx === question.correct && <Check className="w-5 h-5 text-green-600" />}
                {isAnswered && idx === selected && idx !== question.correct && <X className="w-5 h-5 text-red-600" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

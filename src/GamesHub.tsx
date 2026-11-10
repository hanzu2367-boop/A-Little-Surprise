import React, { useMemo, useState } from 'react';
import { ArrowLeft, Check, Gamepad2, Sparkles, Trophy } from 'lucide-react';
import { MemoryGame } from './MemoryGame';
import { TriviaGame } from './TriviaGame';
import { ChallengeGame, EXTRA_GAMES } from './gameChallenges';

const COMPLETION_MESSAGES = [
  'Cristine, you make ordinary moments brighter.',
  'You are more wonderful than you know.',
  'Your smile makes the day feel lighter.',
  'You deserve all the good things coming your way.',
  'The world is a little kinder with you in it.',
  'You have a lovely way of making people feel welcome.',
  'You are one of a kind, and that is your superpower.',
  'Never forget how much joy you bring.',
  'You make being yourself look beautiful.',
  'You are appreciated more than words can say.',
];

const COMPLETION_OPENERS = [
  'A little reminder:',
  'Just for you:',
  'Keep this close:',
  'In case you need to hear it:',
  'Here is something true:',
  'A note from your biggest fan:',
  'One bright thought:',
  'Remember this:',
  'A tiny celebration for you:',
  'Before you go:',
];

const COMPLETION_CLOSERS = [
  'Keep being you.',
  'You deserve to feel proud.',
  'Let yourself shine.',
  'Your kindness matters.',
  'You make a difference.',
  'Take that lovely energy with you.',
  'The best parts of you are all your own.',
  'There is so much to love about you.',
  'You make life sweeter.',
  'You are doing great.',
];

const COMPLETION_MESSAGE_POOL = COMPLETION_OPENERS.flatMap((opener) =>
  COMPLETION_MESSAGES.flatMap((message) =>
    COMPLETION_CLOSERS.map((closer) => `${opener} ${message} ${closer}`)
  )
);

type GameId = 'philippines-trivia' | 'memory-match' | number;

const GAMES = [
  { id: 'philippines-trivia' as const, title: 'Philippines Trivia', description: 'Explore places, food, and culture from the Philippines.' },
  { id: 'memory-match' as const, title: 'Memory Match', description: 'Find all the matching pairs.' },
  ...EXTRA_GAMES.map((game) => ({ id: game.id, title: game.title, description: getGameDescription(game) })),
];

export const GamesHub: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<GameId | null>(null);
  const [completedGames, setCompletedGames] = useState<Set<GameId>>(() => new Set());
  const [message, setMessage] = useState('');
  const selectedChallenge = useMemo(
    () => (typeof selectedGame === 'number' ? EXTRA_GAMES.find((game) => game.id === selectedGame) : undefined),
    [selectedGame]
  );

  const completeGame = () => {
    if (selectedGame === null) return;
    setCompletedGames((previous) => new Set(previous).add(selectedGame));
    const messageIndex = Math.floor(Math.random() * COMPLETION_MESSAGE_POOL.length);
    setMessage(COMPLETION_MESSAGE_POOL[messageIndex]);
  };

  const goBack = () => {
    setSelectedGame(null);
    setMessage('');
  };

  if (selectedGame !== null) {
    const game = GAMES.find((item) => item.id === selectedGame);

    return (
      <div className="space-y-5">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-y2k-dark shadow-sm transition-colors hover:bg-y2k-pink/30"
        >
          <ArrowLeft className="h-4 w-4" />
          All games
        </button>

        <section className="rounded-2xl border-4 border-white bg-white/80 p-4 shadow-lg">
          <div className="mb-4 flex items-center gap-2 font-bold uppercase tracking-[0.15em] text-y2k-dark">
            <Gamepad2 className="h-5 w-5 text-y2k-purple" />
            {game?.title}
          </div>
          {selectedGame === 'philippines-trivia' && <TriviaGame onComplete={completeGame} />}
          {selectedGame === 'memory-match' && <MemoryGame onComplete={completeGame} />}
          {selectedChallenge && (
            <PuzzleGame
              key={selectedChallenge.id}
              game={selectedChallenge}
              onComplete={completeGame}
            />
          )}
        </section>

        {message && (
          <div role="status" className="rounded-2xl border-2 border-y2k-pink bg-white/90 p-5 text-center shadow-sm">
            <Sparkles className="mx-auto mb-2 h-6 w-6 text-y2k-purple" />
            <p className="font-bold text-y2k-dark">{message}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-600">100 little games, made just for you.</p>
        <p className="rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-y2k-dark">
          {completedGames.size} / 100 completed
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((game, index) => {
          const isComplete = completedGames.has(game.id);
          return (
            <button
              key={game.id}
              type="button"
              onClick={() => {
                setSelectedGame(game.id);
                setMessage('');
              }}
              className="group flex min-h-32 flex-col items-start rounded-2xl border-2 border-white bg-white/85 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-y2k-purple hover:shadow-md"
            >
              <span className="mb-3 flex w-full items-center justify-between gap-2">
                <span className="rounded-full bg-y2k-pink/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-y2k-dark">
                  Game {String(index + 1).padStart(2, '0')}
                </span>
                {isComplete && <Check className="h-5 w-5 text-green-600" aria-label="Completed" />}
              </span>
              <span className="font-bold text-y2k-dark group-hover:text-y2k-purple">{game.title}</span>
              <span className="mt-1 text-sm text-gray-600">{game.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

function getGameDescription(game: ChallengeGame) {
  switch (game.kind) {
    case 'word':
      return 'Unscramble a word.';
    case 'math':
      return 'Solve a quick number puzzle.';
    case 'pattern':
      return 'Find the next number in the pattern.';
    case 'odd-one-out':
      return 'Spot the one that does not belong.';
  }
}

interface PuzzleGameProps {
  game: ChallengeGame;
  onComplete: () => void;
}

const PuzzleGame: React.FC<PuzzleGameProps> = ({ game, onComplete }) => {
  const [answer, setAnswer] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showError, setShowError] = useState(false);

  const checkAnswer = (value: string) => {
    if (isComplete) return;
    if (value.trim().toLowerCase() === game.answer.trim().toLowerCase()) {
      setIsComplete(true);
      setShowError(false);
      onComplete();
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="rounded-2xl border-4 border-y2k-pink bg-white p-6 text-center shadow-sm">
      <Trophy className="mx-auto mb-3 h-12 w-12 text-yellow-400" />
      <p className="mb-5 text-xl font-bold text-y2k-dark">{game.prompt}</p>

      {game.options ? (
        <div className="grid grid-cols-2 gap-3">
          {game.options.map((option) => (
            <button
              key={option}
              type="button"
              disabled={isComplete}
              onClick={() => checkAnswer(option)}
              className="rounded-xl border-2 border-gray-200 px-4 py-3 font-bold text-y2k-dark transition-colors hover:border-y2k-purple hover:bg-y2k-bg disabled:opacity-60"
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            checkAnswer(answer);
          }}
          className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <label className="sr-only" htmlFor={`answer-${game.id}`}>Your answer</label>
          <input
            id={`answer-${game.id}`}
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            disabled={isComplete}
            placeholder="Your answer"
            className="min-w-0 flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-center outline-none focus:border-y2k-purple"
          />
          <button
            type="submit"
            disabled={isComplete}
            className="rounded-xl bg-y2k-purple px-5 py-3 font-bold text-white transition-colors hover:bg-y2k-accent disabled:opacity-60"
          >
            Check answer
          </button>
        </form>
      )}

      {isComplete && <p className="mt-4 font-bold text-green-700">You got it! Nice work! ✨</p>}
      {showError && !isComplete && <p role="status" className="mt-4 text-sm font-medium text-red-600">Not quite—try again!</p>}
    </div>
  );
};

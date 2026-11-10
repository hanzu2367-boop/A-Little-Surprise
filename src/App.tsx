import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Gamepad2, Music, Sparkles, NotebookText } from 'lucide-react';
import { Layout } from './Layout';
import { PasscodeGate } from './PasscodeGate';
import { GamesHub } from './GamesHub';
import { NotesWall } from './NotesWall';

type Section = 'games' | 'notes';

const BACKGROUND_TRACKS = [
  { title: 'Spring Snow', src: new URL('./assets/background-spring-snow.mp3', import.meta.url).href },
  { title: 'Ordinary', src: new URL('./assets/background-ordinary.mp3', import.meta.url).href },
  { title: 'Star', src: new URL('./assets/background-star.mp3', import.meta.url).href },
  { title: 'Thinking Out Loud', src: new URL('./assets/background-thinking-out-loud.mp3', import.meta.url).href },
  { title: '247, 365', src: new URL('./assets/background-247-365.mp3', import.meta.url).href },
  { title: 'Best Part', src: new URL('./assets/background-best-part.mp3', import.meta.url).href },
  { title: 'Tagu-Taguan', src: new URL('./assets/background-tagu-tagu-an.mp3', import.meta.url).href },
];

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [section, setSection] = useState<Section>('games');
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [musicError, setMusicError] = useState('');
  const backgroundMusicRef = useRef<HTMLAudioElement>(null);
  const isUnlockedRef = useRef(false);
  const isLetterOpenRef = useRef(false);

  const startBackgroundMusic = useCallback(async () => {
    const audio = backgroundMusicRef.current;
    if (!audio) return;
    audio.volume = 0.1;
    try {
      if (audio.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
        await new Promise<void>((resolve, reject) => {
          const handleCanPlay = () => {
            cleanup();
            resolve();
          };
          const handleError = () => {
            cleanup();
            reject(new Error('The selected background track could not be loaded.'));
          };
          const cleanup = () => {
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('error', handleError);
          };

          audio.addEventListener('canplay', handleCanPlay, { once: true });
          audio.addEventListener('error', handleError, { once: true });
        });
      }
      await audio.play();
      setMusicError('');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setMusicError('Background music could not be played. Try interacting with the page again.');
    }
  }, []);

  useEffect(() => {
    if (isUnlockedRef.current && !isLetterOpenRef.current) {
      void startBackgroundMusic();
    }
  }, [currentTrack, startBackgroundMusic]);

  const handleLetterOpenChange = useCallback((isOpen: boolean) => {
    isLetterOpenRef.current = isOpen;
    setIsLetterOpen(isOpen);
    const audio = backgroundMusicRef.current;
    if (!audio) return;

    if (isOpen) {
      audio.pause();
    } else {
      void startBackgroundMusic();
    }
  }, [startBackgroundMusic]);

  const playNextTrack = useCallback(() => {
    setCurrentTrack((track) => (track + 1) % BACKGROUND_TRACKS.length);
  }, []);

  const unlockSite = () => {
    isUnlockedRef.current = true;
    setIsUnlocked(true);
    void startBackgroundMusic();
  };

  return (
    <Layout>
      <>
        <audio
          ref={backgroundMusicRef}
          src={BACKGROUND_TRACKS[currentTrack].src}
          preload="metadata"
          onEnded={playNextTrack}
          onPlay={() => setMusicError('')}
          onError={() => setMusicError('Background music could not be loaded.')}
        />
        {!isUnlocked ? (
          <PasscodeGate onUnlock={unlockSite} onInteraction={startBackgroundMusic} />
        ) : (
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 border-2 border-y2k-pink shadow-sm text-sm font-bold uppercase tracking-[0.2em] text-y2k-dark">
            <Sparkles className="w-4 h-4 text-y2k-purple" />
            A Little Surprise
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-y2k-dark tracking-tight">
            {section === 'games' ? 'Games' : section === 'notes' ? 'Notes' : 'Config'}
          </h1>
          {section === 'games' && (
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pick a game and have a little fun.
            </p>
          )}
          <p aria-live="polite" className="mx-auto flex items-center justify-center gap-2 text-xs text-gray-500">
            <Music className="h-4 w-4 text-y2k-purple" />
            {isLetterOpen
              ? 'Playlist paused while your letter plays.'
              : `Now playing: ${BACKGROUND_TRACKS[currentTrack].title}`}
          </p>
          {musicError && <p role="alert" className="text-sm text-red-600">{musicError}</p>}
        </div>

        <nav className="grid grid-cols-3 gap-2 rounded-2xl border-2 border-white bg-white/70 p-2 shadow-sm" aria-label="Main sections">
          {([
            { id: 'games', label: 'Games', Icon: Gamepad2 },
            { id: 'notes', label: 'Notes', Icon: NotebookText },
          ] as const).map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSection(id)}
              aria-current={section === id ? 'page' : undefined}
              className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 font-bold transition-colors ${
                section === id
                  ? 'bg-y2k-purple text-white shadow-md'
                  : 'text-y2k-dark hover:bg-y2k-pink/30'
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </nav>

        {section === 'games' && (
          <section aria-label="Games">
            <GamesHub />
          </section>
        )}

        {section === 'notes' && (
          <section aria-label="Notes">
            <NotesWall onLetterOpenChange={handleLetterOpenChange} />
          </section>
        )}

      </div>
        )}
      </>
    </Layout>
  );
}

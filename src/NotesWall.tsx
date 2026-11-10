import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageSquareHeart, Pause, Play } from 'lucide-react';

interface Note {
  id: string;
  from: string;
  text: string;
  color: string;
}

interface NotesWallProps {
  onLetterOpenChange?: (isOpen: boolean) => void;
}

const DEFAULT_NOTE_TEXTS: Record<string, string[]> = {
  '1': [
    'Happy Birthday!! You are the best! 💖',
    'You are the best! Hope today brings you all the little things that make you smile. 💖',
  ],
  '2': [
    'Love you so much honey! Have a magical day! 🎂',
    'Love you so much, honey! You make every day more magical. ✨',
  ],
  '3': [
    'Have a wizarding good time! ⚡',
    'Just a reminder: you are pretty wonderful. ⚡',
  ],
};

const PERSONAL_LETTER = [
  'My love love,',
  'First of all, I want to say thank you. Thank you so much for giving me another chance, for allowing me to be part of your life again, and for giving us another opportunity to make things right. I honestly don’t know how to explain how grateful I am to have this chance again. I know that things weren’t perfect between us, and I know that there were moments when I disappointed you, hurt you, or made you question things about us. But despite everything that happened, you still chose to give me another chance, and I want you to know that I will never take that for granted.',
  'I know that saying thank you is not enough to show how much I appreciate what you have done for me. I know that another chance is not something I should simply accept and then act like nothing happened. It’s something I should value, protect, and prove that I truly deserve. That’s why I want to take this opportunity to show you that I am serious about us. I don’t want this second chance to become another story where we end up hurting each other again. I want this to be the beginning of something better, something stronger, and something more meaningful than what we had before.',
  'Love, I know that we cannot change what happened in the past. We cannot go back and fix every mistake, take back every word, or erase every moment that made us feel sad. But what we can do is learn from everything that happened and make better decisions moving forward. I don’t want us to keep looking at our past mistakes as reasons to give up on each other. Instead, I want us to use those experiences as lessons that will help us understand each other more.',
  'I want you to know that I am not here just because I miss having someone to talk to. I am here because I genuinely want you. I want to be with you, understand you, support you, and grow with you. I want to experience the good days with you, but I also want to be there during the difficult days. I don’t want to be someone who only stays when everything is easy. I want to become someone you can count on, someone who listens to you, someone who respects your feelings, and someone who makes you feel appreciated.',
  'Thank you for not completely closing the door on us. Thank you for giving me the opportunity to show you that I can do better. Thank you for still being willing to understand me even after everything. I know that trusting someone again can take time, and I don’t expect everything to become perfect overnight. I understand that there may still be moments when you remember what happened, when you feel unsure, or when you need reassurance. I won’t blame you for that. I will do my best to be patient because I understand that trust is something we build through our actions, not just through promises.',
  'I want to make you feel loved not only through long messages but also through the little things I do every day. I want to be consistent with my efforts. I want to communicate better, listen more, understand your side, and never make you feel like your feelings don’t matter. I want you to feel that you have someone who genuinely cares about you. Someone who will make time for you, appreciate your efforts, and remind you that you are important.',
  'I also want to apologize for the times when I wasn’t the boyfriend you deserved. I’m sorry for the moments when I failed to understand you, for the times when my actions didn’t match my words, and for every situation where I made things harder for you. I’m not saying these things just to make you feel emotional. I’m saying them because I recognize that I still have things to improve about myself. I don’t want to keep making the same mistakes and expecting you to understand me every single time. I want to become better, not just for our relationship but also for myself.',
  'Love love, please remember that you don’t have to be perfect for me. You don’t always have to be happy, and you don’t always have to pretend that everything is okay. You can tell me when something bothers you. You can tell me when I make a mistake. You can tell me when you need my attention or when you simply want someone to listen. I want us to have a relationship where we can be honest with each other without being afraid of expressing what we feel.',
  'I don’t want us to become strangers whenever we have misunderstandings. I don’t want silence to become our way of solving problems. I want us to learn how to talk things through, even when it’s difficult. I want us to understand that we are not supposed to fight against each other. We should be working together to fix whatever comes between us.',
  'And please, never think that I don’t appreciate you. I appreciate every little thing you do, every message you send, every time you make an effort, every moment you spend with me, and every time you choose to stay and work things out. Even the smallest things mean something to me. You might not always notice it, but I really do appreciate having you in my life.',
  'I am thankful for the opportunity to love you again and to create new memories with you. I want more random conversations, more laughs, more late-night talks, more updates about our days, more little arguments that we eventually solve, and more moments that remind us why we chose each other. I want to celebrate your achievements, support your dreams, encourage you when things get difficult, and remind you that you have someone who believes in you.',
  'I know that we still have a lot to learn about each other. We are both growing, and we will probably make mistakes along the way. But I hope we never stop trying to understand one another. I hope we never become too comfortable that we forget to appreciate each other. I hope we continue choosing honesty, respect, patience, and loyalty.',
  'I don’t want to make promises that sound beautiful today but become meaningless tomorrow. I would rather show you through my actions that I am serious. I want my efforts to speak louder than my words. I want you to see the changes, not just hear me talk about them. I want to give you reasons to feel secure in this relationship, and I want to be someone whose words and actions you can trust.',
  'Thank you for believing that we can still have something beautiful together. Thank you for allowing me to try again. Thank you for giving me a chance to make better memories with you instead of allowing our story to end with the mistakes we made. I know I cannot promise that every day will be perfect, but I can promise that I will do my best to treat you with love, honesty, patience, and respect.',
  'I hope you understand how much this means to me. Having another chance with you is something I genuinely value. I don’t want to waste it. I don’t want to make you regret giving me this opportunity. I want us to look back someday and realize that we didn’t let our past define our future. Instead, we learned, matured, and became better for each other.',
  'I want you to know that I am proud of you, that I appreciate you, and that I am thankful for you. I hope I can be part of your happiest moments and someone you can lean on when life becomes difficult. I want to support you in your studies, your goals, your dreams, and everything you want to achieve. I want to see you succeed, and I hope you never feel that you have to give up on your own dreams just because you are in a relationship with me. I want us to grow individually while continuing to grow together.',
  'And lastly, my love love, thank you for choosing to give us another chance. Thank you for giving me another opportunity to show you how much you mean to me. I may not always find the perfect words to express everything I feel, but I hope my actions will eventually show you what my words sometimes cannot.',
  'I love you, and I am genuinely thankful that I get to call you mine again. Let’s take things one step at a time. Let’s not rush the process of rebuilding what needs to be rebuilt. Let’s enjoy the little moments, communicate when things get difficult, and never forget that both of us deserve to feel loved and respected.',
  'Here’s to a new beginning, to better days, to stronger trust, to genuine efforts, and to many more memories together.',
  'Thank you for giving me another chance, love love. I promise I will never treat this opportunity as something ordinary. You are appreciated more than you know, and I am so grateful that our story has another chapter.',
  'I love you so much, my love love. Always remember that. ❤️',
];

export const NotesWall: React.FC<NotesWallProps> = ({ onLetterOpenChange }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [musicError, setMusicError] = useState('');
  const backgroundMusicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    return () => {
      if (isLetterOpen) onLetterOpenChange?.(false);
    };
  }, [isLetterOpen, onLetterOpenChange]);

  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = 0.1;
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('birthday_notes');
    if (stored) {
      const savedNotes: Note[] = JSON.parse(stored);
      const remainingNotes = savedNotes.filter(
        (note) => !DEFAULT_NOTE_TEXTS[note.id]?.includes(note.text)
      );
      setNotes(remainingNotes);
      if (remainingNotes.length !== savedNotes.length) {
        localStorage.setItem('birthday_notes', JSON.stringify(remainingNotes));
      }
    } else {
      setNotes([]);
      localStorage.setItem('birthday_notes', JSON.stringify([]));
    }
  }, []);

  const toggleLetter = async () => {
    const music = backgroundMusicRef.current;
    if (isLetterOpen) {
      music?.pause();
      if (music) music.currentTime = 0;
      setMusicError('');
      setIsLetterOpen(false);
      onLetterOpenChange?.(false);
      return;
    }

    setIsLetterOpen(true);
    onLetterOpenChange?.(true);
    if (!music) return;

    try {
      await music.play();
      setMusicError('');
    } catch {
      setMusicError('Background music could not be played. You can still play the voice message.');
    }
  };

  return (
    <div className="space-y-8">
      <audio
        ref={backgroundMusicRef}
        src={new URL('./assets/letter-background.mp3', import.meta.url).href}
        loop
        preload="metadata"
        onError={() => setMusicError('Background music could not be loaded.')}
      />
      <article className="rounded-2xl border-4 border-y2k-pink bg-white p-6 shadow-sm md:p-8">
        <button
          type="button"
          aria-expanded={isLetterOpen}
          aria-controls="personal-letter"
          onClick={toggleLetter}
          className="flex w-full items-center gap-3 text-left"
        >
          <Heart className="h-5 w-5 shrink-0 fill-y2k-pink text-y2k-pink" />
          <span className="flex-1">
            <span className="block text-xl font-bold text-y2k-dark">A letter for you</span>
            <span className="mt-1 block text-sm font-normal text-gray-500">
              {isLetterOpen ? 'Tap to close the letter and stop the music.' : 'Tap to read the letter and start the music.'}
            </span>
          </span>
          <span className="text-xs font-medium text-gray-500">{isLetterOpen ? 'Close' : 'Read letter'}</span>
        </button>
        {isLetterOpen && (
          <div id="personal-letter" className="mt-6 space-y-4 border-t border-y2k-pink/30 pt-6 leading-relaxed text-gray-700">
            <VoicePlayer />
            {PERSONAL_LETTER.map((paragraph, index) => (
              <p key={index} className={index === PERSONAL_LETTER.length - 2 ? 'font-semibold text-y2k-dark' : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </article>
      {musicError && <p role="alert" className="text-sm text-red-600">{musicError}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map((note) => (
          <div key={note.id} className={`${note.color} rounded-xl shadow-sm border-2 border-white`}>
            <button
              type="button"
              aria-expanded={expandedNoteId === note.id}
              aria-controls={`message-${note.id}`}
              onClick={() => setExpandedNoteId((currentId) => currentId === note.id ? null : note.id)}
              className="flex w-full items-center gap-3 p-4 text-left font-bold text-y2k-dark"
            >
              <MessageSquareHeart className="h-5 w-5 shrink-0 text-y2k-pink" />
              <span className="flex-1">{note.from}</span>
              <span className="text-xs font-medium text-gray-500">
                {expandedNoteId === note.id ? 'Close' : 'Read message'}
              </span>
            </button>
            {expandedNoteId === note.id && (
              <div id={`message-${note.id}`} className="border-t border-white/80 px-4 pb-4 pt-3">
                <p className="font-mono text-sm leading-relaxed text-gray-700">“{note.text}”</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

function VoicePlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');
  const audioUrl = new URL('./assets/Recording.mp3', import.meta.url).href;

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setError('');
      } catch {
        setError('The voice recording could not be played. Please try again.');
      }
    } else {
      audio.pause();
    }
  };

  const seek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextTime = Number(event.target.value);
    if (audioRef.current && Number.isFinite(nextTime)) {
      audioRef.current.currentTime = nextTime;
      setCurrentTime(nextTime);
    }
  };

  return (
    <div className="mb-6 rounded-2xl border-2 border-y2k-pink/50 bg-y2k-bg/70 p-4">
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        onLoadedMetadata={(event) => {
          const audioDuration = event.currentTarget.duration;
          if (Number.isFinite(audioDuration)) setDuration(audioDuration);
        }}
        onDurationChange={(event) => {
          const audioDuration = event.currentTarget.duration;
          if (Number.isFinite(audioDuration)) setDuration(audioDuration);
        }}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => setError('The voice recording could not be loaded.')}
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Pause voice message' : 'Play voice message'}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-y2k-purple text-white shadow-sm transition-colors hover:bg-y2k-accent"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        <div className="min-w-0 flex-1">
          <label htmlFor="voice-message-seek" className="sr-only">Seek voice message</label>
          <input
            id="voice-message-seek"
            type="range"
            min="0"
            max={duration || 1}
            step="0.1"
            value={Math.min(currentTime, duration || 1)}
            onChange={seek}
            className="w-full cursor-pointer accent-y2k-purple"
          />
          <div className="flex justify-between text-xs font-medium tabular-nums text-gray-600">
            <span>{formatAudioTime(currentTime)}</span>
            <span>{formatAudioTime(duration)}</span>
          </div>
        </div>
      </div>
      {error && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function formatAudioTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

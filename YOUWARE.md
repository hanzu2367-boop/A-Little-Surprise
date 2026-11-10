# YOUWARE.md

# A Little Surprise Website

A Y2K-themed surprise website built with React, TypeScript, and Tailwind CSS.

## Project Overview

- **Theme**: Y2K Aesthetic (Soft Pink, Purple, White Code Blocks)
- **Core Features**:
  - **Passcode Gate**: Intro screen requiring the password "April 23, 2026" by default.
  - **Games Hub**:
    - 100 mini-games, including Philippines trivia, Memory Match, word scrambles, math puzzles, number patterns, and odd-one-out challenges.
    - A randomly selected personal message appears when a game is completed.
  - **Notes Wall**: LocalStorage-persisted notes board.
  - **Personal Letter**: Collapsible letter with a voice recording player and looping music that pauses the site playlist while the letter is open.
  - **Background Playlist**: Seven songs play in sequence and repeat after interaction with the passcode screen, pausing for the letter's music.
  - **Main Navigation**: Games and Notes sections.

## Architecture

- **Entry Point**: `src/main.tsx` -> `src/App.tsx`
- **Components**:
  - `src/components/Layout.tsx`: Main wrapper with background and glassmorphism container.
  - `src/components/PasscodeGate.tsx`: Lock screen component.
  - `src/GamesHub.tsx`: 100-game catalog, game selection, and completion messages.
  - `src/gameChallenges.ts`: Word, math, pattern, and odd-one-out mini-game data.
  - `src/components/trivia/philippinesQuestions.ts`: Philippines trivia questions.
  - `src/TriviaGame.tsx`: Philippines trivia logic and UI.
  - `src/MemoryGame.tsx`: Memory match game logic and UI.
  - `src/components/NotesWall.tsx`: Notes management using LocalStorage.
  - `src/components/Cake.tsx`: Interactive cake component with audio and animation.
- **Data**:
  - `src/components/trivia/thailandBLQuestions.ts`: Trivia questions data.
- **Styling**: Tailwind CSS with custom colors (`y2k-pink`, `y2k-purple`, etc.) defined in `tailwind.config.js`.
- **State Management**: React `useState` and `localStorage` for persistence.

## Development Commands

- **Install Dependencies**: `npm install`
- **Start Dev Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Preview Build**: `npm run preview`
- **Lint**: `npm run lint` (if available)

## Configuration

- **Colors**: Defined in `tailwind.config.js` under `theme.extend.colors`.
- **Background**: Defined in `tailwind.config.js` under `theme.extend.backgroundImage`.

## Future Improvements

- Enable Youbase for backend persistence of notes across users.
- Add more mini-games (e.g., Snake, Tic-Tac-Toe).
- Add photo gallery.

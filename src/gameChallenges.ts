export interface ChallengeGame {
  id: number;
  title: string;
  kind: 'word' | 'math' | 'pattern' | 'odd-one-out';
  prompt: string;
  answer: string;
  options?: string[];
}

const WORDS = [
  'sampaguita', 'mabuhay', 'salamat', 'jeepney', 'adobo',
  'sinigang', 'lumpia', 'palawan', 'mindanao', 'visayas',
  'intramuros', 'mayon', 'bohol', 'cebu', 'manila',
  'kamusta', 'bahaykubo', 'pandesal', 'tarsier', 'narra',
  'philippines', 'island', 'sunshine', 'kindness', 'friendship',
];

const wordGames: ChallengeGame[] = WORDS.map((word, index) => ({
  id: index + 3,
  title: `Word Mix ${String(index + 1).padStart(2, '0')}`,
  kind: 'word',
  prompt: `Unscramble these letters: ${[...word].reverse().join('')}`,
  answer: word,
}));

const mathGames: ChallengeGame[] = Array.from({ length: 25 }, (_, index) => {
  const number = index + 1;
  const first = number + 3;
  const operation = index % 4;

  if (operation === 0) {
    const second = (index % 9) + 4;
    return {
      id: index + 28,
      title: `Quick Math ${String(number).padStart(2, '0')}`,
      kind: 'math',
      prompt: `${first} + ${second} = ?`,
      answer: String(first + second),
    };
  }
  if (operation === 1) {
    const second = (index % 7) + 1;
    return {
      id: index + 28,
      title: `Quick Math ${String(number).padStart(2, '0')}`,
      kind: 'math',
      prompt: `${first} - ${second} = ?`,
      answer: String(first - second),
    };
  }
  if (operation === 2) {
    const second = (index % 8) + 2;
    return {
      id: index + 28,
      title: `Quick Math ${String(number).padStart(2, '0')}`,
      kind: 'math',
      prompt: `${(index % 9) + 2} × ${second} = ?`,
      answer: String(((index % 9) + 2) * second),
    };
  }

  const divisor = (index % 8) + 2;
  const quotient = (index % 7) + 2;
  return {
    id: index + 28,
    title: `Quick Math ${String(number).padStart(2, '0')}`,
    kind: 'math',
    prompt: `${divisor * quotient} ÷ ${divisor} = ?`,
    answer: String(quotient),
  };
});

const patternGames: ChallengeGame[] = Array.from({ length: 24 }, (_, index) => {
  const start = index + 1;
  const step = index + 2;
  return {
    id: index + 53,
    title: `Pattern Play ${String(index + 1).padStart(2, '0')}`,
    kind: 'pattern',
    prompt: `What comes next? ${start}, ${start + step}, ${start + step * 2}, ${start + step * 3}, __`,
    answer: String(start + step * 4),
  };
});

const ODD_ONE_OUT = [
  { group: ['Manila', 'Cebu', 'Davao'], odd: 'Adobo' },
  { group: ['Luzon', 'Mindanao', 'Palawan'], odd: 'Jeepney' },
  { group: ['Adobo', 'Sinigang', 'Lumpia'], odd: 'Mayon' },
  { group: ['Mayon', 'Taal', 'Pinatubo'], odd: 'Halo-halo' },
  { group: ['Sampaguita', 'Narra', 'Jade vine'], odd: 'Intramuros' },
  { group: ['Bohol', 'Cebu', 'Samar'], odd: 'Pandesal' },
  { group: ['Jeepney', 'Tricycle', 'Bangka'], odd: 'Sinigang' },
  { group: ['Baguio', 'Vigan', 'Tagaytay'], odd: 'Tarsier' },
  { group: ['Peso', 'Centavo', 'Banknote'], odd: 'Palawan' },
  { group: ['Filipino', 'Cebuano', 'Ilocano'], odd: 'Lumpia' },
  { group: ['Mount Apo', 'Mount Pulag', 'Mount Arayat'], odd: 'Manila' },
  { group: ['Chocolate Hills', 'Banaue Terraces', 'Mayon Volcano'], odd: 'Pandesal' },
  { group: ['Halo-halo', 'Bibingka', 'Puto'], odd: 'Luzon' },
  { group: ['Philippine eagle', 'Tarsier', 'Tamaraw'], odd: 'Jeepney' },
  { group: ['Intramuros', 'Fort Santiago', 'Rizal Park'], odd: 'Sinigang' },
  { group: ['June 12', 'August 21', 'November 30'], odd: 'Adobo' },
  { group: ['Palawan', 'Bohol', 'Siargao'], odd: 'Sampaguita' },
  { group: ['Narra', 'Molave', 'Yakal'], odd: 'Cebu' },
  { group: ['Pancit', 'Kare-kare', 'Tinola'], odd: 'Mayon' },
  { group: ['Luzon', 'Visayas', 'Mindanao'], odd: 'Baguio' },
  { group: ['Barong Tagalog', 'Terno', 'Malong'], odd: 'Tarsier' },
  { group: ['Sulu Sea', 'Celebes Sea', 'Philippine Sea'], odd: 'Lumpia' },
  { group: ['Bahay kubo', 'Bahay na bato', 'Torogan'], odd: 'Halo-halo' },
  { group: ['Ati-Atihan', 'Sinulog', 'Pahiyas'], odd: 'Palawan' },
];

const oddOneOutGames: ChallengeGame[] = ODD_ONE_OUT.map(({ group, odd }, index) => ({
  id: index + 77,
  title: `Spot the Odd One ${String(index + 1).padStart(2, '0')}`,
  kind: 'odd-one-out',
  prompt: 'Which one does not belong with the others?',
  answer: odd,
  options: [...group, odd].sort((a, b) => a.localeCompare(b)),
}));

export const EXTRA_GAMES: ChallengeGame[] = [
  ...wordGames,
  ...mathGames,
  ...patternGames,
  ...oddOneOutGames,
];

export interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

export const PHILIPPINES_QUESTIONS: Question[] = [
  { id: 1, text: 'What is the capital city of the Philippines?', options: ['Manila', 'Cebu City', 'Davao City', 'Baguio'], correct: 0 },
  { id: 2, text: 'What is the currency of the Philippines?', options: ['Baht', 'Peso', 'Ringgit', 'Rupiah'], correct: 1 },
  { id: 3, text: 'What is the largest island in the Philippines?', options: ['Mindanao', 'Samar', 'Luzon', 'Palawan'], correct: 2 },
  { id: 4, text: 'Which Philippine island group includes Cebu and Bohol?', options: ['Luzon', 'Visayas', 'Mindanao', 'Palawan'], correct: 1 },
  { id: 5, text: 'What is the highest mountain in the Philippines?', options: ['Mount Mayon', 'Mount Apo', 'Mount Pulag', 'Mount Pinatubo'], correct: 1 },
  { id: 6, text: 'The Chocolate Hills are a famous landmark on which island?', options: ['Bohol', 'Panay', 'Leyte', 'Mindoro'], correct: 0 },
  { id: 7, text: 'Which Philippine volcano is known for its near-perfect cone shape?', options: ['Taal Volcano', 'Mount Pinatubo', 'Mayon Volcano', 'Mount Apo'], correct: 2 },
  { id: 8, text: 'What is the national language of the Philippines?', options: ['Filipino', 'Cebuano', 'Ilocano', 'English'], correct: 0 },
  { id: 9, text: 'Which flower is the national flower of the Philippines?', options: ['Sampaguita', 'Gumamela', 'Waling-waling', 'Ilang-ilang'], correct: 0 },
  { id: 10, text: 'What is the national bird of the Philippines?', options: ['Maya', 'Philippine eagle', 'Kingfisher', 'Kalaw'], correct: 1 },
  { id: 11, text: 'Which Filipino dish is commonly made with meat simmered in vinegar and soy sauce?', options: ['Adobo', 'Pancit', 'Kare-kare', 'Lumpia'], correct: 0 },
  { id: 12, text: 'Which sour soup is often made with tamarind?', options: ['Sinigang', 'Laing', 'Puto', 'Bibingka'], correct: 0 },
  { id: 13, text: 'What is the name of the traditional Filipino cone-shaped house often shown in illustrations?', options: ['Bahay kubo', 'Bahay na bato', 'Torogan', 'Ifugao bale'], correct: 0 },
  { id: 14, text: 'Which city is known as the “Summer Capital of the Philippines”?', options: ['Tagaytay', 'Baguio', 'Cebu City', 'Vigan'], correct: 1 },
  { id: 15, text: 'The Banaue Rice Terraces are in which Philippine region?', options: ['Cordillera', 'Bicol', 'Central Visayas', 'Caraga'], correct: 0 },
  { id: 16, text: 'What are the traditional public utility vehicles often called in the Philippines?', options: ['Tricycles', 'Jeepneys', 'Kalesas', 'Bangka'], correct: 1 },
  { id: 17, text: 'On what date is Philippine Independence Day celebrated?', options: ['June 12', 'July 4', 'August 21', 'November 30'], correct: 0 },
  { id: 18, text: 'Which sea lies to the west of the Philippine island of Palawan?', options: ['Sulu Sea', 'Philippine Sea', 'South China Sea', 'Celebes Sea'], correct: 2 },
  { id: 19, text: 'What is the name of the historic walled district in Manila?', options: ['Intramuros', 'Makati', 'Binondo', 'Malate'], correct: 0 },
  { id: 20, text: 'Which Filipino dessert is made with shaved ice and colorful sweet toppings?', options: ['Halo-halo', 'Turon', 'Ensaymada', 'Pastillas'], correct: 0 },
];

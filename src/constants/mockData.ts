
export type Word = {
  id: string;
  word: string;
  phonetic: string;
  translations: { 
    partOfSpeech: string; 
    meaning: string;
  }[];
  examples: string[];
  imageUrl?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export type QuizType = 'definition' | 'sentence' | 'completion' | 'mixed';

export const words: Word[] = [
  {
    id: "1",
    word: "aberration",
    phonetic: "/ˌæbəˈreɪʃn/",
    translations: [
      { 
        partOfSpeech: "n.", 
        meaning: "偏离常态；异常" 
      }
    ],
    examples: [
      "His strange behavior was an aberration from his usually calm demeanor.",
      "The statistical aberration was due to a calculation error."
    ],
    difficulty: "hard"
  },
  {
    id: "2",
    word: "benevolent",
    phonetic: "/bəˈnevələnt/",
    translations: [
      { 
        partOfSpeech: "adj.", 
        meaning: "仁慈的；善意的" 
      }
    ],
    examples: [
      "She was known for her benevolent attitude toward her employees.",
      "The benevolent organization provided food and shelter to those in need."
    ],
    difficulty: "medium"
  },
  {
    id: "3",
    word: "cacophony",
    phonetic: "/kəˈkɒfəni/",
    translations: [
      { 
        partOfSpeech: "n.", 
        meaning: "刺耳的声音；不和谐" 
      }
    ],
    examples: [
      "The cacophony of the construction site made it impossible to concentrate.",
      "Her ears were filled with the cacophony of city traffic."
    ],
    difficulty: "hard"
  },
  {
    id: "4",
    word: "diligent",
    phonetic: "/ˈdɪlɪdʒənt/",
    translations: [
      { 
        partOfSpeech: "adj.", 
        meaning: "勤勉的；勤奋的" 
      }
    ],
    examples: [
      "She was a diligent student who always completed her assignments on time.",
      "His diligent research led to a groundbreaking discovery."
    ],
    difficulty: "medium"
  },
  {
    id: "5",
    word: "ephemeral",
    phonetic: "/ɪˈfemərəl/",
    translations: [
      { 
        partOfSpeech: "adj.", 
        meaning: "短暂的；瞬息的" 
      }
    ],
    examples: [
      "The beauty of cherry blossoms is ephemeral, lasting only a few days.",
      "Fame can be ephemeral, especially in the entertainment industry."
    ],
    difficulty: "hard"
  },
  {
    id: "6",
    word: "fervent",
    phonetic: "/ˈfɜːrvənt/",
    translations: [
      { 
        partOfSpeech: "adj.", 
        meaning: "热情的；热烈的" 
      }
    ],
    examples: [
      "He was a fervent supporter of environmental causes.",
      "She expressed her fervent hope that peace would prevail."
    ],
    difficulty: "medium"
  },
  {
    id: "7",
    word: "gratitude",
    phonetic: "/ˈɡrætɪtjuːd/",
    translations: [
      { 
        partOfSpeech: "n.", 
        meaning: "感激；感谢" 
      }
    ],
    examples: [
      "She expressed her gratitude for their help during the difficult time.",
      "The letter was filled with gratitude for the generous donation."
    ],
    difficulty: "easy"
  },
  {
    id: "8",
    word: "hesitant",
    phonetic: "/ˈhezɪtənt/",
    translations: [
      { 
        partOfSpeech: "adj.", 
        meaning: "犹豫的；踌躇的" 
      }
    ],
    examples: [
      "He was hesitant to accept the job offer without consulting his family.",
      "She gave a hesitant smile, unsure of how to respond to the compliment."
    ],
    difficulty: "medium"
  },
  {
    id: "9",
    word: "inevitable",
    phonetic: "/ɪnˈevɪtəbl/",
    translations: [
      { 
        partOfSpeech: "adj.", 
        meaning: "不可避免的；必然的" 
      }
    ],
    examples: [
      "Change is inevitable as we move into the digital age.",
      "It seemed inevitable that they would eventually meet, given their similar interests."
    ],
    difficulty: "medium"
  },
  {
    id: "10",
    word: "jubilant",
    phonetic: "/ˈdʒuːbɪlənt/",
    translations: [
      { 
        partOfSpeech: "adj.", 
        meaning: "欢呼的；喜气洋洋的" 
      }
    ],
    examples: [
      "The team was jubilant after winning the championship.",
      "A jubilant crowd greeted the returning heroes."
    ],
    difficulty: "medium"
  }
];

export const categories = [
  { id: 'all', name: '全部单词' },
  { id: 'easy', name: '简单' },
  { id: 'medium', name: '中等' },
  { id: 'hard', name: '困难' },
  { id: 'favorites', name: '收藏单词' },
  { id: 'mistakes', name: '错题本' }
];

export const quizTypes: { id: QuizType; name: string }[] = [
  { id: 'definition', name: '选择释义' },
  { id: 'sentence', name: '选择例句' },
  { id: 'completion', name: '单词补全' },
  { id: 'mixed', name: '混合类型' }
];

export const generateQuizOptions = (correctWord: Word, allWords: Word[], type: QuizType): string[] => {
  const otherWords = allWords.filter(w => w.id !== correctWord.id);
  const shuffled = [...otherWords].sort(() => 0.5 - Math.random()).slice(0, 3);
  
  let options: string[] = [];
  
  if (type === 'definition') {
    options = [
      correctWord.translations[0].meaning,
      ...shuffled.map(w => w.translations[0].meaning)
    ];
  } else if (type === 'sentence') {
    options = [
      correctWord.examples[0],
      ...shuffled.map(w => w.examples[0])
    ];
  } else if (type === 'completion') {
    const wordToComplete = correctWord.word;
    const maskedWord = wordToComplete.replace(/[a-zA-Z]/g, (match, index) => {
      // Leave first and last letter visible, mask others with _
      return (index === 0 || index === wordToComplete.length - 1) ? match : '_';
    });
    options = [wordToComplete, ...shuffled.map(w => w.word)];
    // For completion, we need to return the masked word and options
    return [maskedWord, ...options];
  }
  
  // Shuffle the options
  return options.sort(() => 0.5 - Math.random());
};

export const getRandomWord = (excludeIds: string[] = []): Word => {
  const availableWords = words.filter(w => !excludeIds.includes(w.id));
  const randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex];
};

export const getDailyGoal = (): number => {
  return 20; // Static for now, could be personalized
};

export const getEstimatedVocabulary = (): number => {
  return 3000; // Static for now, could be calculated based on study history
};

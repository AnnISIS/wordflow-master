
import { useState, useEffect, useCallback } from 'react';
import { Word, QuizType, generateQuizOptions, getRandomWord } from '@/constants/mockData';

type StudyState = {
  currentWord: Word | null;
  isFlipped: boolean;
  quizOptions: string[];
  selectedOption: string | null;
  isCorrect: boolean | null;
  answeredCount: number;
  correctCount: number;
  favorites: string[];
  mistakes: string[];
  quizType: QuizType;
  maskedWord?: string;
  currentQuizType?: QuizType;
  studyMode: 'normal' | 'mistakes';
};

export const useWordStudy = (initialMode: 'normal' | 'mistakes' = 'normal') => {
  const [studyState, setStudyState] = useState<StudyState>({
    currentWord: null,
    isFlipped: false,
    quizOptions: [],
    selectedOption: null,
    isCorrect: null,
    answeredCount: 0,
    correctCount: 0,
    favorites: [],
    mistakes: [],
    quizType: 'definition',
    studyMode: initialMode
  });

  // Load saved data from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('wordflow_favorites');
    const savedMistakes = localStorage.getItem('wordflow_mistakes');
    const correctCount = localStorage.getItem('wordflow_correct_count');
    const answeredCount = localStorage.getItem('wordflow_answered_count');
    
    setStudyState(prev => ({
      ...prev,
      favorites: savedFavorites ? JSON.parse(savedFavorites) : [],
      mistakes: savedMistakes ? JSON.parse(savedMistakes) : [],
      correctCount: correctCount ? parseInt(correctCount) : 0,
      answeredCount: answeredCount ? parseInt(answeredCount) : 0
    }));
    
    loadNextWord();
  }, []);

  // Save counts to localStorage when they change
  useEffect(() => {
    localStorage.setItem('wordflow_correct_count', studyState.correctCount.toString());
    localStorage.setItem('wordflow_answered_count', studyState.answeredCount.toString());
  }, [studyState.correctCount, studyState.answeredCount]);

  // Save favorites and mistakes to localStorage when they change
  useEffect(() => {
    if (studyState.favorites.length > 0) {
      localStorage.setItem('wordflow_favorites', JSON.stringify(studyState.favorites));
    }
    if (studyState.mistakes.length > 0) {
      localStorage.setItem('wordflow_mistakes', JSON.stringify(studyState.mistakes));
    }
  }, [studyState.favorites, studyState.mistakes]);

  const loadNextWord = useCallback(() => {
    // Get a word based on study mode
    let newWord;
    
    if (studyState.studyMode === 'mistakes' && studyState.mistakes.length > 0) {
      // Get a random mistake word
      const mistakeIds = studyState.mistakes;
      newWord = getRandomWord(mistakeIds);
    } else {
      // Get a random word that hasn't been studied in the current session
      newWord = getRandomWord([]);
    }
    
    // Generate quiz options based on the quiz type
    const options = generateQuizOptions(newWord, studyState.quizType === 'mixed' 
      ? getRandomQuizType() 
      : studyState.quizType);
    
    // For completion quiz, the first element is the masked word
    let maskedWord;
    if (studyState.quizType === 'completion' || 
        (studyState.quizType === 'mixed' && options.quizType === 'completion')) {
      maskedWord = options.maskedWord;
    }
    
    setStudyState(prev => ({
      ...prev,
      currentWord: newWord,
      isFlipped: false,
      quizOptions: options.options,
      selectedOption: null,
      isCorrect: null,
      maskedWord,
      currentQuizType: options.quizType || prev.quizType
    }));
  }, [studyState.quizType, studyState.studyMode, studyState.mistakes]);

  const getRandomQuizType = (): QuizType => {
    const types: QuizType[] = ['definition', 'sentence', 'completion'];
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
  };

  const flipCard = useCallback(() => {
    setStudyState(prev => ({
      ...prev,
      isFlipped: !prev.isFlipped
    }));
  }, []);

  const selectOption = useCallback((option: string) => {
    if (studyState.selectedOption) return; // Prevent multiple selections
    
    let isCorrect = false;
    const currentQuizType = studyState.quizType === 'mixed' 
      ? studyState.currentQuizType 
      : studyState.quizType;
    
    if (currentQuizType === 'definition') {
      isCorrect = option === studyState.currentWord?.translations[0].meaning;
    } else if (currentQuizType === 'sentence') {
      isCorrect = option === studyState.currentWord?.examples[0];
    } else if (currentQuizType === 'completion') {
      isCorrect = option === studyState.currentWord?.word;
    }
    
    // Update state
    setStudyState(prev => {
      // Handle mistake management
      let newMistakes = [...prev.mistakes];
      
      if (!isCorrect && prev.currentWord) {
        // If incorrect and not already in mistakes, add to mistakes
        if (!prev.mistakes.includes(prev.currentWord.id)) {
          newMistakes.push(prev.currentWord.id);
        }
      } else if (isCorrect && prev.currentWord && prev.studyMode === 'mistakes') {
        // If correct and in mistake mode, remove from mistakes
        newMistakes = newMistakes.filter(id => id !== prev.currentWord?.id);
      }
      
      return {
        ...prev,
        selectedOption: option,
        isCorrect,
        answeredCount: prev.answeredCount + 1,
        correctCount: isCorrect ? prev.correctCount + 1 : prev.correctCount,
        mistakes: newMistakes
      };
    });
    
    // Load next word after a delay
    setTimeout(() => {
      loadNextWord();
    }, 1500);
  }, [studyState.currentWord, studyState.quizType, studyState.currentQuizType, loadNextWord]);

  const toggleFavorite = useCallback(() => {
    if (!studyState.currentWord) return;
    
    setStudyState(prev => {
      const wordId = prev.currentWord?.id || '';
      const isFavorite = prev.favorites.includes(wordId);
      
      return {
        ...prev,
        favorites: isFavorite
          ? prev.favorites.filter(id => id !== wordId)
          : [...prev.favorites, wordId]
      };
    });
  }, [studyState.currentWord]);

  const changeQuizType = useCallback((type: QuizType) => {
    setStudyState(prev => ({
      ...prev,
      quizType: type
    }));
    
    // Load a new word with the new quiz type
    setTimeout(() => {
      loadNextWord();
    }, 100);
  }, [loadNextWord]);

  const isFavorite = useCallback((wordId: string) => {
    return studyState.favorites.includes(wordId);
  }, [studyState.favorites]);

  const isMistake = useCallback((wordId: string) => {
    return studyState.mistakes.includes(wordId);
  }, [studyState.mistakes]);
  
  const setStudyMode = useCallback((mode: 'normal' | 'mistakes') => {
    setStudyState(prev => ({
      ...prev,
      studyMode: mode
    }));
    
    // Load a new word appropriate for the mode
    setTimeout(() => {
      loadNextWord();
    }, 100);
  }, [loadNextWord]);

  const resetTodayCounts = useCallback(() => {
    setStudyState(prev => ({
      ...prev,
      answeredCount: 0,
      correctCount: 0
    }));
    
    localStorage.setItem('wordflow_correct_count', '0');
    localStorage.setItem('wordflow_answered_count', '0');
  }, []);

  return {
    ...studyState,
    currentQuizType: studyState.quizType === 'mixed' ? studyState.currentQuizType : studyState.quizType,
    loadNextWord,
    flipCard,
    selectOption,
    toggleFavorite,
    changeQuizType,
    isFavorite,
    isMistake,
    setStudyMode,
    resetTodayCounts
  };
};

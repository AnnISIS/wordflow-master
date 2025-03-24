
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
};

export const useWordStudy = () => {
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
    quizType: 'definition'
  });

  // Load saved data from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('wordflow_favorites');
    const savedMistakes = localStorage.getItem('wordflow_mistakes');
    
    setStudyState(prev => ({
      ...prev,
      favorites: savedFavorites ? JSON.parse(savedFavorites) : [],
      mistakes: savedMistakes ? JSON.parse(savedMistakes) : []
    }));
    
    loadNextWord();
  }, []);

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
    // Get a random word that hasn't been studied in the current session
    const newWord = getRandomWord([]);
    
    // Generate quiz options based on the quiz type
    const options = generateQuizOptions(newWord, [newWord], studyState.quizType);
    
    // For completion quiz, the first element is the masked word
    let maskedWord;
    if (studyState.quizType === 'completion') {
      maskedWord = options.shift();
    }
    
    setStudyState(prev => ({
      ...prev,
      currentWord: newWord,
      isFlipped: false,
      quizOptions: options,
      selectedOption: null,
      isCorrect: null,
      maskedWord
    }));
  }, [studyState.quizType]);

  const flipCard = useCallback(() => {
    setStudyState(prev => ({
      ...prev,
      isFlipped: !prev.isFlipped
    }));
  }, []);

  const selectOption = useCallback((option: string) => {
    if (studyState.selectedOption) return; // Prevent multiple selections
    
    let isCorrect = false;
    
    if (studyState.quizType === 'definition') {
      isCorrect = option === studyState.currentWord?.translations[0].meaning;
    } else if (studyState.quizType === 'sentence') {
      isCorrect = option === studyState.currentWord?.examples[0];
    } else if (studyState.quizType === 'completion') {
      isCorrect = option === studyState.currentWord?.word;
    }
    
    // Update state
    setStudyState(prev => {
      const newMistakes = !isCorrect && prev.currentWord 
        ? [...prev.mistakes, prev.currentWord.id]
        : prev.mistakes;
      
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
  }, [studyState.currentWord, studyState.quizType, loadNextWord]);

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

  return {
    ...studyState,
    loadNextWord,
    flipCard,
    selectOption,
    toggleFavorite,
    changeQuizType,
    isFavorite,
    isMistake
  };
};

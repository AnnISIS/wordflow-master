
import { useState } from 'react';
import { useWordStudy } from '@/hooks/useWordStudy';
import WordCard from '@/components/cards/WordCard';
import QuizCard from '@/components/cards/QuizCard';
import ProgressBar from '@/components/ui/ProgressBar';
import { quizTypes } from '@/constants/mockData';
import { cn } from '@/lib/utils';

const StudySection = () => {
  const {
    currentWord,
    isFlipped,
    quizOptions,
    selectedOption,
    isCorrect,
    answeredCount,
    correctCount,
    quizType,
    maskedWord,
    currentQuizType,
    flipCard,
    loadNextWord,
    selectOption,
    toggleFavorite,
    changeQuizType,
    isFavorite
  } = useWordStudy();
  
  if (!currentWord) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">正在加载单词...</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">单词学习</h2>
          
          <div className="flex space-x-2 mt-4 sm:mt-0">
            {quizTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => changeQuizType(type.id)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-full transition-medium",
                  quizType === type.id
                    ? "bg-primary text-white"
                    : "bg-secondary text-foreground hover:bg-secondary/70"
                )}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>
        
        <ProgressBar 
          value={correctCount} 
          max={20} 
          label="今日学习进度" 
          showValue={true} 
          size="md" 
          color="default" 
        />
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <WordCard 
            word={currentWord}
            isFlipped={isFlipped}
            onFlip={flipCard}
            onNext={loadNextWord}
            isFavorite={isFavorite(currentWord.id)}
            onToggleFavorite={toggleFavorite}
          />
        </div>
        
        <div>
          <QuizCard 
            word={currentWord}
            quizType={quizType}
            options={quizOptions}
            selectedOption={selectedOption}
            isCorrect={isCorrect}
            onSelectOption={selectOption}
            maskedWord={maskedWord}
            currentQuizType={currentQuizType}
          />
          
          <div className="mt-6 flex justify-center">
            <div className="bg-muted/50 p-3 rounded-lg inline-flex items-center">
              <div className="flex space-x-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">已学</p>
                  <p className="text-2xl font-bold text-foreground">{answeredCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">正确</p>
                  <p className="text-2xl font-bold text-green-600">{correctCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">准确率</p>
                  <p className="text-2xl font-bold text-primary">
                    {answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySection;

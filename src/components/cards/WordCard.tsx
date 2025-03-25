
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Volume2, Star, Bookmark, BookmarkCheck, RotateCw } from 'lucide-react';
import { Word } from '@/constants/mockData';

interface WordCardProps {
  word: Word;
  isFlipped: boolean;
  onFlip: () => void;
  onNext: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const WordCard = ({
  word,
  isFlipped,
  onFlip,
  onNext,
  isFavorite,
  onToggleFavorite
}: WordCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const playPronunciation = () => {
    // In a real app, this would trigger audio playback
    console.log('Playing pronunciation for:', word.word);
  };
  
  return (
    <div 
      className={cn(
        "word-card h-80 sm:h-96 max-w-md mx-auto",
        isFlipped && "flipped"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onFlip}
    >
      {/* Front of card - Word only */}
      <div className="word-card-front glass-card flex flex-col justify-center p-8">
        <h2 className="text-5xl sm:text-6xl font-bold text-center text-foreground mb-6">
          {word.word}
        </h2>
        <p className="text-xl text-center text-muted-foreground">{word.phonetic}</p>
        
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-background/10 backdrop-blur-sm opacity-0 transition-medium",
          isHovering && "opacity-100"
        )}>
          <p className="text-lg font-medium text-foreground/80">点击查看详情</p>
        </div>
      </div>
      
      {/* Back of card - Details */}
      <div className="word-card-back glass-card p-8 overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground">{word.word}</h2>
            <p className="text-lg text-muted-foreground flex items-center">
              {word.phonetic}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  playPronunciation();
                }}
                className="ml-2 p-1 rounded-full hover:bg-secondary transition-colors"
              >
                <Volume2 className="h-4 w-4 text-primary" />
              </button>
            </p>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              className={cn(
                "p-2 rounded-full transition-colors",
                isFavorite ? "bg-primary/10 text-primary" : "hover:bg-secondary text-muted-foreground"
              )}
              aria-label={isFavorite ? "从收藏中移除" : "添加到收藏"}
            >
              <Star className={cn("h-5 w-5", isFavorite && "fill-primary")} />
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors"
              aria-label="下一个单词"
            >
              <RotateCw className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {word.translations.map((translation, index) => (
            <div key={index} className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {translation.partOfSpeech}
              </p>
              <p className="text-lg text-foreground">
                {translation.meaning}
              </p>
            </div>
          ))}
          
          <div className="pt-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">例句：</p>
            {word.examples.map((example, index) => (
              <p key={index} className="text-foreground text-balance mb-2 text-sm italic">
                "{example}"
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCard;

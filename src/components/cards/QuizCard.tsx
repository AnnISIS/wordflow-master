
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';
import { Word, QuizType } from '@/constants/mockData';

interface QuizCardProps {
  word: Word;
  quizType: QuizType;
  options: string[];
  selectedOption: string | null;
  isCorrect: boolean | null;
  onSelectOption: (option: string) => void;
  maskedWord?: string;
  currentQuizType?: QuizType;
}

const QuizCard = ({
  word,
  quizType,
  options,
  selectedOption,
  isCorrect,
  onSelectOption,
  maskedWord,
  currentQuizType
}: QuizCardProps) => {
  
  // Use currentQuizType if available (for mixed mode), otherwise use quizType
  const activeQuizType = currentQuizType || quizType;
  
  const getQuizPrompt = () => {
    switch (activeQuizType) {
      case 'definition':
        return `选择 "${word.word}" 的正确释义：`;
      case 'sentence':
        return `选择包含 "${word.word}" 的正确例句：`;
      case 'completion':
        return `完成单词 "${maskedWord}"：`;
      default:
        return '选择正确答案：';
    }
  };
  
  const getCorrectAnswer = () => {
    switch (activeQuizType) {
      case 'definition':
        return word.translations[0].meaning;
      case 'sentence':
        return word.examples[0];
      case 'completion':
        return word.word;
      default:
        return '';
    }
  };
  
  return (
    <div className="glass-card p-6 rounded-2xl max-w-md mx-auto animate-scale-in">
      <div className="mb-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          {activeQuizType === 'definition' ? '释义选择' : 
           activeQuizType === 'sentence' ? '例句选择' : 
           activeQuizType === 'completion' ? '单词补全' : '混合题型'}
        </h3>
        
        <p className="text-lg font-medium text-foreground mb-4">
          {getQuizPrompt()}
        </p>
        
        {isCorrect !== null && (
          <div className={cn(
            "p-3 rounded-lg mb-4 flex items-center",
            isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          )}>
            {isCorrect ? (
              <CheckCircle className="h-5 w-5 mr-2" />
            ) : (
              <XCircle className="h-5 w-5 mr-2" />
            )}
            <p>
              {isCorrect ? '回答正确！' : `回答错误。正确答案是: ${getCorrectAnswer()}`}
            </p>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectOption(option)}
            disabled={selectedOption !== null}
            className={cn(
              "w-full p-4 rounded-lg text-left transition-medium",
              selectedOption === null ? 
                "hover:bg-secondary/80 bg-secondary/50" : 
                selectedOption === option ?
                  (isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800") :
                  option === getCorrectAnswer() && !isCorrect ?
                    "bg-green-100 text-green-800" :
                    "bg-secondary/50 text-muted-foreground"
            )}
          >
            <p className="font-medium">{option}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;

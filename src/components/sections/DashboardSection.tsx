
import { Link } from 'react-router-dom';
import { BookOpen, BookMarked, AlertTriangle, BarChart3 } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
import { cn } from '@/lib/utils';
import { getDailyGoal, getEstimatedVocabulary } from '@/constants/mockData';
import { useEffect, useState } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description?: string;
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  className
}: StatCardProps) => <div className={cn("glass-card p-6 rounded-xl", className)}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      <div className="p-2 bg-primary/10 rounded-full">
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </div>
  </div>;

interface ActionCardProps {
  title: string;
  icon: React.ElementType;
  path: string;
  className?: string;
  onClick?: () => void;
}

const ActionCard = ({
  title,
  icon: Icon,
  path,
  className,
  onClick
}: ActionCardProps) => {
  if (onClick) {
    return (
      <button 
        onClick={onClick} 
        className={cn("glass-card p-6 rounded-xl transition-medium hover-scale w-full text-left", className)}
      >
        <div className="flex items-center justify-between">
          <p className="font-medium">{title}</p>
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </button>
    );
  }
  
  return (
    <Link to={path} className={cn("glass-card p-6 rounded-xl transition-medium hover-scale", className)}>
      <div className="flex items-center justify-between">
        <p className="font-medium">{title}</p>
        <Icon className="h-5 w-5 text-primary" />
      </div>
    </Link>
  );
};

interface DashboardSectionProps {
  onSwitchToStudy: () => void;
}

const DashboardSection = ({ onSwitchToStudy }: DashboardSectionProps) => {
  const dailyGoal = getDailyGoal();
  const vocabularySize = getEstimatedVocabulary();
  const [studiedToday, setStudiedToday] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [learningDays, setLearningDays] = useState(7);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    // Get correct count from localStorage
    const correctCount = localStorage.getItem('wordflow_correct_count');
    if (correctCount) {
      setStudiedToday(parseInt(correctCount));
    }
    
    // Get favorites count
    const savedFavorites = localStorage.getItem('wordflow_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Get mistakes count
    const savedMistakes = localStorage.getItem('wordflow_mistakes');
    if (savedMistakes) {
      setMistakes(JSON.parse(savedMistakes));
    }
  }, []);

  return <div className="max-w-5xl mx-auto">
      <div className="glass-card p-8 rounded-xl mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">hello! 👋</h2>
            <p className="text-muted-foreground">今天继续学习新单词吧</p>
          </div>
          <button 
            onClick={onSwitchToStudy}
            className="mt-4 sm:mt-0 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors mx-0 px-[24px] py-[9px]"
          >
            进入学习
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-end mb-1">
            <p className="text-sm font-medium">今日学习目标</p>
            <p className="text-sm text-muted-foreground">{studiedToday}/{dailyGoal} 单词</p>
          </div>
          <ProgressBar value={studiedToday} max={dailyGoal} size="lg" color={studiedToday >= dailyGoal ? "success" : "default"} />
        </div>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="词汇量" value={vocabularySize} icon={BookOpen} description="估计词汇量" />
        <StatCard title="已收藏" value={favorites.length} icon={BookMarked} description="收藏单词数" />
        <StatCard title="待复习" value={mistakes.length} icon={AlertTriangle} description="错题数量" />
        <StatCard title="学习天数" value={learningDays} icon={BarChart3} description="连续学习" />
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ActionCard title="继续学习" icon={BookOpen} path="/" onClick={onSwitchToStudy} />
        <ActionCard title="我的收藏" icon={BookMarked} path="/favorites" />
        <ActionCard title="我的错题" icon={AlertTriangle} path="/mistakes" />
      </div>
    </div>;
};

export default DashboardSection;

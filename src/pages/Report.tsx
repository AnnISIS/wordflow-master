
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Check, Award } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProgressBar from '@/components/ui/ProgressBar';

const Report = () => {
  // Mock data for the report
  const weeklyData = [
    { day: '周一', learned: 18, correct: 15 },
    { day: '周二', learned: 22, correct: 20 },
    { day: '周三', learned: 15, correct: 12 },
    { day: '周四', learned: 25, correct: 22 },
    { day: '周五', learned: 20, correct: 18 },
    { day: '周六', learned: 10, correct: 8 },
    { day: '周日', learned: 30, correct: 28 }
  ];
  
  const totalLearned = weeklyData.reduce((sum, day) => sum + day.learned, 0);
  const totalCorrect = weeklyData.reduce((sum, day) => sum + day.correct, 0);
  const accuracy = Math.round((totalCorrect / totalLearned) * 100);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 md:pb-6 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 flex items-center">
            <Link to="/" className="mr-4">
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </Link>
            <h1 className="text-2xl font-bold">学习报告</h1>
          </div>
          
          <div className="glass-card p-6 md:p-8 rounded-xl mb-8">
            <h2 className="text-xl font-bold mb-6">本周学习概览</h2>
            
            <div className="grid gap-6 sm:grid-cols-3 mb-8">
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-medium">单词量</h3>
                </div>
                <p className="text-3xl font-bold">{totalLearned}</p>
                <p className="text-sm text-muted-foreground">本周学习的单词数</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-medium">正确数</h3>
                </div>
                <p className="text-3xl font-bold">{totalCorrect}</p>
                <p className="text-sm text-muted-foreground">本周正确答题数</p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 text-amber-600 mr-2" />
                  <h3 className="font-medium">准确率</h3>
                </div>
                <p className="text-3xl font-bold">{accuracy}%</p>
                <p className="text-sm text-muted-foreground">本周答题准确率</p>
              </div>
            </div>
            
            <h3 className="font-medium mb-4">每日学习情况</h3>
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{day.day}</span>
                    <span>{day.correct}/{day.learned} ({Math.round((day.correct/day.learned)*100)}%)</span>
                  </div>
                  <ProgressBar
                    value={day.correct}
                    max={day.learned}
                    size="md"
                    color={day.correct/day.learned > 0.8 ? "success" : "default"}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-card p-6 md:p-8 rounded-xl">
            <h2 className="text-xl font-bold mb-6">学习建议</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">保持学习节奏</h3>
                <p className="text-sm text-blue-600">
                  你已经连续学习了7天，继续保持这个频率，每天学习20-30个单词是理想的。
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">巩固薄弱单词</h3>
                <p className="text-sm text-green-600">
                  建议你花更多时间复习错题本中的单词，特别是以下单词：aberration, cacophony, ephemeral。
                </p>
              </div>
              
              <div className="p-4 bg-amber-50 rounded-lg">
                <h3 className="font-medium text-amber-800 mb-2">尝试不同题型</h3>
                <p className="text-sm text-amber-600">
                  你在"单词补全"题型中的正确率较低，建议多练习这类题型来提高记忆效果。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Report;

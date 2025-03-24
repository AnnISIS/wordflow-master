
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

type StudyOrderOption = 'alphabet' | 'random' | 'forgetting-curve';
type NotificationOption = 'enabled' | 'disabled';

const Settings = () => {
  const [studyOrder, setStudyOrder] = useState<StudyOrderOption>('random');
  const [dailyGoal, setDailyGoal] = useState<number>(20);
  const [notifications, setNotifications] = useState<NotificationOption>('enabled');
  
  const handleSaveSettings = () => {
    // In a real app, this would save settings to localStorage or a backend
    localStorage.setItem('wordflow_settings', JSON.stringify({
      studyOrder,
      dailyGoal,
      notifications
    }));
    
    // Show a success message
    alert('设置已保存');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 md:pb-6 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 flex items-center">
            <Link to="/" className="mr-4">
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </Link>
            <h1 className="text-2xl font-bold">设置</h1>
          </div>
          
          <div className="glass-card p-6 md:p-8 rounded-xl mb-8">
            <h2 className="text-xl font-bold mb-6">学习设置</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-foreground font-medium mb-3">
                  学习顺序
                </label>
                <div className="grid gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => setStudyOrder('alphabet')}
                    className={cn(
                      "p-4 rounded-lg border border-border text-left transition-medium",
                      studyOrder === 'alphabet' 
                        ? "bg-primary/10 border-primary" 
                        : "bg-secondary/50 hover:bg-secondary"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span>按字母顺序</span>
                      {studyOrder === 'alphabet' && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      从A到Z按字母顺序学习单词
                    </p>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setStudyOrder('random')}
                    className={cn(
                      "p-4 rounded-lg border border-border text-left transition-medium",
                      studyOrder === 'random' 
                        ? "bg-primary/10 border-primary" 
                        : "bg-secondary/50 hover:bg-secondary"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span>随机顺序</span>
                      {studyOrder === 'random' && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      随机学习不同单词
                    </p>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setStudyOrder('forgetting-curve')}
                    className={cn(
                      "p-4 rounded-lg border border-border text-left transition-medium",
                      studyOrder === 'forgetting-curve' 
                        ? "bg-primary/10 border-primary" 
                        : "bg-secondary/50 hover:bg-secondary"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span>遗忘曲线</span>
                      {studyOrder === 'forgetting-curve' && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      根据遗忘曲线优化学习顺序
                    </p>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-foreground font-medium mb-3">
                  每日学习目标
                </label>
                <div className="grid gap-3 sm:grid-cols-4">
                  {[10, 20, 30, 50].map(goal => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setDailyGoal(goal)}
                      className={cn(
                        "p-4 rounded-lg border border-border transition-medium",
                        dailyGoal === goal 
                          ? "bg-primary/10 border-primary" 
                          : "bg-secondary/50 hover:bg-secondary"
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <span>{goal} 单词</span>
                        {dailyGoal === goal && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-foreground font-medium mb-3">
                  学习提醒
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setNotifications('enabled')}
                    className={cn(
                      "p-4 rounded-lg border border-border text-left transition-medium",
                      notifications === 'enabled' 
                        ? "bg-primary/10 border-primary" 
                        : "bg-secondary/50 hover:bg-secondary"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span>开启提醒</span>
                      {notifications === 'enabled' && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      每天提醒你学习新单词
                    </p>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setNotifications('disabled')}
                    className={cn(
                      "p-4 rounded-lg border border-border text-left transition-medium",
                      notifications === 'disabled' 
                        ? "bg-primary/10 border-primary" 
                        : "bg-secondary/50 hover:bg-secondary"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span>关闭提醒</span>
                      {notifications === 'disabled' && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      不接收提醒
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSaveSettings}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              保存设置
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;

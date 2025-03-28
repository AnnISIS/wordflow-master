
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DashboardSection from '@/components/sections/DashboardSection';
import StudySection from '@/components/sections/StudySection';

const Index = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'study'>('dashboard');
  const [studyMode, setStudyMode] = useState<'normal' | 'mistakes'>('normal');
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get('mode');
    
    if (mode === 'mistakes') {
      setStudyMode('mistakes');
      setActiveTab('study');
    }
  }, [location]);
  
  const switchToStudy = () => {
    setActiveTab('study');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 md:pb-6 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center p-1 bg-secondary rounded-md">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-medium transition-medium",
                  activeTab === 'dashboard' 
                    ? "bg-black text-white" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                概览
              </button>
              <button 
                onClick={() => setActiveTab('study')}
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-medium transition-medium",
                  activeTab === 'study' 
                    ? "bg-black text-white" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {studyMode === 'mistakes' ? '错题练习' : '学习'}
              </button>
            </div>
          </div>
          
          <div className="animate-fade-in">
            {activeTab === 'dashboard' ? (
              <DashboardSection onSwitchToStudy={switchToStudy} />
            ) : (
              <StudySection mode={studyMode} />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;


import { useState } from 'react';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DashboardSection from '@/components/sections/DashboardSection';
import StudySection from '@/components/sections/StudySection';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'study'>('dashboard');
  
  const switchToStudy = () => {
    setActiveTab('study');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 md:pb-6 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center p-1 bg-secondary rounded-lg">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-medium transition-medium",
                  activeTab === 'dashboard' 
                    ? "bg-white text-primary shadow-sm" 
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
                    ? "bg-white text-primary shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                学习
              </button>
            </div>
          </div>
          
          <div className="animate-fade-in">
            {activeTab === 'dashboard' ? (
              <DashboardSection onSwitchToStudy={switchToStudy} />
            ) : (
              <StudySection />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

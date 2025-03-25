
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DashboardSection from '@/components/sections/DashboardSection';
import StudySection from '@/components/sections/StudySection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'study' | 'mistakes'>('dashboard');
  const [studyMode, setStudyMode] = useState<'normal' | 'mistakes'>('normal');
  
  // Check URL params for mode
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get('mode');
    
    if (mode === 'mistakes') {
      setStudyMode('mistakes');
      setActiveTab('mistakes');
    }
  }, [location]);
  
  const switchToStudy = () => {
    setActiveTab('study');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 md:pb-6 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex justify-center mb-8">
            <Tabs 
              value={activeTab} 
              onValueChange={(value) => setActiveTab(value as 'dashboard' | 'study' | 'mistakes')}
              className="w-full max-w-md"
            >
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="dashboard">概览</TabsTrigger>
                <TabsTrigger value="study">学习</TabsTrigger>
                <TabsTrigger value="mistakes">错题练习</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="animate-fade-in">
                <DashboardSection onSwitchToStudy={switchToStudy} />
              </TabsContent>
              
              <TabsContent value="study" className="animate-fade-in">
                <StudySection mode="normal" />
              </TabsContent>
              
              <TabsContent value="mistakes" className="animate-fade-in">
                <StudySection mode="mistakes" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

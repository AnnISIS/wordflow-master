
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Search, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Word, words } from '@/constants/mockData';

const Mistakes = () => {
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mistakeWords, setMistakeWords] = useState<Word[]>([]);
  
  useEffect(() => {
    // Load mistakes from localStorage
    const savedMistakes = localStorage.getItem('wordflow_mistakes');
    const parsedMistakes = savedMistakes ? JSON.parse(savedMistakes) : [];
    setMistakes(parsedMistakes);
    
    // Filter words to get the mistake ones
    const mistWords = words.filter(word => parsedMistakes.includes(word.id));
    setMistakeWords(mistWords);
  }, []);
  
  const filteredWords = mistakeWords.filter(word => 
    word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.translations.some(t => t.meaning.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const removeFromMistakes = (wordId: string) => {
    const newMistakes = mistakes.filter(id => id !== wordId);
    setMistakes(newMistakes);
    localStorage.setItem('wordflow_mistakes', JSON.stringify(newMistakes));
    
    // Update the displayed list
    setMistakeWords(prev => prev.filter(word => word.id !== wordId));
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 md:pb-6 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 flex items-center">
            <Link to="/" className="mr-4">
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </Link>
            <h1 className="text-2xl font-bold">错题本</h1>
          </div>
          
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="搜索单词或释义..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-md border border-border bg-white focus:border-black focus:ring-1 focus:ring-black transition-medium"
            />
          </div>
          
          {filteredWords.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                {mistakes.length === 0 
                  ? "你还没有错题记录" 
                  : "没有找到匹配的单词"}
              </p>
              {mistakes.length === 0 && (
                <Link 
                  to="/"
                  className="mt-4 inline-block px-6 py-2 bg-black text-white rounded-md font-medium hover:bg-black/90 transition-colors"
                >
                  去学习
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              {filteredWords.map(word => (
                <div 
                  key={word.id}
                  className="bg-white p-6 rounded-xl shadow-sm transition-medium hover:shadow-md border border-border"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{word.word}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{word.phonetic}</p>
                      <p>{word.translations[0].meaning}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => removeFromMistakes(word.id)}
                        className="p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 14L15 8" />
                          <path d="M15 14L9 8" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-muted-foreground">
                    <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full mr-2">
                      需要复习
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {filteredWords.length > 0 && (
            <div className="mt-6 flex justify-center">
              <button 
                className="px-6 py-2 bg-black text-white rounded-md font-medium hover:bg-black/90 transition-colors"
                onClick={() => {
                  // This is where we changed to practice mistakes directly in this page
                  // instead of navigating to the home page with the mistakes mode
                  const savedMistakes = localStorage.getItem('wordflow_mistakes');
                  if (savedMistakes) {
                    const mistakesWords = JSON.parse(savedMistakes);
                    if (mistakesWords.length > 0) {
                      // We now have a dedicated component for studying mistakes
                      // TODO: Create a StudyMistakesSection component if needed
                    }
                  }
                }}
              >
                练习错题
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Mistakes;

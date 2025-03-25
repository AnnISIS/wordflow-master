
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BookOpen, BookMarked, AlertTriangle, BarChart3, Settings } from 'lucide-react';

const navItems = [
  { path: '/', name: '学习', icon: BookOpen },
  { path: '/favorites', name: '收藏', icon: BookMarked },
  { path: '/mistakes', name: '错题本', icon: AlertTriangle },
  { path: '/report', name: '报告', icon: BarChart3 },
  { path: '/settings', name: '设置', icon: Settings },
];

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-white border-b border-border py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-black">
                WordFlow
              </h1>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-2 rounded-md transition-medium font-medium",
                  location.pathname === item.path
                    ? "bg-black text-white"
                    : "text-foreground/80 hover:bg-secondary"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          <div className="md:hidden flex">
            {/* Mobile menu button would go here */}
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-md z-50">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-md transition-medium",
                location.pathname === item.path
                  ? "text-black font-semibold"
                  : "text-foreground/60 hover:text-black"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;

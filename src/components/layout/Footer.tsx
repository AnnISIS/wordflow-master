
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-6 px-6 md:px-8 bg-background/50 border-t border-border mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} WordFlow. 持续学习，流畅记忆。
            </p>
          </div>
          
          <div className="flex items-center space-x-1">
            <p className="text-sm text-muted-foreground">用爱打造</p>
            <Heart className="h-4 w-4 text-red-500 animate-pulse-soft" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

const ProgressBar = ({
  value,
  max,
  label,
  showValue = false,
  size = 'md',
  color = 'default',
  className
}: ProgressBarProps) => {
  const percentage = Math.round((value / max) * 100);
  
  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4'
  };
  
  const colorClasses = {
    default: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500'
  };
  
  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-muted-foreground">{label}</span>}
          {showValue && (
            <span className="text-sm font-medium text-foreground">
              {value}/{max} ({percentage}%)
            </span>
          )}
        </div>
      )}
      
      <div className={cn("w-full bg-secondary rounded-full overflow-hidden", heightClasses[size])}>
        <div 
          className={cn("rounded-full transition-all duration-500", colorClasses[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

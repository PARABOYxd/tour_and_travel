import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export default function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 'md', 
  showNumber = false,
  className 
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div className={cn('flex items-center', className)}>
      <div className="flex">
        {Array.from({ length: maxRating }, (_, i) => {
          const filled = i < Math.floor(rating);
          const halfFilled = i === Math.floor(rating) && rating % 1 !== 0;
          
          return (
            <Star
              key={i}
              className={cn(
                sizeClasses[size],
                filled || halfFilled
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              )}
            />
          );
        })}
      </div>
      {showNumber && (
        <span className="ml-1 text-sm font-medium text-gray-600">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
  showCount?: boolean;
  className?: string;
}

export function StarRating({ rating, count, size = 'sm', showCount = true, className }: StarRatingProps) {
  const starSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(
              starSize,
              i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted'
            )}
          />
        ))}
      </div>
      <span className={cn('font-medium text-navy', size === 'sm' ? 'text-xs' : 'text-sm')}>
        {rating.toFixed(1)}
      </span>
      {showCount && count !== undefined && (
        <span className={cn('text-muted-foreground', size === 'sm' ? 'text-xs' : 'text-sm')}>
          ({count})
        </span>
      )}
    </div>
  );
}

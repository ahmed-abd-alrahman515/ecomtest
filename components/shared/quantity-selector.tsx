'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  min?: number;
  max?: number;
  className?: string;
  size?: 'sm' | 'md';
}

export function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
  min = 1,
  max = 99,
  className,
  size = 'md',
}: QuantitySelectorProps) {
  const btnSize = size === 'sm' ? 'h-7 w-7' : 'h-10 w-10';
  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';
  const textSize = size === 'sm' ? 'w-8 text-sm' : 'w-12 text-base';

  return (
    <div className={cn('inline-flex items-center rounded-lg border border-border', className)}>
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className={cn(
          'flex items-center justify-center text-navy transition-colors hover:bg-accent disabled:opacity-40',
          btnSize
        )}
        aria-label="إنقاص"
      >
        <Minus className={iconSize} />
      </button>
      <span className={cn('text-center font-medium', textSize)}>{quantity}</span>
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className={cn(
          'flex items-center justify-center text-navy transition-colors hover:bg-accent disabled:opacity-40',
          btnSize
        )}
        aria-label="زيادة"
      >
        <Plus className={iconSize} />
      </button>
    </div>
  );
}

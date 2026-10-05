import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="مسار التنقل" className={cn('flex items-center flex-wrap gap-1.5 text-sm', className)}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={idx} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link href={item.href} className="text-muted-foreground transition-colors hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className={cn('font-medium', isLast ? 'text-navy' : 'text-muted-foreground')}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronLeft className="h-4 w-4 text-muted-foreground/50" />}
          </div>
        );
      })}
    </nav>
  );
}

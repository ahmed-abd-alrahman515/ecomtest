import { cn } from '@/lib/utils';
import { PackageOpen, Heart, SearchX, PackageSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Reveal } from '@/components/shared/reveal';

interface EmptyStateProps {
  icon?: 'cart' | 'wishlist' | 'search' | 'filter';
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

const iconMap = {
  cart: PackageOpen,
  wishlist: Heart,
  search: SearchX,
  filter: PackageSearch,
};

export function EmptyState({
  icon = 'search',
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: EmptyStateProps) {
  const Icon = iconMap[icon];
  return (
    <Reveal className={cn('flex flex-col items-center justify-center px-4 py-16 text-center', className)}>
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-navy">{title}</h3>
      {description && <p className="mb-6 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {actionLabel && actionHref && (
        <Button asChild size="lg">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </Reveal>
  );
}

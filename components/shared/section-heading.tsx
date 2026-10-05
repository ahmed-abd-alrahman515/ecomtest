import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/shared/reveal';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  href?: string;
  hrefLabel?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  href,
  hrefLabel = 'عرض الكل',
  className,
  centered,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'mb-8 flex items-end justify-between gap-4 lg:mb-10',
        centered && 'flex-col items-center text-center',
        className
      )}
    >
      <div>
        <div className={cn('mb-2 flex items-center gap-2', centered && 'justify-center')}>
          <span className="h-5 w-1 rounded-full bg-primary" />
          <h2 className="text-2xl font-extrabold tracking-normal text-navy lg:text-4xl">{title}</h2>
        </div>
        {subtitle && <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground lg:text-base">{subtitle}</p>}
      </div>
      {href && !centered && (
        <Link
          href={href}
          className="hidden shrink-0 items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 sm:flex"
        >
          {hrefLabel}
          <ArrowLeft className="h-4 w-4" />
        </Link>
      )}
    </Reveal>
  );
}

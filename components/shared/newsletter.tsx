'use client';

import { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-12 lg:flex-row lg:justify-between lg:py-10">
      <div className="text-center lg:text-right">
        <h3 className="text-xl font-bold text-white lg:text-2xl">اشترك لتصلك أحدث العروض</h3>
        <p className="mt-2 text-sm text-white/60">
          كن أول من يعرف عن المنتجات الجديدة والعروض الحصرية
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
        <Input
          type="email"
          placeholder="بريدك الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-11 border-white/10 bg-white/10 text-white placeholder:text-white/45 focus-visible:ring-primary"
        />
        <Button type="submit" size="lg" className="shrink-0">
          {submitted ? (
            <>
              <Check className="ml-1 h-4 w-4" />
              تم الاشتراك
            </>
          ) : (
            <>
              <Send className="ml-1 h-4 w-4" />
              اشترك
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

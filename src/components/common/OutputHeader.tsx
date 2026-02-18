'use client';

import { CheckCheck, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

type OutputHeaderProps = {
  title: string;
  content: string;
};

export function OutputHeader({ title, content }: OutputHeaderProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (!content.trim()) {
      toast.error('Nothing to copy');
      return;
    }

    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="mb-2 flex items-center justify-between gap-3">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">{title}</h2>
      <Button variant="outline" size="sm" onClick={onCopy}>
        {copied ? <CheckCheck className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
        Copy
      </Button>
    </div>
  );
}

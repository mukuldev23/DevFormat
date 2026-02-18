'use client';

import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/useThemeStore';

const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <div className="h-[360px] animate-pulse bg-muted/60" />
});

type CodeEditorProps = {
  label: string;
  value: string;
  language: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
  className?: string;
};

export function CodeEditor({
  label,
  value,
  language,
  onChange,
  readonly,
  className
}: CodeEditorProps) {
  const { mode } = useThemeStore();

  return (
    <Card className={cn('overflow-hidden border-border/80', className)}>
      <div className="border-b border-border px-4 py-2 text-xs font-medium uppercase tracking-wider text-slate-300">
        {label}
      </div>
      <Editor
        height="360px"
        value={value}
        onChange={(nextValue) => onChange?.(nextValue ?? '')}
        language={language}
        theme={mode === 'dark' ? 'vs-dark' : 'vs'}
        options={{
          readOnly: readonly,
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: 'JetBrains Mono',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: 'on'
        }}
      />
    </Card>
  );
}

'use client';

import { Play, WandSparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ToolActionItem = {
  id: string;
  label: string;
  description: string;
};

type ToolActionBarProps = {
  actions: ToolActionItem[];
  selectedActionId: string;
  onSelectAction: (actionId: string) => void;
  onRunAction: () => void;
  running?: boolean;
};

export function ToolActionBar({
  actions,
  selectedActionId,
  onSelectAction,
  onRunAction,
  running = false
}: ToolActionBarProps) {
  const selectedAction = actions.find((action) => action.id === selectedActionId);

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card/60 p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300">
        <span className="rounded-full border border-border px-2 py-0.5">Step 1</span>
        Choose what you want to do
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onSelectAction(action.id)}
            className={cn(
              'rounded-xl border px-3 py-2 text-left transition-colors',
              action.id === selectedActionId
                ? 'border-accent bg-accent/15'
                : 'border-border bg-muted/40 hover:bg-muted'
            )}
            aria-pressed={action.id === selectedActionId}
          >
            <p className="text-sm font-semibold">{action.label}</p>
            <p className="mt-1 text-xs text-slate-300">{action.description}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-3">
        <span className="rounded-full border border-border px-2 py-0.5 text-xs uppercase tracking-wider text-slate-300">
          Step 2
        </span>
        <Button onClick={onRunAction} disabled={running} className="min-w-52">
          <Play className="mr-2 h-4 w-4" />
          {running ? 'Running...' : `Run ${selectedAction?.label ?? 'Action'}`}
        </Button>
        <div className="ml-auto flex items-center gap-2 text-xs text-slate-300">
          <WandSparkles className="h-3.5 w-3.5 text-accent" />
          <span>
            <strong>Ctrl+Enter</strong> runs selected action
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-300">
        <span className="rounded-full border border-border px-2 py-0.5 uppercase tracking-wider">Step 3</span>
        Check the Output panel and use Copy when you are satisfied.
      </div>
    </div>
  );
}

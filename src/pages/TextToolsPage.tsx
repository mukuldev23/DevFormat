'use client';

import { useCallback, useMemo, useState } from 'react';
import { diffWordsWithSpace } from 'diff';
import { toast } from 'sonner';
import { CodeEditor } from '@/components/common/CodeEditor';
import { OutputHeader } from '@/components/common/OutputHeader';
import { PageTransition } from '@/components/common/PageTransition';
import { ToolActionBar } from '@/components/common/ToolActionBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCtrlEnter } from '@/hooks/useCtrlEnter';
import {
  createSideBySideDiffRows,
  createDiffSummary,
  type SideBySideDiffRow,
  removeDuplicateLines,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  wordCount
} from '@/utils/text-utils';

type TextActionConfig = {
  id: string;
  label: string;
  description: string;
  requiresSecondaryInput: boolean;
  showOutput: boolean;
  run: () => void;
};

type TextToolsPageProps = {
  initialActionId?: 'camel' | 'snake' | 'pascal' | 'diff' | 'dedupe' | 'word-count';
};

type WordDiffPart = {
  value: string;
  added?: boolean;
  removed?: boolean;
};

export default function TextToolsPage({ initialActionId = 'camel' }: TextToolsPageProps) {
  const [input, setInput] = useState('hello world toolkit sample');
  const [secondaryInput, setSecondaryInput] = useState('hello brave world toolkit sample');
  const [output, setOutput] = useState('');
  const [sideBySideRows, setSideBySideRows] = useState<SideBySideDiffRow[]>([]);
  const [selectedActionId, setSelectedActionId] = useState<string>(initialActionId);
  const [lastActionLabel, setLastActionLabel] = useState('camelCase');

  const actionConfigs = useMemo<TextActionConfig[]>(
    () => [
      {
        id: 'camel',
        label: 'camelCase',
        description: 'Convert text to camelCase.',
        requiresSecondaryInput: false,
        showOutput: true,
        run: () => {
          setSideBySideRows([]);
          setOutput(toCamelCase(input));
        }
      },
      {
        id: 'snake',
        label: 'snake_case',
        description: 'Convert text to snake_case.',
        requiresSecondaryInput: false,
        showOutput: true,
        run: () => {
          setSideBySideRows([]);
          setOutput(toSnakeCase(input));
        }
      },
      {
        id: 'pascal',
        label: 'PascalCase',
        description: 'Convert text to PascalCase.',
        requiresSecondaryInput: false,
        showOutput: true,
        run: () => {
          setSideBySideRows([]);
          setOutput(toPascalCase(input));
        }
      },
      {
        id: 'diff',
        label: 'Text Diff',
        description: 'Compare primary and secondary text line-by-line.',
        requiresSecondaryInput: true,
        showOutput: true,
        run: () => {
          setSideBySideRows(createSideBySideDiffRows(input, secondaryInput));
          setOutput(createDiffSummary(input, secondaryInput));
        }
      },
      {
        id: 'dedupe',
        label: 'Remove Duplicate Lines',
        description: 'Keep only one copy of each line.',
        requiresSecondaryInput: false,
        showOutput: true,
        run: () => {
          setSideBySideRows([]);
          setOutput(removeDuplicateLines(input));
        }
      },
      {
        id: 'word-count',
        label: 'Word Counter',
        description: 'Count words in primary input.',
        requiresSecondaryInput: false,
        showOutput: true,
        run: () => {
          setSideBySideRows([]);
          setOutput(`Word count: ${wordCount(input)}`);
        }
      }
    ],
    [input, secondaryInput]
  );

  const selectedAction = actionConfigs.find((action) => action.id === selectedActionId) ?? actionConfigs[0];
  const needsSecondaryInput = selectedAction.requiresSecondaryInput;
  const shouldShowOutput = selectedAction.showOutput;
  const showingDiffResult = selectedAction.id === 'diff';

  const runSelectedAction = useCallback(() => {
    if (!selectedAction) {
      return;
    }
    setLastActionLabel(selectedAction.label);
    selectedAction.run();
    toast.success(`${selectedAction.label} complete`);
  }, [selectedAction]);

  useCtrlEnter(runSelectedAction);

  return (
    <PageTransition>
      <Card>
        <CardHeader>
          <CardTitle>Text Tools</CardTitle>
          <CardDescription>
            Case conversion, diff checking, duplicate line removal, and word count.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ToolActionBar
            actions={actionConfigs.map(({ id, label, description }) => ({
              id,
              label,
              description
            }))}
            selectedActionId={selectedActionId}
            onSelectAction={setSelectedActionId}
            onRunAction={runSelectedAction}
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <CodeEditor label="Primary Input" value={input} onChange={setInput} language="plaintext" />
        {needsSecondaryInput ? (
          <CodeEditor
            label="Secondary Input (for diff)"
            value={secondaryInput}
            onChange={setSecondaryInput}
            language="plaintext"
          />
        ) : (
          shouldShowOutput && (
            <div>
              <OutputHeader title={`Output • ${lastActionLabel}`} content={output} />
              {showingDiffResult ? (
                <DiffViewer rows={sideBySideRows} />
              ) : (
                <CodeEditor label="Result" value={output} readonly language="plaintext" />
              )}
            </div>
          )
        )}
      </div>

      {needsSecondaryInput && shouldShowOutput && (
        <div>
          <OutputHeader title={`Output • ${lastActionLabel}`} content={output} />
          {showingDiffResult ? (
            <DiffViewer rows={sideBySideRows} />
          ) : (
            <CodeEditor label="Result" value={output} readonly language="plaintext" />
          )}
        </div>
      )}
    </PageTransition>
  );
}

function DiffViewer({ rows }: { rows: SideBySideDiffRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card/80">
      <div className="flex items-center gap-4 border-b border-border px-4 py-2 text-xs font-medium uppercase tracking-wide text-slate-300">
        <span>Side By Side Diff</span>
        <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-300">
          Added
        </span>
        <span className="inline-flex items-center rounded-full bg-rose-500/15 px-2 py-0.5 text-rose-300">
          Removed
        </span>
        <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-300">
          Changed
        </span>
      </div>
      <div className="grid grid-cols-2 border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-slate-400">
        <div className="border-r border-border px-3 py-2">Original</div>
        <div className="px-3 py-2">Changed</div>
      </div>
      <div className="max-h-[360px] overflow-auto font-mono text-sm">
        {rows.length === 0 ? (
          <p className="px-4 py-3 text-slate-300">Run Text Diff to see highlighted changes.</p>
        ) : (
          rows.map((row, index) => (
            <div key={`${row.type}-${index}`} className="grid grid-cols-2">
              <div
                className={
                  row.type === 'removed' || row.type === 'changed'
                    ? 'border-r border-border bg-rose-500/10 px-3 py-1 text-rose-200'
                    : 'border-r border-border px-3 py-1 text-slate-300'
                }
              >
                <span className="mr-2 inline-block w-5 text-slate-400">{index + 1}</span>
                {row.type === 'changed' ? (
                  <WordDiffText left={row.leftText} right={row.rightText} side="left" />
                ) : (
                  <span>{row.leftText.length > 0 ? row.leftText : ' '}</span>
                )}
              </div>
              <div
                className={
                  row.type === 'added' || row.type === 'changed'
                    ? 'bg-emerald-500/10 px-3 py-1 text-emerald-200'
                    : 'px-3 py-1 text-slate-300'
                }
              >
                <span className="mr-2 inline-block w-5 text-slate-400">{index + 1}</span>
                {row.type === 'changed' ? (
                  <WordDiffText left={row.leftText} right={row.rightText} side="right" />
                ) : (
                  <span>{row.rightText.length > 0 ? row.rightText : ' '}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function WordDiffText({
  left,
  right,
  side
}: {
  left: string;
  right: string;
  side: 'left' | 'right';
}) {
  const parts = diffWordsWithSpace(left, right) as WordDiffPart[];

  return (
    <span>
      {parts.map((part, index) => {
        if (side === 'left' && part.added) {
          return null;
        }
        if (side === 'right' && part.removed) {
          return null;
        }

        const highlightClass =
          side === 'left'
            ? part.removed
              ? 'rounded bg-rose-500/25'
              : ''
            : part.added
              ? 'rounded bg-emerald-500/25'
              : '';

        return (
          <span key={`${side}-${index}-${part.value}`} className={highlightClass}>
            {part.value}
          </span>
        );
      })}
    </span>
  );
}

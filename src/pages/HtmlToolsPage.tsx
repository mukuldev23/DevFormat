'use client';

import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { CodeEditor } from '@/components/common/CodeEditor';
import { OutputHeader } from '@/components/common/OutputHeader';
import { PageTransition } from '@/components/common/PageTransition';
import { ToolActionBar } from '@/components/common/ToolActionBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCtrlEnter } from '@/hooks/useCtrlEnter';
import { beautifyHtml, minifyHtml } from '@/utils/html-css-utils';

const initialHtml = `<main><section><h1>DevFormat - all in one toolkit</h1><p>Make code cleaner, faster, and easier to debug.</p></section></main>`;

type HtmlToolsPageProps = {
  initialActionId?: 'beautify' | 'minify';
};

export default function HtmlToolsPage({ initialActionId = 'beautify' }: HtmlToolsPageProps) {
  const [input, setInput] = useState(initialHtml);
  const [output, setOutput] = useState('');
  const [selectedActionId, setSelectedActionId] = useState<string>(initialActionId);
  const [lastActionLabel, setLastActionLabel] = useState('Beautify HTML');
  const [running, setRunning] = useState(false);

  const beautify = useCallback(() => {
    setOutput(beautifyHtml(input));
    toast.success('HTML beautified');
  }, [input]);

  const minify = useCallback(async () => {
    try {
      setOutput(await minifyHtml(input));
      toast.success('HTML minified');
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [input]);

  const actionConfigs = useMemo(
    () => [
      {
        id: 'beautify',
        label: 'Beautify HTML',
        description: 'Add clean line breaks and indentation for readability.',
        run: beautify
      },
      {
        id: 'minify',
        label: 'Minify HTML',
        description: 'Compress HTML by removing extra spaces and comments.',
        run: () => void minify()
      }
    ],
    [beautify, minify]
  );

  const selectedAction = actionConfigs.find((action) => action.id === selectedActionId) ?? actionConfigs[0];

  const runSelectedAction = useCallback(async () => {
    if (!selectedAction) {
      return;
    }
    setLastActionLabel(selectedAction.label);
    setRunning(true);
    try {
      await selectedAction.run();
    } finally {
      setRunning(false);
    }
  }, [selectedAction]);

  useCtrlEnter(() => void runSelectedAction());

  return (
    <PageTransition>
      <Card>
        <CardHeader>
          <CardTitle>HTML Tools</CardTitle>
          <CardDescription>Beautify and minify HTML in-browser.</CardDescription>
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
            onRunAction={() => void runSelectedAction()}
            running={running}
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <CodeEditor label="Input HTML" value={input} onChange={setInput} language="html" />
        <div>
          <OutputHeader title={`Output • ${lastActionLabel}`} content={output} />
          <CodeEditor label="Result" value={output} readonly language="html" />
        </div>
      </div>
    </PageTransition>
  );
}

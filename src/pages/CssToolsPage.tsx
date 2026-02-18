'use client';

import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { CodeEditor } from '@/components/common/CodeEditor';
import { OutputHeader } from '@/components/common/OutputHeader';
import { PageTransition } from '@/components/common/PageTransition';
import { ToolActionBar } from '@/components/common/ToolActionBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCtrlEnter } from '@/hooks/useCtrlEnter';
import { beautifyCss, minifyCss } from '@/utils/html-css-utils';

const initialCss = `.app{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0b1120;color:#f8fafc}`;

type CssToolsPageProps = {
  initialActionId?: 'beautify' | 'minify';
};

export default function CssToolsPage({ initialActionId = 'beautify' }: CssToolsPageProps) {
  const [input, setInput] = useState(initialCss);
  const [output, setOutput] = useState('');
  const [selectedActionId, setSelectedActionId] = useState<string>(initialActionId);
  const [lastActionLabel, setLastActionLabel] = useState('Beautify CSS');

  const beautify = useCallback(() => {
    setOutput(beautifyCss(input));
    toast.success('CSS beautified');
  }, [input]);

  const minify = useCallback(() => {
    setOutput(minifyCss(input));
    toast.success('CSS minified');
  }, [input]);

  const actionConfigs = useMemo(
    () => [
      {
        id: 'beautify',
        label: 'Beautify CSS',
        description: 'Format CSS with readable indentation and spacing.',
        run: beautify
      },
      {
        id: 'minify',
        label: 'Minify CSS',
        description: 'Compress CSS for production use.',
        run: minify
      }
    ],
    [beautify, minify]
  );

  const selectedAction = actionConfigs.find((action) => action.id === selectedActionId) ?? actionConfigs[0];

  const runSelectedAction = useCallback(() => {
    if (!selectedAction) {
      return;
    }
    setLastActionLabel(selectedAction.label);
    selectedAction.run();
  }, [selectedAction]);

  useCtrlEnter(runSelectedAction);

  return (
    <PageTransition>
      <Card>
        <CardHeader>
          <CardTitle>CSS Tools</CardTitle>
          <CardDescription>Beautify and minify stylesheets quickly.</CardDescription>
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
        <CodeEditor label="Input CSS" value={input} onChange={setInput} language="css" />
        <div>
          <OutputHeader title={`Output • ${lastActionLabel}`} content={output} />
          <CodeEditor label="Result" value={output} readonly language="css" />
        </div>
      </div>
    </PageTransition>
  );
}

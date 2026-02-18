'use client';

import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { CodeEditor } from '@/components/common/CodeEditor';
import { OutputHeader } from '@/components/common/OutputHeader';
import { PageTransition } from '@/components/common/PageTransition';
import { ToolActionBar } from '@/components/common/ToolActionBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCtrlEnter } from '@/hooks/useCtrlEnter';
import {
  formatJson,
  jsonToCsv,
  jsonToTypeScript,
  minifyJson,
  validateJson
} from '@/utils/json-utils';

const initialJson = `{
  "users": [
    { "id": 1, "name": "Maya", "role": "backend" },
    { "id": 2, "name": "Leo", "role": "frontend" }
  ]
}`;

type JsonToolsPageProps = {
  initialActionId?: 'format' | 'validate' | 'minify' | 'json-ts' | 'json-csv';
};

export default function JsonToolsPage({ initialActionId = 'format' }: JsonToolsPageProps) {
  const [input, setInput] = useState(initialJson);
  const [output, setOutput] = useState('');
  const [selectedActionId, setSelectedActionId] = useState<string>(initialActionId);
  const [lastActionLabel, setLastActionLabel] = useState('Format JSON');

  const runFormat = useCallback(() => {
    try {
      setOutput(formatJson(input));
      toast.success('JSON formatted');
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [input]);

  const runValidate = useCallback(() => {
    const result = validateJson(input);
    if (result.valid) {
      setOutput('Valid JSON ✅');
      toast.success('JSON is valid');
      return;
    }

    const lineInfo = result.line && result.column ? ` (line ${result.line}, col ${result.column})` : '';
    setOutput(`Invalid JSON ❌\n${result.message}${lineInfo}`);
    toast.error(`Invalid JSON${lineInfo}`);
  }, [input]);

  const runMinify = useCallback(() => {
    try {
      setOutput(minifyJson(input));
      toast.success('JSON minified');
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [input]);

  const runJsonToTs = useCallback(() => {
    try {
      setOutput(jsonToTypeScript(input));
      toast.success('Converted to TypeScript');
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [input]);

  const runJsonToCsv = useCallback(() => {
    try {
      setOutput(jsonToCsv(input));
      toast.success('Converted to CSV');
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [input]);

  const actionConfigs = useMemo(
    () => [
      {
        id: 'format',
        label: 'Format JSON',
        description: 'Pretty print JSON with 2-space indentation.',
        run: runFormat
      },
      {
        id: 'validate',
        label: 'Validate JSON',
        description: 'Check syntax and show exact error line and column.',
        run: runValidate
      },
      {
        id: 'minify',
        label: 'Minify JSON',
        description: 'Remove whitespace for compact payload size.',
        run: runMinify
      },
      {
        id: 'json-ts',
        label: 'JSON -> TypeScript',
        description: 'Generate interfaces/types from JSON structure.',
        run: runJsonToTs
      },
      {
        id: 'json-csv',
        label: 'JSON -> CSV',
        description: 'Convert object array data into CSV rows.',
        run: runJsonToCsv
      }
    ],
    [runFormat, runJsonToCsv, runJsonToTs, runMinify, runValidate]
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
          <CardTitle>JSON Toolkit</CardTitle>
          <CardDescription>
            Format, validate with line hints, minify, and convert JSON to TypeScript or CSV.
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
        <CodeEditor label="Input JSON" value={input} onChange={setInput} language="json" />
        <div>
          <OutputHeader title={`Output • ${lastActionLabel}`} content={output} />
          <CodeEditor label="Result" value={output} readonly language="typescript" />
        </div>
      </div>
    </PageTransition>
  );
}

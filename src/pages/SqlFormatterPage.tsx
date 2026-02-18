'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { CodeEditor } from '@/components/common/CodeEditor';
import { OutputHeader } from '@/components/common/OutputHeader';
import { PageTransition } from '@/components/common/PageTransition';
import { ToolActionBar } from '@/components/common/ToolActionBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCtrlEnter } from '@/hooks/useCtrlEnter';
import { formatSql } from '@/utils/sql-utils';

const initialSql =
  'select u.id,u.name,o.total from users u join orders o on u.id=o.user_id where o.total > 100 and u.active = 1 order by o.created_at desc';

export default function SqlFormatterPage() {
  const [input, setInput] = useState(initialSql);
  const [output, setOutput] = useState('');
  const [lastActionLabel, setLastActionLabel] = useState('Format SQL');

  const runFormat = useCallback(() => {
    try {
      setOutput(formatSql(input));
      setLastActionLabel('Format SQL');
      toast.success('SQL formatted');
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [input]);

  useCtrlEnter(runFormat);

  return (
    <PageTransition>
      <Card>
        <CardHeader>
          <CardTitle>SQL Formatter</CardTitle>
          <CardDescription>Format and normalize SQL for readability and code reviews.</CardDescription>
        </CardHeader>
        <CardContent>
          <ToolActionBar
            actions={[
              {
                id: 'format',
                label: 'Format SQL',
                description: 'Reformat SQL with uppercase keywords and clean layout.'
              }
            ]}
            selectedActionId="format"
            onSelectAction={() => undefined}
            onRunAction={runFormat}
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <CodeEditor label="Input SQL" value={input} onChange={setInput} language="sql" />
        <div>
          <OutputHeader title={`Output • ${lastActionLabel}`} content={output} />
          <CodeEditor label="Result" value={output} readonly language="sql" />
        </div>
      </div>
    </PageTransition>
  );
}

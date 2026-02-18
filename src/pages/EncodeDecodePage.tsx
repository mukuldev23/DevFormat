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
  base64Decode,
  base64Encode,
  decodeJwt,
  htmlEntityDecode,
  htmlEntityEncode,
  sha256,
  urlDecode,
  urlEncode
} from '@/utils/encode-utils';

const initialValue = 'https://api.example.com/users?id=42&name=Maya';

type EncodeDecodePageProps = {
  initialActionId?:
    | 'base64-encode'
    | 'base64-decode'
    | 'url-encode'
    | 'url-decode'
    | 'jwt-decode'
    | 'sha256'
    | 'html-entity-encode'
    | 'html-entity-decode';
};

export default function EncodeDecodePage({ initialActionId = 'base64-encode' }: EncodeDecodePageProps) {
  const [input, setInput] = useState(initialValue);
  const [output, setOutput] = useState('');
  const [selectedActionId, setSelectedActionId] = useState<string>(initialActionId);
  const [lastActionLabel, setLastActionLabel] = useState('Base64 Encode');
  const [running, setRunning] = useState(false);

  const actionConfigs = useMemo(
    () => [
      {
        id: 'base64-encode',
        label: 'Base64 Encode',
        description: 'Convert text into base64 string.',
        run: async () => setOutput(base64Encode(input))
      },
      {
        id: 'base64-decode',
        label: 'Base64 Decode',
        description: 'Decode base64 string back to text.',
        run: async () => setOutput(base64Decode(input))
      },
      {
        id: 'url-encode',
        label: 'URL Encode',
        description: 'Escape unsafe URL characters.',
        run: async () => setOutput(urlEncode(input))
      },
      {
        id: 'url-decode',
        label: 'URL Decode',
        description: 'Decode percent-encoded URL values.',
        run: async () => setOutput(urlDecode(input))
      },
      {
        id: 'jwt-decode',
        label: 'JWT Decode',
        description: 'Decode JWT header and payload (no signature verification).',
        run: async () => setOutput(decodeJwt(input))
      },
      {
        id: 'sha256',
        label: 'SHA256 Hash',
        description: 'Generate SHA256 hash from input text.',
        run: async () => setOutput(await sha256(input))
      },
      {
        id: 'html-entity-encode',
        label: 'HTML Entity Encode',
        description: 'Encode special HTML characters safely.',
        run: async () => setOutput(htmlEntityEncode(input))
      },
      {
        id: 'html-entity-decode',
        label: 'HTML Entity Decode',
        description: 'Decode HTML entities to normal characters.',
        run: async () => setOutput(htmlEntityDecode(input))
      }
    ],
    [input]
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
      toast.success(`${selectedAction.label} complete`);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setRunning(false);
    }
  }, [selectedAction]);

  useCtrlEnter(() => void runSelectedAction());

  return (
    <PageTransition>
      <Card>
        <CardHeader>
          <CardTitle>Encode / Decode</CardTitle>
          <CardDescription>
            Base64, URL, JWT decode, SHA256 hash, and HTML entity conversions.
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
            onRunAction={() => void runSelectedAction()}
            running={running}
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <CodeEditor label="Input" value={input} onChange={setInput} language="plaintext" />
        <div>
          <OutputHeader title={`Output • ${lastActionLabel}`} content={output} />
          <CodeEditor label="Result" value={output} readonly language="plaintext" />
        </div>
      </div>
    </PageTransition>
  );
}

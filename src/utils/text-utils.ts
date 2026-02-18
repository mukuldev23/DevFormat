import { diffLines } from 'diff';

export type DiffLine = {
  kind: 'added' | 'removed' | 'unchanged';
  text: string;
};

export type SideBySideDiffRow = {
  type: 'added' | 'removed' | 'changed' | 'unchanged';
  leftText: string;
  rightText: string;
};

type DiffPart = {
  value: string;
  added?: boolean;
  removed?: boolean;
};

export function toCamelCase(value: string): string {
  const words = splitWords(value);
  return words
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : capitalize(word.toLowerCase())
    )
    .join('');
}

export function toSnakeCase(value: string): string {
  return splitWords(value)
    .map((word) => word.toLowerCase())
    .join('_');
}

export function toPascalCase(value: string): string {
  return splitWords(value)
    .map((word) => capitalize(word.toLowerCase()))
    .join('');
}

export function removeDuplicateLines(value: string): string {
  const unique = Array.from(new Set(value.split('\n')));
  return unique.join('\n');
}

export function wordCount(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) {
    return 0;
  }
  return trimmed.split(/\s+/).length;
}

export function createDiffSummary(before: string, after: string): string {
  return createDiffLines(before, after)
    .map((line) => {
      const prefix = line.kind === 'added' ? '+ ' : line.kind === 'removed' ? '- ' : '  ';
      return `${prefix}${line.text}`;
    })
    .join('\n');
}

export function createDiffLines(before: string, after: string): DiffLine[] {
  return (diffLines(before, after) as DiffPart[]).flatMap((part) => {
    const kind: DiffLine['kind'] = part.added ? 'added' : part.removed ? 'removed' : 'unchanged';
    const lines = part.value.split('\n');
    if (lines[lines.length - 1] === '') {
      lines.pop();
    }
    return lines.map((text) => ({ kind, text }));
  });
}

export function createSideBySideDiffRows(before: string, after: string): SideBySideDiffRow[] {
  const parts = diffLines(before, after) as DiffPart[];
  const rows: SideBySideDiffRow[] = [];

  for (let index = 0; index < parts.length; index += 1) {
    const current = parts[index];
    const next = parts[index + 1];

    if (current.removed && next?.added) {
      const left = splitLines(current.value);
      const right = splitLines(next.value);
      const count = Math.max(left.length, right.length);

      for (let offset = 0; offset < count; offset += 1) {
        rows.push({
          type: 'changed',
          leftText: left[offset] ?? '',
          rightText: right[offset] ?? ''
        });
      }
      index += 1;
      continue;
    }

    if (current.removed) {
      for (const text of splitLines(current.value)) {
        rows.push({
          type: 'removed',
          leftText: text,
          rightText: ''
        });
      }
      continue;
    }

    if (current.added) {
      for (const text of splitLines(current.value)) {
        rows.push({
          type: 'added',
          leftText: '',
          rightText: text
        });
      }
      continue;
    }

    for (const text of splitLines(current.value)) {
      rows.push({
        type: 'unchanged',
        leftText: text,
        rightText: text
      });
    }
  }

  return rows;
}

function splitWords(value: string): string[] {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function splitLines(value: string): string[] {
  const lines = value.split('\n');
  if (lines[lines.length - 1] === '') {
    lines.pop();
  }
  return lines;
}

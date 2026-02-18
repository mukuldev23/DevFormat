export type JsonValidationResult =
  | { valid: true; parsed: unknown }
  | { valid: false; message: string; line?: number; column?: number };

export function validateJson(input: string): JsonValidationResult {
  try {
    const parsed = JSON.parse(input);
    return { valid: true, parsed };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid JSON';
    const position = extractPosition(message);
    if (position === undefined) {
      return { valid: false, message };
    }

    const { line, column } = indexToLineColumn(input, position);
    return {
      valid: false,
      message,
      line,
      column
    };
  }
}

export function formatJson(input: string): string {
  return JSON.stringify(JSON.parse(input), null, 2);
}

export function minifyJson(input: string): string {
  return JSON.stringify(JSON.parse(input));
}

export function jsonToTypeScript(input: string): string {
  const parsed = JSON.parse(input);
  const interfaces = new Map<string, string>();
  const rootType = inferType(parsed, 'RootObject', interfaces);

  const body = Array.from(interfaces.values()).join('\n\n');

  if (rootType === 'RootObject' || rootType.startsWith('Array<RootObject')) {
    return body;
  }

  return `${body}\n\nexport type RootObject = ${rootType};`;
}

export function jsonToCsv(input: string): string {
  const parsed = JSON.parse(input);
  const rows = Array.isArray(parsed) ? parsed : [parsed];

  if (!rows.every((row) => row !== null && typeof row === 'object' && !Array.isArray(row))) {
    throw new Error('JSON to CSV expects an object or an array of objects.');
  }

  const flattenedRows = rows.map((row) => flattenObject(row as Record<string, unknown>));
  const headers = Array.from(
    new Set(flattenedRows.flatMap((row) => Object.keys(row)))
  ).sort();

  const csvRows = [headers.join(',')];

  for (const row of flattenedRows) {
    const values = headers.map((header) => escapeCsvValue(row[header]));
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
}

function inferType(value: unknown, interfaceName: string, interfaces: Map<string, string>): string {
  if (value === null) {
    return 'null';
  }

  if (Array.isArray(value)) {
    if (!value.length) {
      return 'unknown[]';
    }

    const elementTypes = Array.from(
      new Set(value.map((item) => inferType(item, `${interfaceName}Item`, interfaces)))
    );

    return `Array<${elementTypes.join(' | ')}>`;
  }

  switch (typeof value) {
    case 'string':
      return 'string';
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'object': {
      const entries = Object.entries(value as Record<string, unknown>);
      const lines = entries.map(([key, nestedValue]) => {
        const nestedName = `${interfaceName}${toPascalCase(key)}`;
        const nestedType = inferType(nestedValue, nestedName, interfaces);
        const escapedKey = /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : `'${key}'`;
        return `  ${escapedKey}: ${nestedType};`;
      });

      interfaces.set(interfaceName, `export interface ${interfaceName} {\n${lines.join('\n')}\n}`);
      return interfaceName;
    }
    default:
      return 'unknown';
  }
}

function toPascalCase(value: string): string {
  return value
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char: string) => char.toUpperCase())
    .replace(/^[a-z]/, (char) => char.toUpperCase());
}

function flattenObject(
  value: Record<string, unknown>,
  prefix = '',
  acc: Record<string, string | number | boolean | null> = {}
): Record<string, string | number | boolean | null> {
  for (const [key, nested] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;

    if (nested === null || ['string', 'number', 'boolean'].includes(typeof nested)) {
      acc[path] = nested as string | number | boolean | null;
      continue;
    }

    if (Array.isArray(nested)) {
      acc[path] = JSON.stringify(nested);
      continue;
    }

    flattenObject(nested as Record<string, unknown>, path, acc);
  }

  return acc;
}

function escapeCsvValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  const asString = String(value);
  if (/[,"\n]/.test(asString)) {
    return `"${asString.replaceAll('"', '""')}"`;
  }

  return asString;
}

function extractPosition(message: string): number | undefined {
  const match = message.match(/position\s(\d+)/i);
  if (!match) {
    return undefined;
  }
  return Number(match[1]);
}

function indexToLineColumn(text: string, position: number): { line: number; column: number } {
  const upto = text.slice(0, Math.max(0, position));
  const lines = upto.split('\n');
  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1
  };
}

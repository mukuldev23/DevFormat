export function beautifyHtml(input: string): string {
  const compact = input.replace(/>\s+</g, '><').trim();
  const tokens = compact.split(/(<[^>]+>)/g).filter((token) => token.trim().length > 0);

  let indent = 0;
  const lines: string[] = [];

  for (const token of tokens) {
    const trimmed = token.trim();
    if (isClosingTag(trimmed)) {
      indent = Math.max(0, indent - 1);
    }

    const pad = '  '.repeat(indent);
    if (trimmed.startsWith('<')) {
      lines.push(`${pad}${trimmed}`);
    } else if (trimmed.length > 0) {
      lines.push(`${pad}${trimmed.replace(/\s+/g, ' ')}`);
    }

    if (isOpeningTag(trimmed)) {
      indent += 1;
    }
  }

  return lines.join('\n');
}

export async function minifyHtml(input: string): Promise<string> {
  return input
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}

export function beautifyCss(input: string): string {
  let indent = 0;
  let out = '';
  let inString = false;
  let quoteChar = '';

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];

    if ((char === '"' || char === "'") && input[index - 1] !== '\\') {
      if (!inString) {
        inString = true;
        quoteChar = char;
      } else if (quoteChar === char) {
        inString = false;
      }
      out += char;
      continue;
    }

    if (inString) {
      out += char;
      continue;
    }

    if (char === '{') {
      out = `${out.trimEnd()} {\n${'  '.repeat(indent + 1)}`;
      indent += 1;
      continue;
    }

    if (char === '}') {
      indent = Math.max(0, indent - 1);
      out = `${out.trimEnd()}\n${'  '.repeat(indent)}}\n${'  '.repeat(indent)}`;
      continue;
    }

    if (char === ';') {
      out = `${out.trimEnd()};\n${'  '.repeat(indent)}`;
      continue;
    }

    out += char;
  }

  return out
    .split('\n')
    .map((line) => line.replace(/\s+$/g, ''))
    .filter((line, index, lines) => !(line.trim() === '' && lines[index - 1]?.trim() === ''))
    .join('\n')
    .trim();
}

export function minifyCss(input: string): string {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\s+/g, ' ')
    .trim();
}

function isClosingTag(token: string): boolean {
  return /^<\//.test(token);
}

function isOpeningTag(token: string): boolean {
  if (!/^</.test(token)) {
    return false;
  }
  if (/^<\//.test(token) || /^<!/.test(token) || /^<\?/.test(token)) {
    return false;
  }
  return !/\/>$/.test(token);
}

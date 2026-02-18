import {
  Binary,
  Braces,
  CodeXml,
  Database,
  FileText
} from 'lucide-react';
import type { ToolRoute } from '@/types/tool';

export const TOOL_ROUTES: ToolRoute[] = [
  {
    label: 'JSON Tools',
    path: '/json-tools',
    description: 'Format, validate, convert JSON',
    icon: Braces
  },
  {
    label: 'HTML Tools',
    path: '/html-tools',
    description: 'Beautify and minify HTML',
    icon: CodeXml
  },
  {
    label: 'CSS Tools',
    path: '/css-tools',
    description: 'Beautify and minify CSS',
    icon: FileText
  },
  {
    label: 'Encode / Decode',
    path: '/encode-decode',
    description: 'Base64, URL, JWT, SHA256',
    icon: Binary
  },
  {
    label: 'Text Tools',
    path: '/text-tools',
    description: 'Cases, diff, dedupe, word count',
    icon: FileText
  },
  {
    label: 'SQL Formatter',
    path: '/sql-formatter',
    description: 'Format SQL query quickly',
    icon: Database
  }
];

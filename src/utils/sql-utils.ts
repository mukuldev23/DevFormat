import { format } from 'sql-formatter';

export function formatSql(input: string): string {
  return format(input, {
    language: 'sql',
    tabWidth: 2,
    keywordCase: 'upper'
  });
}

'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Page not found</CardTitle>
          <CardDescription>The tool you requested does not exist.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/json-tools">Back to toolkit</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  message?: string;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center p-6">
          <Card className="max-w-xl">
            <CardHeader>
              <CardTitle>Something broke</CardTitle>
              <CardDescription>
                A runtime error occurred. Refresh and retry your last action.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-mono text-sm text-red-300">{this.state.message}</p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

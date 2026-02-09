// src/components/ErrorBoundary.jsx

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
          <div className="border border-border max-w-2xl w-full bg-background">
            <div className="bg-background border-b border-border px-4 py-2 text-sm">
              <span className="text-primary">ERROR.SYS - CRITICAL FAILURE</span>
            </div>
            <div className="bg-background p-12 text-center">
              <div className="mb-8">
                <div className="text-4xl mb-4 text-destructive">⚠</div>
                <p className="text-base mb-4 text-primary">SYSTEM ERROR DETECTED</p>
                <p className="text-sm text-foreground/80 mb-2">
                  {this.state.error?.message || 'Unknown error occurred'}
                </p>
                <p className="text-base text-muted-foreground font-mono">
                  ERROR CODE: 0x{Math.random().toString(16).substr(2, 8).toUpperCase()}
                </p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="mt-8 px-6 py-3 bg-background text-primary border border-primary hover:bg-primary hover:text-background transition-all text-sm"
              >
                RESTART SYSTEM
              </button>
            </div>
            <div className="bg-background border-t border-border px-4 py-1.5 text-xs text-muted-foreground">
              PRESS RESTART TO CONTINUE
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

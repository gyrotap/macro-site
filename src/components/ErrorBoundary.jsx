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
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
          <div className="border-4 border-white window-border max-w-2xl w-full">
            <div className="bg-white text-black px-3 py-2 border-b-2 border-black text-sm">
              ERROR.SYS — CRITICAL FAILURE
            </div>
            <div className="bg-black p-12 text-center">
              <div className="mb-8">
                <div className="text-4xl mb-4">⚠</div>
                <p className="text-base mb-4">SYSTEM ERROR DETECTED</p>
                <p className="text-sm text-gray-400 mb-2">
                  {this.state.error?.message || 'Unknown error occurred'}
                </p>
                <p className="text-base text-gray-600 font-mono">
                  ERROR CODE: 0x{Math.random().toString(16).substr(2, 8).toUpperCase()}
                </p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="mt-8 px-6 py-3 bg-white text-black border-2 border-white hover:bg-black hover:text-white transition-all text-sm"
              >
                [RESTART SYSTEM]
              </button>
            </div>
            <div className="bg-white text-black px-3 py-1 border-t-2 border-black text-sm">
              PRESS [RESTART] TO CONTINUE
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

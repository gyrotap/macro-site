import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export const CodeBlock = ({ children }) => {
  const [activeTab, setActiveTab] = useState(null);
  
  // Extract all Code components from children
  const codes = React.Children.toArray(children).filter(
    child => child?.type?.displayName === 'Code'
  );
  
  // Set initial active tab
  React.useEffect(() => {
    if (codes.length > 0 && !activeTab) {
      setActiveTab(codes[0].props.tab);
    }
  }, [codes, activeTab]);
  
  const activeCode = codes.find(code => code.props.tab === activeTab);
  
  return (
    <div className="my-4 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        {codes.map((code) => (
          <button
            key={code.props.tab}
            onClick={() => setActiveTab(code.props.tab)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              activeTab === code.props.tab
                ? "bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b-2 border-slate-900 dark:border-slate-100"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            )}
          >
            {code.props.tab}
          </button>
        ))}
      </div>
      <div className="bg-slate-950 dark:bg-slate-950">
        {activeCode}
      </div>
    </div>
  );
};

export const Code = ({ tab, children }) => {
  // Remove the backticks and language identifier if present
  let content = children;
  if (typeof children === 'string') {
    content = children.replace(/^`*\w*\n?/, '').replace(/`*$/, '');
  }
  
  return (
    <pre className="p-4 overflow-x-auto">
      <code className="text-sm text-slate-100 font-mono">{content}</code>
    </pre>
  );
};

Code.displayName = 'Code';

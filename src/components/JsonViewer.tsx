import React from 'react';

interface JsonViewerProps {
  data: any;
  title?: string;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ data, title }) => {
  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
      {title && (
        <div className="px-4 py-2 border-b border-slate-800 bg-slate-900 text-slate-400 text-xs font-mono">
          {title}
        </div>
      )}
      <div className="flex-1 p-4 overflow-auto scrollbar-thin scrollbar-thumb-slate-700">
        <pre className="text-emerald-400 text-sm font-mono whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

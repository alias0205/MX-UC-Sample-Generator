import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../lib/utils';
import { RENDERER_CSS } from '../lib/resultRenderer';

interface HtmlPreviewProps {
  html: string;
  theme: 'light' | 'dark';
}

export const HtmlPreview: React.FC<HtmlPreviewProps> = ({ html, theme: initialTheme }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);

  // We wrap the HTML in a template that injects the shared CSS
  const completeHtml = `
    <html>
      <head>
        <style>${RENDERER_CSS}</style>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
          body { background: transparent; margin: 0; padding: 20px; display: flex; justify-content: center; }
        </style>
      </head>
      <body>
        <div class="mx-theme-${theme}">
          ${html}
        </div>
      </body>
    </html>
  `;

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-950">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Visual Preview</span>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setTheme('light')}
            className={cn(
              "p-1.5 rounded-md transition-all",
              theme === 'light' ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={cn(
              "p-1.5 rounded-md transition-all",
              theme === 'dark' ? "bg-slate-700 shadow-sm text-blue-400" : "text-slate-500 hover:text-slate-400"
            )}
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden bg-slate-200 dark:bg-slate-800 p-4">
        <iframe
          srcDoc={completeHtml}
          className="w-full h-full border-0 rounded-lg shadow-xl"
          title="Result Preview"
        />
      </div>
    </div>
  );
};

import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { MXTool } from '../types/mx';

interface ValidationPanelProps {
  tools: MXTool[];
  validationResults: Record<string, { passed: boolean; issues: string[] }>;
}

export const ValidationPanel: React.FC<ValidationPanelProps> = ({ tools, validationResults }) => {
  const failedTools = tools.filter(t => validationResults[t.id] && !validationResults[t.id].passed);
  const passedCount = tools.length - failedTools.length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Schema Validation</h3>
        </div>
        <div className="flex gap-3 text-[10px] font-bold">
          <span className="text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">
            {passedCount} OK
          </span>
          <span className="text-rose-600 bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded">
            {failedTools.length} ISSUES
          </span>
        </div>
      </div>
      
      <div className="max-h-[200px] overflow-auto p-4 space-y-2">
        {failedTools.length === 0 ? (
          <div className="flex items-center justify-center py-6 text-slate-400 gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-200" />
            <p className="text-[11px] font-medium italic">All schema checkpoints completed successfully.</p>
          </div>
        ) : (
          failedTools.map(tool => (
            <div key={tool.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2 mb-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs font-bold text-slate-700">{tool.tool_name}</span>
                <span className="text-[10px] font-mono text-slate-400">
                  {tool.command_slug}
                </span>
              </div>
              <ul className="space-y-1 pl-5">
                {validationResults[tool.id].issues.map((issue, i) => (
                  <li key={i} className="text-[10px] text-rose-500 flex items-start gap-1.5 leading-tight">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-300 shrink-0" />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

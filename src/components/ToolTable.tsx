import React from 'react';
import { Loader2 } from 'lucide-react';
import { MXTool, ToolResult } from '../types/mx';
import { cn } from '../lib/utils';

interface ToolTableProps {
  tools: MXTool[];
  validationResults: Record<string, { passed: boolean; issues: string[] }>;
  generationResults: Record<string, ToolResult>;
  onGenerate: (tool: MXTool) => void;
  onPreview: (toolId: string) => void;
  selectedToolId: string | null;
  generatingToolIds?: string[];
}

export const ToolTable: React.FC<ToolTableProps> = ({
  tools,
  validationResults,
  generationResults,
  onGenerate,
  onPreview,
  selectedToolId,
  generatingToolIds = [],
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">MarketXtractor Tool Batch</h3>
        <div className="text-[11px] text-slate-400">Showing {tools.length} entries</div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-slate-100">
              <th className="px-6 py-3 text-[10px] uppercase text-slate-400 font-bold">Slug / Tool Name</th>
              <th className="px-4 py-3 text-[10px] uppercase text-slate-400 font-bold">Template</th>
              <th className="px-4 py-3 text-[10px] uppercase text-slate-400 font-bold">Status</th>
              <th className="px-6 py-3 text-[10px] uppercase text-slate-400 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-50">
            {tools.map((tool) => {
              const validation = validationResults[tool.id];
              const result = generationResults[tool.id];
              const isSelected = selectedToolId === tool.id;
              const isGenerating = generatingToolIds.includes(tool.id);

              return (
                <tr
                  key={tool.id}
                  className={cn(
                    "hover:bg-slate-50 group transition-colors",
                    isSelected ? "bg-blue-50/30" : ""
                  )}
                >
                  <td className="px-6 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900">{tool.tool_name}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{tool.command_slug}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-slate-600 font-mono text-xs uppercase">{tool.result_template_id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                       {validation?.passed ? (
                         <span className="flex items-center gap-1.5 text-green-600 font-medium text-xs">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Passed
                         </span>
                       ) : (
                         <span className="flex items-center gap-1.5 text-rose-500 font-medium text-xs">
                           <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> Error
                         </span>
                       )}
                       {result && (
                         <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1 rounded">GEN</span>
                       )}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => onGenerate(tool)}
                        disabled={isGenerating}
                        className={cn(
                          "inline-flex min-w-[64px] items-center justify-center gap-1.5 text-blue-600 font-medium text-xs transition-colors",
                          isGenerating ? "cursor-wait" : "hover:underline"
                        )}
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          </>
                        ) : (
                          'Generate'
                        )}
                      </button>
                      <button
                        onClick={() => onPreview(tool.id)}
                        disabled={!result}
                        className={cn(
                          "font-medium text-xs transition-colors",
                          result ? "text-slate-600 hover:text-slate-900" : "text-slate-300 cursor-not-allowed"
                        )}
                      >
                        Preview
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

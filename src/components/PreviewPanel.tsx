import React, { useState } from 'react';
import { FileJson, Layout, FileText, Image, Package } from 'lucide-react';
import { ToolResult } from '../types/mx';
import { cn } from '../lib/utils';
import { JsonViewer } from './JsonViewer';
import { HtmlPreview } from './HtmlPreview';

interface PreviewPanelProps {
  result: ToolResult | null;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<'json' | 'preview' | 'meta' | 'packaging'>('preview');
  const [activeUC, setActiveUC] = useState<'UC1' | 'UC2' | 'UC3'>('UC1');

  if (!result) {
    return (
      <div className="h-full bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center p-8 text-slate-300">
        <Layout className="w-8 h-8 mb-3 opacity-20" />
        <p className="text-sm font-bold uppercase tracking-widest">No Selection</p>
        <p className="text-[10px] text-slate-400 mt-1">Select a tool to preview rendered use cases.</p>
      </div>
    );
  }

  const htmlLight = result.html[`${activeUC}_light` as keyof typeof result.html];
  const htmlDark = result.html[`${activeUC}_dark` as keyof typeof result.html];
  const previewHtmlByTheme = {
    light: htmlLight,
    dark: htmlDark,
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-50/50 border-b border-slate-100 p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Live Preview</h2>
            <div className="text-sm font-bold text-slate-800">{result.command_slug}</div>
          </div>
          <div className="flex bg-slate-100 p-0.5 rounded-lg">
             {(['UC1', 'UC2', 'UC3'] as const).map(uc => (
               <button
                 key={uc}
                 onClick={() => setActiveUC(uc)}
                 className={cn(
                   "px-3 py-1 rounded-md text-[10px] font-bold transition-all",
                   activeUC === uc ? "bg-white shadow-sm text-blue-600" : "text-slate-400 hover:text-slate-600"
                 )}
               >
                 {uc}
               </button>
             ))}
          </div>
        </div>

        <div className="flex gap-4">
          <TabButton active={activeTab === 'preview'} onClick={() => setActiveTab('preview')} label="Render" />
          <TabButton active={activeTab === 'json'} onClick={() => setActiveTab('json')} label="Payload" />
          <TabButton active={activeTab === 'meta'} onClick={() => setActiveTab('meta')} label="Manifest" />
          <TabButton active={activeTab === 'packaging'} onClick={() => setActiveTab('packaging')} label="Pack" />
        </div>
      </div>

      <div className="flex-1 p-4 overflow-hidden bg-[#F8FAFC]">
        {activeTab === 'preview' && (
          <div className="h-full">
            <HtmlPreview htmlByTheme={previewHtmlByTheme} initialTheme="light" />
          </div>
        )}
        {activeTab === 'json' && (
          <JsonViewer data={result.uc_results[activeUC]} title={`${activeUC} Payload Structure`} />
        )}
        {activeTab === 'meta' && (
          <JsonViewer data={result.screenshots.filter(s => s.use_case_id.includes(activeUC))} title="Instruction Mapping" />
        )}
        {activeTab === 'packaging' && (
          <div className="space-y-4 overflow-auto h-full text-[11px]">
             <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Input Context</p>
                <div className="h-[150px]">
                  <JsonViewer data={result.input_sample} />
                </div>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CSV Record Definition</p>
                <div className="h-[150px]">
                  <JsonViewer data={result.packaging.csv_rows.find(r => r.use_case_id.includes(activeUC))} />
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className={cn(
      "text-[10px] font-bold uppercase tracking-widest pb-1 transition-all",
      active ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-400 hover:text-slate-600"
    )}
  >
    {label}
  </button>
);

const EyeClosedIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-.722-3.25"/><path d="M2 8a10.645 10.645 0 0 0 20 0"/><path d="m20 15 2 3"/><path d="m4 15-2 3"/><path d="m9 18 .722-3.25"/></svg>
);

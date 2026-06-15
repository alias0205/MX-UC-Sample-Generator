import React, { useRef } from 'react';
import { Upload, FileType, Check, Zap, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface UploadPanelProps {
  onToolsUpload: (file: File) => void;
  status: {
    tools: boolean;
  };
  counts: {
    tools: number;
    valid: number;
    invalid: number;
  };
  onBatchGenerate: () => void;
  isGenerating: boolean;
}

export const UploadPanel: React.FC<UploadPanelProps> = ({
  onToolsUpload,
  status,
  counts,
  onBatchGenerate,
  isGenerating
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col md:flex-row gap-6 items-stretch">
      {/* Upload Card */}
      <div
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex-1 flex items-center gap-5 p-5 rounded-xl border border-slate-200 transition-all cursor-pointer group bg-white shadow-sm",
          status.tools
            ? "ring-2 ring-blue-500 ring-offset-2"
            : "hover:border-slate-300 hover:shadow-md"
        )}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={(e) => e.target.files?.[0] && onToolsUpload(e.target.files[0])}
          accept=".csv"
          className="hidden"
        />
        <div className={cn(
          "p-3 rounded-lg transition-colors",
          status.tools ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-400 group-hover:text-slate-600"
        )}>
          {status.tools ? <Check className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-slate-800 mb-0.5 tracking-tight">MarketXtractor Tools CSV</h3>
          <p className="text-[11px] text-slate-400 leading-tight">Upload the canonical tools registry to start generation.</p>
        </div>
      </div>

      {/* Stats & Actions */}
      <div className="flex-[0.8] flex gap-4">
        <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-sm">
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Row Processing</span>
           <div className="flex gap-4">
              <div>
                <div className="text-lg font-black text-slate-900">{counts.tools}</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Total</div>
              </div>
              <div className="border-l border-slate-100 pl-4">
                <div className="text-lg font-black text-emerald-600">{counts.valid}</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Valid</div>
              </div>
              <div className="border-l border-slate-100 pl-4">
                <div className="text-lg font-black text-rose-500">{counts.invalid}</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Issues</div>
              </div>
           </div>
        </div>

        <button
          onClick={onBatchGenerate}
          disabled={!status.tools || isGenerating}
          className={cn(
            "flex-1 rounded-xl flex flex-col items-center justify-center gap-2 transition-all shadow-md group",
            status.tools && !isGenerating
              ? "bg-slate-900 text-white hover:bg-slate-800"
              : "bg-slate-100 text-slate-400 cursor-not-allowed border-none shadow-none"
          )}
        >
          <Zap className={cn("w-5 h-5", status.tools && !isGenerating ? "text-blue-400 group-hover:scale-110" : "")} />
          <span className="text-xs font-bold uppercase tracking-widest">Execute Batch</span>
        </button>
      </div>
    </div>
  );
};

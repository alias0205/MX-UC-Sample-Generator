import React, { useState } from 'react';
import { Download, FileJson, FileType, FileArchive, PackageCheck } from 'lucide-react';
import { ToolResult } from '../types/mx';
import { buildFullPackageZip } from '../lib/zipBuilder';
import { downloadCSV } from '../lib/csv';

interface DownloadPanelProps {
  results: ToolResult[];
}

export const DownloadPanel: React.FC<DownloadPanelProps> = ({ results }) => {
  const [zipError, setZipError] = useState<string | null>(null);
  const isEnabled = results.length > 0;

  const handleDownloadJson = () => {
    const isSingle = results.length === 1;
    const downloadName = isSingle ? `${results[0].tool_id}_results.json` : 'all_results.json';

    if (isSingle && downloadName === 'marketxtractor_results.json') {
      throw new Error("Invalid JSON filename. Must use tool_id_results.json.");
    }

    const data = JSON.stringify(isSingle ? results[0] : results, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadName;
    a.click();
  };

  const handleDownloadCsv = () => {
    const rows = results.flatMap(r => r.packaging.csv_rows);
    downloadCSV(rows, 'uc_samples.csv');
  };

  const handleDownloadFullZip = async () => {
    setZipError(null);
    try {
      await buildFullPackageZip(results);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to build ZIP package.';
      setZipError(message);
      console.error('Failed to build ZIP package', error);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Export Controls</h3>
      
      <div className="space-y-2">
        <button
          disabled={!isEnabled}
          onClick={handleDownloadCsv}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 group disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span>Download Samples CSV</span>
          <span className="text-slate-300 group-hover:text-slate-500">↓</span>
        </button>

        <button
          disabled={!isEnabled}
          onClick={handleDownloadFullZip}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 group disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span>Generate Full ZIP Package</span>
          <span className="text-slate-300 group-hover:text-slate-500">⬚</span>
        </button>

        {zipError && (
          <div className="rounded-lg border border-rose-100 bg-rose-50 px-3 py-2 text-[10px] leading-snug text-rose-700">
            {zipError}
          </div>
        )}

        <button
          disabled={!isEnabled}
          onClick={handleDownloadJson}
          className="w-full flex items-center justify-between px-4 py-2 text-xs text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-0"
        >
          <span>Download Raw JSON</span>
        </button>
      </div>

      <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg">
        <div className="flex gap-2">
          <span className="text-amber-600 text-xs text-center min-w-[14px]">⚠</span>
          <div className="text-[10px] text-amber-800 leading-snug">
            <strong>Check metadata:</strong> Ensure <code>output_spec_json</code> is valid for UC3 premium blocks.
          </div>
        </div>
      </div>
    </div>
  );
};

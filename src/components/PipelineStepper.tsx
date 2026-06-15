import React from 'react';
import { CheckCircle2, Circle, Loader2, AlertCircle } from 'lucide-react';
import { PipelineStage, PipelineState } from '../types/mx';
import { cn } from '../lib/utils';

interface PipelineStepperProps {
  state: PipelineState;
}

export const PipelineStepper: React.FC<PipelineStepperProps> = ({ state }) => {
  const stages: Array<{ id: keyof PipelineState; label: string }> = [
    { id: 'csv_upload', label: 'CSV Upload' },
    { id: 'validation', label: 'Schema Validation' },
    { id: 'reasoning', label: 'CoT Reasoning' },
    { id: 'assignment', label: 'Template Assignment' },
    { id: 'generation', label: 'UC1/2/3 Gen' },
    { id: 'rendering', label: 'HTML Rendering' },
    { id: 'packaging', label: 'ZIP Packaging' },
  ];

  const getIcon = (status: PipelineStage) => {
    switch (status) {
      case 'passed': return <div className="w-2 h-2 rounded-full bg-emerald-500" />;
      case 'failed': return <div className="w-2 h-2 rounded-full bg-rose-500" />;
      case 'running': return <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />;
      default: return <div className="w-2 h-2 rounded-full bg-slate-200" />;
    }
  };

  return (
    <div className="space-y-0.5">
      {stages.map((stage) => (
        <div key={stage.id} className={cn(
          "flex items-center gap-3 py-2 px-3 rounded-lg transition-colors",
          state[stage.id] === 'running' ? "bg-slate-50 shadow-sm" : ""
        )}>
          {getIcon(state[stage.id])}
          <span className={cn(
            "text-[12px] font-medium transition-colors",
            state[stage.id] === 'running' ? "text-slate-900" :
            state[stage.id] === 'passed' ? "text-slate-600" :
            state[stage.id] === 'failed' ? "text-rose-600" :
            "text-slate-400"
          )}>
            {stage.label}
          </span>
        </div>
      ))}
    </div>
  );
};

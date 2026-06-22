/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Zap, 
  Settings2, 
  PlayCircle,
  ShieldCheck,
  RefreshCcw,
  Rocket
} from 'lucide-react';
import { MXTool, ToolResult, PipelineState } from './types/mx';
import { parseCSV } from './lib/csv';
import { validateToolRow } from './lib/validation';
import { generateInputSampleFromSchema } from './lib/inputSample';
import { inferTemplateId, generateUCs } from './lib/ucGenerator';
import { renderResultHtml, RENDERER_CSS } from './lib/resultRenderer';
import { generateScreenshotManifest } from './lib/screenshotManifest';
import { createUCCsvRows } from './lib/packageBuilder';
import { renderHtmlToJpegBlob, validateScreenshotFile, getImageDimensions } from './lib/screenshotGenerator';
import { assertValidUcResult } from './lib/ucValidator';
import { generateFallbackByToolType } from './lib/fallbackGenerators';

import { UploadPanel } from './components/UploadPanel';
import { ValidationPanel } from './components/ValidationPanel';
import { PipelineStepper } from './components/PipelineStepper';
import { ToolTable } from './components/ToolTable';
import { PreviewPanel } from './components/PreviewPanel';
import { DownloadPanel } from './components/DownloadPanel';
import { cn } from './lib/utils';

import { detectToolType } from './lib/toolIntelligence';
import { generateToolResultWithAI } from './services/openAiService';
import { normalizeBlocks } from './lib/blockNormalizer';
import { validateSemanticQuality } from './lib/semanticValidator';

export default function App() {
  // ... (state remains same)
  const [tools, setTools] = useState<MXTool[]>([]);
  const [validationResults, setValidationResults] = useState<Record<string, { passed: boolean; issues: string[] }>>({});
  const [generationResults, setGenerationResults] = useState<Record<string, ToolResult>>({});
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [generatingToolIds, setGeneratingToolIds] = useState<string[]>([]);

  const [pipeline, setPipeline] = useState<PipelineState>({
    csv_upload: 'pending',
    validation: 'pending',
    reasoning: 'pending',
    assignment: 'pending',
    generation: 'pending',
    rendering: 'pending',
    packaging: 'pending',
  });

  const [isGeneratingBatch, setIsGeneratingBatch] = useState(false);

  // Business Logic: Generators
  const generateToolResult = async (tool: MXTool) => {
    // 1. Schema Validation
    const validation = validateToolRow(tool);
    const slug = tool.command_slug;

    // 2. Tool Intelligence Layer
    const intel = detectToolType(tool);
    
    // 3. Generation Layer (AI with Fallback)
    let inputSample: any = {};
    let ucs: any = null;
    let aiError: string | null = null;
    let generationMethod = 'AI';
    
    try {
      console.log("---------------- 111111111 -----------");
      const aiData = await generateToolResultWithAI(tool);
      // Strict UC Validation
      try {
        console.log("---------------- 2222222222 -----------", aiData);
        assertValidUcResult(aiData);
        inputSample = aiData.input_sample;
        ucs = aiData.uc_results;
      } catch (err) {
        console.log("---------------- 3333333333 -----------");
        console.warn(`AI Validation failed for tool ${tool.id}, trying fallback:`, err);
        const fallback = generateFallbackByToolType(intel, tool);
        assertValidUcResult(fallback);
        inputSample = fallback.input_sample;
        ucs = fallback.uc_results;
        generationMethod = 'Fallback (Validation Fail)';
      }
    } catch (err) {
      console.error(`AI Generation failed for tool: ${tool.id}, trying fallback`, err);
      aiError = err instanceof Error ? err.message : String(err);
      
      try {
        const fallback = generateFallbackByToolType(intel, tool);
        assertValidUcResult(fallback);
        inputSample = fallback.input_sample;
        ucs = fallback.uc_results;
        generationMethod = `Fallback (AI Error: ${aiError})`;
      } catch (fallbackErr) {
        return {
          status: 'error',
          tool_id: tool.id,
          command_slug: slug,
          template_assignment: {
            result_engine: tool.result_engine,
            result_template_id: tool.result_template_id,
            reason: `Total generation failure: ${fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr)}`
          },
          input_sample: {},
          uc_results: {} as any,
          renderer_css: RENDERER_CSS,
          html: {} as any,
          screenshots: [],
          packaging: { csv_rows: [], zip_contents: [] },
          validation: {
            passed: false,
            issues: [`AI Error: ${aiError}`, `Fallback Error: ${fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr)}`]
          },
          screenshot_blobs: {}
        } as ToolResult;
      }
    }
    
    // 4. Template Assignment
    const templateId = tool.result_template_id && tool.result_template_id.startsWith('MXT_') 
      ? tool.result_template_id 
      : inferTemplateId(tool);
    
    // 5. Block Normalization
    normalizeBlocks(ucs);
    
    // 6. Rendering (HTML)
    const html = {
      UC1_light: renderResultHtml('UC1', slug, templateId, 'light', ucs.UC1, tool),
      UC1_dark: renderResultHtml('UC1', slug, templateId, 'dark', ucs.UC1, tool),
      UC2_light: renderResultHtml('UC2', slug, templateId, 'light', ucs.UC2, tool),
      UC2_dark: renderResultHtml('UC2', slug, templateId, 'dark', ucs.UC2, tool),
      UC3_light: renderResultHtml('UC3', slug, templateId, 'light', ucs.UC3, tool),
      UC3_dark: renderResultHtml('UC3', slug, templateId, 'dark', ucs.UC3, tool),
    };

    // HTML Integrity Check
    for (const [key, content] of Object.entries(html)) {
      if (content.includes("undefined") || content.includes("<h1 class=\"mx-result-title\"></h1>")) {
        return {
          status: 'error',
          tool_id: tool.id,
          command_slug: slug,
          template_assignment: {
            result_engine: tool.result_engine,
            result_template_id: templateId,
            reason: `Renderer error: ${key} received invalid empty data`
          },
          input_sample: inputSample,
          uc_results: ucs,
          renderer_css: RENDERER_CSS,
          html: html,
          screenshots: [],
          packaging: { csv_rows: [], zip_contents: [] },
          validation: {
            passed: false,
            issues: [`Renderer received invalid empty data for ${key}`]
          },
          screenshot_blobs: {}
        } as ToolResult;
      }
    }

    // 7. Hard Stop Rule: Validate that we have actual usable content before proceeding
    const generationIssues = [];
    if (!inputSample || Object.keys(inputSample).length === 0) generationIssues.push("Generation failed: Missing input_sample");
    if (!ucs || Object.keys(ucs).length === 0) generationIssues.push("Generation failed: Missing UC results");
    if (!html.UC1_light || html.UC1_light.length < 100) generationIssues.push("Generation failed: No usable HTML output produced");

    if (generationIssues.length > 0) {
      return {
        status: 'error',
        tool_id: tool.id,
        command_slug: slug,
        template_assignment: {
          result_engine: tool.result_engine,
          result_template_id: templateId,
          reason: 'Hard stop: Incomplete or empty generation output'
        },
        input_sample: inputSample || {},
        uc_results: ucs || {} as any,
        renderer_css: RENDERER_CSS,
        html: html,
        screenshots: [],
        packaging: { csv_rows: [], zip_contents: [] },
        validation: {
          passed: false,
          issues: [...validation.issues, ...generationIssues]
        },
        screenshot_blobs: {}
      } as ToolResult;
    }

    const toolResult: ToolResult = {
      status: 'pending',
      tool_id: tool.id,
      command_slug: slug,
      template_assignment: {
        result_engine: tool.result_engine,
        result_template_id: templateId,
        reason: `${intel.tool_type} intelligence applied via ${generationMethod}.`
      },
      input_sample: inputSample,
      uc_results: ucs,
      renderer_css: RENDERER_CSS,
      html,
      screenshots: generateScreenshotManifest(tool.id, slug),
      packaging: { csv_rows: [], zip_contents: [] },
      validation: validation,
      screenshot_blobs: {}
    };

    // 8. Screenshot Generation & Validation
    for (const screenshotMeta of toolResult.screenshots) {
      try {
        const htmlToCapture = html[screenshotMeta.html_key as keyof typeof html];
        
        // Generate Full
        const fullBlob = await renderHtmlToJpegBlob(htmlToCapture, RENDERER_CSS, screenshotMeta.theme, 1600);
        const fullValidation = await validateScreenshotFile(fullBlob);
        
        // Generate Thumb
        const thumbBlob = await renderHtmlToJpegBlob(htmlToCapture, RENDERER_CSS, screenshotMeta.theme, 640);
        const thumbValidation = await validateScreenshotFile(thumbBlob);

        if (!fullValidation.passed || !thumbValidation.passed) {
          toolResult.status = 'error';
          toolResult.validation.passed = false;
          if (!fullValidation.passed) toolResult.validation.issues.push(`Screenshot Error [${screenshotMeta.full_file}]: ${fullValidation.error}`);
          if (!thumbValidation.passed) toolResult.validation.issues.push(`Screenshot Error [${screenshotMeta.thumb_file}]: ${thumbValidation.error}`);
        } else {
          // Dimension Check
          const fullDim = await getImageDimensions(fullBlob);
          const thumbDim = await getImageDimensions(thumbBlob);
          
          if (fullDim.width === thumbDim.width) {
            toolResult.status = 'error';
            toolResult.validation.passed = false;
            toolResult.validation.issues.push(`Screenshot Error: Full and Thumb have same width (${fullDim.width}px) for ${screenshotMeta.html_key}`);
          } else {
            toolResult.screenshot_blobs![screenshotMeta.full_file] = fullBlob;
            toolResult.screenshot_blobs![screenshotMeta.thumb_file] = thumbBlob;
          }
        }
      } catch (err) {
        console.error(`Failed to capture screenshots for: ${screenshotMeta.html_key}`, err);
        toolResult.status = 'error';
        toolResult.validation.passed = false;
        toolResult.validation.issues.push(`Screenshot Failed [${screenshotMeta.html_key}]: Capture engine error`);
      }
    }

    // 9. Semantic Quality Validation & CSV Row Generation
    toolResult.packaging.csv_rows = createUCCsvRows(tool, toolResult);
    
    const semanticValidation = validateSemanticQuality(toolResult);
    if (!semanticValidation.passed) {
      toolResult.status = 'error';
      toolResult.validation.passed = false;
      toolResult.validation.issues.push(...semanticValidation.issues);
    }

    // 10. FINAL HARD GAUNTLET
    if (toolResult.status !== 'error') {
      const finalIssues = [];
      if (!toolResult.screenshot_blobs || Object.keys(toolResult.screenshot_blobs).length === 0) finalIssues.push("Hard Fail: No screenshot blobs captured");
      if (!toolResult.packaging.csv_rows || toolResult.packaging.csv_rows.length === 0) finalIssues.push("Hard Fail: CSV row generation failed");
      
      if (finalIssues.length > 0) {
        toolResult.status = 'error';
        toolResult.validation.passed = false;
        toolResult.validation.issues.push(...finalIssues);
      } else {
        toolResult.status = 'success';
      }
    } else {
      toolResult.validation.passed = false; // Synchronize validation with error status
    }

    return toolResult;
  };

  const handleGenerateSingle = async (tool: MXTool) => {
    setGeneratingToolIds(prev => prev.includes(tool.id) ? prev : [...prev, tool.id]);
    try {
      const result = await generateToolResult(tool);
      setGenerationResults(prev => ({ ...prev, [tool.id]: result }));
      setSelectedToolId(tool.id);
    } finally {
      setGeneratingToolIds(prev => prev.filter(id => id !== tool.id));
    }
  };

  const handleBatchGenerate = async (limit?: number) => {
    if (tools.length === 0) return;
    
    setIsGeneratingBatch(true);
    setPipeline(prev => ({ ...prev, generation: 'running', rendering: 'running' }));
    
    const targetTools = limit ? tools.slice(0, limit) : tools;
    const newResults: Record<string, ToolResult> = { ...generationResults };
    
    for (const tool of targetTools) {
      if (validationResults[tool.id]?.passed) {
        const result = await generateToolResult(tool);
        newResults[tool.id] = result;
      }
    }
    
    setGenerationResults(newResults);
    setPipeline(prev => ({ ...prev, generation: 'passed', rendering: 'passed', packaging: 'passed' }));
    setIsGeneratingBatch(false);
  };

  const handleToolsUpload = async (file: File) => {
    setPipeline(prev => ({ ...prev, csv_upload: 'running' }));
    const data = await parseCSV<MXTool>(file);
    setTools(data);
    
    const results: Record<string, { passed: boolean; issues: string[] }> = {};
    data.forEach(t => { results[t.id] = validateToolRow(t); });
    setValidationResults(results);
    
    setPipeline(prev => ({ 
      ...prev, csv_upload: 'passed', validation: 'passed', reasoning: 'passed', assignment: 'passed'
    }));
  };

  const handleReset = () => {
    setTools([]);
    setGenerationResults({});
    setGeneratingToolIds([]);
    setValidationResults({});
    setSelectedToolId(null);
    setPipeline({
        csv_upload: 'pending', validation: 'pending', reasoning: 'pending', assignment: 'pending', generation: 'pending', rendering: 'pending', packaging: 'pending'
    });
  };

  const validCount = Object.values(validationResults).filter((v: any) => v.passed).length;
  const invalidCount = tools.length - validCount;

  return (
    <div className="flex h-screen w-full bg-[#F3F4F6] font-sans text-slate-900 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">Internal Tool</h1>
          <div className="text-lg font-semibold text-slate-800 leading-tight">MX UC Sample<br/>Generator</div>
        </div>
        
        <div className="flex-1 overflow-auto p-4 flex flex-col">
          <div className="mb-6">
            <h3 className="px-3 mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              Pipeline Dashboard
            </h3>
            <PipelineStepper state={pipeline} />
          </div>

          <div className="space-y-1">
            <h3 className="px-3 mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Export Controls
            </h3>
            <SidebarButton 
              onClick={() => handleBatchGenerate(3)} 
              icon={<PlayCircle className="w-4 h-4" />} 
              label="Generate First 3" 
              disabled={tools.length === 0 || isGeneratingBatch}
            />
            <SidebarButton 
              onClick={() => handleBatchGenerate()} 
              icon={<Zap className="w-4 h-4" />} 
              label="Generate All Valid" 
              disabled={tools.length === 0 || isGeneratingBatch}
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100"
            />
            <SidebarButton 
              onClick={handleReset} 
              icon={<RefreshCcw className="w-4 h-4" />} 
              label="Reset Workspace" 
            />
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">System Status</span>
            <span className={cn(
              "text-[10px] font-mono px-1.5 py-0.5 rounded border",
              tools.length > 0 ? "text-green-600 bg-green-50 border-green-100" : "text-amber-600 bg-amber-50 border-amber-100"
            )}>
              {tools.length > 0 ? 'READY' : 'IDLE'}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 leading-relaxed">
            {isGeneratingBatch ? 'Processing tool batch...' : 'Waiting for batch execution.'}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full min-w-0">
        {/* Header: Upload Panel */}
        <header className="bg-white border-b border-slate-200 p-8 shrink-0">
          <UploadPanel 
            onToolsUpload={handleToolsUpload}
            status={{ tools: tools.length > 0 }}
            counts={{ tools: tools.length, valid: validCount, invalid: invalidCount }}
            onBatchGenerate={() => handleBatchGenerate()}
            isGenerating={isGeneratingBatch}
          />
        </header>

        {/* Content Grid */}
        <section className="flex-1 p-8 grid grid-cols-12 gap-6 overflow-hidden content-start">
          <div className="col-span-8 flex flex-col gap-6 overflow-hidden min-h-0">
            <div className="shrink-0">
               <ValidationPanel tools={tools} validationResults={validationResults} />
            </div>
            <div className="flex-1 min-h-0">
              <ToolTable 
                tools={tools} 
                validationResults={validationResults} 
                generationResults={generationResults}
                generatingToolIds={generatingToolIds}
                onGenerate={handleGenerateSingle}
                onPreview={setSelectedToolId}
                selectedToolId={selectedToolId}
              />
            </div>
          </div>

          <div className="col-span-4 flex flex-col gap-6 overflow-hidden min-h-0">
            <div className="flex-1 min-h-0">
              <PreviewPanel result={selectedToolId ? generationResults[selectedToolId] : null} />
            </div>
            <div className="shrink-0">
              <DownloadPanel results={Object.values(generationResults)} />
            </div>
          </div>
        </section>

        {/* Action Bar */}
        <footer className="bg-white border-t border-slate-200 px-8 py-3 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <div className="flex gap-4">
            <span>Worker Node: #GM-TRAN-01</span>
            <span>|</span>
            <span>Build: v3.2.1-MX-INTERNAL</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Automatic packaging enabled</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

const SidebarButton = ({ 
    icon, label, onClick, className, disabled 
}: { 
    icon: React.ReactNode, label: string, onClick: () => void, className?: string, disabled?: boolean 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed",
      className
    )}
  >
    {icon}
    {label}
  </button>
);

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ToolResult } from '../types/mx';

import { unparseUCCSV } from './packageBuilder';

async function isValidJpegBlob(blob: Blob): Promise<boolean> {
  if (!(blob instanceof Blob) || blob.size < 5000) return false;
  
  try {
    const buffer = await blob.slice(0, 3).arrayBuffer();
    const view = new Uint8Array(buffer);
    // JPEG signature: FF D8 FF
    return view[0] === 0xFF && view[1] === 0xD8 && view[2] === 0xFF;
  } catch (e) {
    return false;
  }
}

export async function buildFullPackageZip(results: ToolResult[]): Promise<void> {
  const zip = new JSZip();

  // Root metadata
  zip.file('metadata.json', JSON.stringify({
    generated_at: new Date().toISOString(),
    tool_count: results.length,
    generator: 'MX UC Sample Generator v3.1'
  }, null, 2));

  // Shared CSS
  if (results.length > 0) {
    zip.file('renderer_css.css', results[0].renderer_css);
  }

  // Results JSON
  const resultsFolder = zip.folder('results_json');
  // For single-tool generation, export as: {tool_id}_results.json
  const jsonFileName = results.length === 1 ? `${results[0].tool_id}_results.json` : 'all_results.json';
  
  if (results.length === 1 && jsonFileName === 'marketxtractor_results.json') {
    throw new Error("Invalid JSON filename. Must use tool_id_results.json.");
  }
  
  resultsFolder?.file(jsonFileName, JSON.stringify(results.length === 1 ? results[0] : results, null, 2));

  // CSV
  const csvRows: any[] = [];
  results.forEach(r => csvRows.push(...r.packaging.csv_rows));
  
  const csvContent = unparseUCCSV(csvRows);
  zip.file('uc_samples.csv', csvContent);

  // HTML and Screenshots folders
  const htmlFolder = zip.folder('html');
  const screenshotFolder = zip.folder('screenshots');

  for (const res of results) {
    if (res.status === 'error') {
       console.warn(`Skipping ${res.tool_id} from ZIP package - tool is in error state.`);
       continue;
    }

    const toolId = res.tool_id;
    
    // HTML Files
    Object.entries(res.html).forEach(([key, content]) => {
      htmlFolder?.file(`${toolId}_${key}.html`, content);
    });

    // Actual Screenshots
    for (const sc of res.screenshots) {
      const fullBlob = res.screenshot_blobs?.[sc.full_file];
      const thumbBlob = res.screenshot_blobs?.[sc.thumb_file];

      if (fullBlob && await isValidJpegBlob(fullBlob)) {
        screenshotFolder?.file(sc.full_file, fullBlob);
      } else {
        throw new Error(`CRITICAL SYSTEM FAILURE: Invalid or missing full screenshot for ${sc.full_file}. Expected valid JPEG > 5KB.`);
      }

      if (thumbBlob && await isValidJpegBlob(thumbBlob)) {
        screenshotFolder?.file(sc.thumb_file, thumbBlob);
      } else {
        throw new Error(`CRITICAL SYSTEM FAILURE: Invalid or missing thumbnail for ${sc.thumb_file}. Expected valid JPEG > 5KB.`);
      }
    }
  }

  const content = await zip.generateAsync({ type: 'blob' });
  // Zip name equals tool_id_package.zip
  const zipFinalName = results.length === 1 ? `${results[0].tool_id}_package.zip` : 'marketxtractor_full_package.zip';
  
  if (results.length === 1 && zipFinalName === 'marketxtractor_full_package.zip') {
    throw new Error("Invalid ZIP filename. Must use tool_id_package.zip.");
  }
  
  saveAs(content, zipFinalName);
}

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ToolResult } from '../types/mx';

import { unparseUCCSV } from './packageBuilder';
import { getPackagedHtmlFileName, getPackagedScreenshotFileName, toPackageFileSlug, toPackageFolderName } from './packageNaming';
import { RENDERER_CSS } from './resultRenderer';
import { renderHtmlToJpegBlob } from './screenshotGenerator';

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

async function getScreenshotBlob(
  result: ToolResult,
  screenshot: ToolResult['screenshots'][number]
): Promise<Blob> {
  const existingBlob = result.screenshot_blobs?.[screenshot.full_file];
  if (existingBlob && await isValidJpegBlob(existingBlob)) return existingBlob;

  const html = result.html[screenshot.html_key as keyof ToolResult['html']];
  if (!html) {
    throw new Error(`Missing HTML source for ${screenshot.html_key}.`);
  }

  const regeneratedBlob = await renderHtmlToJpegBlob(html, RENDERER_CSS, screenshot.theme, 1600);
  if (!await isValidJpegBlob(regeneratedBlob)) {
    throw new Error(`Regenerated screenshot ${screenshot.full_file} is not a valid JPEG larger than 5KB.`);
  }

  result.screenshot_blobs ??= {};
  result.screenshot_blobs[screenshot.full_file] = regeneratedBlob;
  return regeneratedBlob;
}

export async function buildFullPackageZip(results: ToolResult[]): Promise<void> {
  if (results.length === 0) {
    throw new Error('No generated results are available to package.');
  }

  const zip = new JSZip();
  let packagedToolCount = 0;

  for (const res of results) {
    const folderName = toPackageFolderName(res.command_slug, res.tool_id);
    const fileSlug = toPackageFileSlug(res.command_slug, res.tool_id);
    const toolFolder = zip.folder(folderName);
    const htmlLightFolder = toolFolder?.folder('html')?.folder('light');
    const htmlDarkFolder = toolFolder?.folder('html')?.folder('dark');
    const screenshotFolder = toolFolder?.folder('screenshots');

    if (!toolFolder || !htmlLightFolder || !htmlDarkFolder || !screenshotFolder) {
      throw new Error(`Failed to create ZIP folders for ${folderName}.`);
    }

    toolFolder.file(`${fileSlug}.json`, JSON.stringify(stripBlobFields(res), null, 2));
    toolFolder.file(`${fileSlug}.csv`, unparseUCCSV(res.packaging.csv_rows));
    
    (['UC1', 'UC2', 'UC3'] as const).forEach(uc => {
      htmlLightFolder.file(getPackagedHtmlFileName(res.command_slug, res.tool_id, uc), res.html[`${uc}_light`]);
      htmlDarkFolder.file(getPackagedHtmlFileName(res.command_slug, res.tool_id, uc), res.html[`${uc}_dark`]);
    });

    for (const sc of res.screenshots) {
      const fullBlob = await getScreenshotBlob(res, sc);
      const uc = sc.html_key.split('_')[0] as 'UC1' | 'UC2' | 'UC3';
      const screenshotFileName = getPackagedScreenshotFileName(res.command_slug, res.tool_id, uc, sc.theme);

      screenshotFolder.file(screenshotFileName, fullBlob);
    }

    packagedToolCount += 1;
  }

  if (packagedToolCount === 0) {
    throw new Error('No packageable generated results were found. Generate at least one tool before creating the ZIP.');
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const zipFinalName = results.length === 1
    ? `${toPackageFolderName(results[0].command_slug, results[0].tool_id)}.zip`
    : 'marketxtractor_full_package.zip';
  
  saveAs(content, zipFinalName);
}

function stripBlobFields(result: ToolResult): ToolResult {
  const { screenshot_blobs, ...serializableResult } = result;
  return serializableResult as ToolResult;
}

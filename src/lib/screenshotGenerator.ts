/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { toJpeg } from 'html-to-image';

async function waitForImages(doc: Document): Promise<void> {
  const images = Array.from(doc.images);
  await Promise.all(
    images.map(
      image =>
        image.complete
          ? Promise.resolve()
          : new Promise<void>(resolve => {
              image.onload = () => resolve();
              image.onerror = () => resolve();
            })
    )
  );
}

async function waitForIframeReady(iframe: HTMLIFrameElement): Promise<Document> {
  const doc = iframe.contentDocument;
  if (!doc) throw new Error("Render failed: iframe document was unavailable");

  if (doc.readyState !== "complete") {
    await new Promise<void>(resolve => {
      iframe.onload = () => resolve();
    });
  }

  await doc.fonts?.ready.catch(() => undefined);
  await waitForImages(doc);
  return doc;
}

function isFullHtmlDocument(html: string): boolean {
  return /<!doctype html|<html[\s>]/i.test(html);
}

function replaceCssFunction(source: string, functionName: string, replacement: string): string {
  const needle = `${functionName.toLowerCase()}(`;
  let result = '';
  let cursor = 0;

  while (cursor < source.length) {
    const start = source.toLowerCase().indexOf(needle, cursor);
    if (start === -1) return result + source.slice(cursor);

    result += source.slice(cursor, start);
    let depth = 1;
    let end = start + needle.length;
    while (end < source.length && depth > 0) {
      if (source[end] === '(') depth += 1;
      if (source[end] === ')') depth -= 1;
      end += 1;
    }
    result += replacement;
    cursor = end;
  }

  return result;
}

function sanitizeCssForCapture(source: string, theme: "light" | "dark"): string {
  const fallback = theme === "dark" ? "rgba(30, 41, 59, 0.72)" : "rgba(226, 232, 240, 0.72)";
  return replaceCssFunction(source, "color-mix", fallback);
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, encodedData] = dataUrl.split(',', 2);
  if (!header || !encodedData) throw new Error("Failed to create JPEG data URL");

  const mimeType = header.match(/^data:([^;]+)/)?.[1] || "image/jpeg";
  const binary = atob(encodedData);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return new Blob([bytes], { type: mimeType });
}

async function waitForLayout(): Promise<void> {
  await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
}

function getNumericText(value: string | null | undefined): number | undefined {
  const match = String(value ?? '').match(/\d+(?:\.\d+)?/);
  if (!match) return undefined;
  const number = Number(match[0]);
  if (!Number.isFinite(number)) return undefined;
  return Math.max(0, Math.min(100, number <= 1 ? number * 100 : number));
}

function setSvgCirclePaint(
  element: SVGElement | null,
  attributes: Record<string, string>
): void {
  if (!element) return;
  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
    element.style.setProperty(name, value);
  });
}

function inlineComputedSvgPaint(element: SVGElement | null): void {
  if (!element) return;
  const computed = element.ownerDocument.defaultView?.getComputedStyle(element);
  if (!computed) return;

  [
    'fill',
    'stroke',
    'stroke-width',
    'stroke-linecap',
    'stroke-linejoin',
    'stroke-dasharray',
    'stroke-dashoffset',
    'opacity',
    'filter',
    'font-size',
    'font-weight',
    'letter-spacing',
  ].forEach(property => {
    const value = computed.getPropertyValue(property);
    if (value) {
      element.setAttribute(property, value);
      element.style.setProperty(property, value);
    }
  });
}

function prepareScoreGaugesForCapture(doc: Document): void {
  Array.from(doc.querySelectorAll<SVGSVGElement>('svg.mx-score-svg')).forEach(svg => {
    const score = Math.round(
      getNumericText(svg.querySelector('.mx-score-value')?.textContent)
        ?? getNumericText(svg.querySelector<SVGElement>('.mx-score-progress')?.style.getPropertyValue('--mx-score-progress'))
        ?? 88
    );
    svg.setAttribute('width', svg.getAttribute('width') || '264');
    svg.setAttribute('height', svg.getAttribute('height') || '264');
    Array.from(svg.querySelectorAll<SVGElement>('*')).forEach(inlineComputedSvgPaint);

    setSvgCirclePaint(svg.querySelector<SVGElement>('.mx-score-outer'), {
      fill: 'none',
    });
    setSvgCirclePaint(svg.querySelector<SVGElement>('.mx-score-core'), {
    });
    setSvgCirclePaint(svg.querySelector<SVGElement>('.mx-score-track'), {
      fill: 'none',
      'stroke-linecap': 'round',
    });
    setSvgCirclePaint(svg.querySelector<SVGElement>('.mx-score-progress'), {
      fill: 'none',
      'stroke-linecap': 'round',
      'stroke-dasharray': `${score} ${Math.max(0, 100 - score)}`,
    });
  });
}

export async function renderHtmlToJpegBlob(
  html: string,
  css: string,
  theme: "light" | "dark",
  width: number
): Promise<Blob> {
  const captureHtml = sanitizeCssForCapture(html, theme);
  const captureCss = sanitizeCssForCapture(css, theme);
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.left = "-10000px";
  iframe.style.top = "0";
  iframe.style.width = `${width}px`;
  iframe.style.height = "2000px";
  iframe.style.border = "0";
  iframe.setAttribute("aria-hidden", "true");

  document.body.appendChild(iframe);

  try {
    const doc = iframe.contentDocument;
    if (!doc) throw new Error("Render failed: iframe document was unavailable");

    doc.open();
    doc.write(
      isFullHtmlDocument(captureHtml)
        ? captureHtml
        : `
          <!doctype html>
          <html>
            <head>
              <meta charset="utf-8" />
              <style>
                html, body {
                  margin: 0;
                  width: ${width}px;
                  min-height: 100%;
                  background: ${theme === "dark" ? "#0f172a" : "#ffffff"};
                  color: ${theme === "dark" ? "#f8fafc" : "#0f172a"};
                }
                *, *::before, *::after {
                  box-sizing: border-box;
                  border-color: ${theme === "dark" ? "#334155" : "#e2e8f0"};
                }
                ${captureCss}
                .mx-result { padding: 40px; }
              </style>
            </head>
            <body>
              <div class="mx-theme-${theme}">
                ${captureHtml}
              </div>
            </body>
          </html>
        `
    );
    doc.close();

    const readyDoc = await waitForIframeReady(iframe);
    const el = readyDoc.querySelector(".mx-shell, .mx-result, main") as HTMLElement | null;
    if (!el) throw new Error("Render failed: no renderable template root found in generated HTML");

    // ForeignObject capture preserves auto margins as an internal offset while
    // sizing the bitmap to the element itself, which clips the right edge.
    el.style.marginLeft = "0";
    el.style.marginRight = "0";
    el.style.transform = "none";
    iframe.style.height = `${Math.max(el.scrollHeight + 80, 2000)}px`;
    prepareScoreGaugesForCapture(readyDoc);
    await waitForLayout();

    const bounds = el.getBoundingClientRect();
    const captureWidth = Math.ceil(Math.max(bounds.width, el.scrollWidth));
    const captureHeight = Math.ceil(Math.max(bounds.height, el.scrollHeight));

    const dataUrl = await toJpeg(el, {
      backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
      quality: 0.92,
      pixelRatio: 2,
      cacheBust: true,
      width: captureWidth,
      height: captureHeight,
      style: {
        margin: "0",
        transform: "none",
      },
    });
    return dataUrlToBlob(dataUrl);
  } catch (error) {
    throw error;
  } finally {
    document.body.removeChild(iframe);
  }
}

export async function validateScreenshotFile(blob: Blob): Promise<{ passed: boolean; error?: string }> {
  if (blob.size < 5120) { // 5KB
    return { passed: false, error: "File size under 5KB" };
  }

  // Check magic bytes for JPEG
  const buffer = await blob.slice(0, 3).arrayBuffer();
  const view = new Uint8Array(buffer);
  const isJpeg = view[0] === 0xFF && view[1] === 0xD8 && view[2] === 0xFF;

  if (!isJpeg) {
    return { passed: false, error: "Invalid image header (not a valid JPG)" };
  }

  return { passed: true };
}

export async function getImageDimensions(blob: Blob): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image for dimension check"));
    };
    img.src = url;
  });
}

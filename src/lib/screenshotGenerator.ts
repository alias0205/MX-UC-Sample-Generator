/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import html2canvas from 'html2canvas';

export async function renderHtmlToJpegBlob(
  html: string,
  css: string,
  theme: "light" | "dark",
  width: number
): Promise<Blob> {
  const host = document.createElement("div");
  host.style.position = "fixed";
  host.style.left = "-10000px";
  host.style.top = "0";
  host.style.width = `${width}px`;

  // Use shadow DOM for style isolation
  const shadow = host.attachShadow({ mode: "open" });
  shadow.innerHTML = `
    <style>
      :host { display: block; width: 100%; }
      ${css}
      .mx-result { padding: 40px; }
    </style>
    <div class="mx-theme-${theme}">
      ${html}
    </div>
  `;

  document.body.appendChild(host);

  // Wait a bit for images/fonts (though html2canvas handles some of this)
  await new Promise(resolve => setTimeout(resolve, 500));

  const el = shadow.querySelector(".mx-result") as HTMLElement;
  if (!el) {
    document.body.removeChild(host);
    throw new Error("Render failed: .mx-result not found in generated HTML");
  }

  try {
    const canvas = await html2canvas(el, {
      backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        b => (b ? resolve(b) : reject(new Error("Failed to create JPEG blob"))),
        "image/jpeg",
        0.92
      );
    });

    document.body.removeChild(host);
    return blob;
  } catch (error) {
    document.body.removeChild(host);
    throw error;
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

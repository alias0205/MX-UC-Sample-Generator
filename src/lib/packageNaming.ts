const ACRONYMS = new Set(['ai', 'api', 'csv', 'html', 'json', 'pdf', 'seo', 'uc', 'url']);

function wordsFromSlug(value: string): string[] {
  return value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);
}

export function toPackageFolderName(commandSlug: string, fallbackId: string): string {
  const words = wordsFromSlug(commandSlug || fallbackId);
  if (words.length === 0) return fallbackId || 'MarketXtractor_Tool';

  return words
    .map(word => {
      const lower = word.toLowerCase();
      if (ACRONYMS.has(lower)) return lower.toUpperCase();
      return `${lower.charAt(0).toUpperCase()}${lower.slice(1)}`;
    })
    .join('_');
}

export function toPackageFileSlug(commandSlug: string, fallbackId: string): string {
  const words = wordsFromSlug(commandSlug || fallbackId);
  return words.length > 0 ? words.map(word => word.toLowerCase()).join('-') : (fallbackId || 'marketxtractor-tool').toLowerCase();
}

export function getPackagedHtmlFileName(commandSlug: string, fallbackId: string, uc: 'UC1' | 'UC2' | 'UC3'): string {
  return `${toPackageFolderName(commandSlug, fallbackId)}_${uc}.html`;
}

export function getPackagedScreenshotFileName(
  commandSlug: string,
  fallbackId: string,
  uc: 'UC1' | 'UC2' | 'UC3',
  theme: 'light' | 'dark'
): string {
  const safeToolId = (fallbackId || commandSlug || 'MarketXtractor_Tool')
    .trim()
    .replace(/[^A-Za-z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return `${safeToolId}_${uc}_${theme}.jpg`;
}

type UseCaseId = 'UC1' | 'UC2' | 'UC3';
type Theme = 'light' | 'dark';

interface TemplateFileMatch {
  html: string;
  sourcePath: string;
  masterHtml?: string;
  masterPath?: string;
}

const rawTemplateFiles = import.meta.glob<string>([
  '../templates/MXT_*.html',
  '../templates/MXT_*/*.html',
], {
  query: '?raw',
  import: 'default',
  eager: true,
});

function normalizeTemplateId(templateId: string | undefined): string {
  const match = templateId?.match(/MXT_\d{3}/i);
  return match ? match[0].toUpperCase() : 'MXT_001';
}

function toDisplayPath(importPath: string): string {
  return importPath.replace(/^\.\.\//, 'src/').replace(/\\/g, '/');
}

function belongsToTemplate(path: string, templateId: string): boolean {
  const fileName = path.split('/').pop()?.toUpperCase() ?? '';
  return path.startsWith(`../templates/${templateId}/`) || fileName.startsWith(`${templateId}_`);
}

export interface TemplatePlaceholderDefinition {
  name: string;
  section: string;
  type: string;
  required: boolean;
}

function findMasterTemplate(templateId: string): [string, string] | undefined {
  const entry = Object.entries(rawTemplateFiles).find(([path]) =>
    belongsToTemplate(path, templateId) && path.toLowerCase().endsWith('_master_template.html')
  );

  return entry ? [entry[0], entry[1]] : undefined;
}

function applyThemeTemplate(useCaseHtml: string, themeHtml: string, theme: Theme): string {
  const themeRoot = themeHtml.match(/:root\s*\{[\s\S]*?\}/)?.[0];
  const themedHtml = themeRoot
    ? useCaseHtml.replace(/:root\s*\{[\s\S]*?\}/, themeRoot)
    : useCaseHtml;

  return themedHtml.replace(/<body([^>]*?)data-theme="(?:light|dark)"([^>]*)>/i, `<body$1data-theme="${theme}"$2>`);
}

export function getHtmlTemplateFile(
  templateId: string | undefined,
  useCaseId: UseCaseId,
  theme: Theme
): TemplateFileMatch | null {
  const normalizedTemplateId = normalizeTemplateId(templateId);
  const useCaseNeedle = useCaseId.toLowerCase();
  const themeNeedle = theme.toLowerCase();
  const masterTemplate = findMasterTemplate(normalizedTemplateId);

  const candidates = Object.entries(rawTemplateFiles).filter(([path]) =>
    belongsToTemplate(path, normalizedTemplateId)
  );
  const useCaseTemplates = candidates
    .filter(([path]) => (path.split('/').pop()?.toLowerCase() ?? '').includes(useCaseNeedle))
    .sort(([firstPath], [secondPath]) => {
      const firstName = firstPath.split('/').pop()?.toLowerCase() ?? '';
      const secondName = secondPath.split('/').pop()?.toLowerCase() ?? '';
      const firstThemeRank = firstName.includes(themeNeedle) ? 0 : 1;
      const secondThemeRank = secondName.includes(themeNeedle) ? 0 : 1;
      return firstThemeRank - secondThemeRank || firstName.localeCompare(secondName);
    });
  const themeTemplate = candidates.find(([path]) => {
    const fileName = path.split('/').pop()?.toLowerCase() ?? '';
    return fileName.endsWith(`_${themeNeedle}.html`);
  });

  const selectedTemplate = useCaseTemplates[0] ?? themeTemplate ?? masterTemplate;
  if (!selectedTemplate) return null;
  const selectedHtml = useCaseTemplates[0] && themeTemplate
    ? applyThemeTemplate(useCaseTemplates[0][1], themeTemplate[1], theme)
    : selectedTemplate[1];

  return {
    html: selectedHtml,
    sourcePath: toDisplayPath(selectedTemplate[0]),
    masterHtml: masterTemplate?.[1],
    masterPath: masterTemplate ? toDisplayPath(masterTemplate[0]) : undefined,
  };
}

export function getTemplatePlaceholderDefinitions(
  templateId: string,
  useCaseId: UseCaseId,
  theme: Theme = 'light'
): TemplatePlaceholderDefinition[] {
  const template = getHtmlTemplateFile(templateId, useCaseId, theme);
  if (!template) return [];

  const doc = new DOMParser().parseFromString(template.html, 'text/html');
  const schemaText = doc.querySelector('#mx-ui-label-schema')?.textContent;
  if (!schemaText) return [];

  try {
    const schema = JSON.parse(schemaText) as {
      placeholders?: Array<{ placeholder?: string; section?: string; type?: string; required?: boolean }>;
    };
    return (schema.placeholders ?? [])
      .filter(item => typeof item.placeholder === 'string')
      .map(item => ({
        name: item.placeholder!.replace('{{', '').replace('}}', '').trim(),
        section: item.section ?? 'content',
        type: item.type ?? 'text',
        required: item.required ?? false,
      }));
  } catch {
    return [];
  }
}

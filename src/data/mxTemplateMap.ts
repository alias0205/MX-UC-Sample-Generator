export const TEMPLATE_IDS = [
  'MXT_001',
  'MXT_002',
  'MXT_003',
  'MXT_004',
  'MXT_005',
  'MXT_006',
  'MXT_007',
  'MXT_008',
] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];

export const TEMPLATE_FOLDERS: Record<TemplateId, string> = Object.fromEntries(
  TEMPLATE_IDS.map(templateId => [templateId, `src/templates/${templateId}`])
) as Record<TemplateId, string>;

import { MXTool, UCResult } from '../types/mx';
import { getHtmlTemplateFile } from './htmlTemplateRegistry';

export const RENDERER_CSS = `
:root {
  --mx-bg: #ffffff;
  --mx-surface: #f8fafc;
  --mx-surface-2: #f1f5f9;
  --mx-border: #e2e8f0;
  --mx-text: #0f172a;
  --mx-text-soft: #475569;
  --mx-muted: #94a3b8;
  --mx-accent: #3b82f6;
  --mx-accent-2: #2563eb;
  --mx-success: #10b981;
  --mx-warning: #f59e0b;
  --mx-danger: #ef4444;
  --mx-radius-xl: 1.5rem;
  --mx-radius-lg: 1rem;
  --mx-radius-md: 0.5rem;
  --mx-radius-sm: 0.25rem;
  --mx-space-1: 0.25rem;
  --mx-space-2: 0.5rem;
  --mx-space-3: 0.75rem;
  --mx-space-4: 1rem;
  --mx-space-5: 1.5rem;
  --mx-space-6: 2rem;
  --mx-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --mx-font: "Inter", sans-serif;
}

.mx-theme-dark {
  --mx-bg: #0f172a;
  --mx-surface: #1e293b;
  --mx-surface-2: #334155;
  --mx-border: #334155;
  --mx-text: #f8fafc;
  --mx-text-soft: #cbd5e1;
  --mx-muted: #64748b;
  --mx-accent: #60a5fa;
  --mx-accent-2: #3b82f6;
}

.mx-result {
  background: var(--mx-bg);
  color: var(--mx-text);
  font-family: var(--mx-font);
  padding: var(--mx-space-6);
  border-radius: var(--mx-radius-xl);
  border: 1px solid var(--mx-border);
  max-width: 800px;
  margin: 0 auto;
}

.mx-result-header {
  margin-bottom: var(--mx-space-6);
  border-bottom: 2px solid var(--mx-border);
  padding-bottom: var(--mx-space-4);
}

.mx-result-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--mx-space-2);
}

.mx-result-subtitle {
  color: var(--mx-text-soft);
  font-size: 0.875rem;
}

.mx-stats {
  display: flex;
  gap: var(--mx-space-4);
  margin-top: var(--mx-space-4);
  flex-wrap: wrap;
}

.mx-stat {
  background: var(--mx-surface);
  padding: var(--mx-space-3) var(--mx-space-4);
  border-radius: var(--mx-radius-md);
  border: 1px solid var(--mx-border);
  min-width: 120px;
}

.mx-stat-label {
  font-size: 0.75rem;
  color: var(--mx-muted);
  text-transform: uppercase;
}

.mx-stat-value {
  font-size: 1.125rem;
  font-weight: 600;
}

.mx-result-body {
  display: flex;
  flex-direction: column;
  gap: var(--mx-space-6);
}

.mx-block {
  background: var(--mx-surface);
  padding: var(--mx-space-5);
  border-radius: var(--mx-radius-lg);
  border: 1px solid var(--mx-border);
}

.mx-block-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: var(--mx-space-4);
  color: var(--mx-accent);
}

.mx-table-block {
  overflow-x: auto;
}

.mx-table {
  width: 100%;
  border-collapse: collapse;
}

.mx-table th {
  text-align: left;
  padding: var(--mx-space-2) var(--mx-space-3);
  font-size: 0.75rem;
  color: var(--mx-muted);
  border-bottom: 1px solid var(--mx-border);
}

.mx-table td {
  padding: var(--mx-space-3);
  font-size: 0.875rem;
  border-bottom: 1px solid var(--mx-border);
}

.mx-metrics-grid, .mx-insight-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--mx-space-4);
}

.mx-metric-card, .mx-insight-card {
  background: var(--mx-surface-2);
  padding: var(--mx-space-4);
  border-radius: var(--mx-radius-md);
  box-shadow: var(--mx-shadow);
}

.mx-recommendation {
  background: var(--mx-bg);
  padding: var(--mx-space-3);
  border-radius: var(--mx-radius-md);
  border-left: 4px solid var(--mx-accent);
  margin-bottom: var(--mx-space-3);
}

.mx-action-step-content {
  display: flex;
  flex-direction: column;
}

.mx-step-title {
  font-weight: 700;
  color: var(--mx-text);
  font-size: 0.875rem;
}

.mx-step-description {
  font-size: 0.75rem;
  color: var(--mx-text-soft);
}

.mx-step-number {
  color: var(--mx-accent);
  font-weight: 800;
  font-size: 0.875rem;
  min-width: 1.5rem;
}

.mx-decision-layer {
  background: var(--mx-surface);
  border: 1px solid var(--mx-accent);
  border-left: 6px solid var(--mx-accent);
  padding: var(--mx-space-4);
  border-radius: var(--mx-radius-md);
}

.mx-decision-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--mx-space-3);
}

.mx-decision-status {
  font-weight: 800;
  text-transform: uppercase;
  color: var(--mx-accent);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.mx-decision-score {
  background: var(--mx-accent);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: var(--mx-radius-sm);
  font-weight: 900;
  font-size: 0.875rem;
}

.mx-decision-reason {
  font-style: italic;
  font-size: 0.875rem;
  color: var(--mx-text-soft);
  line-height: 1.5;
}

.mx-action-step {
  display: flex;
  align-items: center;
  gap: var(--mx-space-3);
  padding: var(--mx-space-2) 0;
  border-bottom: 1px dashed var(--mx-border);
}

.mx-action-step::before {
  content: "→";
  color: var(--mx-success);
}

.mx-footer {
    margin-top: var(--mx-space-6);
    padding-top: var(--mx-space-4);
    border-top: 1px solid var(--mx-border);
    text-align: center;
    font-size: 0.75rem;
    color: var(--mx-muted);
}
`;

export function renderResultHtml(
  ucId: string,
  commandSlug: string,
  templateId: string,
  theme: 'light' | 'dark',
  data: UCResult,
  tool?: MXTool,
  mappedPlaceholders?: Record<string, string>
): string {
  const normalizedUcId = ucId.match(/UC[123]/i)?.[0].toUpperCase() as 'UC1' | 'UC2' | 'UC3' | undefined;
  const templateFile = normalizedUcId ? getHtmlTemplateFile(templateId, normalizedUcId, theme) : null;

  if (!templateFile) {
    return renderFallbackHtml(ucId, commandSlug, templateId, theme, data, tool);
  }

  return renderDynamicTemplateHtml(templateFile.html, {
    ucId,
    commandSlug,
    templateId,
    theme,
    data,
    tool,
    mappedPlaceholders,
  });
}

interface RenderContext {
  ucId: string;
  commandSlug: string;
  templateId: string;
  theme: 'light' | 'dark';
  data: UCResult;
  tool?: MXTool;
  mappedPlaceholders?: Record<string, string>;
}

function renderDynamicTemplateHtml(html: string, context: RenderContext): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const placeholders = createPlaceholderMap(context);
  if (context.mappedPlaceholders) {
    applyMappedPlaceholders(placeholders, context.mappedPlaceholders, context);
  } else {
    populateTemplatePlaceholders(html, placeholders, context);
  }
  applyTemplatePlaceholderDefaults(placeholders, context);

  doc.body.dataset.templateId = context.templateId;
  doc.body.dataset.theme = context.theme;
  doc.body.dataset.useCase = context.ucId;
  doc.body.classList.add(`mx-theme-${context.theme}`);

  applyDocumentMetadata(doc, context);
  if (context.templateId !== 'MXT_001' && context.templateId !== 'MXT_002' && context.templateId !== 'MXT_003' && context.templateId !== 'MXT_004' && context.templateId !== 'MXT_005' && context.templateId !== 'MXT_006' && context.templateId !== 'MXT_007' && context.templateId !== 'MXT_008') {
    applyHeader(doc, context, placeholders);
  }
  applySummary(doc, context);
  applyStats(doc, context);
  if (context.templateId !== 'MXT_001' && context.templateId !== 'MXT_002' && context.templateId !== 'MXT_003' && context.templateId !== 'MXT_004' && context.templateId !== 'MXT_005' && context.templateId !== 'MXT_006' && context.templateId !== 'MXT_007' && context.templateId !== 'MXT_008') {
    applyTables(doc, context);
  }
  applyNarrativeBlocks(doc, context);
  replaceRemainingPlaceholders(doc, placeholders);
  attachDownloadActions(doc, context);

  return `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
}

function applyMappedPlaceholders(
  placeholders: Record<string, string>,
  mappedPlaceholders: Record<string, string>,
  context: RenderContext
): void {
  Object.assign(placeholders, mappedPlaceholders);

  const fallbackHeroPills = getHeroPillValues(context);
  for (const index of [1, 2, 3]) {
    const shortName = `hero_pill_${index}`;
    const paddedName = `hero_pill_${String(index).padStart(2, '0')}`;
    const shortBadgeName = `hero_badge_${index}`;
    const paddedBadgeName = `hero_badge_${String(index).padStart(2, '0')}`;
    const value = mappedPlaceholders[shortName] || mappedPlaceholders[paddedName] || fallbackHeroPills[index - 1];

    placeholders[shortName] = value;
    placeholders[paddedName] = value;
    placeholders[shortBadgeName] = value;
    placeholders[paddedBadgeName] = value;
  }

  fallbackHeroPills.slice(3).forEach((value, offset) => {
    const index = offset + 4;
    placeholders[`hero_pill_${index}`] = value;
    placeholders[`hero_pill_${String(index).padStart(2, '0')}`] = value;
    placeholders[`hero_badge_${index}`] = value;
    placeholders[`hero_badge_${String(index).padStart(2, '0')}`] = value;
  });

  applyScorePlaceholders(placeholders, context);

  for (let index = 1; index <= 8; index += 1) {
    const padded = String(index).padStart(2, '0');
    const shortStatusName = `dimension_status_${index}`;
    const paddedStatusName = `dimension_status_${padded}`;
    const shortValueName = `dimension_value_${index}`;
    const paddedValueName = `dimension_value_${padded}`;
    const shortNameName = `dimension_name_${index}`;
    const paddedNameName = `dimension_name_${padded}`;
    const status = mappedPlaceholders[paddedStatusName] || mappedPlaceholders[shortStatusName] || placeholders[paddedStatusName] || placeholders[shortStatusName];
    const value = placeholders[paddedValueName] || placeholders[shortValueName];
    const name = placeholders[paddedNameName] || placeholders[shortNameName];
    const normalizedStatus = normalizeDimensionStatus(status, value, name);

    placeholders[shortStatusName] = normalizedStatus;
    placeholders[paddedStatusName] = normalizedStatus;
  }
}

function applyTemplatePlaceholderDefaults(placeholders: Record<string, string>, context: RenderContext): void {
  if (context.templateId === 'MXT_001') {
    applyMxt001PlaceholderMappings(placeholders, context);
  }

  if (context.templateId === 'MXT_002') {
    applyMxt002PlaceholderMappings(placeholders, context);
  }

  if (context.templateId === 'MXT_003') {
    applyMxt003PlaceholderMappings(placeholders, context);
  }

  if (context.templateId === 'MXT_004') {
    applyMxt004PlaceholderMappings(placeholders, context);
  }

  if (context.templateId === 'MXT_005') {
    applyMxt005PlaceholderMappings(placeholders, context);
  }

  if (context.templateId === 'MXT_006') {
    applyMxt006PlaceholderMappings(placeholders, context);
  }

  if (context.templateId === 'MXT_007') {
    applyMxt007PlaceholderMappings(placeholders, context);
  }

  if (context.templateId === 'MXT_008') {
    applyMxt008PlaceholderMappings(placeholders, context);
  }

  if (context.templateId !== 'MXT_006') return;

  if (isMissingPlaceholderValue(placeholders.profile_image_url)) {
    placeholders.profile_image_url = createProfilePlaceholderImageDataUrl(placeholders.profile_name || context.data.summary_card.title);
  }

  if (isMissingPlaceholderValue(placeholders.initials)) {
    placeholders.initials = getInitials(placeholders.profile_name || context.data.summary_card.title || context.tool?.tool_name || context.commandSlug);
  }
}

function applyMxt001PlaceholderMappings(placeholders: Record<string, string>, context: RenderContext): void {
  const { data, tool, commandSlug } = context;
  const metrics = getMetrics(data);
  const actions = getActions(data);
  const recommendations = getRecommendations(data);
  const decision = getDecision(data);
  const factorRows = getMxt001FactorRows(data);
  const pressureMetrics = getMxt001PressureMetrics(data, metrics);
  const finalDecision = stringifyValue(decision?.reason)
    || recommendations[0]?.description
    || recommendations[0]?.title
    || data.summary_card.subtitle
    || 'Not provided';

  setMxt001Placeholder(placeholders, context, 'theme', context.theme);
  setMxt001Placeholder(placeholders, context, 'hero_icon', tool?.icon_emoji || 'MX');
  setMxt001Placeholder(placeholders, context, 'hero_title', data.summary_card.title || tool?.tool_name || commandSlug);
  setMxt001Placeholder(placeholders, context, 'decision_title', stringifyValue(decision?.title) || data.summary_card.title || 'Decision goal');
  setMxt001Placeholder(placeholders, context, 'decision_summary', data.summary_card.subtitle || finalDecision);
  setMxt001Placeholder(placeholders, context, 'decision_recommended', finalDecision);
  setMxt001Placeholder(placeholders, context, 'decision_tolerance', findResultValue(data, /^(risk_tolerance|tolerance)$/i) || getRiskLabel(data));
  setMxt001Placeholder(placeholders, context, 'risk_level', getRiskLabel(data));
  setMxt001Placeholder(placeholders, context, 'final_decision_body', finalDecision);

  applyScorePlaceholders(placeholders, context);

  getHeroPillValues(context).forEach((value, index) => {
    setMxt001Placeholder(placeholders, context, `hero_pill_${index + 1}`, value);
  });

  for (let index = 0; index < 4; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const metric = metrics[index] || {
      label: `Dimension ${index + 1}`,
      value: 'Not provided',
      status: 'Not provided',
    };

    setMxt001Placeholder(placeholders, context, `dimension_name_${padded}`, metric.label);
    setMxt001Placeholder(placeholders, context, `dimension_value_${padded}`, metric.value);
    setMxt001Placeholder(
      placeholders,
      context,
      `dimension_status_${padded}`,
      normalizeDimensionStatus(metric.status, metric.value, metric.label)
    );
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const row = factorRows[index] || {};

    setMxt001Placeholder(placeholders, context, `factor_name_${padded}`, row.name || `Option ${index + 1}`);
    setMxt001Placeholder(placeholders, context, `factor_signal_${padded}`, row.signal || 'Not provided');
    setMxt001Placeholder(placeholders, context, `factor_impact_${padded}`, row.impact || 'Not provided');
    setMxt001Placeholder(placeholders, context, `factor_action_${padded}`, row.action || 'Not provided');
  }

  for (let index = 0; index < 4; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const metric = pressureMetrics[index] || metrics[index] || {
      label: `Pressure ${index + 1}`,
      value: '0',
    };

    setMxt001Placeholder(placeholders, context, `pressure_label_${padded}`, metric.label);
    setMxt001Placeholder(placeholders, context, `pressure_width_${padded}`, clampPercent(extractPercent(metric.value)));
    setMxt001Placeholder(placeholders, context, `pressure_value_${padded}`, metric.value);
  }

  for (let index = 0; index < 4; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const action = actions[index] || recommendations[index];
    setMxt001Placeholder(placeholders, context, `action_body_${padded}`, action?.description || action?.title || 'Not provided');
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const warning = recommendations[index] || actions[index];
    setMxt001Placeholder(placeholders, context, `warning_body_${padded}`, warning?.description || warning?.title || 'Not provided');
  }
}

function setMxt001Placeholder(
  placeholders: Record<string, string>,
  context: RenderContext,
  key: string,
  fallbackValue: string | undefined
): void {
  const mappedValue = context.mappedPlaceholders?.[key];
  placeholders[key] = isMissingPlaceholderValue(mappedValue)
    ? fallbackValue?.trim() || 'Not provided'
    : mappedValue;
}

function getMxt001FactorRows(data: UCResult): Array<{ name?: string; signal?: string; impact?: string; action?: string }> {
  const table = getDataTableBlock(data);
  const rows = getTableRows(table);

  if (rows.length > 0) {
    return rows.map(row => {
      const entries = Object.entries(row);
      return {
        name: stringifyValue(row.Option ?? row.option ?? row.Name ?? row.name ?? entries[0]?.[1]),
        signal: stringifyValue(row.Score ?? row.score ?? row.Signal ?? row.signal ?? entries[1]?.[1]),
        impact: stringifyValue(row.Constraint ?? row.constraint ?? row.Impact ?? row.impact ?? entries[2]?.[1]),
        action: stringifyValue(row['Risk Note'] ?? row.risk_note ?? row.Action ?? row.action ?? entries[3]?.[1]),
      };
    });
  }

  const block = data.blocks.find(block => /ranked|option|factor/i.test(`${block.type} ${block.title}`));
  const items = block?.items || block?.data || block?.recommendations;
  if (!Array.isArray(items)) return [];

  return items.map((item: any) => ({
    name: stringifyValue(item.name || item.option || item.title || item.label),
    signal: stringifyValue(item.signal || item.score || item.value),
    impact: stringifyValue(item.impact || item.constraint || item.reason || item.description),
    action: stringifyValue(item.action || item.risk_note || item.recommendation),
  }));
}

function getMxt001PressureMetrics(
  data: UCResult,
  fallbackMetrics: Array<{ label: string; value: string; status?: string }>
): Array<{ label: string; value: string; status?: string }> {
  const block = data.blocks.find(block => /pressure|risk|breakdown/i.test(`${block.type} ${block.title}`));
  const items = block?.metrics || block?.items || block?.data;
  if (!Array.isArray(items)) return fallbackMetrics;

  return items.map((item: any, index: number) => ({
    label: stringifyValue(item.label || item.title || item.name) || `Pressure ${index + 1}`,
    value: stringifyValue(item.value || item.score || item.weight || item.percentage || item.description) || '0',
    status: stringifyValue(item.status || item.severity),
  }));
}

function stringifyValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function applyMxt002PlaceholderMappings(placeholders: Record<string, string>, context: RenderContext): void {
  const { data, tool, commandSlug } = context;
  const stats = data.summary_card.stats ?? [];
  const recommendations = getRecommendations(data);
  const actions = getActions(data);
  const strategyItems = getMxt002StrategyItems(data);
  const rewriteRows = getMxt002RewriteRows(data);
  const sequenceItems = getMxt002SequenceItems(data, actions);
  const finalRecommendation = recommendations[0]?.description
    || recommendations[0]?.title
    || getDecision(data)?.reason
    || data.summary_card.subtitle
    || 'Not provided';

  setMxt002Placeholder(placeholders, context, 'theme', context.theme);
  setMxt002Placeholder(placeholders, context, 'hero_icon', tool?.icon_emoji || 'MX');
  setMxt002Placeholder(placeholders, context, 'hero_title', data.summary_card.title || tool?.tool_name || commandSlug);
  setMxt002Placeholder(placeholders, context, 'summary_title', data.summary_card.title || tool?.tool_name || commandSlug);
  setMxt002Placeholder(placeholders, context, 'summary_channel', findResultValue(data, /^(channel|platform)$/i) || stats[0]?.value || 'Not provided');
  setMxt002Placeholder(placeholders, context, 'summary_audience', findResultValue(data, /^(audience|target_audience)$/i) || stats[1]?.value || 'Not provided');
  setMxt002Placeholder(placeholders, context, 'summary_tone', findResultValue(data, /^(tone|voice|style)$/i) || stats[2]?.value || 'Not provided');
  setMxt002Placeholder(placeholders, context, 'brief_body_01', data.summary_card.subtitle || finalRecommendation);
  setMxt002Placeholder(placeholders, context, 'brief_body_02', recommendations[0]?.description || actions[0]?.description || finalRecommendation);
  setMxt002Placeholder(placeholders, context, 'recommendation_body', finalRecommendation);

  getHeroPillValues(context).forEach((value, index) => {
    setMxt002Placeholder(placeholders, context, `hero_pill_${index + 1}`, value);
  });

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const item = strategyItems[index] || recommendations[index] || actions[index];
    setMxt002Placeholder(placeholders, context, `strategy_title_${padded}`, item?.title || `Strategy ${index + 1}`);
    setMxt002Placeholder(placeholders, context, `strategy_body_${padded}`, item?.description || item?.title || 'Not provided');
  }

  for (let index = 0; index < 4; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const row = rewriteRows[index] || {};
    setMxt002Placeholder(placeholders, context, `rewrite_original_${padded}`, row.original || `Rewrite ${index + 1}`);
    setMxt002Placeholder(placeholders, context, `rewrite_risk_${padded}`, normalizeDimensionStatus(row.risk, row.risk, 'risk'));
    setMxt002Placeholder(placeholders, context, `rewrite_recommendation_${padded}`, row.recommendation || 'Not provided');
    setMxt002Placeholder(placeholders, context, `rewrite_reason_${padded}`, row.reason || row.impact || 'Not provided');
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const item = sequenceItems[index] || actions[index] || recommendations[index];
    setMxt002Placeholder(placeholders, context, `sequence_title_${padded}`, item?.title || `Step ${index + 1}`);
    setMxt002Placeholder(placeholders, context, `sequence_body_${padded}`, item?.description || item?.title || 'Not provided');
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const action = actions[index] || sequenceItems[index] || recommendations[index];
    setMxt002Placeholder(placeholders, context, `action_body_${padded}`, action?.description || action?.title || 'Not provided');
  }
}

function setMxt002Placeholder(
  placeholders: Record<string, string>,
  context: RenderContext,
  key: string,
  fallbackValue: string | undefined
): void {
  const mappedValue = context.mappedPlaceholders?.[key];
  placeholders[key] = isMissingPlaceholderValue(mappedValue)
    ? fallbackValue?.trim() || 'Not provided'
    : mappedValue;
}

function getMxt002StrategyItems(data: UCResult): Array<{ title: string; description?: string }> {
  const block = data.blocks.find(block => /strategy|brief|rewrite/i.test(`${block.type} ${block.title}`));
  const items = block?.items || block?.steps || block?.data || block?.insights;
  if (!Array.isArray(items)) return [];

  return items.map((item: any, index: number) => ({
    title: stringifyValue(item.title || item.label || item.name) || `Strategy ${index + 1}`,
    description: stringifyValue(item.description || item.value || item.recommendation || item.impact),
  }));
}

function getMxt002RewriteRows(data: UCResult): Array<{ original?: string; risk?: string; recommendation?: string; reason?: string; impact?: string }> {
  const table = getDataTableBlock(data);
  const rows = getTableRows(table);

  if (rows.length > 0) {
    return rows.map(row => {
      const entries = Object.entries(row);
      return {
        original: stringifyValue(row.Original ?? row.original ?? row.Input ?? row.input ?? entries[0]?.[1]),
        risk: stringifyValue(row.Risk ?? row.risk ?? row.Severity ?? row.severity ?? entries[1]?.[1]),
        recommendation: stringifyValue(row.Recommendation ?? row.recommendation ?? row.Rewrite ?? row.rewrite ?? entries[2]?.[1]),
        reason: stringifyValue(row.Reason ?? row.reason ?? row.Impact ?? row.impact ?? entries[3]?.[1]),
        impact: stringifyValue(row.Impact ?? row.impact),
      };
    });
  }

  const block = data.blocks.find(block => /rewrite|risk|comparison|table/i.test(`${block.type} ${block.title}`));
  const items = block?.items || block?.data || block?.recommendations;
  if (!Array.isArray(items)) return [];

  return items.map((item: any) => ({
    original: stringifyValue(item.original || item.input || item.title || item.label),
    risk: stringifyValue(item.risk || item.severity || item.status || item.impact),
    recommendation: stringifyValue(item.recommendation || item.rewrite || item.description || item.value),
    reason: stringifyValue(item.reason || item.rationale || item.impact),
    impact: stringifyValue(item.impact),
  }));
}

function getMxt002SequenceItems(
  data: UCResult,
  fallbackActions: Array<{ title: string; description?: string }>
): Array<{ title: string; description?: string }> {
  const block = data.blocks.find(block => /sequence|flow|steps|plan/i.test(`${block.type} ${block.title}`));
  const items = block?.steps || block?.items || block?.data;
  if (!Array.isArray(items)) return fallbackActions;

  return items.map((item: any, index: number) => typeof item === 'string'
    ? { title: `Step ${index + 1}`, description: item }
    : {
      title: stringifyValue(item.title || item.step || item.label) || `Step ${index + 1}`,
      description: stringifyValue(item.description || item.value || item.action),
    });
}

function applyMxt003PlaceholderMappings(placeholders: Record<string, string>, context: RenderContext): void {
  const { data, tool, commandSlug } = context;
  const metrics = getMetrics(data);
  const actions = getActions(data);
  const recommendations = getRecommendations(data);
  const rankedOptions = getMxt003RankedOptions(data, metrics, recommendations);
  const inputItems = getMxt003InputItems(data, metrics);
  const comparisonRows = getMxt003ComparisonRows(data, rankedOptions);
  const ruleItems = getMxt003RuleItems(data, actions, recommendations);
  const finalRecommendation = recommendations[0]?.description
    || recommendations[0]?.title
    || getDecision(data)?.reason
    || data.summary_card.subtitle
    || 'Not provided';

  setMxt003Placeholder(placeholders, context, 'theme', context.theme);
  setMxt003Placeholder(placeholders, context, 'hero_icon', tool?.icon_emoji || 'MX');
  setMxt003Placeholder(placeholders, context, 'hero_title', data.summary_card.title || tool?.tool_name || commandSlug);
  setMxt003Placeholder(placeholders, context, 'comparison_summary_title', data.summary_card.title || tool?.tool_name || commandSlug);
  setMxt003Placeholder(placeholders, context, 'comparison_recommended_option', rankedOptions[0]?.name || recommendations[0]?.title || 'Not provided');
  setMxt003Placeholder(placeholders, context, 'comparison_confidence', getConfidenceLabel(data));
  setMxt003Placeholder(placeholders, context, 'comparison_risk_tolerance', findResultValue(data, /^(risk_tolerance|tolerance)$/i) || getRiskLabel(data));
  setMxt003Placeholder(placeholders, context, 'final_recommendation_body', finalRecommendation);

  getHeroPillValues(context).forEach((value, index) => {
    setMxt003Placeholder(placeholders, context, `hero_pill_${index + 1}`, value);
  });

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const input = inputItems[index] || {
      name: `Input ${index + 1}`,
      description: 'Not provided',
      status: 'Not provided',
    };

    setMxt003Placeholder(placeholders, context, `input_name_${padded}`, input.name);
    setMxt003Placeholder(placeholders, context, `input_description_${padded}`, input.description);
    setMxt003Placeholder(placeholders, context, `input_status_${padded}`, normalizeDimensionStatus(input.status, input.description, input.name));
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const option = rankedOptions[index] || {
      name: `Option ${index + 1}`,
      description: 'Not provided',
      status: 'Not provided',
    };

    setMxt003Placeholder(placeholders, context, `ranked_option_name_${padded}`, option.name);
    setMxt003Placeholder(placeholders, context, `ranked_option_description_${padded}`, option.description);
    setMxt003Placeholder(placeholders, context, `ranked_option_status_${padded}`, normalizeDimensionStatus(option.status, option.description, option.name));
  }

  setMxt003Placeholder(placeholders, context, 'comparison_option_a_name', rankedOptions[0]?.name || 'Option A');
  setMxt003Placeholder(placeholders, context, 'comparison_option_b_name', rankedOptions[1]?.name || 'Option B');

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const row = comparisonRows[index] || {};

    setMxt003Placeholder(placeholders, context, `comparison_criteria_${padded}`, row.criteria || `Criteria ${index + 1}`);
    setMxt003Placeholder(placeholders, context, `comparison_option_a_text_${padded}`, row.optionAText || rankedOptions[0]?.description || 'Not provided');
    setMxt003Placeholder(placeholders, context, `comparison_option_a_tag_${padded}`, normalizeDimensionStatus(row.optionATag, row.optionAText, 'option'));
    setMxt003Placeholder(placeholders, context, `comparison_option_b_text_${padded}`, row.optionBText || rankedOptions[1]?.description || 'Not provided');
    setMxt003Placeholder(placeholders, context, `comparison_option_b_tag_${padded}`, normalizeDimensionStatus(row.optionBTag, row.optionBText, 'option'));
  }

  for (let index = 0; index < 4; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const item = ruleItems[index] || recommendations[index] || actions[index];
    setMxt003Placeholder(placeholders, context, `rule_applied_${padded}`, item?.description || item?.title || 'Not provided');
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const warning = recommendations[index] || actions[index];
    setMxt003Placeholder(placeholders, context, `warning_body_${padded}`, warning?.description || warning?.title || 'Not provided');
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const action = actions[index] || recommendations[index];
    setMxt003Placeholder(placeholders, context, `action_step_title_${padded}`, action?.title || `Step ${index + 1}`);
    setMxt003Placeholder(placeholders, context, `action_step_body_${padded}`, action?.description || action?.title || 'Not provided');
  }
}

function setMxt003Placeholder(
  placeholders: Record<string, string>,
  context: RenderContext,
  key: string,
  fallbackValue: string | undefined
): void {
  const mappedValue = context.mappedPlaceholders?.[key];
  placeholders[key] = isMissingPlaceholderValue(mappedValue)
    ? fallbackValue?.trim() || 'Not provided'
    : mappedValue;
}

function getMxt003InputItems(
  data: UCResult,
  fallbackMetrics: Array<{ label: string; value: string; status?: string }>
): Array<{ name: string; description: string; status?: string }> {
  const block = data.blocks.find(block => /input|criteria|signal/i.test(`${block.type} ${block.title}`));
  const items = block?.items || block?.data || block?.metrics;

  if (Array.isArray(items)) {
    return items.map((item: any, index: number) => ({
      name: stringifyValue(item.name || item.title || item.label) || `Input ${index + 1}`,
      description: stringifyValue(item.description || item.value || item.signal || item.impact) || 'Not provided',
      status: stringifyValue(item.status || item.risk || item.impact),
    }));
  }

  return fallbackMetrics.map((metric, index) => ({
    name: metric.label || `Input ${index + 1}`,
    description: metric.value || 'Not provided',
    status: metric.status,
  }));
}

function getMxt003RankedOptions(
  data: UCResult,
  fallbackMetrics: Array<{ label: string; value: string; status?: string }>,
  fallbackRecommendations: Array<{ title: string; description?: string }>
): Array<{ name: string; description: string; status?: string }> {
  const table = getDataTableBlock(data);
  const rows = getTableRows(table);

  if (rows.length > 0) {
    return rows.map((row, index) => {
      const entries = Object.entries(row);
      return {
        name: stringifyValue(row.Option ?? row.option ?? row.Name ?? row.name ?? entries[0]?.[1]) || `Option ${index + 1}`,
        description: stringifyValue(row.Description ?? row.description ?? row.Reason ?? row.reason ?? entries[1]?.[1]) || 'Not provided',
        status: stringifyValue(row.Status ?? row.status ?? row.Score ?? row.score ?? entries[2]?.[1]),
      };
    });
  }

  const block = data.blocks.find(block => /ranked|option|comparison|recommend/i.test(`${block.type} ${block.title}`));
  const items = block?.items || block?.data || block?.recommendations;
  if (Array.isArray(items)) {
    return items.map((item: any, index: number) => ({
      name: stringifyValue(item.name || item.option || item.title || item.label) || `Option ${index + 1}`,
      description: stringifyValue(item.description || item.reason || item.value || item.impact) || 'Not provided',
      status: stringifyValue(item.status || item.score || item.risk || item.impact),
    }));
  }

  if (fallbackRecommendations.length > 0) {
    return fallbackRecommendations.map((item, index) => ({
      name: item.title || `Option ${index + 1}`,
      description: item.description || item.title || 'Not provided',
      status: getMetricStatus(String(index === 0 ? 90 : 75)),
    }));
  }

  return fallbackMetrics.map((metric, index) => ({
    name: metric.label || `Option ${index + 1}`,
    description: metric.value || 'Not provided',
    status: metric.status,
  }));
}

function getMxt003ComparisonRows(
  data: UCResult,
  rankedOptions: Array<{ name: string; description: string; status?: string }>
): Array<{ criteria?: string; optionAText?: string; optionATag?: string; optionBText?: string; optionBTag?: string }> {
  const block = data.blocks.find(block => /matrix|compare|comparison/i.test(`${block.type} ${block.title}`));
  const rows = Array.isArray(block?.data) ? block.data : Array.isArray(block?.items) ? block.items : [];

  if (rows.length > 0) {
    return rows.map((row: any, index: number) => {
      const entries = Object.entries(row);
      return {
        criteria: stringifyValue(row.Criteria ?? row.criteria ?? row.label ?? entries[0]?.[1]) || `Criteria ${index + 1}`,
        optionAText: stringifyValue(row.option_a_text ?? row.OptionA ?? row['Option A'] ?? entries[1]?.[1]),
        optionATag: stringifyValue(row.option_a_tag ?? row.optionAStatus ?? row['Option A Tag'] ?? entries[2]?.[1]),
        optionBText: stringifyValue(row.option_b_text ?? row.OptionB ?? row['Option B'] ?? entries[3]?.[1]),
        optionBTag: stringifyValue(row.option_b_tag ?? row.optionBStatus ?? row['Option B Tag'] ?? entries[4]?.[1]),
      };
    });
  }

  return [0, 1, 2].map(index => ({
    criteria: ['Fit', 'Risk', 'Execution'][index],
    optionAText: rankedOptions[0]?.description,
    optionATag: rankedOptions[0]?.status || 'Good',
    optionBText: rankedOptions[1]?.description,
    optionBTag: rankedOptions[1]?.status || 'Medium',
  }));
}

function getMxt003RuleItems(
  data: UCResult,
  fallbackActions: Array<{ title: string; description?: string }>,
  fallbackRecommendations: Array<{ title: string; description?: string }>
): Array<{ title: string; description?: string }> {
  const block = data.blocks.find(block => /rule|criteria|applied|highlight/i.test(`${block.type} ${block.title}`));
  const items = block?.items || block?.steps || block?.data;

  if (Array.isArray(items)) {
    return items.map((item: any, index: number) => typeof item === 'string'
      ? { title: `Rule ${index + 1}`, description: item }
      : {
        title: stringifyValue(item.title || item.label || item.name) || `Rule ${index + 1}`,
        description: stringifyValue(item.description || item.value || item.reason || item.impact),
      });
  }

  return fallbackActions.length > 0 ? fallbackActions : fallbackRecommendations;
}

function applyMxt004PlaceholderMappings(placeholders: Record<string, string>, context: RenderContext): void {
  const { data, tool, commandSlug } = context;
  const stats = data.summary_card.stats ?? [];
  const metrics = getMetrics(data);
  const recommendations = getRecommendations(data);
  const actions = getActions(data);
  const results = getMxt004SerpResults(data);
  const patternMetrics = getMxt004PatternMetrics(data, metrics);
  const observedPatterns = getMxt004ObservedPatterns(data, recommendations);
  const opportunities = getMxt004Opportunities(data, recommendations, actions);

  setMxt004Placeholder(placeholders, context, 'theme', context.theme);
  setMxt004Placeholder(placeholders, context, 'hero_icon', tool?.icon_emoji || 'MX');
  setMxt004Placeholder(placeholders, context, 'hero_title', data.summary_card.title || tool?.tool_name || commandSlug);
  setMxt004Placeholder(placeholders, context, 'snapshot_query', findResultValue(data, /^(query|keyword|search_query)$/i) || data.summary_card.title || commandSlug);
  setMxt004Placeholder(placeholders, context, 'snapshot_source', findResultValue(data, /^(country|source|market|location)$/i) || stats[0]?.value || 'Not provided');
  setMxt004Placeholder(placeholders, context, 'snapshot_intent', findResultValue(data, /^(intent|search_intent)$/i) || stats[1]?.value || 'Not provided');
  setMxt004Placeholder(placeholders, context, 'snapshot_export_limit', findResultValue(data, /^(limit|export_limit|result_limit)$/i) || String(results.length || 3));
  setMxt004Placeholder(placeholders, context, 'snapshot_summary', data.summary_card.subtitle || recommendations[0]?.description || recommendations[0]?.title || 'Not provided');

  getHeroPillValues(context).forEach((value, index) => {
    setMxt004Placeholder(placeholders, context, `hero_pill_${index + 1}`, value);
  });

  for (let index = 0; index < 10; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const result = results[index] || {};
    setMxt004Placeholder(placeholders, context, `result_position_${padded}`, result.position || String(index + 1));
    setMxt004Placeholder(placeholders, context, `result_title_${padded}`, result.title || `Result ${index + 1}`);
    setMxt004Placeholder(placeholders, context, `result_domain_${padded}`, result.domain || 'Not provided');
    setMxt004Placeholder(placeholders, context, `result_snippet_${padded}`, result.snippet || 'Not provided');
    setMxt004Placeholder(placeholders, context, `result_intent_${padded}`, result.intent || 'Not provided');
    setMxt004Placeholder(placeholders, context, `result_type_${padded}`, result.type || 'Organic');
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const pattern = observedPatterns[index] || patternMetrics[index];
    setMxt004Placeholder(placeholders, context, `observed_pattern_${padded}`, pattern?.description || pattern?.label || 'Not provided');
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const metric = patternMetrics[index] || {
      label: `Metric ${index + 1}`,
      value: 'Not provided',
      description: 'Not provided',
    };
    setMxt004Placeholder(placeholders, context, `pattern_metric_label_${padded}`, metric.label);
    setMxt004Placeholder(placeholders, context, `pattern_metric_value_${padded}`, metric.value);
    setMxt004Placeholder(placeholders, context, `pattern_metric_description_${padded}`, metric.description || metric.value);
  }

  for (let index = 0; index < 4; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const opportunity = opportunities[index];
    setMxt004Placeholder(placeholders, context, `optimization_opportunity_${padded}`, opportunity?.description || opportunity?.title || 'Not provided');
  }
}

function setMxt004Placeholder(
  placeholders: Record<string, string>,
  context: RenderContext,
  key: string,
  fallbackValue: string | undefined
): void {
  const mappedValue = context.mappedPlaceholders?.[key];
  placeholders[key] = isMissingPlaceholderValue(mappedValue)
    ? fallbackValue?.trim() || 'Not provided'
    : mappedValue;
}

function getMxt004SerpResults(data: UCResult): Array<{ position?: string; title?: string; domain?: string; snippet?: string; intent?: string; type?: string }> {
  const table = getDataTableBlock(data);
  const rows = getTableRows(table);

  if (rows.length > 0) {
    return rows.map((row, index) => {
      const entries = Object.entries(row);
      return {
        position: stringifyValue(row.Position ?? row.position ?? row.Rank ?? row.rank ?? entries[0]?.[1]) || String(index + 1),
        title: stringifyValue(row.Title ?? row.title ?? row.Name ?? row.name ?? entries[1]?.[1]),
        domain: stringifyValue(row.Domain ?? row.domain ?? row.URL ?? row.url ?? entries[2]?.[1]),
        snippet: stringifyValue(row.Snippet ?? row.snippet ?? row.Description ?? row.description ?? entries[3]?.[1]),
        intent: stringifyValue(row.Intent ?? row.intent ?? row.SearchIntent ?? row.search_intent ?? entries[4]?.[1]),
        type: stringifyValue(row.Type ?? row.type ?? row.ResultType ?? row.result_type ?? entries[5]?.[1]),
      };
    });
  }

  const block = data.blocks.find(block => /serp|result|ranking|search/i.test(`${block.type} ${block.title}`));
  const items = block?.items || block?.data || block?.results;
  if (!Array.isArray(items)) return [];

  return items.map((item: any, index: number) => ({
    position: stringifyValue(item.position || item.rank) || String(index + 1),
    title: stringifyValue(item.title || item.name),
    domain: stringifyValue(item.domain || item.url || item.source),
    snippet: stringifyValue(item.snippet || item.description || item.summary),
    intent: stringifyValue(item.intent || item.search_intent),
    type: stringifyValue(item.type || item.result_type) || 'Organic',
  }));
}

function getMxt004PatternMetrics(
  data: UCResult,
  fallbackMetrics: Array<{ label: string; value: string; status?: string }>
): Array<{ label: string; value: string; description?: string }> {
  const block = data.blocks.find(block => /pattern|metric|snapshot/i.test(`${block.type} ${block.title}`));
  const items = block?.metrics || block?.items || block?.data;

  if (Array.isArray(items)) {
    return items.map((item: any, index: number) => ({
      label: stringifyValue(item.label || item.title || item.name) || `Metric ${index + 1}`,
      value: stringifyValue(item.value || item.score || item.count) || 'Not provided',
      description: stringifyValue(item.description || item.insight || item.impact || item.value),
    }));
  }

  return fallbackMetrics.map(metric => ({
    label: metric.label,
    value: metric.value,
    description: metric.status || metric.value,
  }));
}

function getMxt004ObservedPatterns(
  data: UCResult,
  fallbackRecommendations: Array<{ title: string; description?: string }>
): Array<{ label?: string; description?: string }> {
  const block = data.blocks.find(block => /observed|pattern|insight/i.test(`${block.type} ${block.title}`));
  const items = block?.items || block?.insights || block?.data;

  if (Array.isArray(items)) {
    return items.map((item: any, index: number) => ({
      label: stringifyValue(item.label || item.title || item.name) || `Pattern ${index + 1}`,
      description: stringifyValue(item.description || item.value || item.insight || item.impact),
    }));
  }

  return fallbackRecommendations.map(item => ({ label: item.title, description: item.description || item.title }));
}

function getMxt004Opportunities(
  data: UCResult,
  fallbackRecommendations: Array<{ title: string; description?: string }>,
  fallbackActions: Array<{ title: string; description?: string }>
): Array<{ title?: string; description?: string }> {
  const block = data.blocks.find(block => /opportunity|optimization|recommend|action/i.test(`${block.type} ${block.title}`));
  const items = block?.items || block?.recommendations || block?.steps || block?.data;

  if (Array.isArray(items)) {
    return items.map((item: any, index: number) => typeof item === 'string'
      ? { title: `Opportunity ${index + 1}`, description: item }
      : {
        title: stringifyValue(item.title || item.label || item.name) || `Opportunity ${index + 1}`,
        description: stringifyValue(item.description || item.value || item.action || item.impact),
      });
  }

  return fallbackRecommendations.length > 0 ? fallbackRecommendations : fallbackActions;
}

function applyMxt005PlaceholderMappings(placeholders: Record<string, string>, context: RenderContext): void {
  const { data, tool, commandSlug } = context;
  const stats = data.summary_card.stats ?? [];
  const metrics = getMetrics(data);
  const recommendations = getRecommendations(data);
  const actions = getActions(data);
  const auditIssues = getMxt005AuditIssues(data, recommendations);
  const pressureMetrics = getMxt005PressureMetrics(data, metrics);
  const longTailKeywords = getMxt005LongTailKeywords(data, recommendations);
  const finalRecommendation = recommendations[0]?.description
    || recommendations[0]?.title
    || getDecision(data)?.reason
    || data.summary_card.subtitle
    || 'Not provided';

  setMxt005Placeholder(placeholders, context, 'theme', context.theme);
  setMxt005Placeholder(placeholders, context, 'hero_icon', tool?.icon_emoji || 'MX');
  setMxt005Placeholder(placeholders, context, 'hero_title', data.summary_card.title || tool?.tool_name || commandSlug);
  setMxt005Placeholder(placeholders, context, 'audit_subject', findResultValue(data, /^(subject|keyword|query|audit_subject)$/i) || data.summary_card.title || commandSlug);
  setMxt005Placeholder(placeholders, context, 'audit_context_country', findResultValue(data, /^(country|market|location)$/i) || stats[0]?.value || 'Not provided');
  setMxt005Placeholder(placeholders, context, 'audit_context_language', findResultValue(data, /^(language|locale)$/i) || stats[1]?.value || 'Not provided');
  setMxt005Placeholder(placeholders, context, 'audit_context_intent', findResultValue(data, /^(intent|search_intent)$/i) || stats[2]?.value || 'Not provided');
  setMxt005Placeholder(placeholders, context, 'final_recommendation_body', finalRecommendation);

  applyScorePlaceholders(placeholders, context);

  getHeroPillValues(context).forEach((value, index) => {
    setMxt005Placeholder(placeholders, context, `hero_pill_${index + 1}`, value);
  });

  for (let index = 0; index < 4; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const metric = metrics[index] || {
      label: `Dimension ${index + 1}`,
      value: 'Not provided',
      status: 'Not provided',
    };

    setMxt005Placeholder(placeholders, context, `dimension_name_${padded}`, metric.label);
    setMxt005Placeholder(placeholders, context, `dimension_value_${padded}`, metric.value);
    setMxt005Placeholder(placeholders, context, `dimension_status_${padded}`, normalizeDimensionStatus(metric.status, metric.value, metric.label));
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const issue = auditIssues[index] || {};
    setMxt005Placeholder(placeholders, context, `audit_issue_name_${padded}`, issue.name || `Issue ${index + 1}`);
    setMxt005Placeholder(placeholders, context, `audit_issue_severity_${padded}`, normalizeDimensionStatus(issue.severity, issue.evidence, 'severity'));
    setMxt005Placeholder(placeholders, context, `audit_issue_evidence_${padded}`, issue.evidence || 'Not provided');
  }

  for (let index = 0; index < 5; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const metric = pressureMetrics[index] || metrics[index] || {
      label: `Pressure ${index + 1}`,
      value: '0',
    };
    setMxt005Placeholder(placeholders, context, `audit_pressure_label_${padded}`, metric.label);
    setMxt005Placeholder(placeholders, context, `audit_pressure_width_${padded}`, clampPercent(extractPercent(metric.value)));
    setMxt005Placeholder(placeholders, context, `audit_pressure_value_${padded}`, metric.value);
  }

  for (let index = 0; index < 4; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const action = actions[index] || recommendations[index] || auditIssues[index];
    setMxt005Placeholder(placeholders, context, `audit_action_${padded}`, action?.description || action?.title || stringifyValue((action as any)?.evidence) || 'Not provided');
  }

  for (let index = 0; index < 5; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    setMxt005Placeholder(placeholders, context, `long_tail_keyword_${padded}`, longTailKeywords[index] || 'Not provided');
  }
}

function setMxt005Placeholder(
  placeholders: Record<string, string>,
  context: RenderContext,
  key: string,
  fallbackValue: string | undefined
): void {
  const mappedValue = context.mappedPlaceholders?.[key];
  placeholders[key] = isMissingPlaceholderValue(mappedValue)
    ? fallbackValue?.trim() || 'Not provided'
    : mappedValue;
}

function getMxt005AuditIssues(
  data: UCResult,
  fallbackRecommendations: Array<{ title: string; description?: string }>
): Array<{ name?: string; severity?: string; evidence?: string; title?: string; description?: string }> {
  const table = getDataTableBlock(data);
  const rows = getTableRows(table);

  if (rows.length > 0) {
    return rows.map((row, index) => {
      const entries = Object.entries(row);
      return {
        name: stringifyValue(row.Issue ?? row.issue ?? row.Name ?? row.name ?? entries[0]?.[1]) || `Issue ${index + 1}`,
        severity: stringifyValue(row.Severity ?? row.severity ?? row.Risk ?? row.risk ?? entries[1]?.[1]),
        evidence: stringifyValue(row.Evidence ?? row.evidence ?? row.Description ?? row.description ?? entries[2]?.[1]),
      };
    });
  }

  const block = data.blocks.find(block => /issue|finding|audit|risk/i.test(`${block.type} ${block.title}`));
  const items = block?.items || block?.data || block?.findings || block?.recommendations;
  if (Array.isArray(items)) {
    return items.map((item: any, index: number) => ({
      name: stringifyValue(item.name || item.issue || item.title || item.label) || `Issue ${index + 1}`,
      severity: stringifyValue(item.severity || item.risk || item.status || item.impact),
      evidence: stringifyValue(item.evidence || item.description || item.value || item.reason),
    }));
  }

  return fallbackRecommendations.map(item => ({
    name: item.title,
    severity: 'Medium',
    evidence: item.description || item.title,
  }));
}

function getMxt005PressureMetrics(
  data: UCResult,
  fallbackMetrics: Array<{ label: string; value: string; status?: string }>
): Array<{ label: string; value: string; status?: string }> {
  const block = data.blocks.find(block => /pressure|risk|breakdown|score/i.test(`${block.type} ${block.title}`));
  const items = block?.metrics || block?.items || block?.data;

  if (Array.isArray(items)) {
    return items.map((item: any, index: number) => ({
      label: stringifyValue(item.label || item.title || item.name) || `Pressure ${index + 1}`,
      value: stringifyValue(item.value || item.score || item.weight || item.percentage) || '0',
      status: stringifyValue(item.status || item.severity),
    }));
  }

  return fallbackMetrics;
}

function getMxt005LongTailKeywords(
  data: UCResult,
  fallbackRecommendations: Array<{ title: string; description?: string }>
): string[] {
  const block = data.blocks.find(block => /long.?tail|keyword|opportunity|suggest/i.test(`${block.type} ${block.title}`));
  const items = block?.items || block?.data || block?.keywords || block?.recommendations;

  if (Array.isArray(items)) {
    return items.map((item: any, index: number) => {
      if (typeof item === 'string') return item;
      return stringifyValue(item.keyword || item.query || item.title || item.label || item.value) || `Keyword ${index + 1}`;
    });
  }

  return fallbackRecommendations.map(item => item.title || item.description || '').filter(Boolean);
}

function applyMxt006PlaceholderMappings(placeholders: Record<string, string>, context: RenderContext): void {
  const { data, tool, commandSlug } = context;
  const stats = data.summary_card.stats ?? [];
  const metrics = getMetrics(data);
  const recommendations = getRecommendations(data);
  const actions = getActions(data);
  const attributes = getMxt006Attributes(data, metrics);
  const details = getMxt006Details(data, recommendations, actions);
  const leadSignals = getMxt006ListItems(data, /lead|signal/i, recommendations);
  const outreachContexts = getMxt006ListItems(data, /outreach|context/i, actions);
  const profileName = findResultValue(data, /^(profile_name|name|person|company|brand)$/i)
    || data.summary_card.title
    || tool?.tool_name
    || commandSlug;

  setMxt006Placeholder(placeholders, context, 'theme', context.theme);
  setMxt006Placeholder(placeholders, context, 'hero_icon', tool?.icon_emoji || 'MX');
  setMxt006Placeholder(placeholders, context, 'hero_title', data.summary_card.title || tool?.tool_name || commandSlug);
  setMxt006Placeholder(placeholders, context, 'profile_scan_title', data.summary_card.title || tool?.tool_name || commandSlug);
  setMxt006Placeholder(placeholders, context, 'profile_context_01', findResultValue(data, /^(platform|network|channel)$/i) || stats[0]?.value || 'Not provided');
  setMxt006Placeholder(placeholders, context, 'profile_context_02', findResultValue(data, /^(niche|category|industry)$/i) || stats[1]?.value || 'Not provided');
  setMxt006Placeholder(placeholders, context, 'profile_context_03', findResultValue(data, /^(profile_type|type|segment)$/i) || stats[2]?.value || 'Not provided');
  setMxt006Placeholder(placeholders, context, 'profile_name', profileName);
  setMxt006Placeholder(placeholders, context, 'profile_metadata', findResultValue(data, /^(metadata|profile_metadata|bio_meta)$/i) || [stats[0]?.value, stats[1]?.value].filter(Boolean).join(' · ') || 'Not provided');
  setMxt006Placeholder(placeholders, context, 'profile_scan_summary', data.summary_card.subtitle || recommendations[0]?.description || recommendations[0]?.title || 'Not provided');
  setMxt006Placeholder(placeholders, context, 'profile_score', getScore(data));
  setMxt006Placeholder(placeholders, context, 'profile_rating_visual', getRatingVisual(getScore(data)));
  placeholders.profile_rating_visual = formatMxt006RatingVisual(placeholders.profile_rating_visual, getScore(data));
  setMxt006Placeholder(placeholders, context, 'profile_score_label', getScoreLabel(context));
  setMxt006Placeholder(placeholders, context, 'profile_image_url', findResultValue(data, /^(profile_image_url|image_url|avatar_url|photo_url)$/i) || 'Not provided');
  setMxt006Placeholder(placeholders, context, 'initials', getInitials(profileName));

  getHeroPillValues(context).forEach((value, index) => {
    setMxt006Placeholder(placeholders, context, `hero_pill_${index + 1}`, value);
  });

  for (let index = 0; index < 4; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const attribute = attributes[index] || {
      label: `Attribute ${index + 1}`,
      value: 'Not provided',
    };
    setMxt006Placeholder(placeholders, context, `attribute_label_${padded}`, attribute.label);
    setMxt006Placeholder(placeholders, context, `attribute_value_${padded}`, attribute.value);
  }

  for (let index = 0; index < 6; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const detail = details[index] || {
      title: `Detail ${index + 1}`,
      description: 'Not provided',
    };
    setMxt006Placeholder(placeholders, context, `profile_detail_title_${padded}`, detail.title);
    setMxt006Placeholder(placeholders, context, `profile_detail_body_${padded}`, detail.description || detail.title);
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    setMxt006Placeholder(placeholders, context, `lead_signal_${padded}`, leadSignals[index]?.description || leadSignals[index]?.title || 'Not provided');
  }

  for (let index = 0; index < 4; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    setMxt006Placeholder(placeholders, context, `outreach_context_${padded}`, outreachContexts[index]?.description || outreachContexts[index]?.title || 'Not provided');
  }
}

function setMxt006Placeholder(
  placeholders: Record<string, string>,
  context: RenderContext,
  key: string,
  fallbackValue: string | undefined
): void {
  const mappedValue = context.mappedPlaceholders?.[key];
  placeholders[key] = isMissingPlaceholderValue(mappedValue)
    ? fallbackValue?.trim() || 'Not provided'
    : mappedValue;
}

function formatMxt006RatingVisual(value: string | undefined, score: string): string {
  return getRatingVisual(score || value || '');
}

function isScoreLikeLabel(value: string): boolean {
  return /^\d+(?:\.\d+)?\s*(?:\/\s*100|%)?$/.test(value.trim());
}

function getMxt006Attributes(
  data: UCResult,
  fallbackMetrics: Array<{ label: string; value: string; status?: string }>
): Array<{ label: string; value: string }> {
  const block = data.blocks.find(block => /attribute|profile|summary|metric/i.test(`${block.type} ${block.title}`));
  const items = block?.attributes || block?.metrics || block?.items || block?.data;

  if (Array.isArray(items)) {
    return items.map((item: any, index: number) => ({
      label: stringifyValue(item.label || item.title || item.name) || `Attribute ${index + 1}`,
      value: stringifyValue(item.value || item.description || item.status || item.impact) || 'Not provided',
    }));
  }

  return fallbackMetrics.map(metric => ({
    label: metric.label,
    value: metric.value,
  }));
}

function getMxt006Details(
  data: UCResult,
  fallbackRecommendations: Array<{ title: string; description?: string }>,
  fallbackActions: Array<{ title: string; description?: string }>
): Array<{ title: string; description?: string }> {
  const block = data.blocks.find(block => /detail|insight|profile|analysis/i.test(`${block.type} ${block.title}`));
  const items = block?.items || block?.insights || block?.data || block?.recommendations;

  if (Array.isArray(items)) {
    return items.map((item: any, index: number) => ({
      title: stringifyValue(item.title || item.label || item.name) || `Detail ${index + 1}`,
      description: stringifyValue(item.description || item.value || item.reason || item.impact),
    }));
  }

  return fallbackRecommendations.length > 0 ? fallbackRecommendations : fallbackActions;
}

function getMxt006ListItems(
  data: UCResult,
  pattern: RegExp,
  fallbackItems: Array<{ title: string; description?: string }>
): Array<{ title: string; description?: string }> {
  const block = data.blocks.find(block => pattern.test(`${block.type} ${block.title}`));
  const items = block?.items || block?.signals || block?.contexts || block?.steps || block?.data;

  if (Array.isArray(items)) {
    return items.map((item: any, index: number) => typeof item === 'string'
      ? { title: `Item ${index + 1}`, description: item }
      : {
        title: stringifyValue(item.title || item.label || item.name) || `Item ${index + 1}`,
        description: stringifyValue(item.description || item.value || item.reason || item.context),
      });
  }

  return fallbackItems;
}

function getRatingVisual(score: string): string {
  const numeric = Number(extractPercent(score));
  const stars = Number.isFinite(numeric) ? Math.max(1, Math.min(5, Math.round(numeric / 20))) : 4;
  return '★★★★★'.slice(0, stars) + '☆☆☆☆☆'.slice(0, 5 - stars);
}

function applyMxt007PlaceholderMappings(placeholders: Record<string, string>, context: RenderContext): void {
  const { data, tool, commandSlug } = context;
  const stats = data.summary_card.stats ?? [];
  const metrics = getMetrics(data);
  const actions = getActions(data);
  const recommendations = getRecommendations(data);
  const decision = getDecision(data);
  const rankedOptions = getMxt007RankedOptions(data, metrics, recommendations);
  const highlights = getMxt007Highlights(data, metrics, recommendations);
  const bestOption = rankedOptions[0];
  const recommendationBody = recommendations[0]?.description
    || recommendations[0]?.title
    || decision?.reason
    || bestOption?.reason
    || data.summary_card.subtitle
    || 'Not provided';

  setMxt007Placeholder(placeholders, context, 'theme', context.theme);
  setMxt007Placeholder(placeholders, context, 'hero_icon', tool?.icon_emoji || 'MX');
  setMxt007Placeholder(placeholders, context, 'hero_title', data.summary_card.title || tool?.tool_name || commandSlug);
  setMxt007Placeholder(placeholders, context, 'ranked_result_title', data.summary_card.title || tool?.tool_name || commandSlug);
  setMxt007Placeholder(placeholders, context, 'ranked_context_keyword', findResultValue(data, /^(keyword|query|topic|subject)$/i) || stats[0]?.value || commandSlug);
  setMxt007Placeholder(placeholders, context, 'ranked_context_audience', findResultValue(data, /^(audience|target_audience)$/i) || stats[1]?.value || 'Not provided');
  setMxt007Placeholder(placeholders, context, 'ranked_context_level', findResultValue(data, /^(level|difficulty|tier|stage)$/i) || stats[2]?.value || getModeLabel(context.ucId));
  setMxt007Placeholder(placeholders, context, 'ranked_context_best_angle', bestOption?.title || bestOption?.label || recommendations[0]?.title || 'Not provided');
  setMxt007Placeholder(placeholders, context, 'ranked_context_use', findResultValue(data, /^(use|recommended_use|use_case)$/i) || recommendationBody);
  setMxt007Placeholder(placeholders, context, 'ranked_decision_body', decision?.reason || recommendationBody);
  setMxt007Placeholder(placeholders, context, 'ranked_action_body', actions[0]?.description || actions[0]?.title || recommendationBody);
  setMxt007Placeholder(placeholders, context, 'ranked_recommendation_body', recommendationBody);

  getHeroPillValues(context).forEach((value, index) => {
    setMxt007Placeholder(placeholders, context, `hero_pill_${index + 1}`, value);
  });

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const highlight = highlights[index] || {
      label: `Highlight ${index + 1}`,
      body: 'Not provided',
    };
    setMxt007Placeholder(placeholders, context, `highlight_label_${padded}`, highlight.label);
    setMxt007Placeholder(placeholders, context, `highlight_body_${padded}`, highlight.body);
  }

  for (let index = 0; index < 10; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const option = rankedOptions[index] || {
      title: `Option ${index + 1}`,
      label: 'Not provided',
      reason: 'Not provided',
    };
    setMxt007Placeholder(placeholders, context, `ranked_option_title_${padded}`, option.title);
    setMxt007Placeholder(placeholders, context, `ranked_option_label_${padded}`, formatMxt007RankedOptionLabel(option.label, option.reason, option.title));
    setMxt007Placeholder(placeholders, context, `ranked_option_reason_${padded}`, option.reason);
    placeholders[`ranked_option_label_${padded}`] = formatMxt007RankedOptionLabel(
      placeholders[`ranked_option_label_${padded}`],
      option.reason,
      option.title
    );
  }
}

function setMxt007Placeholder(
  placeholders: Record<string, string>,
  context: RenderContext,
  key: string,
  fallbackValue: string | undefined
): void {
  const mappedValue = context.mappedPlaceholders?.[key];
  placeholders[key] = isMissingPlaceholderValue(mappedValue)
    ? fallbackValue?.trim() || 'Not provided'
    : mappedValue;
}

function formatMxt007RankedOptionLabel(value: string | undefined, reason?: string, title?: string): string {
  if (isMissingPlaceholderValue(value)) return 'Not provided';
  const normalizedValue = value.trim();
  if (isScoreLikeLabel(normalizedValue)) return getRatingVisual(normalizedValue);
  return normalizeDimensionStatus(normalizedValue, reason, title);
}

function getMxt007RankedOptions(
  data: UCResult,
  fallbackMetrics: Array<{ label: string; value: string; status?: string }>,
  fallbackRecommendations: Array<{ title: string; description?: string }>
): Array<{ title: string; label: string; reason: string }> {
  const table = getDataTableBlock(data);
  const rows = getTableRows(table);

  if (rows.length > 0) {
    return rows.map((row, index) => {
      const entries = Object.entries(row);
      const title = stringifyValue(row.Title ?? row.title ?? row.Option ?? row.option ?? row.Name ?? row.name ?? entries[0]?.[1]) || `Option ${index + 1}`;
      const label = stringifyValue(row.Label ?? row.label ?? row.Status ?? row.status ?? row.Score ?? row.score ?? entries[1]?.[1]) || 'Good';
      const reason = stringifyValue(row.Reason ?? row.reason ?? row.Description ?? row.description ?? row.Rationale ?? row.rationale ?? entries[2]?.[1]) || 'Not provided';
      return { title, label, reason };
    });
  }

  const block = data.blocks.find(block => /rank|option|recommend|choice|angle/i.test(`${block.type} ${block.title}`));
  const items = block?.items || block?.data || block?.recommendations;
  if (Array.isArray(items)) {
    return items.map((item: any, index: number) => ({
      title: stringifyValue(item.title || item.option || item.name || item.label) || `Option ${index + 1}`,
      label: stringifyValue(item.label || item.status || item.score || item.priority || item.impact) || 'Good',
      reason: stringifyValue(item.reason || item.description || item.rationale || item.value || item.impact) || 'Not provided',
    }));
  }

  if (fallbackRecommendations.length > 0) {
    return fallbackRecommendations.map((item, index) => ({
      title: item.title || `Option ${index + 1}`,
      label: index === 0 ? 'Best' : 'Good',
      reason: item.description || item.title || 'Not provided',
    }));
  }

  return fallbackMetrics.map((metric, index) => ({
    title: metric.label || `Option ${index + 1}`,
    label: metric.status || getMetricStatus(metric.value),
    reason: metric.value || 'Not provided',
  }));
}

function getMxt007Highlights(
  data: UCResult,
  fallbackMetrics: Array<{ label: string; value: string; status?: string }>,
  fallbackRecommendations: Array<{ title: string; description?: string }>
): Array<{ label: string; body: string }> {
  const block = data.blocks.find(block => /highlight|insight|summary|metric/i.test(`${block.type} ${block.title}`));
  const items = block?.items || block?.insights || block?.metrics || block?.data;

  if (Array.isArray(items)) {
    return items.map((item: any, index: number) => ({
      label: stringifyValue(item.label || item.title || item.name) || `Highlight ${index + 1}`,
      body: stringifyValue(item.body || item.description || item.value || item.impact) || 'Not provided',
    }));
  }

  if (fallbackMetrics.length > 0) {
    return fallbackMetrics.map(metric => ({
      label: metric.label,
      body: metric.value,
    }));
  }

  return fallbackRecommendations.map(item => ({
    label: item.title,
    body: item.description || item.title,
  }));
}

function applyMxt008PlaceholderMappings(placeholders: Record<string, string>, context: RenderContext): void {
  const { data, tool, commandSlug } = context;
  const stats = data.summary_card.stats ?? [];
  const metrics = getMetrics(data);
  const actions = getActions(data);
  const recommendations = getRecommendations(data);
  const automationItems = getMxt008Items(data, /automation|workflow|pipeline|step|process/i, actions);
  const insightItems = getMxt008Items(data, /insight|summary|analysis|finding|metric/i, recommendations);
  const riskItems = getMxt008Items(data, /risk|opportun|constraint|warning/i, recommendations);
  const summaryBody = data.summary_card.subtitle
    || recommendations[0]?.description
    || recommendations[0]?.title
    || 'Not provided';

  setMxt008Placeholder(placeholders, context, 'theme', context.theme);
  setMxt008Placeholder(placeholders, context, 'hero_icon', tool?.icon_emoji || 'MX');
  setMxt008Placeholder(placeholders, context, 'hero_title', data.summary_card.title || tool?.tool_name || commandSlug);
  setMxt008Placeholder(placeholders, context, 'automation_title', data.summary_card.title || tool?.tool_name || commandSlug);
  setMxt008Placeholder(placeholders, context, 'automation_use_case', findResultValue(data, /^(use_case|use|workflow|automation_use_case)$/i) || data.summary_card.title || commandSlug);
  setMxt008Placeholder(placeholders, context, 'automation_stack', findResultValue(data, /^(stack|tool_stack|platform|tools)$/i) || stats[0]?.value || 'Not provided');
  setMxt008Placeholder(placeholders, context, 'automation_constraint', findResultValue(data, /^(constraint|limitation|requirement|guardrail)$/i) || getRiskLabel(data));
  setMxt008Placeholder(placeholders, context, 'automation_confidence', findResultValue(data, /^confidence$/i) || stats.find(stat => /confidence/i.test(stat.label))?.value || getConfidenceLabel(data));
  setMxt008Placeholder(placeholders, context, 'automation_setup', findResultValue(data, /^(setup|implementation|mode|configuration)$/i) || getModeLabel(context.ucId));
  setMxt008Placeholder(placeholders, context, 'summary_title', data.summary_card.title || 'Automation summary');
  setMxt008Placeholder(placeholders, context, 'summary_body', summaryBody);
  setMxt008Placeholder(placeholders, context, 'workflow_explanation', getMxt008WorkflowExplanation(data, automationItems, recommendations, summaryBody));
  setMxt008Placeholder(placeholders, context, 'idea_title', recommendations[0]?.title || data.summary_card.title || 'Idea summary');
  setMxt008Placeholder(placeholders, context, 'idea_body', recommendations[0]?.description || summaryBody);

  getHeroPillValues(context).forEach((value, index) => {
    setMxt008Placeholder(placeholders, context, `hero_pill_${index + 1}`, value);
  });

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const metric = metrics[index] || {
      label: `Metric ${index + 1}`,
      value: 'Not provided',
      status: 'Not provided',
    };
    setMxt008Placeholder(placeholders, context, `metric_label_${padded}`, metric.label);
    setMxt008Placeholder(placeholders, context, `metric_value_${padded}`, metric.value);
    setMxt008Placeholder(placeholders, context, `metric_body_${padded}`, metric.status || normalizeDimensionStatus(metric.value, metric.value, metric.label));
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const item = insightItems[index] || recommendations[index] || metrics[index];
    setMxt008Placeholder(placeholders, context, `insight_title_${padded}`, getMxt008ItemTitle(item, `Insight ${index + 1}`));
    setMxt008Placeholder(placeholders, context, `insight_body_${padded}`, getMxt008ItemBody(item));
  }

  for (let index = 0; index < 5; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const item = automationItems[index] || actions[index] || recommendations[index];
    setMxt008Placeholder(placeholders, context, `pipeline_step_title_${padded}`, item?.title || `Step ${index + 1}`);
    setMxt008Placeholder(placeholders, context, `pipeline_step_body_${padded}`, item?.description || item?.title || 'Not provided');
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const item = recommendations[index] || actions[index] || insightItems[index];
    setMxt008Placeholder(placeholders, context, `recommendation_${padded}`, item?.description || item?.title || 'Not provided');
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const item = riskItems[index] || recommendations[index] || actions[index];
    setMxt008Placeholder(placeholders, context, `risk_opportunity_${padded}`, item?.description || item?.title || 'Not provided');
  }
}

function setMxt008Placeholder(
  placeholders: Record<string, string>,
  context: RenderContext,
  key: string,
  fallbackValue: string | undefined
): void {
  const mappedValue = context.mappedPlaceholders?.[key];
  placeholders[key] = isMissingPlaceholderValue(mappedValue)
    ? fallbackValue?.trim() || 'Not provided'
    : mappedValue;
}

function getMxt008Items(
  data: UCResult,
  pattern: RegExp,
  fallbackItems: Array<{ title: string; description?: string }>
): Array<{ title: string; description?: string; label?: string; value?: string }> {
  const block = data.blocks.find(block => pattern.test(`${block.type} ${block.title}`));
  const items = block?.items || block?.steps || block?.insights || block?.recommendations || block?.metrics || block?.data;

  if (Array.isArray(items)) {
    return items.map((item: any, index: number) => typeof item === 'string'
      ? { title: `Item ${index + 1}`, description: item }
      : {
        title: stringifyValue(item.title || item.step || item.label || item.name) || `Item ${index + 1}`,
        description: stringifyValue(item.description || item.value || item.action || item.reason || item.impact),
        label: stringifyValue(item.label || item.name),
        value: stringifyValue(item.value || item.score || item.status),
      });
  }

  return fallbackItems;
}

function getMxt008WorkflowExplanation(
  data: UCResult,
  automationItems: Array<{ title: string; description?: string }>,
  recommendations: Array<{ title: string; description?: string }>,
  fallback: string
): string {
  return findResultValue(data, /^(workflow_explanation|workflow_summary|explanation|process_summary)$/i)
    || automationItems[0]?.description
    || recommendations[0]?.description
    || fallback;
}

function getMxt008ItemTitle(item: unknown, fallback: string): string {
  if (!item || typeof item !== 'object') return fallback;
  const record = item as Record<string, unknown>;
  return stringifyValue(record.title || record.label || record.name) || fallback;
}

function getMxt008ItemBody(item: unknown): string {
  if (!item || typeof item !== 'object') return 'Not provided';
  const record = item as Record<string, unknown>;
  return stringifyValue(record.description || record.value || record.reason || record.impact || record.title || record.label) || 'Not provided';
}

function isMissingPlaceholderValue(value: string | undefined): boolean {
  return !value?.trim() || value.includes('{{') || /^(not provided|n\/a|none|null|undefined)$/i.test(value.trim());
}

function getInitials(value: string): string {
  const letters = value
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('');
  return letters || 'MX';
}

function createProfilePlaceholderImageDataUrl(label: string): string {
  const initials = getInitials(label);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><defs><linearGradient id="bg" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#38bdf8"/><stop offset="55%" stop-color="#2563eb"/><stop offset="100%" stop-color="#8b5cf6"/></linearGradient></defs><rect width="128" height="128" rx="28" fill="url(#bg)"/><circle cx="42" cy="34" r="24" fill="rgba(255,255,255,.20)"/><text x="64" y="75" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="34" font-weight="900" fill="#ffffff">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function attachDownloadActions(doc: Document, context: RenderContext): void {
  const fileBase = `${context.tool?.id || context.commandSlug}_${context.ucId}`
    .replace(/[^A-Za-z0-9_-]+/g, '_');
  const payloadNode = doc.createElement('script');
  payloadNode.type = 'application/json';
  payloadNode.id = 'mx-result-payload';
  payloadNode.textContent = JSON.stringify(context.data).replace(/</g, '\\u003c');

  const printStyle = doc.createElement('style');
  printStyle.textContent = '@media print{body{padding:0!important;background:#fff!important}.mx-shell{margin:0!important;box-shadow:none!important}.mx-footer,.mx-download-group{display:none!important}}';

  const actionScript = doc.createElement('script');
  actionScript.textContent = `(() => {
    const fileBase = ${JSON.stringify(fileBase)};
    const payloadNode = document.getElementById('mx-result-payload');
    if (!payloadNode) return;
    const payload = JSON.parse(payloadNode.textContent || '{}');

    const download = (content, type, extension) => {
      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileBase + '.' + extension;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

    const toCsv = () => {
      const tables = (payload.blocks || []).filter(block => block.type === 'data_table' && Array.isArray(block.data));
      const rows = tables.flatMap(block => block.data.map(row => ({ Section: block.title || 'Results', ...row })));
      const csvRows = rows.length ? rows : (payload.summary_card?.stats || []).map(stat => ({ Label: stat.label, Value: stat.value }));
      const headers = Array.from(new Set(csvRows.flatMap(row => Object.keys(row))));
      const cell = value => '"' + (typeof value === 'object' ? JSON.stringify(value) : String(value ?? '')).replace(/"/g, '""') + '"';
      return [headers.map(cell).join(','), ...csvRows.map(row => headers.map(header => cell(row[header])).join(','))].join('\\r\\n');
    };

    document.addEventListener('click', event => {
      const button = event.target instanceof Element ? event.target.closest('[data-format]') : null;
      if (!button) return;
      event.preventDefault();
      const format = button.getAttribute('data-format');
      if (format === 'json') download(JSON.stringify(payload, null, 2), 'application/json;charset=utf-8', 'json');
      if (format === 'csv') download('\\uFEFF' + toCsv(), 'text/csv;charset=utf-8', 'csv');
      if (format === 'pdf') {
        window.focus();
        window.print();
      }
    });
  })();`;

  doc.head.appendChild(printStyle);
  doc.body.append(payloadNode, actionScript);
}

function createPlaceholderMap({ ucId, commandSlug, templateId, theme, data, tool }: RenderContext): Record<string, string> {
  const stats = data.summary_card.stats ?? [];
  const metrics = getMetrics(data);
  const table = getDataTableBlock(data);
  const rows = getTableRows(table);
  const columns = getTableColumns(table, rows);
  const actions = getActions(data);
  const recommendations = getRecommendations(data);
  const decision = getDecision(data);
  const score = getScore(data);
  const modeLabel = getModeLabel(ucId);
  const subcategory = findResultValue(data, /^(subcategory|subcategories|category)$/i)
    || tool?.subcategories
    || tool?.category
    || 'MarketXtractor';
  const confidence = findResultValue(data, /^confidence$/i)
    || stats.find(stat => /confidence/i.test(stat.label))?.value
    || 'Not provided';
  const riskLevel = findResultValue(data, /^(risk|risk_level|risk_status)$/i)
    || stats.find(stat => /risk/i.test(stat.label))?.value
    || 'Not provided';
  const resultMode = findResultValue(data, /^(response_mode|mode)$/i) || modeLabel;
  const engineVersion = 'AI Engine v1';
  const toolId = findResultValue(data, /^tool_id$/i) || tool?.id || commandSlug;

  const map: Record<string, string> = {
    theme,
    uc_mode: modeLabel,
    uc_mode_slug: modeLabel.toLowerCase().replace(/\W+/g, '-'),
    result_mode: modeLabel,
    mode_label: modeLabel,
    tool_icon: tool?.icon_emoji || '⚡',
    hero_icon: tool?.icon_emoji || '⚡',
    hero_title: data.summary_card.title || tool?.tool_name || commandSlug,
    tool_title: data.summary_card.title || tool?.tool_name || commandSlug,
    tool_id: toolId,
    pill_tool_id: toolId,
    pill_subcategory: subcategory,
    pill_confidence: getConfidenceLabel(data),
    pill_risk_status: getRiskLabel(data),
    pill_risk_level: normalizeRiskLabel(riskLevel),
    pill_mode: `Mode: ${resultMode}`,
    engine_version: engineVersion,
    pill_engine_version: engineVersion,
    primary_label: data.summary_card.subtitle || 'Result Summary',
    section_label: data.summary_card.subtitle || 'Result Summary',
    primary_result_title: data.summary_card.title || tool?.tool_name || commandSlug,
    score_value: score,
    score_progress: score,
    score_label: 'Confidence',
    score_status: getMetricStatus(score),
    risk_level: getRiskLabel(data),
    section_header_1: 'Key Metrics',
    section_header_2: 'Status',
    section_icon_1: '📊',
    section_title_1: table?.title || 'Result Details',
    section_icon_2: '✅',
    section_title_2: getActionBlock(data)?.title || 'Recommended Actions',
    section_icon_3: '⚠️',
    section_title_3: getRecommendationBlock(data)?.title || 'Insights',
    decision_icon: '💡',
    decision_title: decision?.title || 'Recommendation',
    recommendation_text: decision?.reason || recommendations[0]?.description || recommendations[0]?.title || data.summary_card.subtitle,
    meta_label_channel: stats[0]?.label || 'Metric',
    meta_value_channel: stats[0]?.value || getInputSummary(commandSlug),
    meta_label_audience: stats[1]?.label || 'Template',
    meta_value_audience: stats[1]?.value || templateId,
    meta_label_tone: stats[2]?.label || 'Mode',
    meta_value_tone: stats[2]?.value || modeLabel,
    analysis_section_title: table?.title || 'Analysis',
    summary_title: data.summary_card.title || tool?.tool_name || commandSlug,
    summary_body: data.summary_card.subtitle || 'Result summary',
  };

  const heroPills = getHeroPillValues({ ucId, commandSlug, templateId, theme, data, tool });
  for (let index = 0; index < 6; index += 1) {
    const value = heroPills[index] || heroPills[index % heroPills.length];
    map[`hero_pill_${index + 1}`] = value;
    map[`hero_pill_${String(index + 1).padStart(2, '0')}`] = value;
  }

  metrics.slice(0, 8).forEach((metric, index) => {
    const oneBased = index + 1;
    const padded = String(oneBased).padStart(2, '0');
    map[`dimension_name_${oneBased}`] = metric.label;
    map[`dimension_value_${oneBased}`] = metric.value;
    map[`dimension_status_${oneBased}`] = metric.status || getMetricStatus(metric.value);
    map[`dimension_name_${padded}`] = metric.label;
    map[`dimension_value_${padded}`] = metric.value;
    map[`dimension_status_${padded}`] = metric.status || getMetricStatus(metric.value);
    map[`bar_label_${oneBased}`] = metric.label;
    map[`bar_value_${oneBased}`] = metric.value;
    map[`bar_width_${oneBased}`] = extractPercent(metric.value);
  });

  const firstMetric = metrics[0] || { label: 'Score', value: score, status: 'Ready' };
  map.dimension_name = firstMetric.label;
  map.dimension_value = firstMetric.value;
  map.dimension_status = firstMetric.status || getMetricStatus(firstMetric.value);
  map.bar_label = firstMetric.label;
  map.bar_value = firstMetric.value;

  columns.slice(0, 8).forEach((column, index) => {
    const key = column.toLowerCase().replace(/\W+/g, '_').replace(/^_|_$/g, '');
    map[`table_header_${key}`] = column;
    map[`table_header_${index + 1}`] = column;
  });

  rows.slice(0, 12).forEach((row, rowIndex) => {
    columns.slice(0, 8).forEach((column, columnIndex) => {
      map[`table_row_${rowIndex + 1}_${columnIndex + 1}`] = String(row[column] ?? '');
    });
  });

  actions.slice(0, 8).forEach((action, index) => {
    map[`action_item_${index + 1}`] = action.description || action.title;
    map[`outline_item_${index + 1}_title`] = action.title;
    map[`outline_item_${index + 1}_description`] = action.description || action.title;
  });

  recommendations.slice(0, 8).forEach((recommendation, index) => {
    map[`warning_text_${index + 1}`] = recommendation.description || recommendation.title;
    map[`warning_text`] = recommendation.description || recommendation.title;
  });

  return map;
}

interface ScalarEntry {
  path: string;
  value: string;
}

function findResultValue(value: unknown, keyPattern: RegExp): string | undefined {
  if (Array.isArray(value)) {
    for (const item of value) {
      const match = findResultValue(item, keyPattern);
      if (match !== undefined) return match;
    }
    return undefined;
  }
  if (!value || typeof value !== 'object') return undefined;

  const entries = Object.entries(value as Record<string, unknown>);
  for (const [key, item] of entries) {
    if (keyPattern.test(key) && ['string', 'number', 'boolean'].includes(typeof item)) {
      return String(item);
    }
  }
  for (const [, item] of entries) {
    const match = findResultValue(item, keyPattern);
    if (match !== undefined) return match;
  }
  return undefined;
}

function getHeroPillValues({ ucId, commandSlug, data, tool }: RenderContext): string[] {
  return [
    getCategoryPillLabel(data, tool),
    getConfidenceLabel(data),
    getRiskLabel(data),
    tool?.id || commandSlug,
    `Mode: ${getModeLabel(ucId)}`,
    'AI Engine v1',
  ];
}

function getCategoryPillLabel(data: UCResult, tool?: MXTool): string {
  return findResultValue(data, /^(subcategory|subcategories|category|tool_type|engine|decision_engine)$/i)
    || tool?.subcategories
    || tool?.category
    || 'Decision Engine';
}

function applyScorePlaceholders(placeholders: Record<string, string>, context: RenderContext): void {
  const score = getScore(context.data);
  placeholders.score_value = score;
  placeholders.score_progress = score;
  placeholders.score_label = getScoreLabel(context);
  placeholders.score_status = getMetricStatus(score);
}

function getScoreLabel({ templateId, data }: RenderContext): string {
  if (templateId === 'MXT_005') return 'Score';
  const stat = data.summary_card.stats.find(item => /confidence|score|quality|performance/i.test(item.label));
  if (stat?.label && /confidence/i.test(stat.label)) return 'Confidence';
  return 'Score';
}

function populateTemplatePlaceholders(html: string, placeholders: Record<string, string>, context: RenderContext): void {
  const keys = new Set(Array.from(html.matchAll(/{{\s*([^}]+?)\s*}}/g), match => match[1].trim()));
  const entries = collectScalarEntries(context.data);
  const stats = context.data.summary_card.stats ?? [];
  const headings = uniqueStrings([
    context.data.summary_card.title,
    ...context.data.blocks.map(block => block.title),
    ...entries.filter(entry => /(?:title|label|name|subject)$/i.test(entry.path)).map(entry => entry.value),
    ...stats.map(stat => stat.label),
  ]);
  const values = uniqueStrings([
    ...stats.map(stat => stat.value),
    ...entries.filter(entry => !/(?:title|label|name)$/i.test(entry.path)).map(entry => entry.value),
  ]);
  const narratives = uniqueStrings([
    context.data.summary_card.subtitle,
    ...entries
      .filter(entry => /(?:subtitle|description|insight|reason|recommendation|rationale|evidence|fix|impact|summary|action|message|body)$/i.test(entry.path))
      .map(entry => entry.value),
    ...values,
  ]);

  keys.forEach(key => {
    if (placeholders[key] !== undefined) return;

    const indexMatch = key.match(/_(\d{1,2})$/);
    const index = Math.max(0, Number(indexMatch?.[1] || 1) - 1);
    const semanticMatch = findSemanticEntry(key, entries);
    if (semanticMatch) {
      placeholders[key] = semanticMatch.value;
      return;
    }

    if (/(?:title|subject|name|label|phase)$/i.test(key)) {
      placeholders[key] = valueAt(headings, index);
    } else if (/(?:value|score|confidence|target|width|progress|rating|status|severity|priority|timing|channel|owner|tone|intent|language|country|level)$/i.test(key)) {
      placeholders[key] = valueAt(values, index);
    } else {
      placeholders[key] = valueAt(narratives, index);
    }
  });
}

function collectScalarEntries(value: unknown, path = ''): ScalarEntry[] {
  if (value === null || value === undefined) return [];
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    const text = String(value).trim();
    return text ? [{ path, value: text }] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectScalarEntries(item, `${path}.${index + 1}`));
  }
  if (typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, item]) =>
      key === 'type' ? [] : collectScalarEntries(item, path ? `${path}.${key}` : key)
    );
  }
  return [];
}

function findSemanticEntry(placeholder: string, entries: ScalarEntry[]): ScalarEntry | undefined {
  const ignored = new Set(['mx', 'hero', 'pill', 'section', 'item', 'card', 'body', 'text', 'context', 'result']);
  const wanted = tokenize(placeholder).filter(token => !ignored.has(token) && !/^\d+$/.test(token));
  if (wanted.length === 0) return undefined;

  let best: { entry: ScalarEntry; score: number } | undefined;
  entries.forEach(entry => {
    const available = new Set(tokenize(entry.path));
    const score = wanted.reduce((total, token) => total + (available.has(token) ? 1 : 0), 0);
    if (score > 0 && (!best || score > best.score)) best = { entry, score };
  });
  return best?.entry;
}

function tokenize(value: string): string[] {
  return value.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

function uniqueStrings(values: Array<string | undefined>): string[] {
  return Array.from(new Set(values.filter((value): value is string => Boolean(value?.trim()))));
}

function valueAt(values: string[], index: number): string {
  if (values.length === 0) return 'Not provided';
  return values[index] || values[index % values.length];
}

function applyDocumentMetadata(doc: Document, { data, theme }: RenderContext): void {
  doc.documentElement.lang = doc.documentElement.lang || 'en';
  doc.querySelector('title')!.textContent = data.summary_card.title;
  doc.body.setAttribute('data-theme', theme);
}

function applyHeader(doc: Document, context: RenderContext, placeholders: Record<string, string>): void {
  const heroTitle = doc.querySelector<HTMLElement>('.hero-title, .mx-result-title, h1');
  if (heroTitle) {
    const icon = context.tool?.icon_emoji || heroTitle.querySelector('span')?.textContent?.trim();
    heroTitle.textContent = '';
    if (icon) {
      const iconNode = doc.createElement('span');
      iconNode.setAttribute('aria-hidden', 'true');
      iconNode.textContent = icon;
      heroTitle.append(iconNode, ' ');
    }
    heroTitle.append(placeholders.tool_title);
  }

  const pills = Array.from(doc.querySelectorAll<HTMLElement>('.pills .pill'));
  [
    placeholders.pill_subcategory,
    placeholders.pill_confidence,
    placeholders.pill_risk_status,
    placeholders.tool_id,
    `Mode: ${placeholders.mode_label}`,
    placeholders.engine_version,
  ].forEach((value, index) => setPillText(doc, pills[index], value));
}

function applySummary(doc: Document, { data }: RenderContext): void {
  setAllText(doc, '.section-title-xl, .title-value, .mx-result-title', data.summary_card.title);
  setAllText(doc, '.mx-result-subtitle', data.summary_card.subtitle);
  setFirstText(doc, '.card.wide .label, .card.wide .section-label', data.summary_card.subtitle || 'Result Summary');

  const metaContainers = Array.from(doc.querySelectorAll<HTMLElement>('.meta, .meta-row'));
  metaContainers.forEach(container => {
    container.textContent = '';
    data.summary_card.stats.slice(0, 4).forEach(stat => {
      const item = doc.createElement('span');
      const strong = doc.createElement('strong');
      strong.textContent = `${stat.label}:`;
      item.append(strong, ` ${stat.value}`);
      container.appendChild(item);
    });
  });
}

function applyStats(doc: Document, { data }: RenderContext): void {
  const metrics = getMetrics(data);
  const statCards = Array.from(doc.querySelectorAll<HTMLElement>('.mx-stat, .metric-card, .summary-card'));
  statCards.forEach((card, index) => {
    const metric = metrics[index];
    if (!metric) return;
    setText(card.querySelector<HTMLElement>('.mx-stat-label, .metric-label, .summary-label'), metric.label);
    setText(card.querySelector<HTMLElement>('.mx-stat-value, .metric-value, .summary-value'), metric.value);
  });

  Array.from(doc.querySelectorAll<HTMLElement>('.dim-row')).forEach((row, index) => {
    const metric = metrics[index];
    if (!metric) return;
    setText(row.querySelector<HTMLElement>('.dim-name'), metric.label);
    setText(row.querySelector<HTMLElement>('.dim-value'), metric.value);
    setText(row.querySelector<HTMLElement>('.dim-tag'), metric.status || getMetricStatus(metric.value));
  });

  Array.from(doc.querySelectorAll<HTMLElement>('.bar-row')).forEach((row, index) => {
    const metric = metrics[index];
    if (!metric) return;
    setText(row.querySelector<HTMLElement>('.bar-label'), metric.label);
    setText(row.querySelector<HTMLElement>('.bar-val'), metric.value);
    const fill = row.querySelector<HTMLElement>('.bar-fill');
    if (fill) fill.style.width = `${extractPercent(metric.value)}%`;
  });

  setAllText(doc, '.score-value', getScore(data));
}

function applyTables(doc: Document, { data }: RenderContext): void {
  const tableBlock = getDataTableBlock(data);
  if (!tableBlock) return;

  const rows = getTableRows(tableBlock);
  const columns = getTableColumns(tableBlock, rows);
  const table = doc.querySelector<HTMLTableElement>('table.table, table.mx-table, table');
  if (!table || columns.length === 0) return;

  const thead = table.tHead || table.createTHead();
  thead.textContent = '';
  const headerRow = thead.insertRow();
  columns.forEach(column => {
    const th = doc.createElement('th');
    th.textContent = column;
    headerRow.appendChild(th);
  });

  const tbody = table.tBodies[0] || table.createTBody();
  tbody.textContent = '';
  rows.slice(0, 8).forEach(row => {
    const tr = tbody.insertRow();
    columns.forEach(column => {
      const td = tr.insertCell();
      td.textContent = String(row[column] ?? '');
    });
  });
}

function applyNarrativeBlocks(doc: Document, { data }: RenderContext): void {
  const actions = getActions(data);
  const recommendations = getRecommendations(data);
  const decision = getDecision(data);

  Array.from(doc.querySelectorAll<HTMLElement>('.bullet-list li')).forEach((item, index) => {
    const action = actions[index] || recommendations[index];
    if (action) item.textContent = action.description || action.title;
  });

  Array.from(doc.querySelectorAll<HTMLElement>('.outline-item')).forEach((item, index) => {
    const action = actions[index] || recommendations[index];
    if (!action) return;
    setText(item.querySelector<HTMLElement>('.outline-name'), action.title);
    setText(item.querySelector<HTMLElement>('.outline-desc'), action.description || action.title);
  });

  Array.from(doc.querySelectorAll<HTMLElement>('.warning')).forEach((item, index) => {
    const recommendation = recommendations[index] || actions[index];
    if (recommendation) item.textContent = recommendation.description || recommendation.title;
  });

  setFirstText(doc, '.recommend-card .rec-head, .rec-head', decision?.title || getRecommendationBlock(data)?.title || 'Recommendation');
  setFirstText(doc, '.recommend-card .rec-body, .rec-body', decision?.reason || recommendations[0]?.description || recommendations[0]?.title || data.summary_card.subtitle);
}

function replaceRemainingPlaceholders(doc: Document, placeholders: Record<string, string>): void {
  const walker = doc.createTreeWalker(doc.documentElement, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

  textNodes.forEach(node => {
    node.nodeValue = node.nodeValue?.replace(/{{\s*([^}]+?)\s*}}/g, (_, key: string) => placeholders[key] ?? '').replace(/{(theme|uc_id|title|subtitle)}/g, (_, key: string) => placeholders[key] ?? '') ?? '';
  });

  Array.from(doc.querySelectorAll<HTMLElement>('*')).forEach(element => {
    Array.from(element.attributes).forEach(attribute => {
      const value = attribute.value
        .replace(/{{\s*([^}]+?)\s*}}/g, (_, key: string) => placeholders[key] ?? '')
        .replace(/{(theme|uc_id|title|subtitle)}/g, (_, key: string) => placeholders[key] ?? '');
      element.setAttribute(attribute.name, value);
    });
  });
}

function renderFallbackHtml(ucId: string, commandSlug: string, templateId: string, theme: 'light' | 'dark', data: UCResult, tool?: MXTool): string {
  const statsHtml = data.summary_card.stats.map(stat => `<span><strong>${escapeHtml(stat.label)}:</strong> ${escapeHtml(stat.value)}</span>`).join('');
  const table = getDataTableBlock(data);
  const rows = getTableRows(table);
  const columns = getTableColumns(table, rows);
  const tableHtml = table
    ? `<section class="card"><div class="card-title">${escapeHtml(table.title)}</div><table class="table"><thead><tr>${columns.map(column => `<th>${escapeHtml(column)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${columns.map(column => `<td>${escapeHtml(String(row[column] ?? ''))}</td>`).join('')}</tr>`).join('')}</tbody></table></section>`
    : '';

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(data.summary_card.title)}</title><style>${RENDERER_CSS}</style></head>
<body data-template-id="${escapeHtml(templateId)}" data-theme="${theme}"><main class="mx-shell mx-result mx-theme-${theme}" data-use-case="${escapeHtml(commandSlug)}_${escapeHtml(ucId)}"><header class="mx-result-header"><h1 class="mx-result-title"><span>${escapeHtml(tool?.icon_emoji || '⚡')}</span> ${escapeHtml(data.summary_card.title)}</h1><p class="mx-result-subtitle">${escapeHtml(data.summary_card.subtitle)}</p><div class="meta">${statsHtml}</div></header>${tableHtml}</main></body></html>`;
}

function getDataTableBlock(data: UCResult): any | undefined {
  return data.blocks.find(block => block.type === 'data_table');
}

function getActionBlock(data: UCResult): any | undefined {
  return data.blocks.find(block => block.type === 'action_plan');
}

function getRecommendationBlock(data: UCResult): any | undefined {
  return data.blocks.find(block => block.type === 'recommendations' || block.type === 'insight_cards');
}

function getDecision(data: UCResult): any | undefined {
  return data.blocks.find(block => block.type === 'decision_layer');
}

function getTableRows(block: any | undefined): Record<string, unknown>[] {
  return Array.isArray(block?.data) ? block.data : [];
}

function getTableColumns(block: any | undefined, rows: Record<string, unknown>[]): string[] {
  if (Array.isArray(block?.columns) && block.columns.length > 0) return block.columns;
  return rows[0] ? Object.keys(rows[0]) : [];
}

function getMetrics(data: UCResult): Array<{ label: string; value: string; status?: string }> {
  const metrics: Array<{ label: string; value: string; status?: string }> = [...(data.summary_card.stats ?? [])];
  data.blocks.forEach(block => {
    const blockMetrics = block.metrics || block.data || block.items || block.insights || [];
    if ((block.type === 'metrics_grid' || block.type === 'insight_cards') && Array.isArray(blockMetrics)) {
      blockMetrics.forEach((item: any) => {
        if (item.label || item.title) metrics.push({ label: item.label || item.title, value: String(item.value || item.description || item.impact || ''), status: item.status || item.trend || item.impact });
      });
    }
  });
  return metrics.map(metric => ({ label: String(metric.label), value: String(metric.value), status: (metric as any).status }));
}

function getActions(data: UCResult): Array<{ title: string; description?: string }> {
  const block = getActionBlock(data);
  const steps = Array.isArray(block?.steps) ? block.steps : [];
  return steps.map((step: any, index: number) => typeof step === 'string' ? { title: `Step ${index + 1}`, description: step } : { title: step.title || `Step ${step.step || index + 1}`, description: step.description || step.value });
}

function getRecommendations(data: UCResult): Array<{ title: string; description?: string }> {
  const block = getRecommendationBlock(data);
  const items = block?.items || block?.recommendations || block?.insights || [];
  return Array.isArray(items) ? items.map((item: any) => ({ title: String(item.title || item.label || 'Insight'), description: item.description || item.value || item.impact })) : [];
}

function getScore(data: UCResult): string {
  const decision = getDecision(data);
  if (decision?.score) return formatScoreValue(String(decision.score));
  const stat = data.summary_card.stats.find(item => /score|confidence|quality|performance/i.test(item.label));
  return stat ? formatScoreValue(stat.value) : '88';
}

function formatScoreValue(value: string): string {
  const numeric = parseScoreLikeValue(value);
  if (numeric === undefined) return extractPercent(value);
  return String(Math.max(0, Math.min(100, Math.round(numeric))));
}

function getConfidenceLabel(data: UCResult): string {
  const rawValue = findResultValue(data, /^confidence$/i)
    || data.summary_card.stats.find(item => /confidence/i.test(item.label))?.value;
  if (!rawValue) return 'High Confidence';

  const text = String(rawValue).trim();
  if (/confidence/i.test(text) && !/^\d/.test(text)) return capitalizeWords(text);
  if (/\b(high|strong|excellent|very good)\b/i.test(text)) return 'High Confidence';
  if (/\b(medium|moderate|good|fair)\b/i.test(text)) return 'Good Confidence';
  if (/\b(low|weak|poor)\b/i.test(text)) return 'Low Confidence';

  const numeric = parseScoreLikeValue(text);
  if (numeric !== undefined) {
    if (numeric >= 85) return 'High Confidence';
    if (numeric >= 70) return 'Good Confidence';
    if (numeric >= 50) return 'Medium Confidence';
    return 'Low Confidence';
  }

  return `${capitalizeWords(text)} Confidence`;
}

function getRiskLabel(data: UCResult): string {
  const rawValue = findResultValue(data, /^(risk|risk_level|risk_status)$/i)
    || data.summary_card.stats.find(item => /risk/i.test(item.label))?.value;
  return normalizeRiskLabel(rawValue);
}

function normalizeRiskLabel(value: string | undefined): string {
  if (!value) return 'Low Risk';
  const text = String(value).trim();
  if (/\b(no|none|minimal|safe|low)\b/i.test(text)) return 'Low Risk';
  if (/\b(medium|moderate|watch|caution)\b/i.test(text)) return 'Medium Risk';
  if (/\b(high|severe|critical|danger|bad)\b/i.test(text)) return 'High Risk';
  if (/risk/i.test(text) && text.split(/\s+/).length <= 3) return capitalizeWords(text);
  return `${capitalizeWords(text)} Risk`;
}

function parseScoreLikeValue(value: string): number | undefined {
  const match = value.match(/\d+(?:\.\d+)?/);
  if (!match) return undefined;
  const number = Number(match[0]);
  if (!Number.isFinite(number)) return undefined;
  if (number <= 1 && /0?\.\d+/.test(match[0])) return number * 100;
  return number;
}

function getMetricStatus(value: string): string {
  const match = String(value).match(/\d+(?:\.\d+)?/);
  const percent = match ? Number(match[0]) : Number.NaN;
  if (match && Number.isFinite(percent)) {
    if (percent >= 85) return 'Strong';
    if (percent >= 70) return 'Good';
    if (percent >= 50) return 'Medium';
    if (percent >= 30) return 'Weak';
    return 'Bad';
  }
  return 'Ready';
}

function normalizeDimensionStatus(status?: string, value?: string, name?: string): string {
  const source = String(status || '').trim();
  const valueText = String(value || '').trim();
  const nameText = String(name || '').trim();
  const combined = `${source} ${valueText} ${nameText}`.toLowerCase();

  if (/\b(not provided|unknown|n\/a|none)\b/i.test(source)) return 'Not provided';
  if (/\b(strong|excellent|great|very good)\b/.test(combined)) return 'Strong';
  if (/\b(good|solid|positive|recommended|ready|pass|passed)\b/.test(combined)) return 'Good';
  if (/\b(medium|moderate|average|mixed|fair)\b/.test(combined)) return 'Medium';
  if (/\b(safe|low risk|low-risk|secure)\b/.test(combined)) return 'Safe';
  if (/\b(bad|poor|critical|danger|failed|fail|high risk|high-risk)\b/.test(combined)) return 'Bad';
  if (/\b(weak|low confidence|thin|limited)\b/.test(combined)) return 'Weak';
  if (/^(high|low)$/i.test(source)) return capitalize(source);

  if (/risk|danger|issue|problem|difficulty|competition/i.test(nameText)) {
    if (/\blow\b/i.test(valueText)) return 'Safe';
    if (/\bmedium|moderate\b/i.test(valueText)) return 'Medium';
    if (/\bhigh|severe|critical\b/i.test(valueText)) return 'Bad';
  }

  const numericSource = `${source} ${valueText}`;
  const shouldScoreNumeric = /%|\/100|\b(score|confidence|quality|rating|progress|percent|percentage|opportunity)\b/i.test(`${numericSource} ${nameText}`);
  const percentMatch = shouldScoreNumeric ? numericSource.match(/\d+(?:\.\d+)?/) : null;
  if (percentMatch) return getMetricStatus(percentMatch[0]);

  const shortClean = source.replace(/[^A-Za-z ]+/g, ' ').trim();
  if (shortClean && shortClean.split(/\s+/).length <= 2) return capitalizeWords(shortClean);
  return valueText ? getMetricStatus(valueText) : 'Good';
}

function getModeLabel(ucId: string): string {
  if (ucId.toUpperCase() === 'UC3') return 'Pro+';
  if (ucId.toUpperCase() === 'UC2') return 'Pro';
  return 'Basic';
}

function extractPercent(value: string): string {
  const match = String(value).match(/\d+(?:\.\d+)?/);
  return match ? match[0] : '88';
}

function clampPercent(value: string): string {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return '0';
  return String(Math.max(0, Math.min(100, Math.round(numeric))));
}

function getInputSummary(commandSlug: string): string {
  return commandSlug.replace(/[-_]+/g, ' ');
}

function setAllText(doc: Document, selector: string, value: string): void {
  Array.from(doc.querySelectorAll<HTMLElement>(selector)).forEach(element => setText(element, value));
}

function setFirstText(doc: Document, selector: string, value: string): void {
  setText(doc.querySelector<HTMLElement>(selector), value);
}

function setText(element: HTMLElement | null | undefined, value: string | undefined): void {
  if (element && value !== undefined) element.textContent = value;
}

function setPillText(doc: Document, pill: HTMLElement | undefined, value: string): void {
  if (!pill) return;
  const hasDot = pill.querySelector('.dot, .mx-dot, .pill-dot');
  pill.textContent = '';
  if (hasDot) {
    const dot = doc.createElement('span');
    dot.className = hasDot.className;
    pill.append(dot);
  }
  pill.append(value);
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function capitalizeWords(value: string): string {
  return value.split(/\s+/).map(capitalize).join(' ');
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char] || char));
}

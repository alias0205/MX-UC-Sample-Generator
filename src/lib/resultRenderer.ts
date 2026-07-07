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
  const pattern = getMxt001ClientPattern(context, metrics, actions, recommendations, decision, factorRows, pressureMetrics);

  setMxt001Placeholder(placeholders, context, 'theme', context.theme);
  setMxt001Placeholder(placeholders, context, 'hero_icon', tool?.icon_emoji || pattern.heroIcon);
  setMxt001Placeholder(placeholders, context, 'hero_title', tool?.tool_name || pattern.heroTitle);
  setMxt001Placeholder(placeholders, context, 'decision_title', pattern.topicTitle);
  setMxt001Placeholder(placeholders, context, 'decision_summary', pattern.finalDecision);
  setMxt001Placeholder(placeholders, context, 'decision_recommended', pattern.recommended);
  setMxt001Placeholder(placeholders, context, 'decision_tolerance', pattern.riskLevel);
  setMxt001Placeholder(placeholders, context, 'risk_level', pattern.riskLevel);
  setMxt001Placeholder(placeholders, context, 'final_decision_body', pattern.finalDecision);

  applyScorePlaceholders(placeholders, context);
  placeholders.score_label = 'Confidence';

  pattern.heroPills.forEach((value, index) => {
    setMxt001Placeholder(placeholders, context, `hero_pill_${index + 1}`, value);
  });

  for (let index = 0; index < 4; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const metric = pattern.dimensions[index] || {
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
  const value = isMissingPlaceholderValue(mappedValue)
    ? fallbackValue?.trim() || 'Not provided'
    : mappedValue;
  placeholders[key] = normalizeMxt001PlaceholderValue(key, value);
}

interface Mxt001ClientPattern {
  heroIcon: string;
  heroTitle: string;
  heroPills: string[];
  topicTitle: string;
  recommended: string;
  riskLevel: string;
  finalDecision: string;
  dimensions: Array<{ label: string; value: string; status?: string }>;
}

function getMxt001ClientPattern(
  context: RenderContext,
  metrics: Array<{ label: string; value: string; status?: string }>,
  actions: Array<{ title: string; description?: string }>,
  recommendations: Array<{ title: string; description?: string }>,
  decision: any | undefined,
  factorRows: Array<{ name?: string; signal?: string; impact?: string; action?: string }>,
  pressureMetrics: Array<{ label: string; value: string; status?: string }>
): Mxt001ClientPattern {
  const { data, tool, commandSlug, ucId } = context;
  const score = getScore(data);
  const recommended = normalizeMxt001Recommendation(
    findResultValue(data, /^(recommended|recommended_option|recommended_action|channel|first_channel|content_type)$/i)
      || factorRows[0]?.name
      || recommendations[0]?.title
      || recommendations[0]?.description
      || actions[0]?.description
      || stringifyValue(decision?.reason)
  );
  const riskLevel = normalizeMxt001Level(
    findResultValue(data, /^(risk_tolerance|tolerance|risk|risk_level|risk_status)$/i)
      || data.summary_card.stats.find(stat => /risk|tolerance/i.test(stat.label))?.value
      || getRiskLabel(data)
  );
  const topicTitle = normalizeMxt001TopicTitle(
    findResultValue(data, /^(decision_goal|topic_title|goal|objective)$/i)
      || stringifyValue(decision?.title)
      || data.summary_card.title,
    recommended,
    commandSlug
  );
  const finalDecision = normalizeMxt001LongText(
    findResultValue(data, /^(final_decision|recommendation_summary|decision_summary)$/i)
      || stringifyValue(decision?.reason)
      || recommendations[0]?.description
      || actions[0]?.description
      || data.summary_card.subtitle,
    recommended,
    riskLevel
  );
  const mode = getModeLabel(ucId);

  return {
    heroIcon: tool?.icon_emoji || 'MX',
    heroTitle: tool?.tool_name || data.summary_card.title || commandSlug,
    heroPills: [
      'Decision Engine',
      getConfidenceLabel(data),
      `${riskLevel} Risk`,
      tool?.id || commandSlug,
      `Mode: ${mode}`,
      'AI Engine v1',
    ],
    topicTitle,
    recommended,
    riskLevel,
    finalDecision,
    dimensions: getMxt001ClientDimensions(ucId, score, recommended, riskLevel, metrics, factorRows, pressureMetrics),
  };
}

function getMxt001ClientDimensions(
  ucId: string,
  score: string,
  recommended: string,
  riskLevel: string,
  metrics: Array<{ label: string; value: string; status?: string }>,
  factorRows: Array<{ name?: string; signal?: string; impact?: string; action?: string }>,
  pressureMetrics: Array<{ label: string; value: string; status?: string }>
): Array<{ label: string; value: string; status?: string }> {
  const normalizedUcId = ucId.toUpperCase();
  if (normalizedUcId === 'UC1') {
    return [
      { label: 'Recommended Option', value: normalizeMxt001ShortOption(recommended), status: riskLevel === 'Low' ? 'Safe' : riskLevel },
      { label: 'Confidence', value: `${extractPercent(score)}%`, status: getMetricStatus(score) },
      { label: 'SMS Follow-up', value: riskLevel === 'Low' ? 'Avoid' : 'Review', status: 'Opt-in' },
    ];
  }

  const dimensionSource = metrics.length >= 4 ? metrics : pressureMetrics;
  const fallback = [
    { label: 'Compliance Safety', value: valueForMxt001Metric(dimensionSource, /compliance|safety/i, '82'), status: 'Strong' },
    { label: 'Trust Alignment', value: valueForMxt001Metric(dimensionSource, /trust|alignment/i, '74'), status: 'Good' },
    { label: 'Response Potential', value: valueForMxt001Metric(dimensionSource, /response|potential/i, '49'), status: normalizedUcId === 'UC3' ? 'Moderate' : 'Medium' },
    { label: 'Brand Protection', value: valueForMxt001Metric(dimensionSource, /brand|protection/i, '80'), status: 'Strong' },
  ];

  return fallback.map((item, index) => {
    const metric = metrics[index];
    const row = factorRows[index];
    if (!metric && !row) return item;
    return {
      label: normalizeMxt001DimensionLabel(metric?.label || item.label, item.label),
      value: normalizeMxt001Scalar(metric?.value || row?.signal || item.value),
      status: normalizeDimensionStatus(metric?.status || item.status, metric?.value || row?.signal || item.value, item.label),
    };
  });
}

function normalizeMxt001PlaceholderValue(key: string, value: string): string {
  if (/^(decision_recommended)$/.test(key)) return normalizeMxt001Recommendation(value);
  if (/^(decision_tolerance|risk_level)$/.test(key)) return normalizeMxt001Level(value);
  if (/^decision_title$/.test(key)) return normalizeMxt001TopicTitle(value, '', '');
  if (/^(decision_summary|final_decision_body)$/.test(key)) return normalizeMxt001LongText(value, '', 'Low');
  if (/^dimension_name_/.test(key)) return normalizeMxt001DimensionLabel(value, value);
  if (/^dimension_value_/.test(key)) return normalizeMxt001Scalar(value);
  if (/^dimension_status_/.test(key)) return normalizeDimensionStatus(value, value, key);
  if (/^pressure_width_/.test(key)) return clampPercent(extractPercent(value));
  if (/^score_/.test(key) && key !== 'score_label') return extractPercent(value);
  return value?.trim() || 'Not provided';
}

function normalizeMxt001Recommendation(value: string | undefined): string {
  const text = stringifyValue(value);
  if (!text) return 'Not provided';
  if (/linkedin/i.test(text)) return /message/i.test(text) ? 'LinkedIn message' : 'LinkedIn';
  if (/cold email|email/i.test(text)) return 'Cold email';
  if (/sms/i.test(text)) return 'SMS follow-up';
  if (/comparison|compare|roundup|alternative|vs\.?/i.test(text)) return 'Comparison guide';
  if (/product page|landing page|pricing page/i.test(text)) return 'Product page';
  if (/blog|article|post/i.test(text)) return 'Blog article';
  return sentenceFragment(text, 4);
}

function normalizeMxt001ShortOption(value: string): string {
  if (/linkedin/i.test(value)) return 'LinkedIn';
  if (/email/i.test(value)) return 'Email';
  if (/sms/i.test(value)) return 'SMS';
  return sentenceFragment(value, 3);
}

function normalizeMxt001Level(value: string | undefined): string {
  const text = stringifyValue(value).toLowerCase();
  const numeric = parseScoreLikeValue(text);
  if (/low|minimal|safe/.test(text)) return 'Low';
  if (/medium|moderate|watch|caution/.test(text)) return 'Medium';
  if (/high|critical|severe|elevated/.test(text)) return 'High';
  if (numeric !== undefined) {
    if (numeric >= 85) return 'Low';
    if (numeric >= 60) return 'Medium';
    return 'High';
  }
  return 'Low';
}

function normalizeMxt001TopicTitle(value: string | undefined, recommended: string, commandSlug: string): string {
  const text = stringifyValue(value).replace(/\s+/g, ' ').trim();
  if (/^(choose|select|determine|decide|pick)\b/i.test(text)) return sentenceCase(text);
  const target = commandSlug ? ` for ${commandSlug.replace(/[-_]+/g, ' ')}` : '';
  if (/linkedin|email|sms|outreach|message|channel/i.test(`${text} ${recommended}`)) return `Choose the safest outreach channel${target}`;
  if (/comparison|product page|blog|content/i.test(`${text} ${recommended}`)) return `Choose the best content type${target}`;
  return `Choose the best decision path${target}`;
}

function normalizeMxt001LongText(value: string | undefined, recommended: string, riskLevel: string): string {
  const text = stringifyValue(value).replace(/\s+/g, ' ').trim();
  if (text && !/^(choose|recommended:|risk tolerance:|not provided)$/i.test(text)) return text;
  const action = recommended || 'The recommended option';
  return `${action} is the safest first-contact option under ${riskLevel.toLowerCase()} risk tolerance.`;
}

function normalizeMxt001DimensionLabel(value: string | undefined, fallback: string): string {
  const text = stringifyValue(value);
  if (/recommended/i.test(text)) return 'Recommended Option';
  if (/confidence/i.test(text)) return 'Confidence';
  if (/sms/i.test(text)) return 'SMS Follow-up';
  if (/compliance|safety/i.test(text)) return 'Compliance Safety';
  if (/trust|alignment/i.test(text)) return 'Trust Alignment';
  if (/response|potential/i.test(text)) return 'Response Potential';
  if (/brand|protection/i.test(text)) return 'Brand Protection';
  return sentenceFragment(text || fallback, 3);
}

function normalizeMxt001Scalar(value: string | undefined): string {
  const text = stringifyValue(value);
  if (!text) return 'Not provided';
  if (/^\d+(?:\.\d+)?%?$/.test(text)) return text;
  if (/avoid/i.test(text)) return 'Avoid';
  if (/pass|passed/i.test(text)) return 'Passed';
  if (/fail|failed|disqualified/i.test(text)) return 'Failed';
  return sentenceFragment(text, 4);
}

function valueForMxt001Metric(metrics: Array<{ label: string; value: string; status?: string }>, labelPattern: RegExp, fallback: string): string {
  return extractPercent(metrics.find(metric => labelPattern.test(metric.label))?.value || fallback);
}

function sentenceFragment(value: string, maxWords: number): string {
  const fragment = value.split(/[.;]/)[0].replace(/\s+because\s+.+$/i, '').trim();
  const words = fragment.split(/\s+/).filter(Boolean);
  return words.length <= maxWords ? capitalizeWords(fragment) : capitalizeWords(words.slice(0, maxWords).join(' '));
}

function sentenceCase(value: string): string {
  const text = value.trim();
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : 'Not provided';
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
  const pattern = getMxt002ClientPattern(context, stats, recommendations, actions, strategyItems, rewriteRows, sequenceItems);

  setMxt002Placeholder(placeholders, context, 'theme', context.theme);
  setMxt002Placeholder(placeholders, context, 'hero_icon', tool?.icon_emoji || pattern.heroIcon);
  setMxt002Placeholder(placeholders, context, 'hero_title', tool?.tool_name || pattern.heroTitle);
  setMxt002Placeholder(placeholders, context, 'summary_title', pattern.summaryTitle);
  setMxt002Placeholder(placeholders, context, 'summary_channel', pattern.channel);
  setMxt002Placeholder(placeholders, context, 'summary_audience', pattern.audience);
  setMxt002Placeholder(placeholders, context, 'summary_tone', pattern.tone);
  setMxt002Placeholder(placeholders, context, 'brief_body_01', pattern.briefItems[0] || 'Not provided');
  setMxt002Placeholder(placeholders, context, 'brief_body_02', pattern.briefItems[1] || 'Not provided');
  setMxt002Placeholder(placeholders, context, 'recommendation_body', pattern.finalRecommendation);

  pattern.heroPills.forEach((value, index) => {
    setMxt002Placeholder(placeholders, context, `hero_pill_${index + 1}`, value);
  });

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const item = pattern.strategyItems[index] || strategyItems[index] || recommendations[index] || actions[index];
    setMxt002Placeholder(placeholders, context, `strategy_title_${padded}`, item?.title || `Strategy ${index + 1}`);
    setMxt002Placeholder(placeholders, context, `strategy_body_${padded}`, item?.description || item?.title || 'Not provided');
  }

  for (let index = 0; index < 4; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const row = pattern.rewriteRows[index] || rewriteRows[index] || {};
    setMxt002Placeholder(placeholders, context, `rewrite_original_${padded}`, row.original || `Rewrite ${index + 1}`);
    setMxt002Placeholder(placeholders, context, `rewrite_risk_${padded}`, row.risk || 'Medium');
    setMxt002Placeholder(placeholders, context, `rewrite_recommendation_${padded}`, row.recommendation || 'Not provided');
    setMxt002Placeholder(placeholders, context, `rewrite_reason_${padded}`, row.reason || row.impact || 'Not provided');
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const item = pattern.sequenceItems[index] || sequenceItems[index] || actions[index] || recommendations[index];
    setMxt002Placeholder(placeholders, context, `sequence_title_${padded}`, item?.title || `Step ${index + 1}`);
    setMxt002Placeholder(placeholders, context, `sequence_body_${padded}`, item?.description || item?.title || 'Not provided');
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const action = pattern.actionItems[index] || actions[index] || sequenceItems[index] || recommendations[index];
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
  const value = isMissingPlaceholderValue(mappedValue)
    ? fallbackValue?.trim() || 'Not provided'
    : mappedValue;
  placeholders[key] = normalizeMxt002PlaceholderValue(key, value);
}

interface Mxt002ClientPattern {
  heroIcon: string;
  heroTitle: string;
  heroPills: string[];
  summaryTitle: string;
  channel: string;
  audience: string;
  tone: string;
  briefItems: string[];
  strategyItems: Array<{ title: string; description?: string }>;
  rewriteRows: Array<{ original?: string; risk?: string; recommendation?: string; reason?: string; impact?: string }>;
  sequenceItems: Array<{ title: string; description?: string }>;
  actionItems: Array<{ title: string; description?: string }>;
  finalRecommendation: string;
}

function getMxt002ClientPattern(
  context: RenderContext,
  stats: Array<{ label: string; value: string }>,
  recommendations: Array<{ title: string; description?: string }>,
  actions: Array<{ title: string; description?: string }>,
  strategyItems: Array<{ title: string; description?: string }>,
  rewriteRows: Array<{ original?: string; risk?: string; recommendation?: string; reason?: string; impact?: string }>,
  sequenceItems: Array<{ title: string; description?: string }>
): Mxt002ClientPattern {
  const { data, tool, commandSlug, ucId } = context;
  const mode = getModeLabel(ucId);
  const title = normalizeMxt002SummaryTitle(findResultValue(data, /^(topic|campaign|outreach|subject|summary_title)$/i) || data.summary_card.title || commandSlug);
  const channel = normalizeMxt002ChipValue(findResultValue(data, /^(channel|platform)$/i) || stats.find(stat => /channel|platform/i.test(stat.label))?.value || stats[0]?.value || 'Email');
  const audience = normalizeMxt002ChipValue(findResultValue(data, /^(audience|target_audience|recipient)$/i) || stats.find(stat => /audience|recipient/i.test(stat.label))?.value || stats[1]?.value || 'Store owners');
  const tone = normalizeMxt002ChipValue(findResultValue(data, /^(tone|voice|style)$/i) || stats.find(stat => /tone|voice|style/i.test(stat.label))?.value || stats[2]?.value || 'Professional');
  const finalRecommendation = normalizeMxt002Sentence(
    recommendations[0]?.description
      || recommendations[0]?.title
      || getDecision(data)?.reason
      || data.summary_card.subtitle,
    'Replace promotional wording with softer value language before sending the first outreach message.'
  );
  const rows = normalizeMxt002RewriteRows(rewriteRows);

  return {
    heroIcon: tool?.icon_emoji || 'MX',
    heroTitle: tool?.tool_name || data.summary_card.title || commandSlug,
    heroPills: [
      'Rewrite Engine',
      getConfidenceLabel(data),
      getRiskLabel(data),
      tool?.id || commandSlug,
      `Mode: ${mode}`,
      'AI Engine V1',
    ],
    summaryTitle: title,
    channel,
    audience,
    tone,
    briefItems: [
      normalizeMxt002Sentence(data.summary_card.subtitle || rows[0]?.reason, '"Free audit" may sound promotional when paired with sales recovery language.'),
      normalizeMxt002Sentence(recommendations[0]?.description || rows[0]?.recommendation, 'Use "quick checkout review" to make the offer feel helpful and consultative.'),
    ],
    strategyItems: normalizeMxt002StrategyItems(ucId, strategyItems, actions, recommendations),
    rewriteRows: rows,
    sequenceItems: normalizeMxt002SequenceItems(sequenceItems),
    actionItems: normalizeMxt002ActionItems(actions, sequenceItems),
    finalRecommendation,
  };
}

function normalizeMxt002PlaceholderValue(key: string, value: string): string {
  if (/^summary_title$/.test(key)) return normalizeMxt002SummaryTitle(value);
  if (/^summary_(channel|audience|tone)$/.test(key)) return normalizeMxt002ChipValue(value);
  if (/^hero_pill_1$/.test(key)) return /rewrite/i.test(value) ? 'Rewrite Engine' : sentenceFragment(value, 2);
  if (/^hero_pill_2$/.test(key)) return /confidence/i.test(value) ? capitalizeWords(value) : `${normalizeDimensionStatus(value, value, 'confidence')} Confidence`;
  if (/^hero_pill_3$/.test(key)) return /risk/i.test(value) ? capitalizeWords(value) : `${normalizeDimensionStatus(value, value, 'risk')} Risk`;
  if (/^strategy_title_/.test(key)) return normalizeMxt002NumberedTitle(value);
  if (/^strategy_body_|^sequence_body_|^action_body_|^brief_body_|^recommendation_body$|^rewrite_reason_/.test(key)) return normalizeMxt002Sentence(value, 'Not provided');
  if (/^rewrite_risk_/.test(key)) return normalizeMxt002Risk(value);
  if (/^rewrite_original_|^rewrite_recommendation_|^sequence_title_/.test(key)) return normalizeMxt002ShortPhrase(value);
  return value?.trim() || 'Not provided';
}

function normalizeMxt002SummaryTitle(value: string | undefined): string {
  const text = stringifyValue(value).replace(/\s+/g, ' ').trim();
  if (!text) return 'Outreach analysis';
  return text.replace(/^(analyze|analysis for|rewrite)\s+/i, '').replace(/[.!?]+$/, '');
}

function normalizeMxt002ChipValue(value: string | undefined): string {
  return stringifyValue(value).replace(/^[^A-Za-z0-9"']+\s*/, '').replace(/\s+/g, ' ').trim() || 'Not provided';
}

function normalizeMxt002Sentence(value: string | undefined, fallback: string): string {
  const text = stringifyValue(value).replace(/\s+/g, ' ').trim();
  if (!text || /^not provided$/i.test(text)) return fallback;
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function normalizeMxt002ShortPhrase(value: string | undefined): string {
  const text = stringifyValue(value).split(/[.;]/)[0].trim();
  return text ? sentenceFragment(text, 6) : 'Not provided';
}

function normalizeMxt002Risk(value: string | undefined): string {
  const text = stringifyValue(value).toLowerCase();
  if (/high|severe|critical/.test(text)) return 'High';
  if (/low|safe|minimal/.test(text)) return 'Low';
  return 'Medium';
}

function normalizeMxt002NumberedTitle(value: string | undefined): string {
  return normalizeMxt002ShortPhrase(value).replace(/^\d+\s+/, '');
}

function normalizeMxt002StrategyItems(
  ucId: string,
  strategyItems: Array<{ title: string; description?: string }>,
  actions: Array<{ title: string; description?: string }>,
  recommendations: Array<{ title: string; description?: string }>
): Array<{ title: string; description?: string }> {
  const source = strategyItems.length ? strategyItems : [...actions, ...recommendations];
  const fallback = ucId.toUpperCase() === 'UC3'
    ? [
      { title: 'Soften Promotional Claims', description: 'Move from "free audit" and "recover lost sales" to lower-pressure value language.' },
      { title: 'Build a Three-Step Sequence', description: 'Let the first message feel helpful, then add context in follow-ups.' },
      { title: 'Keep One CTA Per Message', description: 'Avoid stacked requests and urgency-based sales language.' },
    ]
    : [
      { title: 'Soften Promotional Claims', description: 'Replace "free audit" with a lower-pressure phrase like "quick checkout review".' },
      { title: 'Reduce Revenue Pressure', description: 'Use "find checkout opportunities" instead of "recover lost sales".' },
    ];
  return fallback.map((item, index) => ({
    title: normalizeMxt002NumberedTitle(source[index]?.title || item.title),
    description: normalizeMxt002Sentence(source[index]?.description || item.description, item.description || 'Not provided'),
  }));
}

function normalizeMxt002RewriteRows(rows: Array<{ original?: string; risk?: string; recommendation?: string; reason?: string; impact?: string }>): Array<{ original?: string; risk?: string; recommendation?: string; reason?: string; impact?: string }> {
  const fallback = [
    { original: 'Free audit', risk: 'Medium', recommendation: 'Quick checkout review', reason: 'Less promotional and more consultative.' },
    { original: 'Recover lost sales', risk: 'Medium', recommendation: 'Find checkout opportunities', reason: 'Keeps value without overclaiming.' },
    { original: 'Boost revenue fast', risk: 'High', recommendation: 'Improve checkout performance', reason: 'Removes exaggerated urgency.' },
    { original: 'Limited time', risk: 'High', recommendation: 'Available this week', reason: 'Reduces pressure-based spam signals.' },
  ];
  return fallback.map((item, index) => ({
    original: normalizeMxt002ShortPhrase(rows[index]?.original || item.original),
    risk: normalizeMxt002Risk(rows[index]?.risk || item.risk),
    recommendation: normalizeMxt002ShortPhrase(rows[index]?.recommendation || item.recommendation),
    reason: normalizeMxt002Sentence(rows[index]?.reason || rows[index]?.impact || item.reason, item.reason),
  }));
}

function normalizeMxt002SequenceItems(items: Array<{ title: string; description?: string }>): Array<{ title: string; description?: string }> {
  const fallback = [
    { title: 'Message 1: Quick checkout review for your store', description: 'Hi, I noticed your store may have opportunities to improve checkout flow. I can share a short review with a few practical areas to look at.' },
    { title: 'Message 2: A few cart recovery opportunities', description: 'Many stores lose potential orders during checkout. I can outline a few simple areas that often affect completion rates.' },
    { title: 'Message 3: Should I send the checklist?', description: 'I put together a short checkout improvement checklist. Would you like me to send it over?' },
  ];
  return fallback.map((item, index) => ({
    title: normalizeMxt002ShortPhrase(items[index]?.title || item.title),
    description: normalizeMxt002Sentence(items[index]?.description || item.description, item.description || 'Not provided'),
  }));
}

function normalizeMxt002ActionItems(actions: Array<{ title: string; description?: string }>, sequenceItems: Array<{ title: string; description?: string }>): Array<{ title: string; description?: string }> {
  const source = actions.length ? actions : sequenceItems;
  const fallback = [
    'Introduce a quick review of checkout friction.',
    'Mention cart abandonment as an opportunity area.',
    'Ask if they want a checklist or example.',
  ];
  return fallback.map((text, index) => ({
    title: `Action ${index + 1}`,
    description: normalizeMxt002Sentence(source[index]?.description || source[index]?.title || text, text),
  }));
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
  const pattern = getMxt003ClientPattern(context, rankedOptions, inputItems, comparisonRows, ruleItems, actions, recommendations);

  setMxt003Placeholder(placeholders, context, 'theme', context.theme);
  setMxt003Placeholder(placeholders, context, 'hero_icon', tool?.icon_emoji || pattern.heroIcon);
  setMxt003Placeholder(placeholders, context, 'hero_title', tool?.tool_name || pattern.heroTitle);
  setMxt003Placeholder(placeholders, context, 'comparison_summary_title', pattern.summaryTitle);
  setMxt003Placeholder(placeholders, context, 'comparison_recommended_option', pattern.recommendedOption);
  setMxt003Placeholder(placeholders, context, 'comparison_confidence', pattern.confidence);
  setMxt003Placeholder(placeholders, context, 'comparison_risk_tolerance', pattern.riskTolerance);
  setMxt003Placeholder(placeholders, context, 'final_recommendation_body', pattern.finalRecommendation);

  pattern.heroPills.forEach((value, index) => {
    setMxt003Placeholder(placeholders, context, `hero_pill_${index + 1}`, value);
  });

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const input = pattern.inputItems[index] || {
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
    const option = pattern.rankedOptions[index] || {
      name: `Option ${index + 1}`,
      description: 'Not provided',
      status: 'Not provided',
    };

    setMxt003Placeholder(placeholders, context, `ranked_option_name_${padded}`, option.name);
    setMxt003Placeholder(placeholders, context, `ranked_option_description_${padded}`, option.description);
    setMxt003Placeholder(placeholders, context, `ranked_option_status_${padded}`, normalizeDimensionStatus(option.status, option.description, option.name));
  }

  setMxt003Placeholder(placeholders, context, 'comparison_option_a_name', rankedOptions[0]?.name || 'Option A');
  setMxt003Placeholder(placeholders, context, 'comparison_option_b_name', pattern.rankedOptions[1]?.name || 'Option B');

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const row = pattern.comparisonRows[index] || {};

    setMxt003Placeholder(placeholders, context, `comparison_criteria_${padded}`, row.criteria || `Criteria ${index + 1}`);
    setMxt003Placeholder(placeholders, context, `comparison_option_a_text_${padded}`, row.optionAText || pattern.rankedOptions[0]?.description || 'Not provided');
    setMxt003Placeholder(placeholders, context, `comparison_option_a_tag_${padded}`, normalizeDimensionStatus(row.optionATag, row.optionAText, 'option'));
    setMxt003Placeholder(placeholders, context, `comparison_option_b_text_${padded}`, row.optionBText || pattern.rankedOptions[1]?.description || 'Not provided');
    setMxt003Placeholder(placeholders, context, `comparison_option_b_tag_${padded}`, normalizeDimensionStatus(row.optionBTag, row.optionBText, 'option'));
  }

  for (let index = 0; index < 4; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const item = pattern.ruleItems[index] || ruleItems[index] || recommendations[index] || actions[index];
    setMxt003Placeholder(placeholders, context, `rule_applied_${padded}`, item?.description || item?.title || 'Not provided');
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const warning = pattern.warningItems[index] || recommendations[index] || actions[index];
    setMxt003Placeholder(placeholders, context, `warning_body_${padded}`, warning?.description || warning?.title || 'Not provided');
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const action = pattern.actionItems[index] || actions[index] || recommendations[index];
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
  const value = isMissingPlaceholderValue(mappedValue)
    ? fallbackValue?.trim() || 'Not provided'
    : mappedValue;
  placeholders[key] = normalizeMxt003PlaceholderValue(key, value);
}

interface Mxt003ClientPattern {
  heroIcon: string;
  heroTitle: string;
  heroPills: string[];
  summaryTitle: string;
  recommendedOption: string;
  confidence: string;
  riskTolerance: string;
  inputItems: Array<{ name: string; description: string; status?: string }>;
  rankedOptions: Array<{ name: string; description: string; status?: string }>;
  comparisonRows: Array<{ criteria?: string; optionAText?: string; optionATag?: string; optionBText?: string; optionBTag?: string }>;
  ruleItems: Array<{ title: string; description?: string }>;
  warningItems: Array<{ title: string; description?: string }>;
  actionItems: Array<{ title: string; description?: string }>;
  finalRecommendation: string;
}

function getMxt003ClientPattern(
  context: RenderContext,
  rankedOptions: Array<{ name: string; description: string; status?: string }>,
  inputItems: Array<{ name: string; description: string; status?: string }>,
  comparisonRows: Array<{ criteria?: string; optionAText?: string; optionATag?: string; optionBText?: string; optionBTag?: string }>,
  ruleItems: Array<{ title: string; description?: string }>,
  actions: Array<{ title: string; description?: string }>,
  recommendations: Array<{ title: string; description?: string }>
): Mxt003ClientPattern {
  const { data, tool, commandSlug, ucId } = context;
  const decision = getDecision(data);
  const recommendedOption = normalizeMxt003Option(findResultValue(data, /^(recommended|recommended_option|channel|decision)$/i) || rankedOptions[0]?.name || recommendations[0]?.title || 'LinkedIn Message');
  const confidence = normalizeMxt003Confidence(findResultValue(data, /^confidence$/i) || data.summary_card.stats.find(stat => /confidence/i.test(stat.label))?.value || stringifyValue(decision?.score) || '0.86');
  const riskTolerance = normalizeMxt003Level(findResultValue(data, /^(risk_tolerance|tolerance|risk_level|risk)$/i) || getRiskLabel(data));
  const summaryTitle = normalizeMxt003ScenarioTitle(findResultValue(data, /^(scenario|decision_scenario|topic|goal)$/i) || data.summary_card.title || commandSlug);
  const normalizedRankedOptions = normalizeMxt003RankedOptions(rankedOptions, recommendedOption);
  const finalRecommendation = normalizeMxt003FinalRecommendation(
    recommendations[0]?.description || recommendations[0]?.title || stringifyValue(decision?.reason) || data.summary_card.subtitle,
    recommendedOption
  );

  return {
    heroIcon: tool?.icon_emoji || 'MX',
    heroTitle: tool?.tool_name || data.summary_card.title || commandSlug,
    heroPills: [
      'Decision Engine',
      getConfidenceLabel(data),
      `${riskTolerance} Risk`,
      tool?.id || commandSlug,
      `Mode: ${getModeLabel(ucId)}`,
      'AI Engine v1',
    ],
    summaryTitle,
    recommendedOption,
    confidence,
    riskTolerance,
    inputItems: normalizeMxt003Inputs(ucId, inputItems),
    rankedOptions: normalizedRankedOptions,
    comparisonRows: normalizeMxt003ComparisonRows(comparisonRows),
    ruleItems: normalizeMxt003Rules(ruleItems),
    warningItems: normalizeMxt003Warnings(actions, recommendations),
    actionItems: normalizeMxt003Actions(actions),
    finalRecommendation,
  };
}

function normalizeMxt003PlaceholderValue(key: string, value: string): string {
  if (/^comparison_summary_title$/.test(key)) return normalizeMxt003ScenarioTitle(value);
  if (/^comparison_recommended_option$/.test(key) || /^comparison_option_[ab]_name$/.test(key) || /^ranked_option_name_/.test(key)) return normalizeMxt003Option(value);
  if (/^comparison_confidence$/.test(key)) return normalizeMxt003Confidence(value);
  if (/^comparison_risk_tolerance$/.test(key)) return normalizeMxt003Level(value);
  if (/^input_name_/.test(key) || /^comparison_criteria_/.test(key)) return sentenceFragment(value, 3);
  if (/^ranked_option_status_/.test(key)) return extractPercent(value);
  if (/^input_status_/.test(key)) return normalizeMxt003Status(value);
  if (/^comparison_option_[ab]_tag_/.test(key)) return sentenceFragment(value, 2);
  if (/^final_recommendation_body$|^input_description_|^ranked_option_description_|^comparison_option_[ab]_text_|^rule_applied_|^warning_body_|^action_step_body_/.test(key)) return normalizeMxt002Sentence(value, 'Not provided');
  if (/^action_step_title_/.test(key)) return normalizeMxt002NumberedTitle(value);
  return value?.trim() || 'Not provided';
}

function normalizeMxt003ScenarioTitle(value: string | undefined): string {
  const text = stringifyValue(value).replace(/\s+/g, ' ').trim();
  if (/^(choose|select|decide|determine)\b/i.test(text)) return sentenceCase(text);
  return text ? `Choose the safest option for ${text.replace(/[.!?]+$/, '')}` : 'Choose the safest outreach channel for a high-value B2B lead';
}

function normalizeMxt003Option(value: string | undefined): string {
  const text = stringifyValue(value);
  if (/linkedin/i.test(text)) return 'LinkedIn Message';
  if (/cold email|email/i.test(text)) return 'Cold Email';
  if (/sms/i.test(text)) return 'SMS Follow-Up';
  return sentenceFragment(text || 'LinkedIn Message', 3);
}

function normalizeMxt003Confidence(value: string | undefined): string {
  const numeric = parseScoreLikeValue(stringifyValue(value));
  if (numeric === undefined) return '0.86';
  return numeric > 1 ? (numeric / 100).toFixed(2) : numeric.toFixed(2);
}

function normalizeMxt003Level(value: string | undefined): string {
  const text = stringifyValue(value).toLowerCase();
  if (/high|critical|severe/.test(text)) return 'High';
  if (/medium|moderate|watch|caution/.test(text)) return 'Medium';
  return 'Low';
}

function normalizeMxt003Status(value: string | undefined): string {
  const text = stringifyValue(value);
  if (/strict/i.test(text)) return 'Strict';
  if (/safe|low/i.test(text)) return 'Safe';
  if (/set|goal/i.test(text)) return 'Set';
  return sentenceFragment(text || 'Set', 2);
}

function normalizeMxt003Inputs(ucId: string, items: Array<{ name: string; description: string; status?: string }>): Array<{ name: string; description: string; status?: string }> {
  const fallback = [
    { name: 'Goal', description: 'Select the safest first-touch channel for a high-value lead.', status: 'Set' },
    { name: 'Hard Constraint', description: 'Do not use SMS unless opt-in is verified.', status: 'Strict' },
    { name: 'Risk Mode', description: 'Low-risk decisioning with brand-safety priority.', status: 'Safe' },
  ];
  const count = ucId.toUpperCase() === 'UC2' ? 2 : 3;
  return fallback.slice(0, count).map((item, index) => ({
    name: sentenceFragment(items[index]?.name || item.name, 3),
    description: normalizeMxt002Sentence(items[index]?.description || item.description, item.description),
    status: normalizeMxt003Status(items[index]?.status || item.status),
  }));
}

function normalizeMxt003RankedOptions(items: Array<{ name: string; description: string; status?: string }>, recommendedOption: string): Array<{ name: string; description: string; status?: string }> {
  const fallback = [
    { name: recommendedOption, description: 'Passed constraints with strongest trust context.', status: '86' },
    { name: 'Cold Email', description: 'Passed constraints but requires compliance controls.', status: '74' },
    { name: 'SMS Follow-Up', description: 'Fails opt-in constraint for this scenario.', status: '38' },
  ];
  return fallback.map((item, index) => ({
    name: normalizeMxt003Option(items[index]?.name || item.name),
    description: normalizeMxt002Sentence(items[index]?.description || item.description, item.description),
    status: extractPercent(items[index]?.status || item.status || '0'),
  }));
}

function normalizeMxt003ComparisonRows(rows: Array<{ criteria?: string; optionAText?: string; optionATag?: string; optionBText?: string; optionBTag?: string }>): Array<{ criteria?: string; optionAText?: string; optionATag?: string; optionBText?: string; optionBTag?: string }> {
  const fallback = [
    { criteria: 'Compliance Safety', optionAText: 'Lower risk because it avoids personal phone data and starts in a professional context.', optionATag: 'Best Fit', optionBText: 'Usable, but requires unsubscribe handling and careful sender reputation control.', optionBTag: 'Acceptable' },
    { criteria: 'Trust Context', optionAText: 'Profile, mutual context, and business role are visible before engagement.', optionATag: 'Strong', optionBText: 'Message may feel colder unless personalization is strong.', optionBTag: 'Medium' },
    { criteria: 'Response Potential', optionAText: 'Moderate response potential with low brand risk.', optionATag: 'Balanced', optionBText: 'Can scale, but lower trust and higher deliverability sensitivity.', optionBTag: 'Scalable' },
  ];
  return fallback.map((item, index) => ({
    criteria: sentenceFragment(rows[index]?.criteria || item.criteria, 3),
    optionAText: normalizeMxt002Sentence(rows[index]?.optionAText || item.optionAText, item.optionAText),
    optionATag: sentenceFragment(rows[index]?.optionATag || item.optionATag, 2),
    optionBText: normalizeMxt002Sentence(rows[index]?.optionBText || item.optionBText, item.optionBText),
    optionBTag: sentenceFragment(rows[index]?.optionBTag || item.optionBTag, 2),
  }));
}

function normalizeMxt003Rules(items: Array<{ title: string; description?: string }>): Array<{ title: string; description?: string }> {
  const fallback = [
    'Prioritized low-risk channels under low risk tolerance.',
    'Disqualified SMS because opt-in was not verified.',
    'Favored channels with visible professional context.',
    'Reduced brand-safety exposure before scaling outreach.',
  ];
  return fallback.map((text, index) => ({ title: `Rule ${index + 1}`, description: normalizeMxt002Sentence(items[index]?.description || items[index]?.title || text, text) }));
}

function normalizeMxt003Warnings(actions: Array<{ title: string; description?: string }>, recommendations: Array<{ title: string; description?: string }>): Array<{ title: string; description?: string }> {
  const source = [...actions, ...recommendations];
  const fallback = [
    'Do not use SMS until explicit opt-in is confirmed.',
    'Do not use scraped personal phone data for outreach.',
    'Cold email requires opt-out handling and sender reputation monitoring.',
  ];
  return fallback.map((text, index) => ({ title: `Warning ${index + 1}`, description: normalizeMxt002Sentence(source[index]?.description || text, text) }));
}

function normalizeMxt003Actions(actions: Array<{ title: string; description?: string }>): Array<{ title: string; description?: string }> {
  const fallback = [
    { title: 'Send a short LinkedIn message', description: 'Open with personalized business context and one clear reason for reaching out.' },
    { title: 'Use cold email only as a second channel', description: 'Use it after LinkedIn if a compliant email path is available.' },
    { title: 'Hold SMS until opt-in exists', description: 'Do not use SMS unless a verified consent signal is available.' },
  ];
  return fallback.map((item, index) => ({
    title: normalizeMxt002NumberedTitle(actions[index]?.title || item.title),
    description: normalizeMxt002Sentence(actions[index]?.description || item.description, item.description),
  }));
}

function normalizeMxt003FinalRecommendation(value: string | undefined, recommendedOption: string): string {
  const text = stringifyValue(value).replace(/\s+\d\s+.+$/g, '').trim();
  if (text && !/^not provided$/i.test(text)) return normalizeMxt002Sentence(text, text);
  return `Use ${recommendedOption} as the safest first outreach channel. Avoid SMS until opt-in is verified.`;
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
  const pattern = getMxt004ClientPattern(context, stats, results, patternMetrics, observedPatterns, opportunities);

  setMxt004Placeholder(placeholders, context, 'theme', context.theme);
  setMxt004Placeholder(placeholders, context, 'hero_icon', tool?.icon_emoji || pattern.heroIcon);
  setMxt004Placeholder(placeholders, context, 'hero_title', tool?.tool_name || pattern.heroTitle || commandSlug);
  setMxt004Placeholder(placeholders, context, 'snapshot_query', pattern.query);
  setMxt004Placeholder(placeholders, context, 'snapshot_source', pattern.source);
  setMxt004Placeholder(placeholders, context, 'snapshot_intent', pattern.intent);
  setMxt004Placeholder(placeholders, context, 'snapshot_export_limit', pattern.limit);
  setMxt004Placeholder(placeholders, context, 'snapshot_summary', pattern.summary);

  pattern.heroPills.forEach((value, index) => {
    setMxt004Placeholder(placeholders, context, `hero_pill_${index + 1}`, value);
  });

  for (let index = 0; index < 10; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const result = pattern.results[index] || {};
    setMxt004Placeholder(placeholders, context, `result_position_${padded}`, result.position || String(index + 1));
    setMxt004Placeholder(placeholders, context, `result_title_${padded}`, result.title || `Result ${index + 1}`);
    setMxt004Placeholder(placeholders, context, `result_domain_${padded}`, result.domain || 'Not provided');
    setMxt004Placeholder(placeholders, context, `result_snippet_${padded}`, result.snippet || 'Not provided');
    setMxt004Placeholder(placeholders, context, `result_intent_${padded}`, result.intent || 'Not provided');
    setMxt004Placeholder(placeholders, context, `result_type_${padded}`, result.type || 'Organic');
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const observedPattern = pattern.observedPatterns[index] || pattern.metrics[index];
    setMxt004Placeholder(placeholders, context, `observed_pattern_${padded}`, observedPattern?.description || observedPattern?.label || 'Not provided');
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const metric = pattern.metrics[index] || {
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
    const opportunity = pattern.opportunities[index];
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
  const value = isMissingPlaceholderValue(mappedValue)
    ? fallbackValue?.trim() || 'Not provided'
    : mappedValue;
  placeholders[key] = normalizeMxt004PlaceholderValue(key, value);
}

interface Mxt004SerpResult {
  position?: string;
  title?: string;
  domain?: string;
  snippet?: string;
  intent?: string;
  type?: string;
}

interface Mxt004ClientPattern {
  heroIcon: string;
  heroTitle: string;
  heroPills: string[];
  query: string;
  source: string;
  intent: string;
  limit: string;
  summary: string;
  results: Mxt004SerpResult[];
  observedPatterns: Array<{ label?: string; description?: string }>;
  metrics: Array<{ label: string; value: string; description?: string }>;
  opportunities: Array<{ title?: string; description?: string }>;
}

function getMxt004ClientPattern(
  context: RenderContext,
  stats: Array<{ label: string; value: string }>,
  results: Mxt004SerpResult[],
  metrics: Array<{ label: string; value: string; description?: string }>,
  observedPatterns: Array<{ label?: string; description?: string }>,
  opportunities: Array<{ title?: string; description?: string }>
): Mxt004ClientPattern {
  const { data, tool, commandSlug, ucId } = context;
  const raw = data as any;
  const topic = raw.topic || {};
  const sections = raw.sections || {};
  const query = normalizeMxt004Query(stringifyValue(topic.title?.value || topic.title) || findResultValue(data, /^(query|keyword|search_query)$/i) || data.summary_card.title || commandSlug);
  const source = normalizeMxt004ChipValue(stringifyValue(topic.country?.value || topic.country) || findResultValue(data, /^(country|source|market|location)$/i) || findStatValue(stats, /country|source|market|location/i) || 'United States');
  const intent = normalizeMxt004ChipValue(stringifyValue(topic.intent?.value || topic.intent) || findResultValue(data, /^(intent|search_intent)$/i) || findStatValue(stats, /intent/i) || 'Commercial Investigation');
  const limit = normalizeMxt004Limit(stringifyValue(topic.limit?.value || topic.limit) || findResultValue(data, /^(limit|export_limit|result_limit)$/i) || '100 Organic Results');
  const summary = normalizeMxt002Sentence(stringifyValue(sections.summary_card?.value) || data.summary_card.subtitle, getMxt004SummaryFallback(ucId));

  return {
    heroIcon: tool?.icon_emoji || 'MX',
    heroTitle: tool?.tool_name || stringifyValue(raw.hero?.title) || data.summary_card.title || commandSlug,
    heroPills: [
      'Data Extraction',
      getConfidenceLabel(data),
      getRiskLabel(data),
      tool?.id || commandSlug,
      `Mode: ${getModeLabel(ucId)}`,
      'AI Engine v1',
    ],
    query,
    source,
    intent,
    limit,
    summary,
    results: normalizeMxt004Results(results, ucId, query),
    observedPatterns: normalizeMxt004ObservedPatterns(observedPatterns),
    metrics: normalizeMxt004Metrics(metrics),
    opportunities: normalizeMxt004Opportunities(opportunities, ucId),
  };
}

function normalizeMxt004PlaceholderValue(key: string, value: string): string {
  if (key === 'snapshot_query') return normalizeMxt004Query(value);
  if (key === 'snapshot_source' || key === 'snapshot_intent') return normalizeMxt004ChipValue(value);
  if (key === 'snapshot_export_limit') return normalizeMxt004Limit(value);
  if (key === 'snapshot_summary' || /^result_snippet_|^observed_pattern_|^pattern_metric_description_|^optimization_opportunity_/.test(key)) return normalizeMxt002Sentence(stripMxt004NumberPrefix(value), 'Not provided');
  if (/^result_position_/.test(key)) return stringifyValue(value).match(/\d+/)?.[0] || '1';
  if (/^result_domain_/.test(key)) return normalizeMxt004Domain(value);
  if (/^result_intent_|^result_type_|^pattern_metric_label_/.test(key)) return sentenceFragment(value, 3);
  if (/^pattern_metric_value_/.test(key)) return normalizeMxt004MetricValue(value);
  if (/^result_title_/.test(key)) return stringifyValue(value).split(/[\r\n]/)[0].trim() || 'Not provided';
  return value?.trim() || 'Not provided';
}

function findStatValue(stats: Array<{ label: string; value: string }>, pattern: RegExp): string | undefined {
  return stats.find(stat => pattern.test(stat.label))?.value;
}

function normalizeMxt004Query(value: string | undefined): string {
  return stringifyValue(value).replace(/[.!?]+$/, '').replace(/^(query|keyword):\s*/i, '').trim() || 'best email marketing software';
}

function normalizeMxt004ChipValue(value: string | undefined): string {
  return stringifyValue(value).replace(/^[^A-Za-z0-9]+\s*/, '').replace(/[.!?]+$/, '').trim() || 'Not provided';
}

function normalizeMxt004Limit(value: string | undefined): string {
  const text = stringifyValue(value).replace(/[.!?]+$/, '').trim();
  const count = text.match(/\d+/)?.[0];
  if (/organic results/i.test(text)) return text;
  return count ? `${count} Organic Results` : '100 Organic Results';
}

function normalizeMxt004Domain(value: string | undefined): string {
  const text = stringifyValue(value).trim();
  if (!text) return 'Not provided';
  return text.replace(/^https?:\/\//i, '').replace(/^www\./i, '').split(/[/?#]/)[0].toLowerCase();
}

function normalizeMxt004MetricValue(value: string | undefined): string {
  const text = stringifyValue(value).trim();
  return text.match(/\d+(?:\.\d+)?%/)?.[0] || extractPercent(text);
}

function stripMxt004NumberPrefix(value: string | undefined): string {
  return stringifyValue(value).replace(/^\s*\d+\s+/, '').trim();
}

function getMxt004SummaryFallback(ucId: string): string {
  if (ucId.toUpperCase() === 'UC1') return 'The top SERP results show a comparison-heavy pattern led by review publishers and SaaS vendor pages.';
  if (ucId.toUpperCase() === 'UC2') return 'The SERP is dominated by comparison pages, SaaS vendor resources, and buyer-intent listicles. Most pages are optimized for evaluation instead of direct signup.';
  return 'The SERP is dominated by comparison and listicle-style content from software review publishers, ecommerce education brands, and platform-owned resources. Ranking pages emphasize feature comparison, pricing, use-case segmentation, and buyer decision support.';
}

function normalizeMxt004Results(results: Mxt004SerpResult[], ucId: string, query: string): Mxt004SerpResult[] {
  const rowCount = ucId.toUpperCase() === 'UC1' ? 3 : ucId.toUpperCase() === 'UC2' ? 6 : 10;
  const fallback = getMxt004FallbackRows(query);
  return Array.from({ length: rowCount }, (_, index) => {
    const result = results[index] || fallback[index];
    return {
      position: normalizeMxt004PlaceholderValue(`result_position_${index + 1}`, result.position || String(index + 1)),
      title: normalizeMxt004PlaceholderValue(`result_title_${index + 1}`, result.title || fallback[index].title || `Result ${index + 1}`),
      domain: normalizeMxt004Domain(result.domain || fallback[index].domain),
      snippet: normalizeMxt002Sentence(result.snippet || fallback[index].snippet, fallback[index].snippet || 'Not provided'),
      intent: sentenceFragment(result.intent || fallback[index].intent || 'Commercial', 3),
      type: sentenceFragment(result.type || fallback[index].type || 'Review Listicle', 3),
    };
  });
}

function getMxt004FallbackRows(query: string): Mxt004SerpResult[] {
  return [
    { position: '1', title: `Best ${capitalizeWords(query)} of 2026`, domain: 'forbes.com', snippet: 'Compare top platforms by pricing, automation, templates, analytics, and use cases.', intent: 'Commercial', type: 'Review Listicle' },
    { position: '2', title: `The Best ${capitalizeWords(query)} Compared`, domain: 'pcmag.com', snippet: 'Detailed comparison for small businesses, creators, ecommerce teams, and agencies.', intent: 'Commercial', type: 'Software Comparison' },
    { position: '3', title: `${capitalizeWords(query)} for Growing Businesses`, domain: 'mailchimp.com', snippet: 'Build campaigns, automate workflows, and grow audiences with focused marketing tools.', intent: 'Transactional', type: 'Vendor Page' },
    { position: '4', title: `Top ${capitalizeWords(query)} for Ecommerce`, domain: 'shopify.com', snippet: 'Explore tools for abandoned cart flows, segmentation, and automation.', intent: 'Commercial', type: 'Educational Comparison' },
    { position: '5', title: `Best Free ${capitalizeWords(query)}`, domain: 'hubspot.com', snippet: 'Review free and paid tools for CRM integration, automation, and reporting.', intent: 'Commercial', type: 'Vendor Resource' },
    { position: '6', title: `${capitalizeWords(query)}: 15 Platforms Compared`, domain: 'zapier.com', snippet: 'A workflow-focused comparison of platforms for automation and integrations.', intent: 'Commercial', type: 'Comparison Guide' },
    { position: '7', title: `Best ${capitalizeWords(query)} for Small Business`, domain: 'g2.com', snippet: 'User reviews and rankings for email marketing platforms.', intent: 'Commercial', type: 'Review Directory' },
    { position: '8', title: 'Email Marketing Services and Automation', domain: 'constantcontact.com', snippet: 'Create campaigns and automate customer communication.', intent: 'Transactional', type: 'Vendor Page' },
    { position: '9', title: 'Best Newsletter Platforms for Creators', domain: 'convertkit.com', snippet: 'Tools and examples for creators building email audiences.', intent: 'Commercial', type: 'Vendor Resource' },
    { position: '10', title: 'Email Marketing Automation Software', domain: 'activecampaign.com', snippet: 'Marketing automation, email campaigns, and CRM workflows.', intent: 'Transactional', type: 'Vendor Page' },
  ];
}

function normalizeMxt004ObservedPatterns(items: Array<{ label?: string; description?: string }>): Array<{ label?: string; description?: string }> {
  const fallback = [
    'Review publishers control many top positions.',
    'Vendor pages appear when they provide clear feature positioning.',
    'Comparison tables are common in high-ranking pages.',
  ];
  return fallback.map((text, index) => ({ label: `Pattern ${index + 1}`, description: normalizeMxt002Sentence(stripMxt004NumberPrefix(items[index]?.description || items[index]?.label || text), text) }));
}

function normalizeMxt004Metrics(items: Array<{ label: string; value: string; description?: string }>): Array<{ label: string; value: string; description?: string }> {
  const fallback = [
    { label: 'Commercial', value: '68%', description: 'Comparison and review pages' },
    { label: 'Informational', value: '22%', description: 'Guides and education' },
    { label: 'Transactional', value: '10%', description: 'Vendor landing pages' },
  ];
  return fallback.map((item, index) => {
    const source = items[index];
    const rawValue = source?.value || item.value;
    const value = normalizeMxt004MetricValue(rawValue);
    return {
      label: sentenceFragment(source?.label || item.label, 3),
      value,
      description: normalizeMxt004MetricDescription(source?.description || rawValue, value, item.description),
    };
  });
}

function normalizeMxt004MetricDescription(value: string | undefined, metricValue: string, fallback: string): string {
  const text = stripMxt004NumberPrefix(value).replace(metricValue, '').trim();
  return text || fallback;
}

function normalizeMxt004Opportunities(items: Array<{ title?: string; description?: string }>, ucId: string): Array<{ title?: string; description?: string }> {
  const fallback = ucId.toUpperCase() === 'UC2'
    ? ['Create a comparison landing page.', 'Add pricing and feature tables.', 'Cluster supporting content around automation and ecommerce use cases.']
    : ['Create a comparison-focused page targeting the main keyword.', 'Add pricing, automation, ecommerce, integrations, and free-plan sections.', 'Build supporting articles around automation, ecommerce email, and deliverability.', 'Use the export table to filter domains, intent, and content patterns.'];
  return fallback.map((text, index) => ({ title: `Recommendation ${index + 1}`, description: normalizeMxt002Sentence(stripMxt004NumberPrefix(items[index]?.description || items[index]?.title || text), text) }));
}

function getMxt004SerpResults(data: UCResult): Mxt004SerpResult[] {
  const sectionRows = (data as any).sections?.organic_serp_rows?.table?.rows;
  if (Array.isArray(sectionRows)) {
    return sectionRows.map((row: any, index: number) => {
      const cells = Array.isArray(row?.cells) ? row.cells : [];
      return {
        position: stringifyValue(cells[0] ?? row.position ?? row.rank) || String(index + 1),
        title: stringifyValue(cells[1] ?? row.title),
        domain: stringifyValue(cells[2] ?? row.domain),
        snippet: stringifyValue(cells[3] ?? row.snippet),
        intent: stringifyValue(cells[4] ?? row.intent),
        type: stringifyValue(cells[5] ?? row.type),
      };
    });
  }

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
  const distributionItems = (data as any).sections?.intent_distribution?.items;
  if (Array.isArray(distributionItems)) {
    return distributionItems.map((item: any, index: number) => ({
      label: stringifyValue(item.label || item.title || item.name) || `Metric ${index + 1}`,
      value: stringifyValue(item.value || item.score || item.count) || 'Not provided',
      description: stringifyValue(item.description || item.detail || item.value),
    }));
  }

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
  const sectionItems = (data as any).sections?.observed_patterns?.items;
  if (Array.isArray(sectionItems)) {
    return sectionItems.map((item: any, index: number) => ({
      label: stringifyValue(item.label || item.title || item.name) || `Pattern ${index + 1}`,
      description: stringifyValue(item.description || item.value || item.insight || item.impact),
    }));
  }

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
  const sectionItems = (data as any).sections?.recommendations?.items || (data as any).sections?.seo_direction?.items;
  if (Array.isArray(sectionItems)) {
    return sectionItems.map((item: any, index: number) => typeof item === 'string'
      ? { title: `Opportunity ${index + 1}`, description: item }
      : {
        title: stringifyValue(item.title || item.label || item.name) || `Opportunity ${index + 1}`,
        description: stringifyValue(item.description || item.value || item.action || item.impact),
      });
  }

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
  const pattern = getMxt005ClientPattern(context, stats, metrics, auditIssues, pressureMetrics, longTailKeywords, recommendations, actions);

  setMxt005Placeholder(placeholders, context, 'theme', context.theme);
  setMxt005Placeholder(placeholders, context, 'hero_icon', tool?.icon_emoji || pattern.heroIcon);
  setMxt005Placeholder(placeholders, context, 'hero_title', tool?.tool_name || pattern.heroTitle || commandSlug);
  setMxt005Placeholder(placeholders, context, 'audit_subject', pattern.subject);
  setMxt005Placeholder(placeholders, context, 'audit_context_country', pattern.country);
  setMxt005Placeholder(placeholders, context, 'audit_context_language', pattern.language);
  setMxt005Placeholder(placeholders, context, 'audit_context_intent', pattern.intent);
  setMxt005Placeholder(placeholders, context, 'final_recommendation_body', pattern.finalRecommendation);

  applyScorePlaceholders(placeholders, context);
  placeholders.score_value = pattern.scoreValue;
  placeholders.score_progress = pattern.scoreProgress;
  placeholders.score_label = pattern.scoreLabel;
  placeholders.score_status = pattern.scoreStatus;

  pattern.heroPills.forEach((value, index) => {
    setMxt005Placeholder(placeholders, context, `hero_pill_${index + 1}`, value);
  });

  for (let index = 0; index < 4; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const metric = pattern.dimensions[index] || {
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
    const issue = pattern.factorRows[index] || {};
    setMxt005Placeholder(placeholders, context, `audit_issue_name_${padded}`, issue.name || `Issue ${index + 1}`);
    setMxt005Placeholder(placeholders, context, `audit_issue_severity_${padded}`, normalizeDimensionStatus(issue.severity, issue.evidence, 'severity'));
    setMxt005Placeholder(placeholders, context, `audit_issue_evidence_${padded}`, issue.evidence || 'Not provided');
  }

  for (let index = 0; index < 5; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const metric = pattern.pressureMetrics[index] || metrics[index] || {
      label: `Pressure ${index + 1}`,
      value: '0',
    };
    setMxt005Placeholder(placeholders, context, `audit_pressure_label_${padded}`, metric.label);
    setMxt005Placeholder(placeholders, context, `audit_pressure_width_${padded}`, clampPercent(extractPercent(metric.value)));
    setMxt005Placeholder(placeholders, context, `audit_pressure_value_${padded}`, metric.value);
  }

  for (let index = 0; index < 4; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const action = pattern.actions[index] || actions[index] || recommendations[index] || auditIssues[index];
    setMxt005Placeholder(placeholders, context, `audit_action_${padded}`, action?.description || action?.title || stringifyValue((action as any)?.evidence) || 'Not provided');
  }

  for (let index = 0; index < 5; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    setMxt005Placeholder(placeholders, context, `long_tail_keyword_${padded}`, pattern.longTailKeywords[index] || 'Not provided');
  }
}

function setMxt005Placeholder(
  placeholders: Record<string, string>,
  context: RenderContext,
  key: string,
  fallbackValue: string | undefined
): void {
  const mappedValue = context.mappedPlaceholders?.[key];
  const value = isMissingPlaceholderValue(mappedValue)
    ? fallbackValue?.trim() || 'Not provided'
    : mappedValue;
  placeholders[key] = normalizeMxt005PlaceholderValue(key, value);
}

interface Mxt005ClientPattern {
  heroIcon: string;
  heroTitle: string;
  heroPills: string[];
  subject: string;
  country: string;
  language: string;
  intent: string;
  scoreValue: string;
  scoreProgress: string;
  scoreLabel: string;
  scoreStatus: string;
  dimensions: Array<{ label: string; value: string; status?: string }>;
  factorRows: Array<{ name?: string; severity?: string; evidence?: string; title?: string; description?: string }>;
  pressureMetrics: Array<{ label: string; value: string; status?: string }>;
  actions: Array<{ title: string; description?: string }>;
  longTailKeywords: string[];
  finalRecommendation: string;
}

function getMxt005ClientPattern(
  context: RenderContext,
  stats: Array<{ label: string; value: string }>,
  metrics: Array<{ label: string; value: string; status?: string }>,
  auditIssues: Array<{ name?: string; severity?: string; evidence?: string; title?: string; description?: string }>,
  pressureMetrics: Array<{ label: string; value: string; status?: string }>,
  longTailKeywords: string[],
  recommendations: Array<{ title: string; description?: string }>,
  actions: Array<{ title: string; description?: string }>
): Mxt005ClientPattern {
  const { data, tool, commandSlug, ucId } = context;
  const raw = data as any;
  const topic = raw.topic || {};
  const score = raw.score || {};
  const scoreValue = normalizeMxt005ScoreValue(stringifyValue(score.display_value || score.value) || getScore(data));
  const scoreStatus = normalizeMxt005Badge(stringifyValue(score.risk_level?.value || score.status || score.risk_level) || getMetricStatus(scoreValue));
  const subject = normalizeMxt005Subject(stringifyValue(topic.title?.value || topic.title) || findResultValue(data, /^(subject|keyword|query|audit_subject)$/i) || data.summary_card.title || commandSlug);
  const finalRecommendation = normalizeMxt002Sentence(
    stringifyValue(raw.sections?.final_decision?.value || raw.sections?.recommendation?.value)
      || recommendations[0]?.description
      || recommendations[0]?.title
      || stringifyValue(getDecision(data)?.reason)
      || data.summary_card.subtitle,
    getMxt005FinalFallback(ucId)
  );

  return {
    heroIcon: tool?.icon_emoji || 'MX',
    heroTitle: tool?.tool_name || stringifyValue(raw.hero?.title) || 'Keyword Difficulty Estimator',
    heroPills: [
      normalizeMxt005Pill(stringifyValue(raw.hero?.pills?.[0]?.value) || 'Informational Intent'),
      normalizeMxt005Pill(stringifyValue(raw.hero?.pills?.[1]?.value) || getConfidenceLabel(data)),
      normalizeMxt005Pill(stringifyValue(raw.hero?.pills?.[2]?.value) || 'Low Competition'),
      tool?.id || commandSlug,
      `Mode: ${getModeLabel(ucId)}`,
      'AI Engine v1',
    ],
    subject,
    country: normalizeMxt005Chip(stringifyValue(topic.country?.value || topic.country) || findResultValue(data, /^(country|market|location)$/i) || findStatValue(stats, /country|market|location/i) || 'US'),
    language: normalizeMxt005Chip(stringifyValue(topic.language?.value || topic.language) || findResultValue(data, /^(language|locale)$/i) || findStatValue(stats, /language|locale/i) || 'en'),
    intent: normalizeMxt005Chip(stringifyValue(topic.intent?.value || topic.intent) || findResultValue(data, /^(intent|search_intent)$/i) || findStatValue(stats, /intent/i) || 'Informational research'),
    scoreValue,
    scoreProgress: scoreValue,
    scoreLabel: sentenceFragment(stringifyValue(score.label) || 'Difficulty', 2),
    scoreStatus,
    dimensions: normalizeMxt005Dimensions(raw.decision?.items, metrics, ucId),
    factorRows: normalizeMxt005FactorRows(raw.sections?.factor_table?.table?.rows, auditIssues),
    pressureMetrics: normalizeMxt005PressureMetrics(raw.sections?.competitive_breakdown?.value, pressureMetrics),
    actions: normalizeMxt005Actions(raw.sections?.seo_action_plan?.items || raw.sections?.recommendation?.value, actions, recommendations, ucId),
    longTailKeywords: normalizeMxt005LongTailKeywords(raw.sections?.long_tail_cluster?.items, longTailKeywords, subject),
    finalRecommendation,
  };
}

function normalizeMxt005PlaceholderValue(key: string, value: string): string {
  if (key === 'audit_subject') return normalizeMxt005Subject(value);
  if (/^audit_context_/.test(key)) return normalizeMxt005Chip(value);
  if (/^dimension_name_|^audit_issue_name_|^audit_pressure_label_/.test(key)) return sentenceFragment(value, 4);
  if (/^dimension_value_/.test(key)) return normalizeMxt005ShortValue(value);
  if (/^dimension_status_|^audit_issue_severity_/.test(key)) return normalizeMxt005Badge(value);
  if (/^audit_issue_evidence_|^audit_action_|^final_recommendation_body$/.test(key)) return normalizeMxt002Sentence(stripMxt004NumberPrefix(value), 'Not provided');
  if (/^audit_pressure_width_/.test(key)) return clampPercent(normalizeMxt005ScoreValue(value));
  if (/^audit_pressure_value_/.test(key)) return normalizeMxt005ScoreValue(value);
  if (/^long_tail_keyword_/.test(key)) return stripMxt004NumberPrefix(value).replace(/[.!?]+$/, '').trim() || 'Not provided';
  return value?.trim() || 'Not provided';
}

function normalizeMxt005Subject(value: string | undefined): string {
  return stringifyValue(value).replace(/[.!?]+$/, '').replace(/^(keyword|query):\s*/i, '').trim() || 'best email marketing software';
}

function normalizeMxt005Chip(value: string | undefined): string {
  return stringifyValue(value).replace(/^[^A-Za-z0-9]+\s*/, '').replace(/[.!?]+$/, '').trim() || 'Not provided';
}

function normalizeMxt005Pill(value: string | undefined): string {
  return sentenceFragment(normalizeMxt005Chip(value), 3);
}

function normalizeMxt005ScoreValue(value: string | undefined): string {
  return extractPercent(stringifyValue(value) || '74');
}

function normalizeMxt005ShortValue(value: string | undefined): string {
  const text = stringifyValue(value).trim();
  if (/^\d+(?:\.\d+)?%?$/.test(text)) return extractPercent(text);
  return sentenceFragment(text || 'Not provided', 3);
}

function normalizeMxt005Badge(value: string | undefined): string {
  return sentenceFragment(stringifyValue(value) || 'High', 2);
}

function normalizeMxt005Dimensions(
  items: unknown,
  fallbackMetrics: Array<{ label: string; value: string; status?: string }>,
  ucId: string
): Array<{ label: string; value: string; status?: string }> {
  const source = Array.isArray(items) ? items as any[] : [];
  const fallback = ucId.toUpperCase() === 'UC1'
    ? [
      { label: 'Difficulty Score', value: '74', status: 'High' },
      { label: 'Ranking Effort', value: 'Hard', status: 'Plan' },
      { label: 'Best Use', value: 'Later', status: 'Pillar' },
    ]
    : ucId.toUpperCase() === 'UC2'
      ? [
        { label: 'SERP Authority', value: '85', status: 'Strong' },
        { label: 'Commercial Pressure', value: '90', status: 'High' },
        { label: 'Content Depth Needed', value: '78', status: 'Deep' },
        { label: 'Long-tail Opening', value: '48', status: 'Usable' },
      ]
      : [
        { label: 'Authority Gap', value: 'High', status: 'Hard' },
        { label: 'Intent Value', value: 'Strong', status: 'Valuable' },
        { label: 'Content Investment', value: 'Heavy', status: 'Deep' },
        { label: 'Entry Strategy', value: 'Cluster', status: 'Best' },
      ];
  return fallback.map((item, index) => {
    const sourceItem = source[index] || fallbackMetrics[index];
    return {
      label: sentenceFragment(stringifyValue(sourceItem?.label || sourceItem?.title || item.label), 4),
      value: normalizeMxt005ShortValue(stringifyValue(sourceItem?.value || item.value)),
      status: normalizeMxt005Badge(stringifyValue(sourceItem?.status || item.status)),
    };
  });
}

function normalizeMxt005FactorRows(
  rows: unknown,
  fallbackRows: Array<{ name?: string; severity?: string; evidence?: string; title?: string; description?: string }>
): Array<{ name?: string; severity?: string; evidence?: string; title?: string; description?: string }> {
  const source = Array.isArray(rows) ? rows as any[] : [];
  const fallback = [
    { name: 'SERP Authority', severity: '85', evidence: 'Top pages likely come from trusted SaaS brands, comparison blogs, and review sites.' },
    { name: 'Content Requirement', severity: '78', evidence: 'The page needs comparisons, pricing, pros, cons, and alternatives.' },
    { name: 'Entry Opportunity', severity: '48', evidence: 'Long-tail variations offer better early ranking opportunities.' },
  ];
  return fallback.map((item, index) => {
    const row = source[index];
    const cells = Array.isArray(row?.cells) ? row.cells : [];
    const fallbackRow = fallbackRows[index];
    return {
      name: sentenceFragment(stringifyValue(cells[0] || row?.name || row?.factor || fallbackRow?.name || item.name), 4),
      severity: normalizeMxt005ScoreValue(stringifyValue(cells[1] || row?.score || row?.severity || fallbackRow?.severity || item.severity)),
      evidence: normalizeMxt002Sentence(stringifyValue(cells[2] || row?.finding || row?.evidence || fallbackRow?.evidence || item.evidence), item.evidence),
    };
  });
}

function normalizeMxt005PressureMetrics(value: unknown, fallbackMetrics: Array<{ label: string; value: string; status?: string }>): Array<{ label: string; value: string; status?: string }> {
  const text = stringifyValue(value);
  const parsed = Array.from(text.matchAll(/([^\d]+?)\s+(\d{1,3})(?=\s+[^\d]+\s+\d{1,3}|$)/g)).map(match => ({
    label: sentenceFragment(match[1].trim(), 4),
    value: normalizeMxt005ScoreValue(match[2]),
  }));
  const fallback = [
    { label: 'Review sites competing', value: '88' },
    { label: 'SaaS brand presence', value: '84' },
    { label: 'Affiliate content density', value: '79' },
    { label: 'Comparison-page saturation', value: '76' },
    { label: 'Long-tail opening', value: '52' },
  ];
  return fallback.map((item, index) => {
    const source = parsed[index] || fallbackMetrics[index] || item;
    return {
      label: sentenceFragment(source.label || item.label, 4),
      value: normalizeMxt005ScoreValue(source.value || item.value),
      status: 'status' in source ? stringifyValue(source.status) : undefined,
    };
  });
}

function normalizeMxt005Actions(
  items: unknown,
  actions: Array<{ title: string; description?: string }>,
  recommendations: Array<{ title: string; description?: string }>,
  ucId: string
): Array<{ title: string; description?: string }> {
  const sourceItems = Array.isArray(items) ? items as any[] : splitSentences(stringifyValue(items)).map(value => ({ value }));
  const fallback = ucId.toUpperCase() === 'UC2'
    ? ['Create long-tail support pages before the main pillar page.', 'Build one comparison-style pillar after the support cluster is live.', 'Use internal links from support pages to strengthen the main target.']
    : ['Publish 5-8 support articles before targeting the main keyword.', 'Create a comparison pillar with pricing, features, pros, cons, and alternatives.', 'Add original data or expert commentary to avoid generic affiliate-style content.', 'Build internal links from all support pages to the pillar page.'];
  return fallback.map((text, index) => {
    const source = sourceItems[index] || actions[index] || recommendations[index];
    return { title: `Action ${index + 1}`, description: normalizeMxt002Sentence(stripMxt004NumberPrefix(stringifyValue(source?.value || source?.description || source?.title) || text), text) };
  });
}

function normalizeMxt005LongTailKeywords(items: unknown, fallbackKeywords: string[], subject: string): string[] {
  const sourceItems = Array.isArray(items) ? items as any[] : [];
  const fallback = [
    `${subject} for small business`,
    `affordable ${subject}`,
    `${subject} for ecommerce`,
    'email marketing software for beginners',
    'Mailchimp alternatives for small business',
  ];
  return fallback.map((text, index) => stripMxt004NumberPrefix(stringifyValue(sourceItems[index]?.value || sourceItems[index]?.keyword || sourceItems[index] || fallbackKeywords[index] || text)).replace(/[.!?]+$/, '').trim());
}

function getMxt005FinalFallback(ucId: string): string {
  if (ucId.toUpperCase() === 'UC1') return 'Use this keyword as a future pillar target. Start with easier long-tail keywords first, then return to this broader keyword after building topical authority.';
  if (ucId.toUpperCase() === 'UC2') return 'Create long-tail support pages before the main pillar page. Build one comparison-style pillar after the support cluster is live. Use internal links from support pages to strengthen the main target.';
  return 'This keyword is valuable but should not be the first target. Treat it as a future pillar keyword and win supporting long-tail searches first to build topical authority.';
}

function splitSentences(value: string): string[] {
  return value.match(/[^.!?]+[.!?]+/g)?.map(item => item.trim()).filter(Boolean) || [];
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
  const pattern = getMxt006ClientPattern(context, stats, attributes, details, leadSignals, outreachContexts);

  setMxt006Placeholder(placeholders, context, 'theme', context.theme);
  setMxt006Placeholder(placeholders, context, 'hero_icon', tool?.icon_emoji || pattern.heroIcon);
  setMxt006Placeholder(placeholders, context, 'hero_title', tool?.tool_name || pattern.heroTitle || commandSlug);
  setMxt006Placeholder(placeholders, context, 'profile_scan_title', pattern.scanTitle);
  setMxt006Placeholder(placeholders, context, 'profile_context_01', pattern.platform);
  setMxt006Placeholder(placeholders, context, 'profile_context_02', pattern.niche);
  setMxt006Placeholder(placeholders, context, 'profile_context_03', pattern.profileType);
  setMxt006Placeholder(placeholders, context, 'profile_name', pattern.profileName);
  setMxt006Placeholder(placeholders, context, 'profile_metadata', pattern.metadata);
  setMxt006Placeholder(placeholders, context, 'profile_scan_summary', pattern.summary);
  setMxt006Placeholder(placeholders, context, 'profile_score', pattern.score);
  setMxt006Placeholder(placeholders, context, 'profile_rating_visual', pattern.ratingVisual);
  placeholders.profile_rating_visual = formatMxt006RatingVisual(placeholders.profile_rating_visual, pattern.score);
  setMxt006Placeholder(placeholders, context, 'profile_score_label', pattern.scoreLabel);
  setMxt006Placeholder(placeholders, context, 'profile_image_url', pattern.imageUrl);
  setMxt006Placeholder(placeholders, context, 'initials', pattern.initials);

  pattern.heroPills.forEach((value, index) => {
    setMxt006Placeholder(placeholders, context, `hero_pill_${index + 1}`, value);
  });

  for (let index = 0; index < 4; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const attribute = pattern.attributes[index] || {
      label: `Attribute ${index + 1}`,
      value: 'Not provided',
    };
    setMxt006Placeholder(placeholders, context, `attribute_label_${padded}`, attribute.label);
    setMxt006Placeholder(placeholders, context, `attribute_value_${padded}`, attribute.value);
  }

  for (let index = 0; index < 6; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const detail = pattern.details[index] || {
      title: `Detail ${index + 1}`,
      description: 'Not provided',
    };
    setMxt006Placeholder(placeholders, context, `profile_detail_title_${padded}`, detail.title);
    setMxt006Placeholder(placeholders, context, `profile_detail_body_${padded}`, detail.description || detail.title);
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    setMxt006Placeholder(placeholders, context, `lead_signal_${padded}`, pattern.leadSignals[index]?.description || pattern.leadSignals[index]?.title || 'Not provided');
  }

  for (let index = 0; index < 4; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    setMxt006Placeholder(placeholders, context, `outreach_context_${padded}`, pattern.outreachContexts[index]?.description || pattern.outreachContexts[index]?.title || 'Not provided');
  }
}

function setMxt006Placeholder(
  placeholders: Record<string, string>,
  context: RenderContext,
  key: string,
  fallbackValue: string | undefined
): void {
  const mappedValue = context.mappedPlaceholders?.[key];
  const value: string = isMissingPlaceholderValue(mappedValue)
    ? fallbackValue?.trim() || 'Not provided'
    : mappedValue ?? 'Not provided';
  placeholders[key] = normalizeMxt006PlaceholderValue(key, value);
}

interface Mxt006ClientPattern {
  heroIcon: string;
  heroTitle: string;
  heroPills: string[];
  scanTitle: string;
  platform: string;
  niche: string;
  profileType: string;
  profileName: string;
  metadata: string;
  summary: string;
  score: string;
  ratingVisual: string;
  scoreLabel: string;
  imageUrl: string;
  initials: string;
  attributes: Array<{ label: string; value: string }>;
  details: Array<{ title: string; description?: string }>;
  leadSignals: Array<{ title: string; description?: string }>;
  outreachContexts: Array<{ title: string; description?: string }>;
}

function getMxt006ClientPattern(
  context: RenderContext,
  stats: Array<{ label: string; value: string }>,
  attributes: Array<{ label: string; value: string }>,
  details: Array<{ title: string; description?: string }>,
  leadSignals: Array<{ title: string; description?: string }>,
  outreachContexts: Array<{ title: string; description?: string }>
): Mxt006ClientPattern {
  const { data, tool, commandSlug, ucId } = context;
  const raw = data as any;
  const topic = raw.topic || {};
  const gymsharkSection = raw.sections?.gymshark || {};
  const hero = raw.hero || {};
  const profileSummary = parseMxt006ProfileSummary(gymsharkSection.items?.[0]?.value, ucId);
  const profileName = normalizeMxt006Name(stringifyValue(gymsharkSection.title) || profileSummary.name || findResultValue(data, /^(profile_name|name|person|company|brand)$/i) || 'Gymshark');
  const scanTitle = normalizeMxt006Handle(stringifyValue(topic.title?.value || topic.title) || profileSummary.handle || data.summary_card.title || commandSlug);
  const platform = normalizeMxt006Short(stringifyValue(topic.platform?.value || topic.platform) || findResultValue(data, /^(platform|network|channel)$/i) || findStatValue(stats, /platform|network|channel/i) || 'TikTok', 3);
  const niche = normalizeMxt006Short(stringifyValue(topic.niche?.value || topic.niche) || findResultValue(data, /^(niche|category|industry)$/i) || findStatValue(stats, /niche|category|industry/i) || 'Fitness Apparel', 4);
  const profileType = normalizeMxt006Short(stringifyValue(topic.type?.value || topic.type) || findResultValue(data, /^(profile_type|type|segment)$/i) || findStatValue(stats, /profile type|type|segment/i) || 'Brand Creator', 4);
  const score = normalizeMxt005ScoreValue(profileSummary.score || stringifyValue(raw.score?.value) || getScore(data) || getMxt006DefaultScore(ucId));

  return {
    heroIcon: tool?.icon_emoji || stringifyValue(hero.icon) || 'MX',
    heroTitle: tool?.tool_name || stringifyValue(hero.title) || 'TikTok Profile Scanner',
    heroPills: [
      normalizeMxt006Short(stringifyValue(hero.pills?.[0]?.value) || 'Creative Profile', 3),
      normalizeMxt006Short(stringifyValue(hero.pills?.[1]?.value) || getConfidenceLabel(data), 3),
      normalizeMxt006Short(stringifyValue(hero.pills?.[2]?.value) || getRiskLabel(data), 3),
      tool?.id || commandSlug,
      `Mode: ${getModeLabel(ucId)}`,
      'AI Engine v1',
    ],
    scanTitle,
    platform,
    niche,
    profileType,
    profileName,
    metadata: profileSummary.metadata || `${scanTitle} · Fitness / Apparel / Lifestyle`,
    summary: normalizeMxt002Sentence(profileSummary.summary || data.summary_card.subtitle, 'Creator-led brand profile with workout, motivation, and community content.'),
    score,
    ratingVisual: getRatingVisual(score),
    scoreLabel: 'Profile Strength',
    imageUrl: findResultValue(data, /^(profile_image_url|image_url|avatar_url|photo_url)$/i) || 'Not provided',
    initials: stringifyValue(hero.icon) || tool?.icon_emoji || getInitials(profileName),
    attributes: normalizeMxt006Attributes(gymsharkSection.items, attributes, ucId),
    details: normalizeMxt006Details(getMxt006DetailSection(raw.sections, ucId)?.items, details, ucId),
    leadSignals: normalizeMxt006List(raw.sections?.insights?.items, leadSignals, getMxt006InsightFallbacks()),
    outreachContexts: normalizeMxt006List(raw.sections?.recommendations?.items, outreachContexts, getMxt006RecommendationFallbacks()),
  };
}

function normalizeMxt006PlaceholderValue(key: string, value: string): string {
  if (/^profile_scan_title$/.test(key)) return normalizeMxt006Handle(value);
  if (/^profile_context_|^profile_name$|^attribute_label_|^attribute_value_|^profile_detail_title_/.test(key)) return normalizeMxt006Short(value, 5);
  if (/^profile_metadata$/.test(key)) return stringifyValue(value).replace(/\s+/g, ' ').trim() || 'Not provided';
  if (/^profile_score$/.test(key)) return normalizeMxt005ScoreValue(value);
  if (/^profile_rating_visual$/.test(key)) return value.includes('★') ? value.trim() : getRatingVisual(value);
  if (/^profile_score_label$/.test(key)) return normalizeMxt006Short(value || 'Profile Strength', 3);
  if (/^profile_scan_summary$|^profile_detail_body_|^lead_signal_|^outreach_context_/.test(key)) return normalizeMxt002Sentence(stripMxt004NumberPrefix(value), 'Not provided');
  return value?.trim() || 'Not provided';
}

function parseMxt006ProfileSummary(value: unknown, ucId: string): { name?: string; handle?: string; metadata?: string; summary?: string; score?: string } {
  const text = stringifyValue(value).replace(/^[^A-Za-z0-9@]+\s*/, '').replace(/\s+/g, ' ').trim();
  const score = text.match(/\b(\d{1,3})\s+★/)?.[1] || getMxt006DefaultScore(ucId);
  const beforeScore = text.replace(/\s+\d{1,3}\s+★+\s+Profile Strength.*$/i, '').trim();
  const handleMatch = beforeScore.match(/(^|\s)(@[\w.-]+)/);
  const handle = handleMatch?.[2];
  const name = beforeScore.slice(0, handleMatch?.index).trim() || undefined;
  const afterHandle = handle ? beforeScore.slice(beforeScore.indexOf(handle) + handle.length).replace(/^\s*[·-]\s*/, '').trim() : beforeScore;
  const summaryStart = afterHandle.search(/\b(Creator-led|The profile|Short-form|High-energy|Brand-led|Content|Workout)\b/i);
  const metadata = summaryStart > 0 ? `${handle} · ${afterHandle.slice(0, summaryStart).trim().replace(/[.]+$/, '')}` : undefined;
  const summary = summaryStart >= 0 ? afterHandle.slice(summaryStart).trim() : undefined;
  return { name, handle, metadata, summary, score };
}

function normalizeMxt006Name(value: string | undefined): string {
  return normalizeMxt006Short(value || 'Gymshark', 3).replace(/^@/, '');
}

function normalizeMxt006Handle(value: string | undefined): string {
  const text = stringifyValue(value).trim();
  if (!text) return '@gymshark';
  if (text.startsWith('@')) return text.split(/\s+/)[0];
  return text.includes('gymshark') ? '@gymshark' : text.replace(/[.!?]+$/, '');
}

function normalizeMxt006Short(value: string | undefined, maxWords: number): string {
  return sentenceFragment(stringifyValue(value).replace(/^[^A-Za-z0-9@]+\s*/, '').replace(/[.!?]+$/, '') || 'Not provided', maxWords);
}

function getMxt006DefaultScore(ucId: string): string {
  if (ucId.toUpperCase() === 'UC1') return '84';
  if (ucId.toUpperCase() === 'UC2') return '88';
  return '91';
}

function normalizeMxt006Attributes(items: unknown, fallbackAttributes: Array<{ label: string; value: string }>, ucId: string): Array<{ label: string; value: string }> {
  const source = Array.isArray(items) ? (items as any[]).filter(item => item?.label || item?.title || item?.name) : [];
  const fallback = ucId.toUpperCase() === 'UC1'
    ? [
      { label: 'Niche Focus', value: 'Fitness motivation' },
      { label: 'Posting Frequency', value: 'High' },
      { label: 'Content Style', value: 'Workout clips' },
      { label: 'Audience Fit', value: 'Gym beginners' },
    ]
    : ucId.toUpperCase() === 'UC2'
      ? [
        { label: 'Niche Clarity', value: 'Very clear' },
        { label: 'Posting Frequency', value: 'High' },
        { label: 'Content Style', value: 'Creator-led clips' },
        { label: 'Engagement Direction', value: 'Community-driven' },
      ]
      : [
        { label: 'Profile Strength', value: 'Strong' },
        { label: 'Niche Clarity', value: 'Very clear' },
        { label: 'Content Consistency', value: 'Strong' },
        { label: 'Growth Signal', value: 'High' },
      ];
  return fallback.map((item, index) => {
    const sourceItem = source[index] || fallbackAttributes[index];
    return {
      label: normalizeMxt006Short(stringifyValue(sourceItem?.label || sourceItem?.title || sourceItem?.name || item.label), 4),
      value: normalizeMxt006Short(stringifyValue(sourceItem?.value || sourceItem?.description || item.value), 5),
    };
  });
}

function getMxt006DetailSection(sections: any, ucId: string): any {
  if (ucId.toUpperCase() === 'UC1') return sections?.quick_profile_summary;
  if (ucId.toUpperCase() === 'UC2') return sections?.profile_signals;
  return sections?.executive_profile_summary;
}

function normalizeMxt006Details(items: unknown, fallbackDetails: Array<{ title: string; description?: string }>, ucId: string): Array<{ title: string; description?: string }> {
  const source = Array.isArray(items) ? items as any[] : [];
  const fallback = ucId.toUpperCase() === 'UC1'
    ? [
      { title: 'Core Positioning', description: 'The profile is focused on fitness culture, motivational workout clips, and community-driven apparel content.' },
      { title: 'Best Use', description: 'Use this scan as a fast overview before deeper creator or competitor analysis.' },
    ]
    : ucId.toUpperCase() === 'UC2'
      ? [
        { title: 'Content Pattern', description: 'Short-form workouts, motivational edits, athlete-style videos, and product-aware lifestyle clips appear as the main format mix.' },
        { title: 'Audience Direction', description: 'The account speaks to fitness enthusiasts, gym beginners, athletes, and creator-led workout communities.' },
        { title: 'Profile Strength', description: 'Strong brand recognition and consistent content themes.' },
        { title: 'Monetization Fit', description: 'High fit for product drops, creator collabs, and apparel-led campaigns.' },
        { title: 'Growth Signal', description: 'High posting velocity and clear niche identity support reach.' },
      ]
      : [
        { title: 'Brand Position', description: 'The profile is strongly positioned around fitness culture, lifestyle motivation, and product-aware creator content.' },
        { title: 'Content Engine', description: 'High-energy short-form video, creator partnerships, gym clips, and motivational posts maintain visibility and audience relevance.' },
        { title: 'Decision Context', description: 'This profile is useful as a benchmark for brand-led TikTok growth, social proof, and creator-assisted content strategy.' },
        { title: 'Posting Frequency', description: 'High. The content system supports frequent publishing without losing niche consistency.' },
        { title: 'Content Style', description: 'Workout clips, motivational edits, influencer collaborations, product lifestyle, and gym culture moments.' },
        { title: 'Audience Fit', description: 'Fitness enthusiasts, athletes, gym beginners, and lifestyle-driven apparel buyers.' },
      ];
  return fallback.map((item, index) => {
    const sourceItem = source[index] || fallbackDetails[index];
    const parsed = parseMxt006LabeledValue(stringifyValue(sourceItem?.value || sourceItem?.description || sourceItem?.title));
    return {
      title: normalizeMxt006Short(stringifyValue(sourceItem?.title || sourceItem?.label || parsed.title || item.title), 4),
      description: normalizeMxt002Sentence(parsed.body || stringifyValue(sourceItem?.description) || item.description, item.description || 'Not provided'),
    };
  });
}

function normalizeMxt006List(items: unknown, fallbackItems: Array<{ title: string; description?: string }>, fallbackValues: string[]): Array<{ title: string; description?: string }> {
  const source = Array.isArray(items) ? items as any[] : [];
  return fallbackValues.map((text, index) => {
    const sourceItem = source[index] || fallbackItems[index];
    return {
      title: `Item ${index + 1}`,
      description: normalizeMxt002Sentence(stripMxt004NumberPrefix(stringifyValue(sourceItem?.value || sourceItem?.description || sourceItem?.title) || text), text),
    };
  });
}

function parseMxt006LabeledValue(value: string): { title?: string; body?: string } {
  const text = stripMxt004NumberPrefix(value).trim();
  const labels = [
    'Core Positioning', 'Best Use', 'Content Pattern', 'Audience Direction', 'Profile Strength', 'Monetization Fit', 'Growth Signal',
    'Brand Position', 'Content Engine', 'Decision Context', 'Posting Frequency', 'Content Style', 'Audience Fit',
  ];
  const label = labels.find(item => text.toLowerCase().startsWith(item.toLowerCase()));
  if (!label) return { body: text };
  return { title: label, body: text.slice(label.length).trim() };
}

function getMxt006InsightFallbacks(): string[] {
  return [
    'The profile has very clear niche focus and strong brand consistency.',
    'Creator-driven content improves authenticity and social proof.',
    'Fast hooks and short clips are aligned with TikTok consumption behavior.',
  ];
}

function getMxt006RecommendationFallbacks(): string[] {
  return [
    'Create recurring TikTok series around beginner workouts and gym confidence.',
    'Use creator-led hooks in the first two seconds.',
    'Segment content into motivation, education, product lifestyle, and community stories.',
    'Track saves, comments, profile visits, and creator-assisted conversions.',
  ];
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
  const pattern = getMxt007ClientPattern(context, stats, rankedOptions, highlights, recommendations, actions, decision);

  setMxt007Placeholder(placeholders, context, 'theme', context.theme);
  setMxt007Placeholder(placeholders, context, 'hero_icon', tool?.icon_emoji || pattern.heroIcon);
  setMxt007Placeholder(placeholders, context, 'hero_title', tool?.tool_name || pattern.heroTitle || commandSlug);
  setMxt007Placeholder(placeholders, context, 'ranked_result_title', pattern.resultTitle);
  setMxt007Placeholder(placeholders, context, 'ranked_context_keyword', pattern.keyword);
  setMxt007Placeholder(placeholders, context, 'ranked_context_audience', pattern.audience);
  setMxt007Placeholder(placeholders, context, 'ranked_context_level', pattern.level);
  setMxt007Placeholder(placeholders, context, 'ranked_context_best_angle', pattern.bestAngle);
  setMxt007Placeholder(placeholders, context, 'ranked_context_use', pattern.recommendedUse);
  setMxt007Placeholder(placeholders, context, 'ranked_decision_body', pattern.decisionBody);
  setMxt007Placeholder(placeholders, context, 'ranked_action_body', pattern.actionBody);
  setMxt007Placeholder(placeholders, context, 'ranked_recommendation_body', pattern.recommendationBody);

  pattern.heroPills.forEach((value, index) => {
    setMxt007Placeholder(placeholders, context, `hero_pill_${index + 1}`, value);
  });

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const highlight = pattern.highlights[index] || {
      label: `Highlight ${index + 1}`,
      body: 'Not provided',
    };
    setMxt007Placeholder(placeholders, context, `highlight_label_${padded}`, highlight.label);
    setMxt007Placeholder(placeholders, context, `highlight_body_${padded}`, highlight.body);
  }

  for (let index = 0; index < 10; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const option = pattern.rankedOptions[index] || {
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
  const value: string = isMissingPlaceholderValue(mappedValue)
    ? fallbackValue?.trim() || 'Not provided'
    : mappedValue ?? 'Not provided';
  placeholders[key] = normalizeMxt007PlaceholderValue(key, value);
}

function formatMxt007RankedOptionLabel(value: string | undefined, reason?: string, title?: string): string {
  if (isMissingPlaceholderValue(value)) return 'Not provided';
  const normalizedValue = value?.trim() || 'Not provided';
  if (isScoreLikeLabel(normalizedValue)) return sentenceFragment(reason || title || normalizedValue, 3);
  return normalizeMxt007Short(normalizedValue, 4);
}

interface Mxt007ClientPattern {
  heroIcon: string;
  heroTitle: string;
  heroPills: string[];
  resultTitle: string;
  keyword: string;
  audience: string;
  level: string;
  bestAngle: string;
  recommendedUse: string;
  decisionBody: string;
  actionBody: string;
  recommendationBody: string;
  highlights: Array<{ label: string; body: string }>;
  rankedOptions: Array<{ title: string; label: string; reason: string }>;
}

function getMxt007ClientPattern(
  context: RenderContext,
  stats: Array<{ label: string; value: string }>,
  fallbackRankedOptions: Array<{ title: string; label: string; reason: string }>,
  fallbackHighlights: Array<{ label: string; body: string }>,
  fallbackRecommendations: Array<{ title: string; description?: string }>,
  fallbackActions: Array<{ title: string; description?: string }>,
  fallbackDecision: ReturnType<typeof getDecision>
): Mxt007ClientPattern {
  const { data, tool, commandSlug, ucId } = context;
  const raw = data as any;
  const hero = raw.hero || {};
  const topic = raw.topic || {};
  const sections = raw.sections || {};
  const options = normalizeMxt007RankedOptions(sections.top_ranked_options?.items, fallbackRankedOptions, ucId);
  const recommendationBody = stringifyValue(sections.quick_recommendation?.value || sections.recommendation?.value || sections.advanced_recommendation?.value)
    || fallbackRecommendations[0]?.description
    || fallbackRecommendations[0]?.title
    || fallbackDecision?.reason
    || options[0]?.reason
    || data.summary_card.subtitle
    || getMxt007DefaultRecommendation(ucId);

  return {
    heroIcon: stringifyValue(hero.icon) || tool?.icon_emoji || 'MX',
    heroTitle: stringifyValue(hero.title) || tool?.tool_name || 'Headline Swipe Generator',
    heroPills: [
      normalizeMxt007Short(stringifyValue(hero.pills?.[0]?.value) || 'Swipe Generator', 3),
      normalizeMxt007Short(stringifyValue(hero.pills?.[1]?.value) || getConfidenceLabel(data), 3),
      normalizeMxt007Short(stringifyValue(hero.pills?.[2]?.value) || getRiskLabel(data), 3),
      tool?.id || commandSlug,
      getModeLabel(ucId),
      'AI Engine V1',
    ],
    resultTitle: normalizeMxt007Title(stringifyValue(topic.title) || data.summary_card.title || 'AI email automation course launch'),
    keyword: normalizeMxt007Short(stringifyValue(topic.keyword?.value || topic.keyword) || findResultValue(data, /^(keyword|query|topic|subject)$/i) || findStatValue(stats, /keyword|query|topic|subject/i) || commandSlug, 6),
    audience: normalizeMxt007Short(stringifyValue(topic.audience?.value || topic.audience) || findResultValue(data, /^(audience|target_audience)$/i) || findStatValue(stats, /audience|target/i) || 'Solo founders and small marketing teams', 8),
    level: normalizeMxt007Short(stringifyValue(topic.level?.value || topic.level) || findResultValue(data, /^(level|difficulty|tier|stage)$/i) || findStatValue(stats, /level|difficulty|tier|stage/i) || getMxt007DefaultLevel(ucId), 4),
    bestAngle: normalizeMxt007Short(stringifyValue(topic.best_angle?.value || topic.best_angle) || 'Save time + better follow-up', 6),
    recommendedUse: normalizeMxt007Short(stringifyValue(topic.recommended_use?.value || topic.recommended_use) || getMxt007DefaultUse(ucId), 8),
    decisionBody: normalizeMxt002Sentence(stringifyValue(sections.decision?.value) || fallbackDecision?.reason || getMxt007DefaultDecision(ucId), getMxt007DefaultDecision(ucId)),
    actionBody: normalizeMxt002Sentence(stringifyValue(sections.action?.value) || fallbackActions[0]?.description || fallbackActions[0]?.title || getMxt007DefaultAction(ucId), getMxt007DefaultAction(ucId)),
    recommendationBody: normalizeMxt002Sentence(recommendationBody, getMxt007DefaultRecommendation(ucId)),
    highlights: normalizeMxt007Highlights(sections.highlight_angles?.items, fallbackHighlights),
    rankedOptions: options,
  };
}

function normalizeMxt007PlaceholderValue(key: string, value: string): string {
  if (/^ranked_option_label_|^highlight_label_|^hero_pill_|^ranked_context_/.test(key)) return normalizeMxt007Short(value, 8);
  if (/^ranked_result_title$|^ranked_option_title_/.test(key)) return normalizeMxt007Title(value);
  if (/^ranked_option_reason_|^ranked_decision_body$|^ranked_action_body$|^ranked_recommendation_body$/.test(key)) return normalizeMxt002Sentence(value, 'Not provided');
  if (/^highlight_body_/.test(key)) return normalizeMxt007Short(value, 6);
  return value?.trim() || 'Not provided';
}

function normalizeMxt007RankedOptions(
  items: unknown,
  fallbackRankedOptions: Array<{ title: string; label: string; reason: string }>,
  ucId: string
): Array<{ title: string; label: string; reason: string }> {
  const source = Array.isArray(items) ? items as any[] : [];
  const fallback = getMxt007DefaultOptions(ucId);
  return fallback.map((item, index) => {
    const sourceItem = source[index] || fallbackRankedOptions[index];
    return {
      title: normalizeMxt007Title(stringifyValue(sourceItem?.title || sourceItem?.name || sourceItem?.option) || item.title),
      label: normalizeMxt007Short(stringifyValue(sourceItem?.label || sourceItem?.status || sourceItem?.category) || item.label, 4),
      reason: normalizeMxt002Sentence(stringifyValue(sourceItem?.reason || sourceItem?.description || sourceItem?.rationale) || item.reason, item.reason),
    };
  });
}

function normalizeMxt007Highlights(items: unknown, fallbackHighlights: Array<{ label: string; body: string }>): Array<{ label: string; body: string }> {
  const source = Array.isArray(items) ? items as any[] : [];
  const fallback = [
    { label: 'Hero angle', body: 'Save time + better follow-up' },
    { label: 'Email angle', body: 'Recover missed leads' },
    { label: 'Ad angle', body: 'No enterprise complexity' },
  ];
  return fallback.map((item, index) => {
    const sourceItem = source[index] || fallbackHighlights[index];
    return {
      label: normalizeMxt007Short(stringifyValue(sourceItem?.label || sourceItem?.title) || item.label, 4),
      body: normalizeMxt007Short(stringifyValue(sourceItem?.value || sourceItem?.body || sourceItem?.description) || item.body, 6),
    };
  });
}

function normalizeMxt007Short(value: string | undefined, maxWords: number): string {
  return sentenceFragment(stringifyValue(value).replace(/^[^A-Za-z0-9]+\s*/, '').replace(/[.!?]+$/, '') || 'Not provided', maxWords);
}

function normalizeMxt007Title(value: string | undefined): string {
  return stringifyValue(value).replace(/^[^A-Za-z0-9]+\s*/, '').replace(/\s+/g, ' ').trim() || 'Not provided';
}

function getMxt007DefaultLevel(ucId: string): string {
  if (ucId.toUpperCase() === 'UC1') return 'Fast Swipe';
  if (ucId.toUpperCase() === 'UC2') return 'Campaign Swipe';
  return 'Conversion Swipe';
}

function getMxt007DefaultUse(ucId: string): string {
  if (ucId.toUpperCase() === 'UC1') return 'Landing page hero';
  if (ucId.toUpperCase() === 'UC2') return 'Landing page + email subject lines';
  return 'Full launch funnel';
}

function getMxt007DefaultDecision(ucId: string): string {
  if (ucId.toUpperCase() === 'UC2') return 'Lead with the time-saving angle, then support it with revenue and consistency. This sequence works because the audience wants practical automation, not abstract AI hype.';
  return 'Prioritize clarity over cleverness. The best conversion path starts with a plain benefit headline, then uses pain-point and revenue headlines deeper in the page to handle objections and increase urgency.';
}

function getMxt007DefaultAction(ucId: string): string {
  if (ucId.toUpperCase() === 'UC2') return 'Test the top headline as the landing page hero. Use headline #2 as an email subject line and headline #5 as the CTA-section title.';
  return 'Run a three-part launch test: use headline #1 for the page hero, #2 for email subject testing, and #7 for retargeting ads where the audience may worry about complexity.';
}

function getMxt007DefaultRecommendation(ucId: string): string {
  if (ucId.toUpperCase() === 'UC1') return 'Use the time-saving headline first. It is the clearest fit for solo founders who need a fast reason to care.';
  if (ucId.toUpperCase() === 'UC2') return 'Use a benefit-led hero headline and keep the supporting copy focused on fewer manual follow-ups, faster launch, and better lead conversion.';
  return 'Build the campaign around one core promise: faster follow-up without extra headcount. Use benefit headlines above the fold, pain headlines in ads, and action headlines near CTAs.';
}

function getMxt007DefaultOptions(ucId: string): Array<{ title: string; label: string; reason: string }> {
  const options = [
    { title: 'Automate Your Email Follow-Ups With AI', label: 'Benefit', reason: ucId.toUpperCase() === 'UC1' ? 'Directly promises the core outcome without adding complexity.' : ucId.toUpperCase() === 'UC2' ? 'Strong hero option for a course landing page.' : 'Best all-purpose hero because it is clear, searchable, and outcome focused.' },
    { title: 'Turn Missed Follow-Ups Into Booked Calls', label: 'Revenue', reason: ucId.toUpperCase() === 'UC1' ? 'Turns manual follow-up into a visible revenue problem.' : ucId.toUpperCase() === 'UC2' ? 'Connects email automation to a measurable business outcome.' : 'Frames automation as pipeline recovery, not just productivity.' },
    { title: 'Build an AI Email System That Works While You Sleep', label: 'Automation', reason: ucId.toUpperCase() === 'UC1' ? 'Makes the course feel practical and fast to apply.' : ucId.toUpperCase() === 'UC2' ? 'Creates a simple mental image of always-on follow-up.' : 'Adds emotional value through the always-on system promise.' },
    { title: 'Stop Writing the Same Emails Again and Again', label: 'Pain point', reason: 'Simple frustration hook for ads and social posts.' },
    { title: 'Launch Your First AI Email Workflow This Week', label: 'Action', reason: 'Strong for conversion sections because it lowers the starting barrier.' },
    { title: "The Solo Founder's Shortcut to Smarter Follow-Up", label: 'Audience fit', reason: 'Names the target user and makes the offer feel built for them.' },
    { title: 'AI Email Without the Enterprise Complexity', label: 'Automation', reason: 'Reduces fear that the course is too technical or bloated.' },
    { title: 'Follow Up Faster Without Hiring a Bigger Team', label: 'Efficiency', reason: 'Strong small-team message with a clear staffing advantage.' },
    { title: 'From Manual Emails to Automated Touchpoints', label: 'Revenue', reason: 'More premium framing for advanced funnel content.' },
    { title: 'Create Email Workflows That Nurture Every Lead', label: 'Coverage', reason: 'Good for modules, curriculum, or feature benefit sections.' },
  ];
  if (ucId.toUpperCase() === 'UC1') return options.slice(0, 3);
  if (ucId.toUpperCase() === 'UC2') return options.slice(0, 5);
  return options;
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
  const pattern = getMxt008ClientPattern(context, stats, metrics, automationItems, insightItems, riskItems, recommendations, actions);

  setMxt008Placeholder(placeholders, context, 'theme', context.theme);
  setMxt008Placeholder(placeholders, context, 'hero_icon', tool?.icon_emoji || pattern.heroIcon);
  setMxt008Placeholder(placeholders, context, 'hero_title', tool?.tool_name || pattern.heroTitle || commandSlug);
  setMxt008Placeholder(placeholders, context, 'automation_title', pattern.automationTitle);
  setMxt008Placeholder(placeholders, context, 'automation_use_case', pattern.useCase);
  setMxt008Placeholder(placeholders, context, 'automation_stack', pattern.stack);
  setMxt008Placeholder(placeholders, context, 'automation_constraint', pattern.constraint);
  setMxt008Placeholder(placeholders, context, 'automation_confidence', pattern.confidence);
  setMxt008Placeholder(placeholders, context, 'automation_setup', pattern.setup);
  setMxt008Placeholder(placeholders, context, 'summary_title', pattern.summaryTitle);
  setMxt008Placeholder(placeholders, context, 'summary_body', pattern.summaryBody);
  setMxt008Placeholder(placeholders, context, 'workflow_explanation', pattern.workflowExplanation);
  setMxt008Placeholder(placeholders, context, 'idea_title', pattern.ideaTitle);
  setMxt008Placeholder(placeholders, context, 'idea_body', pattern.ideaBody);

  pattern.heroPills.forEach((value, index) => {
    setMxt008Placeholder(placeholders, context, `hero_pill_${index + 1}`, value);
  });

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const metric = pattern.metrics[index] || {
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
    const item = pattern.insights[index] || insightItems[index] || recommendations[index] || metrics[index];
    setMxt008Placeholder(placeholders, context, `insight_title_${padded}`, getMxt008ItemTitle(item, `Insight ${index + 1}`));
    setMxt008Placeholder(placeholders, context, `insight_body_${padded}`, getMxt008ItemBody(item));
  }

  for (let index = 0; index < 5; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const item = pattern.pipeline[index] || automationItems[index] || actions[index] || recommendations[index];
    setMxt008Placeholder(placeholders, context, `pipeline_step_title_${padded}`, item?.title || `Step ${index + 1}`);
    setMxt008Placeholder(placeholders, context, `pipeline_step_body_${padded}`, item?.description || item?.title || 'Not provided');
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const item = pattern.recommendations[index] || recommendations[index] || actions[index] || insightItems[index];
    setMxt008Placeholder(placeholders, context, `recommendation_${padded}`, item?.description || item?.title || 'Not provided');
  }

  for (let index = 0; index < 3; index += 1) {
    const padded = String(index + 1).padStart(2, '0');
    const item = pattern.risks[index] || riskItems[index] || recommendations[index] || actions[index];
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
  const value: string = isMissingPlaceholderValue(mappedValue)
    ? fallbackValue?.trim() || 'Not provided'
    : mappedValue ?? 'Not provided';
  placeholders[key] = normalizeMxt008PlaceholderValue(key, value);
}

interface Mxt008ClientPattern {
  heroIcon: string;
  heroTitle: string;
  heroPills: string[];
  automationTitle: string;
  useCase: string;
  stack: string;
  constraint: string;
  confidence: string;
  setup: string;
  summaryTitle: string;
  summaryBody: string;
  workflowExplanation: string;
  ideaTitle: string;
  ideaBody: string;
  metrics: Array<{ label: string; value: string; status?: string }>;
  insights: Array<{ title: string; description?: string }>;
  pipeline: Array<{ title: string; description?: string }>;
  recommendations: Array<{ title: string; description?: string }>;
  risks: Array<{ title: string; description?: string }>;
}

function getMxt008ClientPattern(
  context: RenderContext,
  stats: Array<{ label: string; value: string }>,
  fallbackMetrics: Array<{ label: string; value: string; status?: string }>,
  fallbackAutomationItems: Array<{ title: string; description?: string }>,
  fallbackInsightItems: Array<{ title: string; description?: string }>,
  fallbackRiskItems: Array<{ title: string; description?: string }>,
  fallbackRecommendations: Array<{ title: string; description?: string }>,
  fallbackActions: Array<{ title: string; description?: string }>
): Mxt008ClientPattern {
  const { data, tool, commandSlug, ucId } = context;
  const raw = data as any;
  const hero = raw.hero || {};
  const topic = raw.topic || {};
  const sections = raw.sections || {};
  const summarySection = getMxt008SummarySection(sections, ucId);
  const summaryBody = stringifyValue(summarySection?.value)
    || data.summary_card.subtitle
    || fallbackRecommendations[0]?.description
    || getMxt008DefaultSummaryBody(ucId);

  return {
    heroIcon: stringifyValue(hero.icon) || tool?.icon_emoji || 'MX',
    heroTitle: stringifyValue(hero.title) || tool?.tool_name || 'Zapier n8n Idea Generator',
    heroPills: [
      normalizeMxt008Short(stringifyValue(hero.pills?.[0]?.value) || getMxt008DefaultPillOne(ucId), 3),
      normalizeMxt008Short(stringifyValue(hero.pills?.[1]?.value) || getConfidenceLabel(data), 3),
      normalizeMxt008Short(stringifyValue(hero.pills?.[2]?.value) || getRiskLabel(data), 3),
      tool?.id || commandSlug,
      getModeLabel(ucId),
      'AI Engine V1',
    ],
    automationTitle: normalizeMxt008Title(stringifyValue(topic.title) || data.summary_card.title || getMxt008DefaultTitle(ucId)),
    useCase: normalizeMxt002Sentence(stringifyValue(topic.use_case?.value || topic.use_case) || findResultValue(data, /^(use_case|use|workflow|automation_use_case)$/i) || getMxt008DefaultUseCase(), getMxt008DefaultUseCase()),
    stack: normalizeMxt008Short(stringifyValue(topic.stack?.value || topic.stack) || findResultValue(data, /^(stack|tool_stack|platform|tools)$/i) || findStatValue(stats, /stack|tools|platform/i) || 'Zapier + n8n + CRM + Slack', 8),
    constraint: normalizeMxt008Short(stringifyValue(topic.constraint?.value || topic.constraint) || findResultValue(data, /^(constraint|limitation|requirement|guardrail)$/i) || 'Low risk tolerance and clear rationale required', 8),
    confidence: normalizeMxt008Short(stringifyValue(topic.confidence?.value || topic.confidence) || findResultValue(data, /^confidence$/i) || findStatValue(stats, /confidence/i) || getConfidenceLabel(data), 3),
    setup: normalizeMxt008Short(stringifyValue(topic.setup?.value || topic.setup) || getMxt008DefaultSetup(ucId), 3),
    summaryTitle: normalizeMxt008Title(stringifyValue(summarySection?.title) || getMxt008DefaultSummaryTitle(ucId)),
    summaryBody: normalizeMxt002Sentence(summaryBody, getMxt008DefaultSummaryBody(ucId)),
    workflowExplanation: normalizeMxt002Sentence(stringifyValue(sections.workflow_explanation?.value) || getMxt008WorkflowExplanation(data, fallbackAutomationItems, fallbackRecommendations, summaryBody), getMxt008DefaultWorkflowExplanation(ucId)),
    ideaTitle: normalizeMxt008Title(stringifyValue(sections.idea_summary?.items?.[0]?.title) || 'Risk-aware outreach routing'),
    ideaBody: normalizeMxt002Sentence(stringifyValue(sections.idea_summary?.items?.[0]?.body) || summaryBody, getMxt008DefaultIdeaBody()),
    metrics: normalizeMxt008Metrics(sections.key_metrics?.items, fallbackMetrics, ucId),
    insights: normalizeMxt008InsightItems(sections.insight_blocks?.items, fallbackInsightItems),
    pipeline: normalizeMxt008PipelineItems(sections.full_automation_pipeline?.items, fallbackAutomationItems),
    recommendations: normalizeMxt008CompactItems(sections.recommendations?.items, fallbackRecommendations, getMxt008RecommendationFallbacks()),
    risks: normalizeMxt008CompactItems(sections.risks_opportunities?.items, fallbackRiskItems, getMxt008RiskFallbacks()),
  };
}

function normalizeMxt008PlaceholderValue(key: string, value: string): string {
  if (/^summary_title$|^idea_title$|^insight_title_|^pipeline_step_title_/.test(key)) return normalizeMxt008Title(value);
  if (/^automation_title$/.test(key)) return normalizeMxt008Title(value);
  if (/^hero_pill_|^automation_stack$|^automation_confidence$|^automation_setup$|^metric_label_|^metric_value_/.test(key)) return normalizeMxt008Short(value, 8);
  if (/^automation_constraint$/.test(key)) return normalizeMxt008Short(value, 8);
  if (/^automation_use_case$|^summary_body$|^workflow_explanation$|^idea_body$|^metric_body_|^insight_body_|^pipeline_step_body_|^recommendation_|^risk_opportunity_/.test(key)) return normalizeMxt002Sentence(stripMxt004NumberPrefix(value), 'Not provided');
  return value?.trim() || 'Not provided';
}

function getMxt008SummarySection(sections: any, ucId: string): any {
  if (ucId.toUpperCase() === 'UC1') return sections.risk_assessment_idea_summary;
  if (ucId.toUpperCase() === 'UC2') return sections.decision_engine_summary;
  return sections.risk_assessment_automation_blueprint;
}

function normalizeMxt008Metrics(items: unknown, fallbackMetrics: Array<{ label: string; value: string; status?: string }>, ucId: string): Array<{ label: string; value: string; status?: string }> {
  const source = Array.isArray(items) ? items as any[] : [];
  const fallback = ucId.toUpperCase() === 'UC1'
    ? [
      { label: 'Confidence', value: '88%', status: 'The idea is feasible with standard app connectors.' },
      { label: 'Complexity', value: 'Low', status: 'Can start with a small rule-based decision flow.' },
      { label: 'Risk Level', value: 'Low', status: 'Main risk is incomplete lead data.' },
    ]
    : ucId.toUpperCase() === 'UC2'
      ? [
        { label: 'Confidence', value: '91%', status: 'Logic and routing are well suited for n8n.' },
        { label: 'Automation Depth', value: 'Medium', status: 'Needs CRM lookup, scoring rules, and channel mapping.' },
        { label: 'Risk Level', value: 'Low-Medium', status: 'Requires consistent data fields and fallback rules.' },
      ]
      : [
        { label: 'Confidence', value: '94%', status: 'Strong fit for a hybrid Zapier+n8n architecture.' },
        { label: 'Automation Depth', value: 'Advanced', status: 'Includes scoring, routing, logging, and escalation.' },
        { label: 'Risk Level', value: 'Low', status: 'Risk is controlled with fallback rules and audit logs.' },
      ];
  return fallback.map((item, index) => {
    const sourceItem = source[index] || fallbackMetrics[index];
    return {
      label: normalizeMxt008Short(stringifyValue(sourceItem?.label) || item.label, 4),
      value: normalizeMxt008Short(stringifyValue(sourceItem?.display_value || sourceItem?.value) || item.value, 4),
      status: normalizeMxt002Sentence(stringifyValue(sourceItem?.description || sourceItem?.status) || item.status, item.status || 'Not provided'),
    };
  });
}

function normalizeMxt008InsightItems(items: unknown, fallbackItems: Array<{ title: string; description?: string }>): Array<{ title: string; description?: string }> {
  const source = Array.isArray(items) ? items as any[] : [];
  const fallback = [
    { title: 'Decision Logic', description: 'Use n8n as the source of routing rules instead of spreading logic across many Zapier paths.' },
    { title: 'Data Quality', description: 'Normalize role, source, email domain, and CRM owner before scoring.' },
    { title: 'Sales Safety', description: 'Escalate high-value leads but keep risky or incomplete records in manual review.' },
  ];
  return fallback.map((item, index) => {
    const sourceItem = source[index] || fallbackItems[index];
    return {
      title: normalizeMxt008Title(stringifyValue(sourceItem?.title || sourceItem?.label) || item.title),
      description: normalizeMxt002Sentence(stringifyValue(sourceItem?.body || sourceItem?.description || sourceItem?.value) || item.description, item.description || 'Not provided'),
    };
  });
}

function normalizeMxt008PipelineItems(items: unknown, fallbackItems: Array<{ title: string; description?: string }>): Array<{ title: string; description?: string }> {
  const source = Array.isArray(items) ? items as any[] : [];
  const fallback = [
    { title: 'Capture', description: 'Zapier receives the form, ad lead, or CRM event.' },
    { title: 'Normalize', description: 'n8n cleans the lead fields and maps source values.' },
    { title: 'Score', description: 'Fit, urgency, relationship strength, and risk are scored.' },
    { title: 'Recommend', description: 'The safest channel is selected: LinkedIn, email, call, or review.' },
    { title: 'Log + Alert', description: 'CRM is updated and Slack notifies the right sales owner.' },
  ];
  return fallback.map((item, index) => {
    const sourceItem = source[index] || fallbackItems[index];
    return {
      title: normalizeMxt008Title(stringifyValue(sourceItem?.title || sourceItem?.step) || item.title),
      description: normalizeMxt002Sentence(stringifyValue(sourceItem?.description || sourceItem?.body || sourceItem?.value) || item.description, item.description || 'Not provided'),
    };
  });
}

function normalizeMxt008CompactItems(items: unknown, fallbackItems: Array<{ title: string; description?: string }>, fallbackValues: string[]): Array<{ title: string; description?: string }> {
  const source = Array.isArray(items) ? items as any[] : [];
  return fallbackValues.map((text, index) => {
    const sourceItem = source[index] || fallbackItems[index];
    return {
      title: `Item ${index + 1}`,
      description: normalizeMxt002Sentence(stripMxt004NumberPrefix(stringifyValue(sourceItem?.body || sourceItem?.value || sourceItem?.description || sourceItem?.title) || text), text),
    };
  });
}

function normalizeMxt008Short(value: string | undefined, maxWords: number): string {
  return sentenceFragment(stringifyValue(value).replace(/^[^A-Za-z0-9]+\s*/, '').replace(/[.!?]+$/, '') || 'Not provided', maxWords);
}

function normalizeMxt008Title(value: string | undefined): string {
  return stringifyValue(value).replace(/^[^A-Za-z0-9]+\s*/, '').replace(/\s+/g, ' ').trim() || 'Not provided';
}

function getMxt008DefaultTitle(ucId: string): string {
  if (ucId.toUpperCase() === 'UC2') return 'Risk Assessment Decision Engine for B2B Outreach Routing';
  return 'Choose the safest outreach channel for a high-value B2B lead';
}

function getMxt008DefaultUseCase(): string {
  return 'Safest outreach channel selection for a high-value B2B lead.';
}

function getMxt008DefaultSetup(ucId: string): string {
  if (ucId.toUpperCase() === 'UC1') return 'Starter setup';
  if (ucId.toUpperCase() === 'UC2') return 'Intermediate setup';
  return 'Advanced setup';
}

function getMxt008DefaultPillOne(ucId: string): string {
  if (ucId.toUpperCase() === 'UC1') return 'Risk Workflow';
  if (ucId.toUpperCase() === 'UC2') return 'Decision Engine';
  return 'Decision Blueprint';
}

function getMxt008DefaultSummaryTitle(ucId: string): string {
  if (ucId.toUpperCase() === 'UC1') return 'Risk Assessment Idea Summary';
  if (ucId.toUpperCase() === 'UC2') return 'Decision Engine Summary';
  return 'Risk Assessment Automation Blueprint';
}

function getMxt008DefaultSummaryBody(ucId: string): string {
  if (ucId.toUpperCase() === 'UC1') return 'Create a simple Zapier+n8n workflow that reviews a B2B lead, checks basic risk signals, and recommends the safest outreach channel before sales starts outreach.';
  if (ucId.toUpperCase() === 'UC2') return 'Build a Zapier+n8n decision workflow that evaluates lead quality, relationship context, and compliance risk before selecting the outreach channel.';
  return 'Create a production-ready decision engine that uses Zapier for app triggers and n8n for routing logic. The workflow scores the lead, checks compliance and relationship context, recommends the safest outreach channel, logs the rationale, and escalates high-value opportunities.';
}

function getMxt008DefaultWorkflowExplanation(ucId: string): string {
  if (ucId.toUpperCase() === 'UC2') return 'Zapier captures new lead events from forms or CRM changes. n8n enriches the record, applies scoring rules, checks risk signals, and routes the lead to the safest outreach path.';
  return 'Zapier handles the trigger reliability while n8n owns the risk rules, recommendation logic, CRM writeback, and Slack escalation. This keeps the system easy to audit and easier to improve over time.';
}

function getMxt008DefaultIdeaBody(): string {
  return 'A Zapier trigger captures a new lead, sends the lead fields to n8n, and returns a recommended channel such as LinkedIn, email, call, or manual review.';
}

function getMxt008RecommendationFallbacks(): string[] {
  return [
    'Start with LinkedIn-first routing for high-value leads with weak opt-in context.',
    'Keep the first version rule-based so sales can audit each recommendation.',
    'Review channel outcomes weekly before adding more automation branches.',
  ];
}

function getMxt008RiskFallbacks(): string[] {
  return [
    'Incomplete CRM fields can push good leads into manual review.',
    'Too many Zapier paths can make decision logic harder to maintain.',
    'Opportunity: use logged rationales to train better routing rules over time.',
  ];
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

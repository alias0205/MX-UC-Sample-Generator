import { UCResult } from '../types/mx';
import { TEMPLATE_MAP } from '../data/mxTemplateMap';

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
  data: UCResult
): string {
  const statsHtml = data.summary_card.stats
    .map(
      (s) => `
    <div class="mx-stat">
      <div class="mx-stat-label">${s.label}</div>
      <div class="mx-stat-value">${s.value}</div>
    </div>
  `
    )
    .join('');

  const blocksHtml = data.blocks
    .map((block) => {
      let contentHtml = '';
      if (block.type === 'data_table') {
        const headers = block.columns.map((c: string) => `<th>${c}</th>`).join('');
        const rows = (block.data || [])
          .map(
            (row: any) => `
          <tr>
            ${block.columns.map((c: string) => `<td>${row[c]}</td>`).join('')}
          </tr>
        `
          )
          .join('');
        contentHtml = `
          <div class="mx-table-block">
             <table class="mx-table">
               <thead><tr>${headers}</tr></thead>
               <tbody>${rows}</tbody>
             </table>
          </div>
        `;
      } else if (block.type === 'metrics_grid') {
        const metrics = (block.data || [])
          .map(
            (m: any) => `
          <div class="mx-metric-card">
            <div class="mx-stat-label">${m.label}</div>
            <div class="mx-stat-value">${m.value}</div>
          </div>
        `
          )
          .join('');
        contentHtml = `<div class="mx-metrics-grid">${metrics}</div>`;
      } else if (block.type === 'recommendations' || block.type === 'insight_cards') {
        const items = (block.items || [])
          .map(
            (r: any) => `
          <div class="mx-recommendation">
            <strong class="mx-accent">${r.title}</strong>
            <p>${r.description || r.value || ''}</p>
          </div>
        `
          )
          .join('');
        contentHtml = `<div class="mx-recommendations-block">${items}</div>`;
      } else if (block.type === 'action_plan') {
        const steps = (block.steps || [])
          .map((s: any) => `
            <div class="mx-action-step">
              <div class="mx-step-number">${s.step}.</div>
              <div class="mx-action-step-content">
                <span class="mx-step-title">${s.title}</span>
                <span class="mx-step-description">${s.description}</span>
              </div>
            </div>
          `)
          .join('');
        contentHtml = `<div class="mx-action-steps">${steps}</div>`;
      } else if (block.type === 'decision_layer') {
        contentHtml = `
          <div class="mx-decision-layer">
            <div class="mx-decision-header">
              <span class="mx-decision-status">STATUS: ${block.status}</span>
              <span class="mx-decision-score">${block.score}%</span>
            </div>
            <p class="mx-decision-reason">"${block.reason}"</p>
          </div>
        `;
      } else {
        contentHtml = `<p>Block type ${block.type} rendered with template content.</p>`;
      }

      return `
      <section class="mx-block">
        <h3 class="mx-block-title">${block.title}</h3>
        ${contentHtml}
      </section>
    `;
    })
    .join('');

  const template = TEMPLATE_MAP[templateId] || TEMPLATE_MAP['MXT_001'];
  
  return template
    .replace('{theme}', theme)
    .replace('{uc_id}', `${commandSlug}_${ucId}`)
    .replace('{title}', data.summary_card.title)
    .replace('{subtitle}', data.summary_card.subtitle)
    .replace('{stats}', statsHtml)
    .replace('{blocks}', blocksHtml);
}

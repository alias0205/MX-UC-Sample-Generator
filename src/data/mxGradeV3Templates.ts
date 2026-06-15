/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TemplateDefinition {
  template_id: string;
  template_name: string;
  template_slug: string;
  engine_type: string;
  description: string;
}

export const MX_GRADE_V3_TEMPLATES: TemplateDefinition[] = [
  {
    template_id: 'MXT_001',
    template_name: 'Insight Audit Report',
    template_slug: 'mxt-001-audit',
    engine_type: 'structured_report',
    description: 'Detailed analysis with metrics, blocks, and strategic insights.'
  },
  {
    template_id: 'MXT_002',
    template_name: 'Editorial Content Brief',
    template_slug: 'mxt-002-editorial',
    engine_type: 'content_brief',
    description: 'Optimized for articles, outlines, and hooks.'
  },
  {
    template_id: 'MXT_003',
    template_name: 'Lead Enrichment Data',
    template_slug: 'mxt-003-leads',
    engine_type: 'data_list',
    description: 'Enriched lead tables and prospecting lists.'
  },
  {
    template_id: 'MXT_004',
    template_name: 'Workflow Automation Map',
    template_slug: 'mxt-004-workflow',
    engine_type: 'automation_builder',
    description: 'Trigger/Action sequences and CRM mappings.'
  },
  {
    template_id: 'MXT_005',
    template_name: 'Diagnostic Scorecard',
    template_slug: 'mxt-005-scorecard',
    engine_type: 'diagnostic',
    description: 'Rankings, scores, and weighted audit layers.'
  },
  {
    template_id: 'MXT_006',
    template_name: 'Comparison Matrix',
    template_slug: 'mxt-006-comparison',
    engine_type: 'competitive',
    description: 'Side-by-side technical or feature comparison.'
  },
  {
    template_id: 'MXT_007',
    template_name: 'Creative Ad Factory',
    template_slug: 'mxt-007-creative',
    engine_type: 'ad_copy',
    description: 'Ad copy variants, hooks, and campaign structures.'
  },
  {
    template_id: 'MXT_008',
    template_name: 'Developer Technical Spec',
    template_slug: 'mxt-008-technical',
    engine_type: 'json_builder',
    description: 'Technical handoffs and schema-compliant outputs.'
  }
];

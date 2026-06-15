/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MXTool, ToolIntelligence } from '../types/mx';

export function detectToolType(tool: MXTool): ToolIntelligence {
  const name = tool.tool_name.toLowerCase();
  const slug = tool.command_slug.toLowerCase();
  const category = tool.category?.toLowerCase() || '';

  if (name.includes('sitemap') || slug.includes('sitemap') || name.includes('xml')) {
    return {
      tool_type: 'sitemap_validator',
      domain: 'SEO & Technical',
      primary_user_goal: 'Analyze and validate XML sitemaps',
      required_fields: ['url', 'status', 'lastmod', 'indexability_score', 'crawl_issues'],
      recommended_blocks: ['data_table', 'metrics_grid'],
      premium_blocks: ['insight_cards', 'action_plan', 'decision_layer']
    };
  }

  if (name.includes('intent classifier') || name.includes('keyword intent') || slug.includes('intent')) {
    return {
      tool_type: 'seo_intent_classifier',
      domain: 'SEO',
      primary_user_goal: 'Identify search intent for keywords',
      required_fields: ['keyword', 'intent', 'confidence', 'rationale', 'recommended_content_type'],
      recommended_blocks: ['data_table', 'insight_cards', 'recommendations'],
      premium_blocks: ['metrics_grid', 'action_plan', 'decision_layer']
    };
  }

  if (name.includes('keyword') || name.includes('seo') || name.includes('ranking') || name.includes('serp')) {
    return {
      tool_type: 'seo_analysis',
      domain: 'Marketing & Growth',
      primary_user_goal: 'Analyze SEO metrics and ranking potential',
      required_fields: ['keyword', 'volume', 'difficulty', 'intent', 'opportunity_score'],
      recommended_blocks: ['data_table', 'metrics_grid'],
      premium_blocks: ['insight_cards', 'recommendations']
    };
  }

  if (name.includes('lead') || name.includes('prospect') || name.includes('business finder') || name.includes('contact')) {
    return {
      tool_type: 'lead_generation',
      domain: 'Lead Generation',
      primary_user_goal: 'Identify and qualify business prospects',
      required_fields: ['company_name', 'website', 'contact_name', 'email', 'phone', 'industry', 'fit_score'],
      recommended_blocks: ['data_table', 'lead_table', 'insight_cards'],
      premium_blocks: ['recommendations', 'action_plan']
    };
  }

  if (name.includes('scraper') || name.includes('extractor') || name.includes('crawler') || name.includes('extraction')) {
    return {
      tool_type: 'data_extraction',
      domain: 'Data Extraction',
      primary_user_goal: 'Extract structured data from unstructured sources',
      required_fields: ['source_url', 'field_name', 'extracted_value', 'confidence', 'source_type'],
      recommended_blocks: ['data_table', 'insight_cards'],
      premium_blocks: ['metrics_grid', 'decision_layer']
    };
  }

  if (name.includes('email') || name.includes('cold email') || name.includes('follow-up') || name.includes('outreach')) {
    return {
      tool_type: 'outreach',
      domain: 'Outreach & Engagement',
      primary_user_goal: 'Generate personalized outreach sequences',
      required_fields: ['subject_line', 'opening', 'body', 'cta', 'personalization_angle'],
      recommended_blocks: ['content_outline', 'insight_cards'],
      premium_blocks: ['recommendations', 'action_plan']
    };
  }

  if (name.includes('ad') || name.includes('hook') || name.includes('caption') || name.includes('social') || name.includes('campaign')) {
    return {
      tool_type: 'creative_marketing',
      domain: 'Marketing & Growth',
      primary_user_goal: 'Generate creative copy and campaign hooks',
      required_fields: ['hook', 'angle', 'copy', 'cta', 'platform'],
      recommended_blocks: ['content_outline', 'insight_cards'],
      premium_blocks: ['metrics_grid', 'action_plan', 'recommendations']
    };
  }

  if (name.includes('workflow') || name.includes('automation') || name.includes('zapier') || name.includes('n8n')) {
    return {
      tool_type: 'automation_workflow',
      domain: 'Automation',
      primary_user_goal: 'Map and build automated task sequences',
      required_fields: ['trigger', 'action', 'condition', 'tool', 'expected_result'],
      recommended_blocks: ['workflow_steps', 'automation_map'],
      premium_blocks: ['checklist', 'action_plan']
    };
  }

  if (name.includes('audit') || name.includes('score') || name.includes('grader') || name.includes('diagnostic')) {
    return {
      tool_type: 'audit_scorecard',
      domain: 'Analytics',
      primary_user_goal: 'Evaluate performance via weighted diagnostics',
      required_fields: ['score', 'grade', 'issue', 'impact', 'recommendation'],
      recommended_blocks: ['scorecard', 'metrics_grid', 'recommendations'],
      premium_blocks: ['action_plan', 'insight_cards', 'decision_layer']
    };
  }

  if (name.includes('comparison') || name.includes('compare') || name.includes('competitor') || name.includes('matrix')) {
    return {
      tool_type: 'comparison_matrix',
      domain: 'Research',
      primary_user_goal: 'Compare entities across weighted criteria',
      required_fields: ['option', 'strength', 'weakness', 'score', 'recommendation'],
      recommended_blocks: ['comparison_matrix', 'data_table'],
      premium_blocks: ['insight_cards', 'decision_layer']
    };
  }

  if (name.includes('json') || name.includes('schema') || name.includes('developer') || name.includes('api') || name.includes('handoff')) {
    return {
      tool_type: 'developer_output',
      domain: 'Developer Tools',
      primary_user_goal: 'Generate technical specs and schema definitions',
      required_fields: ['field', 'type', 'description', 'required', 'example'],
      recommended_blocks: ['data_table', 'content_outline'],
      premium_blocks: ['insight_cards', 'action_plan']
    };
  }

  // Fallback
  return {
    tool_type: 'structured_business_report',
    domain: category || 'Business Intelligence',
    primary_user_goal: `Research and reporting for ${tool.tool_name}`,
    required_fields: ['topic', 'finding', 'score', 'recommendation'],
    recommended_blocks: ['data_table', 'metrics_grid'],
    premium_blocks: ['recommendations', 'insight_cards', 'action_plan']
  };
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MXTool, ToolIntelligence } from '../types/mx';

export function generateSemanticInputSample(tool: MXTool, intel: ToolIntelligence): any {
  switch (intel.tool_type) {
    case 'seo_intent_classifier':
      return {
        "keyword": "best crm for small business",
        "country": "US",
        "language": "en",
        "response_mode": "pro"
      };
    case 'seo_analysis':
      return {
        "url": "https://marketxtractor.com",
        "target_keyword": "ai lead generation software",
        "country": "US",
        "language": "en"
      };
    case 'lead_generation':
      return {
        "industry": "plumbing",
        "location": "Austin, TX",
        "business_type": "local service business",
        "max_results": 25
      };
    case 'data_extraction':
      return {
        "source_url": "https://techcrunch.com/funding",
        "fields_to_extract": ["company_name", "amount", "investors", "date"],
        "depth": 1
      };
    case 'outreach':
      return {
        "recipient_type": "Marketing Agency CEO",
        "offer": "white-labeled ai automation services",
        "tone": "professional",
        "cta": "book a 15-min intro call"
      };
    case 'creative_marketing':
      return {
        "product": "NextGen CRM Automation",
        "platform": "LinkedIn",
        "audience": "growth leads at b2b saas",
        "goal": "drive demo signups"
      };
    case 'automation_workflow':
      return {
        "task": "sync pipedrive leads to slack and email outreach",
        "trigger": "new deal created",
        "tools": ["Pipedrive", "Slack", "Instantly.ai"]
      };
    case 'audit_scorecard':
      return {
        "website_url": "https://fastsaas.com",
        "audit_focus": "conversion optimization & page speed",
        "business_type": "B2B SaaS"
      };
    case 'comparison_matrix':
      return {
        "options": ["HubSpot", "Salesforce", "Pipedrive"],
        "criteria": ["price", "ai features", "ease of use", "setup time"]
      };
    case 'developer_output':
      return {
        "feature": "web scraper api endpoint",
        "format": "JSON schema v7",
        "environment": "Node.js (TypeScript)"
      };
    default:
      return {
        "topic": tool.tool_name,
        "input_query": "Identify growth opportunities in this domain",
        "format": "structured report"
      };
  }
}

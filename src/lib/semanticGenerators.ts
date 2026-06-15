/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MXTool, UCResult, ToolIntelligence } from '../types/mx';

export function generateSemanticUCResults(tool: MXTool, intel: ToolIntelligence, inputSample: any): { UC1: UCResult; UC2: UCResult; UC3: UCResult } {
  const { tool_type } = intel;

  const createResults = (tier: 'UC1' | 'UC2' | 'UC3'): UCResult => {
    const isUC1 = tier === 'UC1';
    const isUC3 = tier === 'UC3';

    // Base specific contents for each tool type
    switch (tool_type) {
      case 'seo_intent_classifier':
        return {
          summary_card: {
            title: "Keyword Intent Classification",
            subtitle: `Analysis for '${inputSample.keyword || 'target keyword'}'`,
            stats: [
              { label: "Intent", value: "Commercial" },
              { label: "Confidence", value: "91%" },
              ...(isUC1 ? [] : [{ label: "Buyer Stage", value: "Evaluation" }]),
              ...(isUC3 ? [{ label: "Content Opportunity", value: "High" }] : [])
            ]
          },
          blocks: [
            {
              type: "data_table",
              title: "Intent Breakdown",
              columns: ["Keyword", "Intent", "Confidence", "Rationale", ...(isUC1 ? [] : ["Recommended Content Type"])],
              data: [
                {
                  "Keyword": inputSample.keyword || "best crm for small business",
                  "Intent": "Commercial",
                  "Confidence": "91%",
                  "Rationale": "Searcher is comparing solutions with 'best' modifier.",
                  "Recommended Content Type": "Comparison landing page"
                }
              ]
            },
            ...(isUC1 ? [] : [
              {
                type: "recommendations",
                title: "Strategy Recommendations",
                items: [
                  { title: "Target Comparison SERPs", description: "This keyword triggers listicles. Create a comparison page." },
                  { title: "Optimize for Evaluation", description: "Highlight pricing and key features prominently." }
                ]
              }
            ]),
            ...(isUC3 ? [
              {
                type: "metrics_grid",
                title: "Intent Metrics",
                data: [
                  { label: "Commercial Value", value: "High" },
                  { label: "Ranking Difficulty", value: "Medium" },
                  { label: "Funnel Stage", value: "Middle" },
                  { label: "Content Fit", value: "Strong" }
                ]
              },
              {
                type: "insight_cards",
                title: "Strategic SEO Insights",
                items: [
                  { title: "SERP Pattern", value: "Comparison-heavy", description: "Google favors pages comparing multiple CRM options." },
                  { title: "User Motivation", value: "Purchase evaluation", description: "The user is likely comparing solutions before choosing." }
                ]
              },
              {
                type: "action_plan",
                title: "Recommended SEO Action Plan",
                steps: [
                  { step: 1, title: "Create comparison landing page", description: "Target the keyword with a ranked CRM comparison page." },
                  { step: 2, title: "Add decision-stage content", description: "Include pricing, pros and cons, and feature matrix." }
                ]
              },
              {
                type: "decision_layer",
                title: "SEO Priority Decision",
                status: "Approved",
                score: 91,
                reason: "High commercial intent with manageable difficulty."
              }
            ] : [])
          ]
        };

      case 'lead_generation':
        return {
          summary_card: {
            title: "Lead Generation Result",
            subtitle: `Prospecting in ${inputSample.location || 'target location'}`,
            stats: [
              { label: "Leads Found", value: isUC1 ? "5" : isUC3 ? "25" : "12" },
              { label: "Avg Fit Score", value: "88%" },
              ...(isUC1 ? [] : [{ label: "Email Coverage", value: "94%" }]),
              ...(isUC3 ? [{ label: "Valid Phones", value: "18" }] : [])
            ]
          },
          blocks: [
            {
              type: "data_table",
              title: "Prospect List",
              columns: ["Company", "Industry", "Fit Score", ...(isUC1 ? [] : ["Contact", "Email"])],
              data: [
                {
                  "Company": "Austin Plumbing Pros",
                  "Industry": "Home Services",
                  "Fit Score": "92%",
                  "Contact": "John Smith",
                  "Email": "john@austinplumbing.com"
                }
              ]
            },
            ...(isUC1 ? [] : [
               {
                 type: "insight_cards",
                 title: "Market Insights",
                 items: [
                   { title: "Regional Saturation", value: "Medium", description: "Plumbing services are highly active in ZIP 78701." },
                   { title: "Contactability", value: "High", description: "84% of prospects have verified LinkedIn profiles." }
                 ]
               }
            ]),
            ...(isUC3 ? [
              {
                type: "action_plan",
                title: "Outreach Roadmap",
                steps: [
                  { step: 1, title: "Initial Email Outreach", description: "Send personalized website audit email." },
                  { step: 2, title: "LinkedIn Connection", description: "Follow up with industry-specific case study." }
                ]
              },
              {
                type: "recommendations",
                title: "Growth Opportunities",
                items: [
                  { title: "SMS Marketing", description: "High phone coverage suggests SMS campaign potential." },
                  { title: "Local SEO Focus", description: "Most prospects lack a map citation in South Austin." }
                ]
              }
            ] : [])
          ]
        };

      case 'data_extraction':
        return {
          summary_card: {
            title: "Data Extraction Report",
            subtitle: `Extracted from ${inputSample.source_url || 'source'}`,
            stats: [
              { label: "Fields Extracted", value: "4" },
              { label: "Accuracy", value: "99.2%" },
              ...(isUC1 ? [] : [{ label: "Structure", value: "JSON" }]),
              ...(isUC3 ? [{ label: "Handoff Ready", value: "Yes" }] : [])
            ]
          },
          blocks: [
            {
              type: "data_table",
              title: "Extraction Results",
              columns: ["Field", "Source Type", "Value", "Confidence"],
              data: [
                {
                   "Field": "Amount",
                   "Source Type": "Text Node",
                   "Value": "$25M",
                   "Confidence": "0.99"
                }
              ]
            },
            ...(isUC1 ? [] : [
              {
                type: "insight_cards",
                title: "Source Health",
                items: [
                  { title: "CSS Selectors", value: "Stable", description: "Minimal risk of breakage from UI updates." },
                  { title: "Data Density", value: "High", description: "Rich entity relationships found across page." }
                ]
              }
            ]),
            ...(isUC3 ? [
              {
                type: "decision_layer",
                title: "Automation Readiness",
                status: "Production Ready",
                score: 98,
                reason: "Clean structure detected with 0 formatting errors."
              }
            ] : [])
          ]
        };

      default:
        // Semantic fallback that isn't generic
        return {
          summary_card: {
            title: `${tool.tool_name} Analysis`,
            subtitle: `Result for ${intel.domain} objective`,
            stats: [
              { label: "Analysis Score", value: "85" },
              { label: "Integrity", value: "High" },
              ...(isUC1 ? [] : [{ label: "Efficiency", value: "Fast" }]),
              ...(isUC3 ? [{ label: "Priority", value: "Tier 1" }] : [])
            ]
          },
          blocks: [
            {
              type: "data_table",
              title: "Core Findings",
              columns: intel.required_fields,
              data: [
                intel.required_fields.reduce((acc: any, field) => {
                   acc[field] = `Extracted ${field.replace('_', ' ')}`;
                   return acc;
                }, {})
              ]
            },
            ...(isUC1 ? [] : [
               {
                 type: "recommendations",
                 title: "Strategic Items",
                 items: [
                   { title: "Optimize Flow", description: `Apply discovered ${intel.domain} patterns.` }
                 ]
               }
            ]),
            ...(isUC3 ? [
               {
                 type: "insight_cards",
                 title: "Deep Insights",
                 items: [
                   { title: "Domain Pattern", value: intel.domain, description: "Consistent mapping found in current run." }
                 ]
               },
               {
                 type: "action_plan",
                 title: "Tactical Execution",
                 steps: [
                   { step: 1, title: "Initialize phase", description: "Launch sequence based on results." }
                 ]
               }
            ] : [])
          ]
        };
    }
  };

  return {
    UC1: createResults('UC1'),
    UC2: createResults('UC2'),
    UC3: createResults('UC3')
  };
}

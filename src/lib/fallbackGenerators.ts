/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MXTool, UCResult, ToolIntelligence } from '../types/mx';

export interface FallbackResult {
  input_sample: any;
  uc_results: {
    UC1: UCResult;
    UC2: UCResult;
    UC3: UCResult;
  };
}

export function generateFallbackByToolType(intel: ToolIntelligence, tool: MXTool): FallbackResult {
  const slug = tool.command_slug.toLowerCase();
  
  if (slug.includes("intent") || slug.includes("keyword-intent") || intel.tool_type === 'seo_intent_classifier') {
    return generateIntentClassifierFallback(tool);
  }

  switch (intel.tool_type) {
    case 'sitemap_validator':
      return generateSitemapValidatorFallback(tool);
    default:
      return generateGenericFallback(intel, tool);
  }
}

function generateIntentClassifierFallback(tool: MXTool): FallbackResult {
  const keyword = "best crm for small business";

  const UC1: UCResult = {
    summary_card: {
      title: "Keyword Intent Classification",
      subtitle: `Analysis for "${keyword}"`,
      stats: [
        { label: "Intent", value: "Commercial" },
        { label: "Confidence", value: "91%" }
      ]
    },
    blocks: [
      {
        type: "data_table",
        title: "Intent Breakdown",
        columns: ["Keyword", "Intent", "Confidence", "Reason"],
        data: [
          {
            Keyword: keyword,
            Intent: "Commercial",
            Confidence: "91%",
            Reason: "User is comparing CRM tools before purchase"
          }
        ]
      }
    ]
  };

  const UC2: UCResult = {
    summary_card: {
      title: "Keyword Intent Classification",
      subtitle: `Analysis for "${keyword}"`,
      stats: [
        { label: "Intent", value: "Commercial" },
        { label: "Confidence", value: "91%" },
        { label: "Buyer Stage", value: "Evaluation" }
      ]
    },
    blocks: [
      {
        type: "data_table",
        title: "Intent Breakdown",
        columns: ["Keyword", "Intent", "Confidence", "Content Type"],
        data: [
          {
            Keyword: keyword,
            Intent: "Commercial",
            Confidence: "91%",
            "Content Type": "Comparison landing page"
          }
        ]
      },
      {
        type: "recommendations",
        title: "SEO Recommendations",
        items: [
          {
            title: "Create comparison content",
            description: "Build a page comparing CRM tools"
          }
        ]
      }
    ]
  };

  const UC3: UCResult = {
    summary_card: {
      title: "Keyword Intent Classification",
      subtitle: `Advanced analysis for "${keyword}"`,
      stats: [
        { label: "Intent", value: "Commercial" },
        { label: "Confidence", value: "91%" },
        { label: "Buyer Stage", value: "Evaluation" },
        { label: "Opportunity", value: "High" }
      ]
    },
    blocks: [
      {
        type: "data_table",
        title: "Intent Breakdown",
        columns: ["Keyword", "Intent", "SERP Pattern", "Content Type"],
        data: [
          {
            Keyword: keyword,
            Intent: "Commercial",
            "SERP Pattern": "Listicles + Reviews",
            "Content Type": "Comparison landing page"
          }
        ]
      },
      {
        type: "insight_cards",
        title: "SEO Insights",
        items: [
          {
            title: "User Intent Stage",
            description: "User is deciding between options - High conversion potential."
          }
        ]
      },
      {
        type: "action_plan",
        title: "SEO Action Plan",
        steps: [
          {
            step: 1,
            title: "Create comparison page",
            description: "Target high intent keywords with structured comparison data."
          }
        ]
      },
      {
        type: "decision_layer",
        title: "SEO Decision",
        status: "Recommended",
        score: 91,
        reason: "High commercial intent keyword with clear competition gap."
      }
    ]
  };

  return {
    input_sample: {
      keyword,
      country: "US",
      language: "en",
      response_mode: "pro"
    },
    uc_results: { UC1, UC2, UC3 }
  };
}

function generateSitemapValidatorFallback(tool: MXTool): FallbackResult {
  const input_sample = {
    sitemap_url: "https://example.com/sitemap_index.xml",
    check_depth: "full",
    notify_on_errors: true
  };

  const UC1: UCResult = {
    summary_card: {
      title: "Sitemap Health Overview",
      subtitle: "Basic structural and connectivity check complete",
      stats: [
        { label: "Sitemap Status", value: "Valid" },
        { label: "URLs Found", value: "1,240" },
        { label: "Response Code", value: "200" }
      ]
    },
    blocks: [
      {
        type: "metrics_grid",
        title: "Key Processing Metrics",
        data: [
          { label: "Valid URLs", value: "1,232" },
          { label: "Broken URLs", value: "8" },
          { label: "Blocked by Robots", value: "2" },
          { label: "Indexability Score", value: "98.5%" }
        ]
      },
      {
        type: "data_table",
        title: "Sitemap Entry Analysis",
        columns: ["URL Path", "Status", "Last Modified", "Crawl Issues"],
        data: [
          { "URL Path": "/products/item-a", "Status": "Success (200)", "Last Modified": "2024-03-20", "Crawl Issues": "None" },
          { "URL Path": "/blog/old-post", "Status": "Broken (404)", "Last Modified": "2023-11-12", "Crawl Issues": "Dead Link" },
          { "URL Path": "/private/admin", "Status": "Blocked (403)", "Last Modified": "2024-01-05", "Crawl Issues": "Robots.txt restricted" }
        ]
      }
    ]
  };

  const UC2: UCResult = {
    ...UC1,
    summary_card: {
      ...UC1.summary_card,
      title: "Enhanced Sitemap Diagnostic Result",
      subtitle: "Detailed crawl analysis with optimization highlights"
    },
    blocks: [
      ...UC1.blocks,
      {
        type: "recommendations",
        title: "Technical SEO Optimization Tips",
        items: [
          { title: "Fix 404 Links", description: "Remove or redirect the 8 broken URLs identified in the sitemap." },
          { title: "Update Lastmod Tags", description: "Ensure all lastmod tags are updated in real-time to prioritize fresher content for crawlers." },
          { title: "Sitemap Compression", description: "Use Gzip to reduce sitemap file size for faster processing by search engines." }
        ]
      }
    ]
  };

  const UC3: UCResult = {
    ...UC2,
    summary_card: {
      ...UC2.summary_card,
      title: "Executive Technical SEO Scorecard",
      subtitle: "Comprehensive indexability and accessibility audit"
    },
    blocks: [
      ...UC2.blocks,
      {
        type: "insight_cards",
        title: "Visibility Insights",
        items: [
          { title: "Crawl Budget Efficiency", description: "Sitemap structure is optimized for high crawl efficiency, minimizing wasted server resources.", impact: "High" },
          { title: "URL Freshness Signals", description: "75% of URLs have been updated within the last 30 days, signaling healthy content maintenance.", impact: "Medium" }
        ]
      },
      {
        type: "action_plan",
        title: "Indexing Recovery Roadmap",
        steps: [
          { step: 1, title: "Redirect Broker Links", description: "Map all 404 URLs to relevant active pages via 301 redirects." },
          { step: 2, title: "Clear Robots.txt Blockers", description: "Review and lift restrictions on high-value priority URLs currently hidden from search engines." },
          { step: 3, title: "Resubmit to Search Console", description: "Perform a manual ping to Google and Bing with the updated XML sitemap." }
        ]
      }
    ]
  };

  return { input_sample, uc_results: { UC1, UC2, UC3 } };
}

function generateGenericFallback(intel: ToolIntelligence, tool: MXTool): FallbackResult {
  const input_sample = {
    domain: "example.com",
    target_audience: "Marketing Professionals",
    primary_goal: intel.primary_user_goal
  };

  const UC1: UCResult = {
    summary_card: {
      title: `${tool.tool_name} Analysis Output`,
      subtitle: `Initial intelligence report for ${intel.domain}`,
      stats: [
        { label: "Performance Score", value: "88/100" },
        { label: "Confidence", value: "High" },
        { label: "Data Quality", value: "Verified" }
      ]
    },
    blocks: [
      {
        type: "data_table",
        title: "Primary Findings",
        columns: ["Topic", "Finding", "Score", "Recommendation"],
        data: [
          { "Topic": "Baseline Performance", "Finding": "Above average conversion capability", "Score": "92", "Recommendation": "Maintain current strategy" },
          { "Topic": "Growth Opportunity", "Finding": "Untapped market segment identified", "Score": "74", "Recommendation": "Allocate 15% budget to tests" }
        ]
      }
    ]
  };

  const UC2: UCResult = {
    ...UC1,
    blocks: [
      ...UC1.blocks,
      {
        type: "recommendations",
        title: "Strategic Recommendations",
        items: [
          { title: "Scale Efficiency", description: "Automate repetitive data collection tasks to free up analyst time." },
          { title: "Data Integration", description: "Connect current output to CRM for better customer lifecycle tracking." }
        ]
      }
    ]
  };

  const UC3: UCResult = {
    ...UC2,
    blocks: [
      ...UC2.blocks,
      {
        type: "action_plan",
        title: "Decision Activation Plan",
        steps: [
          { step: 1, title: "Team Briefing", description: "Review findings with core stakeholders and align on targets." },
          { step: 2, title: "Pilot Launch", description: "Implement suggested optimizations in a controlled environment." },
          { step: 3, title: "Performance Review", description: "Evaluate pilot results after 14 days and scale accordingly." }
        ]
      }
    ]
  };

  return { input_sample, uc_results: { UC1, UC2, UC3 } };
}

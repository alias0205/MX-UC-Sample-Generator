/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ToolResult } from '../types/mx';

const FORBIDDEN_PATTERNS = [
  'sample',
  'metric 1',
  'metric 2',
  'attribute name',
  'extracted insights',
  'performance indicators',
  'optimization alpha',
  'data integrity',
  'generic content',
  'verified',
  'idx-100'
];

const ALLOWED_INLINE_STYLE_PATTERNS = [
  /style="--mx-score-progress:\s*[^"]+"/gi,
  /style="--mx-bar-width:\s*[^"]+"/gi,
];

function removeAllowedInlineStyles(html: string): string {
  return ALLOWED_INLINE_STYLE_PATTERNS.reduce(
    (cleaned, pattern) => cleaned.replace(pattern, ''),
    html
  );
}

export function validateSemanticQuality(result: ToolResult): { passed: boolean; issues: string[] } {
  const issues: string[] = [];

  const checkText = (text: string, path: string) => {
    if (!text) return;
    const lower = text.toLowerCase();
    FORBIDDEN_PATTERNS.forEach(p => {
      if (lower.includes(p)) {
        // Exception: "Extracted Insights" is okay if tool_type is data_extraction
        if (p === 'extracted insights' && result.template_assignment.reason.includes('data_extraction')) {
          // Allowed
        } else if (p === 'verified' && (path.includes('Status') || path.includes('status'))) {
          // Status fields might legitimately have "Verified" - we'll allow it if it's not a generic row name
        } else {
          issues.push(`Forbidden generic pattern detected in ${path}: "${p}"`);
          console.log(11111111111111);
        }
      }
    });
  };

  const traverse = (obj: any, path: string) => {
    if (!obj) return;
    if (typeof obj === 'string') {
      checkText(obj, path);
    } else if (Array.isArray(obj)) {
      obj.forEach((item, i) => traverse(item, `${path}[${i}]`));
    } else if (typeof obj === 'object') {
      Object.keys(obj).forEach(key => traverse(obj[key], `${path}.${key}`));
    }
  };

  // Check Input Sample
  traverse(result.input_sample, 'input_sample');

  // Check HTML for compliance
  Object.keys(result.html).forEach(key => {
    const html = (result.html as any)[key];
    if (removeAllowedInlineStyles(html).includes('style=')) {
      issues.push(`Inline styles detected in ${key}: HTML must not contain "style="`);
      console.log(22222222222222);
    }
    if (!html.includes('mx-result')) {
      issues.push(`Missing root class in ${key}: HTML must contain "mx-result"`);
      console.log(3333333333333);
    }
  });

  // Check UC Results structure
  Object.keys(result.uc_results).forEach(ucKey => {
    const uc = (result.uc_results as any)[ucKey];
    if (!uc.summary_card) {
      issues.push(`Missing summary_card in uc_results.${ucKey}`);
      console.log(4444444444444);
    }
    traverse(uc, `uc_results.${ucKey}`);
  });

  // Check CSV rows for semantic accuracy and naming compliance
  result.packaging.csv_rows.forEach((row, i) => {
    const isExtraction = result.template_assignment.reason.includes('data_extraction');
    if (row.scenario.includes('automated extraction') && !isExtraction) {
       issues.push(`Semantic mismatch in CSV row ${i}: "automated extraction" scenario assigned to non-extraction tool`);
       console.log(555555555555555);
    }

    // Naming rules for CSV columns
    const imgFields = ['thumb_light_jpg', 'full_light_jpg', 'thumb_dark_jpg', 'full_dark_jpg'];
    imgFields.forEach(field => {
      const val = row[field];
      if (val && !val.startsWith(result.tool_id)) {
        issues.push(`Naming violation in CSV row ${i}, field ${field}: Must start with tool_id (${result.tool_id}), got ${val}`);
        console.log(6666666666666666);
      }
      if (val && val.startsWith(result.command_slug) && result.command_slug !== result.tool_id) {
        issues.push(`Naming violation in CSV row ${i}, field ${field}: Must not use command_slug as prefix`);
        console.log(7777777777777777);
      }
    });
  });

  // Check screenshot manifest for naming compliance
  result.screenshots.forEach((sc, i) => {
    if (!sc.full_file.startsWith(result.tool_id)) {
      issues.push(`Naming violation in screenshot ${i}: full_file must start with tool_id`);
      console.log(88888888888888888);
    }
    if (!sc.thumb_file.startsWith(result.tool_id)) {
      issues.push(`Naming violation in screenshot ${i}: thumb_file must start with tool_id`);
      console.log(99999999999999999);
    }
    if (sc.full_file.startsWith(result.command_slug) && result.command_slug !== result.tool_id) {
      issues.push(`Naming violation in screenshot ${i}: full_file must not use command_slug prefix`);
      console.log("xxxxxxxxxxxx");
    }
  });

  // Check Block Schemas
  Object.keys(result.uc_results).forEach(ucKey => {
    const uc = (result.uc_results as any)[ucKey];
    uc.blocks.forEach((block: any, i: number) => {
      const p = `uc_results.${ucKey}.blocks[${i}]`;
      if (block.type === 'metrics_grid' && block.metrics) {
        issues.push(`Invalid block schema at ${p}: metrics_grid must use data[]`);
        console.log("mmmmmmmmmmmmmm");
      }
      if (block.type === 'recommendations' && block.recommendations) {
        issues.push(`Invalid block schema at ${p}: recommendations must use items[]`);
        console.log("nnnnnnnnnnnnnn");
      }
      if (block.type === 'insight_cards' && block.insights) {
        issues.push(`Invalid block schema at ${p}: insight_cards must use items[]`);
        console.log("oooooooooooooo");
      }
      if (block.type === 'action_plan') {
         if (block.steps && block.steps.length > 0 && typeof block.steps[0] === 'string') {
           issues.push(`Invalid block schema at ${p}: action_plan steps must be objects`);
           console.log("pppppppppppppp");
         }
      }
    });
  });

  return {
    passed: issues.length === 0,
    issues
  };
}

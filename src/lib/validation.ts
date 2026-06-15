import { z } from 'zod';
import { MXTool } from '../types/mx';

const kebabCaseRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateToolRow(row: any): { passed: boolean; issues: string[] } {
  const issues: string[] = [];

  if (!row.id) issues.push('Missing id');
  if (!row.tool_name) issues.push('Missing tool_name');
  if (!row.command_slug) {
    issues.push('Missing command_slug');
  } else if (!kebabCaseRegex.test(row.command_slug)) {
    issues.push(`command_slug "${row.command_slug}" must be kebab-case`);
  }

  try {
    if (row.input_schema_json) JSON.parse(row.input_schema_json);
    else issues.push('Missing input_schema_json');
  } catch (e) {
    issues.push('input_schema_json is invalid JSON');
  }

  try {
    if (row.output_spec_json) JSON.parse(row.output_spec_json);
    else issues.push('Missing output_spec_json');
  } catch (e) {
    issues.push('output_spec_json is invalid JSON');
  }

  if (!row.form_structure_html) {
    issues.push('Missing form_structure_html');
  } else {
    if (!row.form_structure_html.includes('data-marketxtractor-form=')) {
      issues.push('form_structure_html missing data-marketxtractor-form');
    }
    if (!row.form_structure_html.includes('mx-icon') || !row.form_structure_html.includes('🧩')) {
      issues.push('form_structure_html missing required mx-icon 🧩');
    }
  }

  const validTemplates = ['MXT_001', 'MXT_002', 'MXT_003', 'MXT_004', 'MXT_005', 'MXT_006', 'MXT_007', 'MXT_008'];
  if (!validTemplates.includes(row.result_template_id)) {
    issues.push(`result_template_id must be MXT_001-MXT_008 (got ${row.result_template_id})`);
  }

  if (!row.result_engine) {
    issues.push('Missing result_engine');
  }

  if (row.result_render_map_json) {
    try {
      JSON.parse(row.result_render_map_json);
    } catch (e) {
      issues.push('result_render_map_json is invalid JSON');
    }
  }

  return {
    passed: issues.length === 0,
    issues,
  };
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MXTool {
  id: string;
  tool_name: string;
  command_slug: string;
  category: string;
  subcategories?: string;
  icon_emoji?: string;
  short_description?: string;
  long_description?: string;
  response_modes?: string;
  input_schema_json: string;
  output_spec_json: string;
  form_structure_html?: string;
  credit_cost?: string;
  result_engine: string;
  result_template_id: string;
  result_render_map_json?: string;
  status: string;
}

export interface MXTemplate {
  template_id: string;
  template_name: string;
  template_slug: string;
  engine_type: string;
  html_file: string;
}

export interface UCResult {
  summary_card: {
    title: string;
    subtitle: string;
    stats: Array<{ label: string; value: string }>;
  };
  blocks: Array<{
    type: string;
    title: string;
    [key: string]: any;
  }>;
}

export interface ToolResult {
  status: 'pending' | 'success' | 'error';
  tool_id: string;
  command_slug: string;
  template_assignment: {
    result_engine: string;
    result_template_id: string;
    reason: string;
  };
  input_sample: any;
  uc_results: {
    UC1: UCResult;
    UC2: UCResult;
    UC3: UCResult;
  };
  renderer_css: string;
  html: {
    UC1_light: string;
    UC1_dark: string;
    UC2_light: string;
    UC2_dark: string;
    UC3_light: string;
    UC3_dark: string;
  };
  screenshots: Array<{
    use_case_id: string;
    theme: 'light' | 'dark';
    html_key: string;
    full_file: string;
    thumb_file: string;
  }>;
  packaging: {
    csv_rows: any[];
    zip_contents: any[];
  };
  validation: {
    passed: boolean;
    issues: string[];
  };
  screenshot_blobs?: Record<string, Blob>;
}

export type PipelineStage = 'pending' | 'running' | 'passed' | 'failed';

export interface ToolIntelligence {
  tool_type: string;
  domain: string;
  primary_user_goal: string;
  required_fields: string[];
  recommended_blocks: string[];
  premium_blocks: string[];
}

export interface PipelineState {
  csv_upload: PipelineStage;
  validation: PipelineStage;
  reasoning: PipelineStage;
  assignment: PipelineStage;
  generation: PipelineStage;
  rendering: PipelineStage;
  packaging: PipelineStage;
}

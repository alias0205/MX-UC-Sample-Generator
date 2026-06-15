import Papa from 'papaparse';
import { MXTool, ToolResult } from '../types/mx';

export function createUCCsvRows(tool: MXTool, result: ToolResult): any[] {
  const ucs = ['UC1', 'UC2', 'UC3'] as const;
  
  return ucs.map((uc, index) => {
    const ucData = result.uc_results[uc];
    const ordinal = index + 1;
    const commandSlug = tool.command_slug;

    const isExtraction = result.template_assignment.reason.includes('data_extraction');
    const scenario = isExtraction 
      ? `Typical ${uc} scenario using ${tool.tool_name} automated extraction.`
      : `Typical ${uc} scenario using ${tool.tool_name} automated intelligence.`;

    // Canonical structure with exact column order
    return {
      tool_id: tool.id || "",
      use_case_id: `${commandSlug}_${uc}`,
      ordinal,
      icon: tool.icon_emoji || '🧩',
      title: `${tool.tool_name} - ${uc} Example`,
      goal: `Demonstrate ${uc} capabilities for ${tool.tool_name}`,
      scenario,
      inputs_example_json: JSON.stringify(result.input_sample),
      expected_output_example_json: JSON.stringify(ucData),
      thumb_light_jpg: `${tool.id}_${uc}_thumb_light.jpg`,
      full_light_jpg: `${tool.id}_${uc}_full_light.jpg`,
      thumb_dark_jpg: `${tool.id}_${uc}_thumb_dark.jpg`,
      full_dark_jpg: `${tool.id}_${uc}_full_dark.jpg`,
      image_alt: `preview of ${tool.tool_name} ${uc} output in light and dark mode.`,
      image_caption: `Ready-to-use ${uc} results from ${tool.tool_name}.`,
      tags: [tool.category, `uc${ordinal}`].join(','),
      render_map_json: JSON.stringify({
        engine: result.template_assignment.result_engine,
        template_id: result.template_assignment.result_template_id,
        html_keys: {
          light: `${uc}_light`,
          dark: `${uc}_dark`
        },
        block_sequence: ucData.blocks.map(b => b.type)
      }),
      status: 'active'
    };
  });
}

export function unparseUCCSV(rows: any[]): string {
  // Use Papa.unparse for safe escaping and exact headers
  return Papa.unparse(rows, {
    quotes: true,
    header: true,
    newline: "\n"
  });
}

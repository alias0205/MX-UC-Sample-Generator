/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MXTool } from "../types/mx";

const OPENAI_CHAT_COMPLETIONS_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

const GENERATION_PROMPT = `
You are a MarketXtractor MX-grade result generator.
Your task is to generate a COMPLETE, VALID, TOOL-SPECIFIC JSON result for ONE tool.

--------------------------------------
CORE OBJECTIVE
--------------------------------------
Generate:
- input_sample (realistic)
- UC1 (basic analysis)
- UC2 (enhanced analysis with items)
- UC3 (advanced, decision-ready, visionary)

--------------------------------------
CRITICAL RULES
--------------------------------------
- NEVER use placeholder content like "Sample keyword", "Metric 1", "Generic content".
- TOOLS-SPECIFIC content only.
- UC3 MUST feel like a high-level executive decision report.

--------------------------------------
BLOCK SCHEMA RULES
--------------------------------------
data_table -> uses "columns" (string[]) and "data" (object[])
recommendations -> uses "items" (object[])
insight_cards -> uses "items" (object[])
action_plan -> uses "steps" (object: {step, title, description}[])
metrics_grid -> uses "data" (object: {label, value}[])
decision_layer -> uses {status, score, reason}
`;

function buildGenerationPrompt(tool: MXTool): string {
  const toolSystemPrompt = tool.system_prompt?.trim();
  if (!toolSystemPrompt) return GENERATION_PROMPT;

  return `${GENERATION_PROMPT}

--------------------------------------
TOOL-SPECIFIC SYSTEM PROMPT
--------------------------------------
The following instructions come from this tool's CSV system_prompt field.
Apply them when generating input_sample and UC1/UC2/UC3 for this tool.

${toolSystemPrompt}
`;
}

const responseSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    input_sample: {
      type: "object",
      additionalProperties: true,
      description: "A realistic input example matching the tool's expected parameters.",
    },
    uc_results: {
      type: "object",
      additionalProperties: false,
      properties: {
        UC1: { "$ref": "#/$defs/uc_result" },
        UC2: { "$ref": "#/$defs/uc_result" },
        UC3: { "$ref": "#/$defs/uc_result" },
      },
      required: ["UC1", "UC2", "UC3"],
    },
  },
  required: ["input_sample", "uc_results"],
  "$defs": {
    uc_result: {
      type: "object",
      additionalProperties: false,
      properties: {
        summary_card: {
          type: "object",
          additionalProperties: false,
          properties: {
            title: { type: "string" },
            subtitle: { type: "string" },
            stats: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  label: { type: "string" },
                  value: { type: "string" },
                },
                required: ["label", "value"],
              },
            },
          },
          required: ["title", "subtitle", "stats"],
        },
        blocks: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: true,
            properties: {
              type: { type: "string" },
              title: { type: "string" },
            },
            required: ["type", "title"],
          },
        },
      },
      required: ["summary_card", "blocks"],
    },
  },
} as const;

function parseCsvJsonField(value: string | undefined): unknown {
  if (!value?.trim()) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function buildToolContext(tool: MXTool): string {
  return JSON.stringify({
    tool_name: tool.tool_name,
    command_slug: tool.command_slug,
    category: tool.category,
    subcategories: tool.subcategories,
    short_description: tool.short_description,
    long_description: tool.long_description,
    response_modes: tool.response_modes,
    result_engine: tool.result_engine,
    result_template_id: tool.result_template_id,
    input_schema: parseCsvJsonField(tool.input_schema_json),
    output_spec: parseCsvJsonField(tool.output_spec_json),
  }, null, 2);
}

async function readOpenAiError(response: Response): Promise<string> {
  try {
    const body = await response.json();
    return body?.error?.message || JSON.stringify(body);
  } catch {
    return response.statusText;
  }
}

export async function generateToolResultWithAI(tool: MXTool): Promise<{ input_sample: any; uc_results: any }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const response = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: buildGenerationPrompt(tool) },
        { role: "user", content: buildToolContext(tool) },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "marketxtractor_tool_result",
          strict: false,
          schema: responseSchema,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed (${response.status}): ${await readOpenAiError(response)}`);
  }

  const completion = await response.json();
  const content = completion?.choices?.[0]?.message?.content;
  if (typeof content !== "string" || content.trim().length === 0) {
    throw new Error("OpenAI response did not include JSON content.");
  }

  try {
    return JSON.parse(content);
  } catch (error) {
    console.error("OpenAI returned invalid JSON", error, content);
    throw new Error("OpenAI returned invalid JSON.");
  }
}

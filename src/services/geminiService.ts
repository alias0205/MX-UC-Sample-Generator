/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { MXTool, ToolResult, UCResult } from "../types/mx";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
❌ NEVER use placeholder content like "Sample keyword", "Metric 1", "Generic content".
❌ TOOLS-SPECIFIC content only.
❌ UC3 MUST feel like a high-level executive decision report.

--------------------------------------
BLOCK SCHEMA RULES
--------------------------------------
data_table -> uses "columns" (string[]) and "data" (object[])
recommendations -> uses "items" (object[])
insight_cards -> uses "items" (object[])
action_plan -> uses "steps" (object: {step, title, description}[])
metrics_grid -> uses "data" (object: {label, value}[])
decision_layer -> uses {status, score, reason}

--------------------------------------
INPUT TOOL DATA
--------------------------------------
`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    input_sample: {
      type: Type.OBJECT,
      description: "A realistic input example matching the tool's expected parameters."
    },
    uc_results: {
      type: Type.OBJECT,
      properties: {
        UC1: { $ref: "#/definitions/uc_result" },
        UC2: { $ref: "#/definitions/uc_result" },
        UC3: { $ref: "#/definitions/uc_result" }
      },
      required: ["UC1", "UC2", "UC3"]
    }
  },
  required: ["input_sample", "uc_results"],
  definitions: {
    uc_result: {
      type: Type.OBJECT,
      properties: {
        summary_card: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            stats: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.STRING }
                }
              }
            }
          },
          required: ["title", "subtitle", "stats"]
        },
        blocks: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              title: { type: Type.STRING }
            }
          }
        }
      },
      required: ["summary_card", "blocks"]
    }
  }
};

export async function generateToolResultWithAI(tool: MXTool): Promise<{ input_sample: any; uc_results: any }> {
  const toolContext = `
TOOL NAME: ${tool.tool_name}
COMMAND SLUG: ${tool.command_slug}
CATEGORY: ${tool.category}
INPUT SCHEMA: ${tool.input_schema_json}
OUTPUT SPEC: ${tool.output_spec_json}
SHORT DESCRIPTION: ${tool.short_description}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: GENERATION_PROMPT + toolContext,
    config: {
      responseMimeType: "application/json",
      // We'll use a more flattened schema since $ref isn't fully supported in some environments/parsers
      // and we want to be safe with the exact structure requested.
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          input_sample: { type: Type.OBJECT },
          uc_results: {
            type: Type.OBJECT,
            properties: {
              UC1: {
                type: Type.OBJECT,
                properties: {
                  summary_card: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      subtitle: { type: Type.STRING },
                      stats: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: { label: { type: Type.STRING }, value: { type: Type.STRING } }
                        }
                      }
                    }
                  },
                  blocks: { type: Type.ARRAY, items: { type: Type.OBJECT } }
                }
              },
              UC2: {
                type: Type.OBJECT,
                properties: {
                  summary_card: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      subtitle: { type: Type.STRING },
                      stats: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: { label: { type: Type.STRING }, value: { type: Type.STRING } }
                        }
                      }
                    }
                  },
                  blocks: { type: Type.ARRAY, items: { type: Type.OBJECT } }
                }
              },
              UC3: {
                type: Type.OBJECT,
                properties: {
                  summary_card: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      subtitle: { type: Type.STRING },
                      stats: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: { label: { type: Type.STRING }, value: { type: Type.STRING } }
                        }
                      }
                    }
                  },
                  blocks: { type: Type.ARRAY, items: { type: Type.OBJECT } }
                }
              }
            }
          }
        }
      }
    }
  });

  try {
    const data = JSON.parse(response.text);
    return data;
  } catch (e) {
    console.error("AI Generation failed to return valid JSON", e, response.text);
    throw new Error("AI Generation failed to return valid JSON");
  }
}

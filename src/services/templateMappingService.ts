import { MXTool, UCResult } from '../types/mx';
import { TemplatePlaceholderDefinition } from '../lib/htmlTemplateRegistry';

const OPENAI_CHAT_COMPLETIONS_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

type UseCaseId = 'UC1' | 'UC2' | 'UC3';
type OpenAiMappedTemplateId = 'MXT_001' | 'MXT_002' | 'MXT_003' | 'MXT_004' | 'MXT_005' | 'MXT_006' | 'MXT_007' | 'MXT_008';

interface MappingItem {
  name: string;
  value: string;
}

const RENDERER_OWNED_PLACEHOLDERS = new Set([
  'theme',
  'hero_pill_4', 'hero_pill_5', 'hero_pill_6',
  'hero_pill_04', 'hero_pill_05', 'hero_pill_06',
  'hero_badge_4', 'hero_badge_5', 'hero_badge_6',
  'hero_badge_04', 'hero_badge_05', 'hero_badge_06',
  'score_progress',
  'score_value',
  'score_label',
  'score_status',
]);

const mappingSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    mappings: {
      type: 'object',
      additionalProperties: false,
      properties: {
        UC1: { type: 'array', items: { $ref: '#/$defs/mapping_item' } },
        UC2: { type: 'array', items: { $ref: '#/$defs/mapping_item' } },
        UC3: { type: 'array', items: { $ref: '#/$defs/mapping_item' } },
      },
      required: ['UC1', 'UC2', 'UC3'],
    },
  },
  required: ['mappings'],
  $defs: {
    mapping_item: {
      type: 'object',
      additionalProperties: false,
      properties: {
        name: { type: 'string' },
        value: { type: 'string' },
      },
      required: ['name', 'value'],
    },
  },
} as const;

function toMapping(items: MappingItem[] | undefined, allowedNames: Set<string>): Record<string, string> {
  return (items ?? []).reduce<Record<string, string>>((mapping, item) => {
    if (!RENDERER_OWNED_PLACEHOLDERS.has(item.name) && allowedNames.has(item.name) && typeof item.value === 'string') {
      mapping[item.name] = item.value;
    }
    return mapping;
  }, {});
}

export async function generateTemplatePlaceholderMappings(
  templateId: OpenAiMappedTemplateId,
  tool: MXTool,
  ucResults: Record<UseCaseId, UCResult>,
  placeholderDefinitions: Record<UseCaseId, TemplatePlaceholderDefinition[]>
): Promise<Record<UseCaseId, Record<string, string>>> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not configured.');
  const mappableDefinitions = (['UC1', 'UC2', 'UC3'] as const).reduce<Record<UseCaseId, TemplatePlaceholderDefinition[]>>((result, ucId) => {
    result[ucId] = placeholderDefinitions[ucId].filter(item => !RENDERER_OWNED_PLACEHOLDERS.has(item.name));
    return result;
  }, {} as Record<UseCaseId, TemplatePlaceholderDefinition[]>);
  
  const response = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [
        {
          role: 'system',
          content: `You map MarketXtractor result JSON to an HTML template's placeholders. Return a value for every supplied placeholder name. Use only facts from the tool context and UC JSON. Do not infer facts that are absent; use "Not provided" when necessary. Preserve concise labels and values. For width or progress placeholders, return a numeric percentage from 0 to 100 without a percent sign. For dimension_status placeholders, return only one short badge word such as Strong, Good, Medium, Safe, Bad, Weak, High, Low, or Not provided. Do not copy a full metric value, sentence, rationale, or recommendation into a dimension_status placeholder.
            This is generation guidance for the hero pill (1-3) placeholders:
            {
                "position": 1,
                "json_key": "hero_pill_1",
                "placeholder": "{{hero_pill_1}}",
                "source": "dynamic tool result",
                "meaning": "Strongest capability, outcome, or result label",
                "generation_rule": "Use the most compelling capability or result label from the current tool output.",
                "examples": ["Decision Engine", "Intent Analyzer", "Opportunity Finder", "Recommendation Engine"]
            },
            {
                "position": 2,
                "json_key": "hero_pill_2",
                "placeholder": "{{hero_pill_2}}",
                "source": "result.confidence",
                "meaning": "Confidence signal",
                "generation_rule": "Convert numeric confidence into a readable confidence label.",
                "thresholds": [
                    { "condition": "confidence >= 0.90", "value": "High Confidence" },
                    { "condition": "0.75 <= confidence < 0.90", "value": "Good Confidence" },
                    { "condition": "0.60 <= confidence < 0.75", "value": "Moderate Confidence" },
                    { "condition": "confidence < 0.60", "value": "Low Confidence" }
                ]
            },
            {
                "position": 3,
                "json_key": "hero_pill_3",
                "placeholder": "{{hero_pill_3}}",
                "source": "confidence + ambiguity + recommendation severity",
                "meaning": "Risk or opportunity signal",
                "generation_rule": "Derive from actual result. Never default to Low Risk or High Risk.",
                "thresholds": [
                    { "condition": "confidence >= 0.90 and low ambiguity", "value": "Low Risk" },
                    { "condition": "0.75 <= confidence < 0.90", "value": "Medium Risk" },
                    { "condition": "0.60 <= confidence < 0.75", "value": "Elevated Risk" },
                    { "condition": "confidence < 0.60 or high ambiguity", "value": "High Risk" }
                ]
            },
          `,
        },
        {
          role: 'user',
          content: JSON.stringify({
            template_id: templateId,
            tool: {
              id: tool.id,
              tool_name: tool.tool_name,
              category: tool.category,
              subcategories: tool.subcategories,
              result_engine: tool.result_engine,
            },
            placeholders: mappableDefinitions,
            uc_results: ucResults,
          }),
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: `${templateId.toLowerCase()}_placeholder_mapping`,
          strict: false,
          schema: mappingSchema,
        },
      },
    }),
  })

  if (!response.ok) throw new Error(`OpenAI template mapping failed (${response.status}).`);
  const completion = await response.json();
  const content = completion?.choices?.[0]?.message?.content;
  if (typeof content !== 'string') throw new Error('OpenAI template mapping did not return JSON.');

  const parsed = JSON.parse(content) as { mappings?: Record<UseCaseId, MappingItem[]> };
  return (['UC1', 'UC2', 'UC3'] as const).reduce<Record<UseCaseId, Record<string, string>>>((result, ucId) => {
    result[ucId] = toMapping(parsed.mappings?.[ucId], new Set(mappableDefinitions[ucId].map(item => item.name)));
    return result;
  }, {} as Record<UseCaseId, Record<string, string>>);
}

export async function generateMxt001PlaceholderMappings(
  tool: MXTool,
  ucResults: Record<UseCaseId, UCResult>,
  placeholderDefinitions: Record<UseCaseId, TemplatePlaceholderDefinition[]>
): Promise<Record<UseCaseId, Record<string, string>>> {
  return generateTemplatePlaceholderMappings('MXT_001', tool, ucResults, placeholderDefinitions);
}

export async function generateMxt002PlaceholderMappings(
  tool: MXTool,
  ucResults: Record<UseCaseId, UCResult>,
  placeholderDefinitions: Record<UseCaseId, TemplatePlaceholderDefinition[]>
): Promise<Record<UseCaseId, Record<string, string>>> {
  return generateTemplatePlaceholderMappings('MXT_002', tool, ucResults, placeholderDefinitions);
}

export async function generateMxt003PlaceholderMappings(
  tool: MXTool,
  ucResults: Record<UseCaseId, UCResult>,
  placeholderDefinitions: Record<UseCaseId, TemplatePlaceholderDefinition[]>
): Promise<Record<UseCaseId, Record<string, string>>> {
  return generateTemplatePlaceholderMappings('MXT_003', tool, ucResults, placeholderDefinitions);
}

export async function generateMxt004PlaceholderMappings(
  tool: MXTool,
  ucResults: Record<UseCaseId, UCResult>,
  placeholderDefinitions: Record<UseCaseId, TemplatePlaceholderDefinition[]>
): Promise<Record<UseCaseId, Record<string, string>>> {
  return generateTemplatePlaceholderMappings('MXT_004', tool, ucResults, placeholderDefinitions);
}

export async function generateMxt005PlaceholderMappings(
  tool: MXTool,
  ucResults: Record<UseCaseId, UCResult>,
  placeholderDefinitions: Record<UseCaseId, TemplatePlaceholderDefinition[]>
): Promise<Record<UseCaseId, Record<string, string>>> {
  return generateTemplatePlaceholderMappings('MXT_005', tool, ucResults, placeholderDefinitions);
}

export async function generateMxt006PlaceholderMappings(
  tool: MXTool,
  ucResults: Record<UseCaseId, UCResult>,
  placeholderDefinitions: Record<UseCaseId, TemplatePlaceholderDefinition[]>
): Promise<Record<UseCaseId, Record<string, string>>> {
  return generateTemplatePlaceholderMappings('MXT_006', tool, ucResults, placeholderDefinitions);
}

export async function generateMxt007PlaceholderMappings(
  tool: MXTool,
  ucResults: Record<UseCaseId, UCResult>,
  placeholderDefinitions: Record<UseCaseId, TemplatePlaceholderDefinition[]>
): Promise<Record<UseCaseId, Record<string, string>>> {
  return generateTemplatePlaceholderMappings('MXT_007', tool, ucResults, placeholderDefinitions);
}

export async function generateMxt008PlaceholderMappings(
  tool: MXTool,
  ucResults: Record<UseCaseId, UCResult>,
  placeholderDefinitions: Record<UseCaseId, TemplatePlaceholderDefinition[]>
): Promise<Record<UseCaseId, Record<string, string>>> {
  return generateTemplatePlaceholderMappings('MXT_008', tool, ucResults, placeholderDefinitions);
}

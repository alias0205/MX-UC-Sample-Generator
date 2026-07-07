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
- If the tool uses result_template_id "MXT_001", generate data that can map to the client MXT_001 pattern exactly:
  - summary_card.title should be a decision goal sentence like "Choose the safest outreach channel for a high-value B2B lead" or "Choose the best content type for [input]".
  - recommendations must separate short option/action titles from rationale descriptions.
  - decision_layer.status should be short, and decision_layer.reason should be a complete final decision sentence.
  - risk/tolerance values must be level-only: "Low", "Medium", or "High".
  - confidence/score values must be 0-100 numeric strings where used as scores.
  - UC1 dimensions should represent Recommended Option, Confidence, and a constraint/avoidance item.
  - UC2/UC3 dimensions should represent Compliance Safety, Trust Alignment, Response Potential, and Brand Protection with numeric values and short statuses.
  - UC2 should include ranked options with Option, Score, Constraint, Risk Note.
  - UC3 should include risk pressure metrics, action plan items, warning items, and an executive final decision paragraph.
- If the tool uses result_template_id "MXT_002", generate data that can map to the client MXT_002 spam-trigger rewrite pattern exactly:
  - summary_card.title should be a short outreach/campaign subject, e.g. "WooCommerce cart recovery outreach".
  - summary stats should include Channel, Audience, and Tone as plain text values without emoji.
  - Recommendations must separate short rewrite/strategy titles from complete-sentence rationale descriptions.
  - UC1 should include a quick spam trigger review with Main Trigger and Clean Rewrite sentences, plus one final recommendation sentence.
  - UC2 should include a rewrite strategy breakdown with 2 strategy items and a trigger rewrite table with columns Original phrase, Risk level, Recommended rewrite.
  - UC3 should include 3 strategy items, a full trigger analysis table with Original phrase, Risk level, Recommended rewrite, Reason, a rewritten 3-message sequence, next actions, and a final recommendation.
  - Risk values must be exactly "Low", "Medium", or "High".
  - Original phrases and recommended rewrites must be short phrases; reasons, actions, and recommendation fields must be complete sentences.
- If the tool uses result_template_id "MXT_003", generate data that can map to the client MXT_003 decision-scenario pattern exactly:
  - summary_card.title should be a decision scenario sentence, e.g. "Choose the safest outreach channel for a high-value B2B lead".
  - summary stats should include Recommended Option, Confidence, and Risk Tolerance values.
  - Confidence must be a decimal string from 0.00 to 1.00, e.g. "0.86". Ranked option scores must be numeric strings from 0 to 100.
  - Risk tolerance must be level-only: "Low", "Medium", or "High".
  - UC1 should include one recommended ranked option with short name, one-sentence rationale, numeric score, and one concise final recommendation sentence.
  - UC2 should include scenario inputs named "Goal" and "Hard Constraint" with statuses "Set" and "Strict", plus three ranked options with short names, one-sentence rationales, and numeric score strings.
  - UC3 should include scenario inputs named "Goal", "Hard Constraint", and "Risk Mode" with statuses "Set", "Strict", and "Safe".
  - UC3 should include side-by-side comparison rows for "Compliance Safety", "Trust Context", and "Response Potential" with one-sentence texts and short tags like "Best Fit", "Acceptable", "Strong", "Medium", "Balanced", and "Scalable".
  - UC3 should include four rule sentences, three warning sentences, three action steps, and a final recommendation paragraph. Do not mix numbered action steps into the final recommendation body.
  - Option names, criteria, statuses, and tags must be short display labels. Reasoning belongs only in description/body fields.
- If the tool uses result_template_id "MXT_004", generate data that can map to the client MXT_004 Bulk SERP Export pattern exactly:
  - summary_card.title should be the search query text only, e.g. "best email marketing software". Do not use the tool name as the summary title.
  - summary stats should include Country, Intent, and Limit. Country should be a market label such as "United States". Intent should be a short label such as "Commercial Investigation". Limit should be formatted like "100 Organic Results".
  - UC1 should include a one-sentence SERP summary and exactly 3 organic SERP rows.
  - UC2 should include a 1-2 sentence SERP summary, exactly 6 organic SERP rows, 3 observed pattern sentences, and 3 SEO direction sentences.
  - UC3 should include a 1-2 sentence SERP summary, exactly 10 organic SERP rows, 3 observed pattern sentences, 3 intent distribution items, and 4 recommendation sentences.
  - Organic SERP rows must have columns #, Title, Domain, Snippet, Intent, Type. Position values are numeric strings. Domains are bare domains with no protocol or paths.
  - SERP row intents must be short labels such as "Commercial", "Informational", or "Transactional". Result types must be short labels such as "Review Listicle", "Software Comparison", "Vendor Page", "Educational Comparison", "Vendor Resource", "Comparison Guide", or "Review Directory".
  - Intent distribution values must combine percentage and description in the JSON, e.g. "68% Comparison and review pages", so the renderer can split value and description for HTML.
  - Observed patterns, SEO directions, and recommendations should be concise complete sentences. Do not put all recommendations into one long paragraph except in an additional aggregate value field if needed.
- If the tool uses result_template_id "MXT_005", generate data that can map to the client MXT_005 Keyword Difficulty Estimator pattern exactly:
  - summary_card.title should be the keyword/query text only, e.g. "best email marketing software". Do not use the tool name as the summary title.
  - summary stats should include Country, Language, and Intent. Country should be short such as "US", Language should be short such as "en", and Intent should be a phrase such as "Informational research".
  - Include a score object with label "Difficulty", numeric value 0-100, display_value as a numeric string, and risk_level.value such as "Low", "Medium", or "High".
  - UC1 should include 3 decision items: Difficulty Score, Ranking Effort, Best Use. Values are short numeric/categorical values; statuses are short badges such as "High", "Plan", "Pillar". Include one recommendation paragraph in sections.recommendation.value.
  - UC2 should include 4 score dimension decision items with numeric value strings, 3 factor_table rows with columns Factor, Score, Finding, and a recommendation value containing three complete recommendation sentences.
  - UC3 should include 4 categorical score dimension decision items, a competitive_breakdown value containing five label-number pairs, 4 seo_action_plan item values, 5 long_tail_cluster keyword phrase values, and one final_decision.value paragraph.
  - Numeric score, factor score, pressure value, and bar width values must be numeric strings 0-100 without percent signs.
  - Dimension labels, status badges, pressure labels, and long-tail keywords must be short display text. Evidence, action, recommendation, and final decision fields must be complete sentences.
- If the tool uses result_template_id "MXT_006", generate data that can map to the client MXT_006 TikTok Profile Scanner pattern exactly:
  - summary_card.title should be the scanned profile handle such as "@gymshark", and summary stats should include Platform "TikTok", Niche such as "Fitness Apparel", and Profile Type such as "Brand Creator".
  - Include topic.title as the profile handle, topic.platform.value, topic.niche.value, and topic.type.value. Keep these values short display text.
  - Keep score and decision as empty objects unless the tool's output spec explicitly requires them. The profile score belongs inside sections.gymshark.items[0].value.
  - Include sections.gymshark.title as the profile display name, e.g. "Gymshark". The first item value must combine profile card content in this style: "🎵 Gymshark @gymshark · Fitness / Apparel / Lifestyle Creator-led brand profile with workout, motivation, and community content. 84 ★★★★★ Profile Strength".
  - UC1 should include exactly 4 additional sections.gymshark attribute items: Niche Focus, Posting Frequency, Content Style, Audience Fit. Values must be short phrases such as "Fitness motivation", "High", "Workout clips", "Gym beginners". Include sections.quick_profile_summary.items with exactly 2 values beginning with headings "Core Positioning" and "Best Use", followed by complete sentence bodies.
  - UC2 should include exactly 4 additional sections.gymshark attribute items: Niche Clarity, Posting Frequency, Content Style, Engagement Direction. Include sections.profile_signals.items with exactly 5 heading-plus-sentence values: Content Pattern, Audience Direction, Profile Strength, Monetization Fit, Growth Signal.
  - UC3 should include exactly 4 additional sections.gymshark attribute items: Profile Strength, Niche Clarity, Content Consistency, Growth Signal. Include sections.executive_profile_summary.items with exactly 6 heading-plus-sentence values: Brand Position, Content Engine, Decision Context, Posting Frequency, Content Style, Audience Fit.
  - UC3 should include sections.insights.items with exactly 3 numbered complete-sentence values and sections.recommendations.items with exactly 4 numbered complete-sentence values.
  - Profile scores should follow the client range: UC1 around 84, UC2 around 88, UC3 around 91. The rating visual in combined profile-card text must be "★★★★★" and the label must be "Profile Strength".
  - Attribute labels and values are short display text. Detail, insight, and recommendation bodies are concise complete sentences. Do not generate long rationale paragraphs for short placeholders.
- If the tool uses result_template_id "MXT_007", generate data that can map to the client MXT_007 Headline Swipe Generator pattern exactly:
  - summary_card.title should be the campaign/topic title such as "AI email automation course launch". Summary stats should include Keyword, Audience, Level, Best Angle, and Recommended Use as short display values.
  - Include topic.title, topic.keyword.value, topic.audience.value, topic.level.value, topic.best_angle.value, and topic.recommended_use.value. Keep context values short, e.g. Keyword "AI email automation", Audience "Solo founders and small marketing teams", Level "Fast Swipe"/"Campaign Swipe"/"Conversion Swipe".
  - Keep score and decision as empty objects unless the tool's output spec explicitly requires them. The template uses sections.decision.value for UC2/UC3 decision copy.
  - Include sections.top_ranked_options.items as ranked headline swipe objects with rank, title, label, and reason. Titles are headline strings. Labels are short category tags such as Benefit, Revenue, Automation, Pain point, Action, Audience fit, Efficiency, or Coverage. Reasons are complete concise sentences.
  - UC1 should include exactly 3 top ranked options and sections.quick_recommendation.value as 1-2 recommendation sentences. Do not include decision/action/highlight sections for UC1 unless required by the tool output spec.
  - UC2 should include exactly 5 top ranked options, sections.decision.value, sections.action.value, and sections.recommendation.value. Decision/action/recommendation values must be complete concise sentences.
  - UC3 should include exactly 10 top ranked options, sections.decision.value, sections.action.value, sections.advanced_recommendation.value, and sections.highlight_angles.items with exactly 3 items: Hero angle, Email angle, Ad angle.
  - UC3 highlight values must be short angle phrases such as "Save time + better follow-up", "Recover missed leads", and "No enterprise complexity", not long rationale sentences.
  - Hero pills should use "Swipe Generator", a confidence label, "Low Risk" or "Opportunity Signal", the tool id, mode Basic/Pro/Pro+, and "AI Engine V1".
  - Do not generate long rationale paragraphs for short context, label, headline, level, angle, use, or highlight fields.
- If the tool uses result_template_id "MXT_008", generate data that can map to the client MXT_008 Zapier n8n Idea Generator pattern exactly:
  - summary_card.title should be the automation brief title. Summary stats should include Use Case, Stack, Constraint, Confidence, and Setup as short display values.
  - Include topic.title, topic.use_case.value, topic.stack.value, topic.constraint.value, topic.confidence.value, and topic.setup.value. Use Case is a complete concise sentence. Stack, constraint, confidence, and setup are short display labels.
  - Keep score and decision as empty objects unless the tool's output spec explicitly requires them.
  - Include sections.key_metrics.items with exactly 3 metric objects. Each metric has label, display_value, and description. display_value keeps percent signs where appropriate, e.g. "88%", "91%", or "94%".
  - UC1 should include sections.risk_assessment_idea_summary.value as one concise summary paragraph, key metrics, and sections.idea_summary.items with exactly 1 item containing title and body.
  - UC2 should include sections.decision_engine_summary.value, key metrics, sections.insight_blocks.items with exactly 3 title/body items, and sections.workflow_explanation.value.
  - UC3 should include sections.risk_assessment_automation_blueprint.value, key metrics, sections.insight_blocks.items with exactly 3 title/body items, sections.workflow_explanation.value, sections.full_automation_pipeline.items with exactly 5 rank/step/title/description items, sections.recommendations.items with exactly 3 body/value items, and sections.risks_opportunities.items with exactly 3 body/value items.
  - UC3 pipeline titles should be short step labels such as Capture, Normalize, Score, Recommend, and Log + Alert. Pipeline descriptions, recommendation bodies, and risk/opportunity bodies must be complete concise sentences.
  - Recommendation and risk/opportunity value strings may include leading numbering for JSON fidelity, but renderer-visible text must be usable after stripping numbering.
  - Hero pills should use Risk Workflow/Decision Engine/Decision Blueprint, a confidence label, a risk label such as Low Risk or Low-Medium Risk, the tool id, mode Basic/Pro/Pro+, and "AI Engine V1".
  - Do not generate long rationale paragraphs for short context, metric label/value, insight title, setup, stack, or pipeline title fields.

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

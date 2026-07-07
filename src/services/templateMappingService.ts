import { MXTool, UCResult } from '../types/mx';
import { TemplatePlaceholderDefinition } from '../lib/htmlTemplateRegistry';

const OPENAI_CHAT_COMPLETIONS_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

type UseCaseId = 'UC1' | 'UC2' | 'UC3';
export const OPENAI_MAPPED_TEMPLATE_IDS = ['MXT_001', 'MXT_002', 'MXT_003', 'MXT_004', 'MXT_005', 'MXT_006', 'MXT_007', 'MXT_008'] as const;

export type OpenAiMappedTemplateId = typeof OPENAI_MAPPED_TEMPLATE_IDS[number];

const USE_CASE_IDS = ['UC1', 'UC2', 'UC3'] as const;

interface MappingItem {
  name: string;
  value: string;
}

const RENDERER_OWNED_PLACEHOLDERS = new Set([
  'theme',
  'tool_icon', 'hero_icon',
  'tool_title', 'hero_title',
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

const HERO_PILL_MAPPING_GUIDANCE = `This is generation guidance for the hero pill (1-3) placeholders:
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
},`;

function toMapping(items: MappingItem[] | undefined, allowedNames: Set<string>): Record<string, string> {
  return (items ?? []).reduce<Record<string, string>>((mapping, item) => {
    if (!RENDERER_OWNED_PLACEHOLDERS.has(item.name) && allowedNames.has(item.name) && typeof item.value === 'string') {
      mapping[item.name] = item.value;
    }
    return mapping;
  }, {});
}

export function isOpenAiMappedTemplateId(templateId: string): templateId is OpenAiMappedTemplateId {
  return (OPENAI_MAPPED_TEMPLATE_IDS as readonly string[]).includes(templateId);
}

const templateSpecificMappingGuidanceCache = new Map<OpenAiMappedTemplateId, string>();

function getTemplateSpecificMappingGuidance(templateId: OpenAiMappedTemplateId): string {
  const cachedGuidance = templateSpecificMappingGuidanceCache.get(templateId);
  if (cachedGuidance !== undefined) return cachedGuidance;

  const guidance = buildTemplateSpecificMappingGuidance(templateId);
  templateSpecificMappingGuidanceCache.set(templateId, guidance);
  return guidance;
}

function buildTemplateSpecificMappingGuidance(templateId: OpenAiMappedTemplateId): string {
  if (templateId === 'MXT_002') {
    return `
--------------------------------------
MXT_002 CLIENT SAMPLE CONTRACT
--------------------------------------
Map MXT_002 placeholders to the client output JSON pattern exactly. Treat the supplied UC JSON as the source, but format every placeholder like the MXT_002 UC1/UC2/UC3 samples.

Common hero/topic rules:
- hero_icon and hero_title are renderer-owned from CSV tool fields; do not map them.
- hero_pill_1 must be a short engine label such as "Rewrite Engine".
- hero_pill_2 must be a confidence label only: "High Confidence", "Good Confidence", "Moderate Confidence", or "Low Confidence".
- hero_pill_3 must be a risk label with word Risk: "Low Risk", "Medium Risk", or "High Risk".
- summary_title maps to topic.title. It is a short campaign/outreach subject such as "WooCommerce cart recovery outreach". Do not use a tool name, sentence rationale, or placeholder label.
- summary_channel maps to topic.channel.value but WITHOUT emoji because the HTML template already renders the icon. Example: "Email".
- summary_audience maps to topic.audience.value but WITHOUT emoji. Example: "WooCommerce store owners".
- summary_tone maps to topic.tone.value but WITHOUT emoji. Example: "Professional".

UC1 Basic pattern:
- brief_body_01 is the Main Trigger sentence. Example: "\"Free audit\" may sound promotional when paired with sales recovery language."
- brief_body_02 is the Clean Rewrite sentence. Example: "Use \"quick checkout review\" to make the offer feel helpful and consultative."
- recommendation_body is one final recommendation sentence. Example: "Replace promotional wording with softer value language before sending the first outreach message."

UC2 Pro pattern:
- strategy_title_01..02 are short title-case strategy names, no numbering. Examples: "Soften Promotional Claims", "Reduce Revenue Pressure".
- strategy_body_01..02 are one sentence each.
- rewrite_original_01..03 are short original trigger phrases.
- rewrite_risk_01..03 are exactly "Low", "Medium", or "High".
- rewrite_recommendation_01..03 are short replacement phrases.
- recommendation_body is one concise final recommendation sentence.

UC3 Pro+ pattern:
- strategy_title_01..03 are short title-case strategy names, no numbering.
- strategy_body_01..03 are one sentence each.
- rewrite_original_01..04 are short original trigger phrases.
- rewrite_risk_01..04 are exactly "Low", "Medium", or "High".
- rewrite_recommendation_01..04 are short replacement phrases.
- rewrite_reason_01..04 are short reason sentences.
- sequence_title_01..03 start with "Message 1:", "Message 2:", "Message 3:" and are short subject-style titles.
- sequence_body_01..03 are message body paragraphs, 1-2 sentences.
- action_body_01..03 are short imperative next-action sentences.
- recommendation_body is a final recommendation paragraph, 1-2 concise sentences.

Formatting constraints:
- Short value fields must not contain rationale, JSON, arrays, markdown, or labels.
- Sentence fields must be complete sentences with punctuation.
- Do not include the static section icons in placeholder values.
- Do not invent static sample values when the UC JSON contains equivalent tool-specific values; transform the current UC JSON into this exact shape and style.
`;
  }

  if (templateId === 'MXT_003') {
    return `
--------------------------------------
MXT_003 CLIENT SAMPLE CONTRACT
--------------------------------------
Map MXT_003 placeholders to the client Decision Scenario Simulator JSON pattern exactly. Treat the supplied UC JSON as the source, but format every placeholder like the MXT_003 UC1/UC2/UC3 samples.

Common hero/topic rules:
- hero_icon and hero_title are renderer-owned from CSV tool fields; do not map them.
- hero_pill_1 must be "Decision Engine" or another two-word engine label.
- hero_pill_2 must be confidence label only: "High Confidence", "Good Confidence", "Moderate Confidence", or "Low Confidence".
- hero_pill_3 must be risk label with word Risk: "Low Risk", "Medium Risk", or "High Risk".
- comparison_summary_title maps to topic.title. It must be a decision scenario sentence such as "Choose the safest outreach channel for a high-value B2B lead".
- comparison_recommended_option maps to topic.recommended.value. It must be a short title-case option such as "LinkedIn Message", "Cold Email", or "SMS Follow-Up".
- comparison_confidence maps to topic.confidence.value. It must be a decimal string from 0.00 to 1.00, e.g. "0.86".
- comparison_risk_tolerance maps to topic.tolerance.value. It must be exactly "Low", "Medium", or "High".

UC1 Basic pattern:
- ranked_option_name_01 is the recommended option short name.
- ranked_option_description_01 is one sentence explaining why it wins.
- ranked_option_status_01 is a numeric score string 0-100, e.g. "86".
- final_recommendation_body is 1-2 concise final recommendation sentences.

UC2 Pro pattern:
- input_name_01..02 are short labels: "Goal", "Hard Constraint".
- input_description_01..02 are complete scenario input sentences.
- input_status_01..02 are short badges: "Set", "Strict", or "Safe".
- ranked_option_name_01..03 are short title-case options.
- ranked_option_description_01..03 are one sentence each.
- ranked_option_status_01..03 are numeric score strings 0-100.
- final_recommendation_body is 1-2 concise recommendation sentences.

UC3 Pro+ pattern:
- input_name_01..03: "Goal", "Hard Constraint", "Risk Mode" style short labels.
- input_description_01..03 are complete scenario input sentences.
- input_status_01..03 are short badges: "Set", "Strict", "Safe".
- ranked options follow UC2 format.
- comparison_option_a_name and comparison_option_b_name are option names, e.g. "LinkedIn Message" and "Cold Email".
- comparison_criteria_01..03 are short criteria labels: "Compliance Safety", "Trust Context", "Response Potential".
- comparison_option_a_text_* and comparison_option_b_text_* are one-sentence comparison explanations.
- comparison_option_a_tag_* and comparison_option_b_tag_* are short tags: "Best Fit", "Acceptable", "Strong", "Medium", "Balanced", "Scalable".
- rule_applied_01..04 are complete rule sentences without leading checkmarks.
- warning_body_01..03 are concise warning sentences.
- action_step_title_01..03 are short imperative titles.
- action_step_body_01..03 are complete action body sentences.
- final_recommendation_body is the final recommendation paragraph only; do not include numbered action steps in this field.

Formatting constraints:
- Short option, criteria, status, and tag fields must not contain rationale or punctuation-heavy paragraphs.
- Score fields are numeric strings only, 0-100. Confidence is decimal 0.00-1.00.
- Sentence fields must be complete sentences with punctuation.
- Do not include static section icons, JSON, arrays, markdown, or placeholder labels in values.
- Do not invent static sample values when the UC JSON contains equivalent tool-specific values; transform the current UC JSON into this exact shape and style.
`;
  }

  if (templateId === 'MXT_004') {
    return `
--------------------------------------
MXT_004 CLIENT SAMPLE CONTRACT
--------------------------------------
Map MXT_004 placeholders to the client Bulk SERP Export JSON pattern exactly. Treat the supplied UC JSON as the source, but format every placeholder like the MXT_004 UC1/UC2/UC3 final HTML samples.

Common hero/topic rules:
- hero_icon and hero_title are renderer-owned from CSV tool fields; do not map them.
- hero_pill_1 must be "Data Extraction" or another short extraction capability label.
- hero_pill_2 must be confidence label only: "High Confidence", "Good Confidence", "Moderate Confidence", or "Low Confidence".
- hero_pill_3 must be risk label with word Risk: "Low Risk", "Medium Risk", or "High Risk".
- snapshot_query maps to topic.title. It must be the search query text only, e.g. "best email marketing software". Do not use a tool title or sentence rationale.
- snapshot_source maps to topic.country.value. It is a country/market label such as "United States". If the JSON intentionally leaves it empty and there is no context, use "Not provided".
- snapshot_intent maps to topic.intent.value. It is a short search-intent label such as "Commercial Investigation".
- snapshot_export_limit maps to topic.limit.value. It must be formatted like "100 Organic Results".
- snapshot_summary maps to sections.summary_card.value. It is a concise SERP summary paragraph, 1 sentence for UC1 and 1-2 sentences for UC2/UC3.

Organic SERP row rules:
- UC1 maps exactly 3 result rows. UC2 maps exactly 6 result rows. UC3 maps exactly 10 result rows.
- result_position_01..10 are numeric strings only: "1", "2", etc.
- result_title_* are page title strings, title-style text, no rationale.
- result_domain_* are bare domains only, e.g. "forbes.com". No protocol, paths, or URL query strings.
- result_snippet_* are complete snippet sentences.
- result_intent_* are short labels such as "Commercial", "Informational", or "Transactional".
- result_type_* are short labels such as "Review Listicle", "Software Comparison", "Vendor Page", "Educational Comparison", "Vendor Resource", "Comparison Guide", or "Review Directory".

UC1 Basic pattern:
- Include only the snapshot brief, summary card, and 3 organic SERP rows.
- Do not populate observed pattern, intent distribution, or recommendation placeholders for UC1 unless the template asks for them.

UC2 Pro pattern:
- observed_pattern_01..03 map to sections.observed_patterns.items value strings. Remove leading numbering from values.
- optimization_opportunity_01..03 map to sections.seo_direction.items value strings. They are short SEO direction sentences.
- UC2 does not use intent-distribution metric placeholders unless the template asks for them.

UC3 Pro+ pattern:
- observed_pattern_01..03 follow UC2 style.
- pattern_metric_label_01..03 map to sections.intent_distribution.items labels, e.g. "Commercial", "Informational", "Transactional".
- pattern_metric_value_01..03 map to the percentage only, e.g. "68%", "22%", "10%".
- pattern_metric_description_01..03 map to the text after the percentage, e.g. "Comparison and review pages".
- optimization_opportunity_01..04 map to sections.recommendations.items value strings. Remove leading numbering from values.

Formatting constraints:
- Short value fields must not contain explanations, JSON, arrays, markdown, placeholder names, or section labels.
- Sentence fields must be complete sentences with punctuation.
- Do not include static section icons in placeholder values.
- Use the current UC JSON values when present; transform them into this exact shape and style rather than copying whole objects or combined lists.
`;
  }

  if (templateId === 'MXT_005') {
    return `
--------------------------------------
MXT_005 CLIENT SAMPLE CONTRACT
--------------------------------------
Map MXT_005 placeholders to the client Keyword Difficulty Estimator JSON pattern exactly. Treat the supplied UC JSON as the source, but format every placeholder like the MXT_005 UC1/UC2/UC3 final HTML samples.

Common hero/topic/score rules:
- hero_icon, hero_title, score_value, score_progress, score_label, score_status, hero_pill_4, hero_pill_5, and hero_pill_6 are renderer-owned; do not map them.
- hero_pill_1 must be a short intent label such as "Informational Intent".
- hero_pill_2 must be a confidence label such as "High Confidence", "Good Confidence", "Moderate Confidence", or "Low Confidence".
- hero_pill_3 must be a competition label such as "Low Competition", "Medium Competition", or "High Competition".
- audit_subject maps to topic.title. It must be keyword/query text only, e.g. "best email marketing software". Do not use the tool name or a sentence rationale.
- audit_context_country maps to topic.country.value. Short market code or country label, e.g. "US".
- audit_context_language maps to topic.language.value. Short language code, e.g. "en".
- audit_context_intent maps to topic.intent.value. Short phrase, e.g. "Informational research".
- score_value and score_progress map to score.display_value/value as numeric strings 0-100. score_label maps to score.label, usually "Difficulty". score_status maps to score.risk_level.value, e.g. "High".

UC1 Basic pattern:
- dimension_name_01..03 map to decision.items labels: "Difficulty Score", "Ranking Effort", "Best Use" style labels.
- dimension_value_01..03 are short values: numeric score or one-word labels such as "Hard" and "Later".
- dimension_status_01..03 are short badges such as "High", "Plan", "Pillar".
- final_recommendation_body maps to sections.recommendation.value. It must be 1-2 complete recommendation sentences.

UC2 Pro pattern:
- dimension_name_01..04 map to decision.items labels such as "SERP Authority", "Commercial Pressure", "Content Depth Needed", "Long-tail Opening".
- dimension_value_01..04 are numeric score strings 0-100.
- dimension_status_01..04 are short badges such as "Strong", "High", "Deep", "Usable".
- audit_issue_name_01..03 map to factor_table row Factor cells.
- audit_issue_severity_01..03 map to factor_table row Score cells as numeric strings 0-100.
- audit_issue_evidence_01..03 map to factor_table row Finding cells as complete sentences.
- audit_action_01..03 split sections.recommendation.value into three complete recommendation sentences.

UC3 Pro+ pattern:
- dimension_name_01..04 map to decision.items labels such as "Authority Gap", "Intent Value", "Content Investment", "Entry Strategy".
- dimension_value_01..04 are short categorical values such as "High", "Strong", "Heavy", "Cluster".
- dimension_status_01..04 are short badges such as "Hard", "Valuable", "Deep", "Best".
- audit_pressure_label_01..05 map to competitive_breakdown labels, e.g. "Review sites competing".
- audit_pressure_value_01..05 are numeric strings 0-100. audit_pressure_width_01..05 are the same numeric strings for bar width.
- audit_action_01..04 map to seo_action_plan item values. Remove leading numbering.
- long_tail_keyword_01..05 map to long_tail_cluster item values. They are keyword phrases, not sentences, and should not end with punctuation.
- final_recommendation_body maps to final_decision.value. It must be 1-2 complete final decision sentences.

Formatting constraints:
- Short labels, values, statuses, pressure labels, and keywords must not contain rationale paragraphs, JSON, arrays, markdown, or placeholder names.
- Numeric score/width fields are numeric strings only, 0-100, without percent signs.
- Evidence, action, recommendation, and final decision fields must be complete sentences with punctuation.
- Do not include static section icons in placeholder values.
- Use the current UC JSON values when present; transform them into this exact shape and style rather than copying whole objects or combined lists.
`;
  }

  if (templateId === 'MXT_006') {
    return `
--------------------------------------
MXT_006 CLIENT SAMPLE CONTRACT
--------------------------------------
Map MXT_006 placeholders to the client TikTok Profile Scanner JSON pattern exactly. Treat the supplied UC JSON as the source, but format every placeholder like the MXT_006 UC1/UC2/UC3 final HTML samples.

Common hero/topic/profile rules:
- hero_icon and hero_title are renderer-owned from CSV tool fields; do not map them.
- hero_pill_1 must be "Creative Profile" or another short profile capability label.
- hero_pill_2 must be a confidence label only: "High Confidence", "Good Confidence", "Moderate Confidence", or "Low Confidence".
- hero_pill_3 must be a risk label with word Risk: "Low Risk", "Medium Risk", or "High Risk".
- profile_scan_title maps to topic.title and must be a handle-style value such as "@gymshark". Do not use a tool title or sentence rationale.
- profile_context_01 maps to topic.platform.value and should be "TikTok" style platform text only.
- profile_context_02 maps to topic.niche.value and should be short, e.g. "Fitness Apparel".
- profile_context_03 maps to topic.type.value and should be short, e.g. "Brand Creator".
- profile_name maps to sections.gymshark.title and should be the profile display name, e.g. "Gymshark".
- profile_metadata maps to the handle/category metadata from sections.gymshark.items[0].value, e.g. "@gymshark · Fitness / Apparel / Lifestyle".
- profile_scan_summary maps to the summary sentence from sections.gymshark.items[0].value, e.g. "Creator-led brand profile with workout, motivation, and community content."
- profile_score maps to the numeric score embedded before the stars in sections.gymshark.items[0].value, e.g. "84", "88", or "91".
- profile_rating_visual must be exactly five filled stars: "★★★★★".
- profile_score_label must be "Profile Strength".
- initials and profile_image_url are renderer-owned fallbacks; do not map them unless the source JSON has a real image URL.

UC1 Basic pattern:
- attribute_label_01..04 and attribute_value_01..04 map to the four attribute items after the first profile-card item in sections.gymshark.items.
- Attribute labels and values are short display text. Example labels: "Niche Focus", "Posting Frequency", "Content Style", "Audience Fit". Example values: "Fitness motivation", "High", "Workout clips", "Gym beginners".
- profile_detail_title_01..02 and profile_detail_body_01..02 map to sections.quick_profile_summary.items. Split each value into short heading and complete sentence body. Example headings: "Core Positioning", "Best Use".

UC2 Pro pattern:
- Attribute labels/values follow UC1 style but use the UC2 labels such as "Niche Clarity", "Posting Frequency", "Content Style", "Engagement Direction".
- profile_detail_title_01..05 and profile_detail_body_01..05 map to sections.profile_signals.items. Split each value into heading and complete sentence body.
- Example headings: "Content Pattern", "Audience Direction", "Profile Strength", "Monetization Fit", "Growth Signal".

UC3 Pro+ pattern:
- Attribute labels/values follow UC1 style but use UC3 labels such as "Profile Strength", "Niche Clarity", "Content Consistency", "Growth Signal".
- profile_detail_title_01..06 and profile_detail_body_01..06 map to sections.executive_profile_summary.items. Split each value into heading and complete sentence body.
- lead_signal_01..03 map to sections.insights.items value strings. Remove leading numbering like "1." and return complete sentences only.
- outreach_context_01..04 map to sections.recommendations.items value strings. Remove leading numbering like "1." and return complete sentences only.

Formatting constraints:
- Short handle, context, profile name, attribute label, attribute value, score label, and detail title fields must not contain rationale paragraphs, JSON, arrays, markdown, placeholder names, or section labels.
- Score fields are numeric strings only. Rating visual is stars only.
- Detail bodies, profile summary, insights, and recommendations must be complete concise sentences with punctuation.
- Do not include static section icons in placeholder values.
- Use the current UC JSON values when present; transform them into this exact shape and style rather than copying combined objects or long lists.
`;
  }

  if (templateId === 'MXT_007') {
    return `
--------------------------------------
MXT_007 CLIENT SAMPLE CONTRACT
--------------------------------------
Map MXT_007 placeholders to the client Headline Swipe Generator JSON pattern exactly. Treat the supplied UC JSON as the source, but format every placeholder like the MXT_007 UC1/UC2/UC3 final HTML samples.

Common hero/topic rules:
- hero_icon and hero_title are renderer-owned from CSV tool fields; do not map them.
- hero_pill_1 must be "Swipe Generator" or another short swipe-generation capability label.
- hero_pill_2 must be confidence label only: "High Confidence", "Good Confidence", "Moderate Confidence", or "Low Confidence".
- hero_pill_3 must be a short signal label from the JSON, e.g. "Low Risk" or "Opportunity Signal". Do not write a sentence.
- hero_pill_4, hero_pill_5, and hero_pill_6 are renderer-owned; do not map them.
- ranked_result_title maps to topic.title and must be the campaign/topic title only, e.g. "AI email automation course launch". Do not use the tool name or a sentence rationale.
- ranked_context_keyword maps to topic.keyword.value. It is a short keyword phrase such as "AI email automation".
- ranked_context_audience maps to topic.audience.value. It is a concise audience phrase such as "Solo founders and small marketing teams".
- ranked_context_level maps to topic.level.value. It must be a short label such as "Fast Swipe", "Campaign Swipe", or "Conversion Swipe".
- ranked_context_best_angle maps to topic.best_angle.value. It must be a short angle phrase such as "Save time + better follow-up".
- ranked_context_use maps to topic.recommended_use.value. It must be a short usage phrase such as "Landing page hero", "Landing page + email subject lines", or "Full launch funnel".

Ranked option rules:
- ranked_option_title_01..10 map to sections.top_ranked_options.items[].title. These are headline swipe strings, not explanations.
- ranked_option_label_01..10 map to sections.top_ranked_options.items[].label. These are short category tags such as "Benefit", "Revenue", "Automation", "Pain point", "Action", "Audience fit", "Efficiency", or "Coverage".
- ranked_option_reason_01..10 map to sections.top_ranked_options.items[].reason. These must be complete concise reason sentences.
- UC1 maps exactly 3 ranked options. UC2 maps exactly 5 ranked options. UC3 maps exactly 10 ranked options.

UC1 Basic pattern:
- Do not populate decision, action, or highlight placeholders unless the UC1 template asks for them.
- ranked_recommendation_body maps to sections.quick_recommendation.value. It must be 1-2 complete recommendation sentences.

UC2 Pro pattern:
- ranked_decision_body maps to sections.decision.value. It must be 1-2 complete decision sentences.
- ranked_action_body maps to sections.action.value. It must be 1-2 complete action sentences.
- ranked_recommendation_body maps to sections.recommendation.value. It must be a concise recommendation paragraph.

UC3 Pro+ pattern:
- ranked_decision_body maps to sections.decision.value. It must be 1-2 complete decision sentences.
- ranked_action_body maps to sections.action.value. It must be 1-2 complete action sentences.
- highlight_label_01..03 map to sections.highlight_angles.items[].label. Examples: "Hero angle", "Email angle", "Ad angle".
- highlight_body_01..03 map to sections.highlight_angles.items[].value. Examples: "Save time + better follow-up", "Recover missed leads", "No enterprise complexity". Keep these as short phrases, not sentences.
- ranked_recommendation_body maps to sections.advanced_recommendation.value. It must be a concise recommendation paragraph.

Formatting constraints:
- Short topic, context, level, angle, use, category label, and highlight fields must not contain rationale paragraphs, JSON, arrays, markdown, placeholder names, or section labels.
- Headline title fields should read like marketing headlines and should not end with punctuation unless the source headline does.
- Reason, decision, action, and recommendation body fields must be complete concise sentences with punctuation.
- Do not include static section icons in placeholder values.
- Use the current UC JSON values when present; transform them into this exact shape and style rather than copying combined objects or long lists.
`;
  }

  if (templateId === 'MXT_008') {
    return `
--------------------------------------
MXT_008 CLIENT SAMPLE CONTRACT
--------------------------------------
Map MXT_008 placeholders to the client Zapier n8n Idea Generator automation-brief JSON pattern exactly. Treat the supplied UC JSON as the source, but format every placeholder like the MXT_008 UC1/UC2/UC3 final HTML samples.

Common hero/topic rules:
- hero_icon and hero_title are renderer-owned from CSV tool fields; do not map them.
- hero_pill_1 must be a short automation label such as "Risk Workflow", "Decision Engine", or "Decision Blueprint".
- hero_pill_2 must be confidence label only: "High Confidence", "Good Confidence", "Moderate Confidence", or "Low Confidence".
- hero_pill_3 must be a short risk label such as "Low Risk" or "Low-Medium Risk".
- hero_pill_4, hero_pill_5, and hero_pill_6 are renderer-owned; do not map them.
- automation_title maps to topic.title. It must be an automation brief title such as "Choose the safest outreach channel for a high-value B2B lead" or "Risk Assessment Decision Engine for B2B Outreach Routing".
- automation_use_case maps to topic.use_case.value. It is a complete concise sentence, e.g. "Safest outreach channel selection for a high-value B2B lead."
- automation_stack maps to topic.stack.value. It is a short tool stack phrase such as "Zapier + n8n + CRM + Slack".
- automation_constraint maps to topic.constraint.value. It is a short constraint phrase such as "Low risk tolerance and clear rationale required".
- automation_confidence maps to topic.confidence.value. It is a short label such as "High Confidence".
- automation_setup maps to topic.setup.value. It is a short setup label: "Starter setup", "Intermediate setup", or "Advanced setup".

Summary and metric rules:
- summary_title maps to the UC-specific summary section title with the icon removed: UC1 sections.risk_assessment_idea_summary.title, UC2 sections.decision_engine_summary.title, UC3 sections.risk_assessment_automation_blueprint.title.
- summary_body maps to that same section's value. It must be one concise paragraph, not a list.
- metric_label_01..03 map to sections.key_metrics.items[].label. Examples: "Confidence", "Complexity", "Automation Depth", "Risk Level".
- metric_value_01..03 map to sections.key_metrics.items[].display_value. Keep percent signs where present, e.g. "88%", "91%", "94%". Other values are short labels such as "Low", "Medium", "Advanced", or "Low-Medium".
- metric_body_01..03 map to sections.key_metrics.items[].description. These must be complete concise sentences.

UC1 Basic pattern:
- idea_title maps to sections.idea_summary.items[0].title. It is a short idea title such as "Risk-aware outreach routing".
- idea_body maps to sections.idea_summary.items[0].body. It is a complete sentence or short paragraph.
- Do not populate insight, workflow, pipeline, recommendation, or risk/opportunity placeholders unless the UC1 template asks for them.

UC2 Pro pattern:
- insight_title_01..03 and insight_body_01..03 map to sections.insight_blocks.items[].title/body. Titles are short labels; bodies are complete sentences.
- workflow_explanation maps to sections.workflow_explanation.value. It must be a concise process explanation paragraph.
- UC2 does not use pipeline, recommendation, or risks/opportunities placeholders unless the template asks for them.

UC3 Pro+ pattern:
- Insight and workflow fields follow UC2 style.
- pipeline_step_title_01..05 and pipeline_step_body_01..05 map to sections.full_automation_pipeline.items[].title/description. Titles are one-word or short step labels such as "Capture", "Normalize", "Score", "Recommend", "Log + Alert". Bodies are complete sentences.
- recommendation_01..03 map to sections.recommendations.items[].body or value with leading numbering removed. They are complete recommendation sentences.
- risk_opportunity_01..03 map to sections.risks_opportunities.items[].body or value with leading numbering removed. They are complete risk/opportunity sentences.

Formatting constraints:
- Short context, stack, confidence, setup, metric label, metric value, insight title, and pipeline title fields must not contain rationale paragraphs, JSON, arrays, markdown, placeholder names, or section labels.
- Summary, metric body, idea body, insight body, workflow explanation, pipeline body, recommendation, and risk/opportunity fields must be complete concise sentences with punctuation.
- Remove static section icons from placeholder values.
- Keep score and decision empty if the UC JSON uses this client pattern; do not force them into placeholders.
- Use the current UC JSON values when present; transform them into this exact shape and style rather than copying combined objects or long lists.
`;
  }

  if (templateId !== 'MXT_001') return '';

  return `
--------------------------------------
MXT_001 CLIENT SAMPLE CONTRACT
--------------------------------------
Map MXT_001 placeholders to the client output JSON pattern exactly. Treat the supplied UC JSON as the data source, but format every placeholder like these samples.

Common hero/topic/score rules:
- hero_icon and hero_title are renderer-owned from CSV tool fields; do not map them.
- hero_pill_1: short engine label, usually "Decision Engine".
- hero_pill_2: confidence label only: "High Confidence", "Good Confidence", "Moderate Confidence", or "Low Confidence".
- hero_pill_3: risk label with word Risk: "Low Risk", "Medium Risk", or "High Risk".
- decision_title maps to topic.title. It must be a decision goal sentence, not a tool title and not an explanation. Style: "Choose the safest outreach channel for a high-value B2B lead" or "Choose the best content type for [input]".
- decision_summary maps only to the summary/rationale paragraph when the template includes it. It must be a complete sentence, 18-32 words, never a label, score, or one-word status.
- decision_recommended maps to topic.recommended.value only. It must be a short option/action value such as "LinkedIn message", "Comparison guide", "Product page", "Blog article". Never include "because" or rationale.
- decision_tolerance maps to topic.risk_tolerance.value or topic.tolerance.value only. It must be exactly "Low", "Medium", or "High".
- risk_level must be exactly "Low", "Medium", or "High".
- score_value and score_progress are renderer-owned. Any score-like placeholder value must be a 0-100 number without percent unless the sample explicitly uses percent text.

UC1 Basic pattern:
- decision_title: topic.title decision goal sentence.
- decision_recommended: recommended option/action short text.
- decision_tolerance: risk tolerance level only.
- dimension_name_01/value/status: "Recommended Option" / short option like "LinkedIn" / "Safe".
- dimension_name_02/value/status: "Confidence" / percent text like "78%" / "Good".
- dimension_name_03/value/status: an avoid/review constraint like "SMS Follow-up" / "Avoid" / "Opt-in".
- action/final recommendation text: one complete rationale sentence, similar to "Use LinkedIn message as the safest first-contact channel because it has lower compliance risk and better trust context than SMS or broad cold outreach."

UC2 Pro pattern:
- decision_title: topic.title decision goal sentence.
- decision_recommended: short recommended action, e.g. "LinkedIn message".
- decision_tolerance/risk_level: level only.
- dimensions must be four score dimensions: "Compliance Safety", "Trust Alignment", "Response Potential", "Brand Protection".
- dimension values are numeric strings 0-100 only, e.g. "82", "74", "49", "80".
- dimension statuses are short badges: "Strong", "Good", "Medium", "Weak".
- factor table rows map ranked options: option short text, score numeric string, constraint "Passed"/"Failed", risk note sentence.
- action_body_01..03 are short imperative sentences.
- final_decision_body is one complete rationale sentence.

UC3 Pro+ pattern:
- decision_title: topic.title decision goal sentence.
- decision_summary: executive rationale sentence if present.
- decision_recommended: short recommended action.
- decision_tolerance/risk_level: level only.
- dimensions are the same four score dimensions as UC2, but Response Potential status may be "Moderate".
- pressure labels are short risk/fit labels; pressure values and widths are numeric 0-100.
- action_body_01..04 are short imperative sentences.
- warning_body_01..03 are concise warning sentences.
- final_decision_body is an executive final decision paragraph, 1-2 sentences.

Formatting constraints:
- Value fields are short display values. Explanation fields are sentences.
- Do not copy markdown, JSON, arrays, object text, labels, placeholder names, or full rationale into short value placeholders.
- Do not invent static sample values if UC JSON contains equivalent tool-specific values; transform the current UC JSON into this exact shape and style.
`;
}

export async function generateTemplatePlaceholderMappings(
  templateId: OpenAiMappedTemplateId,
  tool: MXTool,
  ucResults: Record<UseCaseId, UCResult>,
  placeholderDefinitions: Record<UseCaseId, TemplatePlaceholderDefinition[]>
): Promise<Record<UseCaseId, Record<string, string>>> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not configured.');
  const mappableDefinitions = USE_CASE_IDS.reduce<Record<UseCaseId, TemplatePlaceholderDefinition[]>>((result, ucId) => {
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
            ${getTemplateSpecificMappingGuidance(templateId)}
            ${HERO_PILL_MAPPING_GUIDANCE}
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
  return USE_CASE_IDS.reduce<Record<UseCaseId, Record<string, string>>>((result, ucId) => {
    result[ucId] = toMapping(parsed.mappings?.[ucId], new Set(mappableDefinitions[ucId].map(item => item.name)));
    return result;
  }, {} as Record<UseCaseId, Record<string, string>>);
}

type TemplatePlaceholderMappingGenerator = (
  tool: MXTool,
  ucResults: Record<UseCaseId, UCResult>,
  placeholderDefinitions: Record<UseCaseId, TemplatePlaceholderDefinition[]>
) => Promise<Record<UseCaseId, Record<string, string>>>;

function createTemplatePlaceholderMappingGenerator(templateId: OpenAiMappedTemplateId): TemplatePlaceholderMappingGenerator {
  return (tool, ucResults, placeholderDefinitions) => generateTemplatePlaceholderMappings(templateId, tool, ucResults, placeholderDefinitions);
}

export const generateMxt001PlaceholderMappings = createTemplatePlaceholderMappingGenerator('MXT_001');
export const generateMxt002PlaceholderMappings = createTemplatePlaceholderMappingGenerator('MXT_002');
export const generateMxt003PlaceholderMappings = createTemplatePlaceholderMappingGenerator('MXT_003');
export const generateMxt004PlaceholderMappings = createTemplatePlaceholderMappingGenerator('MXT_004');
export const generateMxt005PlaceholderMappings = createTemplatePlaceholderMappingGenerator('MXT_005');
export const generateMxt006PlaceholderMappings = createTemplatePlaceholderMappingGenerator('MXT_006');
export const generateMxt007PlaceholderMappings = createTemplatePlaceholderMappingGenerator('MXT_007');
export const generateMxt008PlaceholderMappings = createTemplatePlaceholderMappingGenerator('MXT_008');

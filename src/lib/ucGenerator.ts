import { MXTool, MXTemplate, UCResult } from '../types/mx';

export function inferTemplateId(tool: MXTool): string {
  if (tool.result_template_id && tool.result_template_id.startsWith('MXT_')) {
    return tool.result_template_id;
  }

  const category = tool.category?.toLowerCase() || '';
  const name = tool.tool_name?.toLowerCase() || '';

  if (category.includes('report') || name.includes('audit')) return 'MXT_001';
  if (category.includes('content') || name.includes('article') || name.includes('brief')) return 'MXT_002';
  if (category.includes('lead') || name.includes('list') || name.includes('prospect')) return 'MXT_003';
  if (category.includes('automation') || name.includes('workflow')) return 'MXT_004';
  if (category.includes('scorecard') || name.includes('diagnostic')) return 'MXT_005';
  if (category.includes('comparison') || name.includes('versus')) return 'MXT_006';
  if (category.includes('creative') || name.includes('ad') || name.includes('hook')) return 'MXT_007';
  if (category.includes('technical') || name.includes('json') || name.includes('code')) return 'MXT_008';

  return 'MXT_001'; // Default
}

export function generateUCs(tool: MXTool): { UC1: UCResult; UC2: UCResult; UC3: UCResult } {
  // Shared data generation context
  const toolName = tool.tool_name;
  
  const createMockDataTable = (rows: number) => ({
    type: 'data_table',
    title: 'Extracted Insights',
    columns: ['ID', 'Attribute', 'Confidence', 'Status'],
    data: Array.from({ length: rows }).map((_, i) => ({
      'ID': `IDX-${100 + i}`,
      'Attribute': `Attribute Name ${i + 1}`,
      'Confidence': `${Math.floor(Math.random() * 20) + 80}%`,
      'Status': 'Verified'
    }))
  });

  const createStats = (count: number) => 
    Array.from({ length: count }).map((_, i) => ({
      label: `Metric ${i + 1}`,
      value: `${(Math.random() * 100).toFixed(1)}`
    }));

  const commonSummary = {
    title: `${toolName} Results`,
    subtitle: 'Automated extraction summary'
  };

  // UC1: Free/Basic - Minimal
  const UC1: UCResult = {
    summary_card: {
      ...commonSummary,
      stats: createStats(1)
    },
    blocks: [
      createMockDataTable(3)
    ]
  };

  // UC2: Pro - Medium
  const UC2: UCResult = {
    summary_card: {
      ...commonSummary,
      stats: createStats(3)
    },
    blocks: [
      createMockDataTable(8),
      {
        type: 'metrics_grid',
        title: 'Performance Indicators',
        metrics: createStats(4)
      },
      {
        type: 'recommendations',
        title: 'Strategic Recommendations',
        recommendations: [
          { title: 'Optimization Alpha', description: 'Review the high-variance parameters detected.' },
          { title: 'Data Integrity', description: 'Cross-reference results with source datasets.' }
        ]
      }
    ]
  };

  // UC3: Pro+ Premium - Full
  const UC3: UCResult = {
    summary_card: {
      ...commonSummary,
      stats: createStats(5)
    },
    blocks: [
      createMockDataTable(15),
      {
        type: 'metrics_grid',
        title: 'Advanced Analytics',
        metrics: createStats(6)
      },
      {
        type: 'insight_cards',
        title: 'Executive Insights',
        insights: [
          { title: 'Market Sentiment', value: 'Positive', trend: 'Up' },
          { title: 'Competitive Gap', value: 'Narrowing', trend: 'Critical' }
        ]
      },
      {
        type: 'action_plan',
        title: 'Tactical Action Plan',
        steps: [
          'Initiate integration phase 1',
          'Validate outputs with stakeholders',
          'Deploy automated monitoring'
        ]
      },
      {
        type: 'decision_layer',
        title: 'Go/No-Go Decision Matrix',
        status: 'Recommended',
        score: 92
      }
    ]
  };

  return { UC1, UC2, UC3 };
}

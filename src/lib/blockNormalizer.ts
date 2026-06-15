/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UCResult } from '../types/mx';

export function normalizeBlocks(results: { UC1: UCResult; UC2: UCResult; UC3: UCResult }): void {
  const ucs = [results.UC1, results.UC2, results.UC3];

  ucs.forEach(uc => {
    uc.blocks.forEach(block => {
      // 1. metrics_grid -> must use "data"
      if (block.type === 'metrics_grid') {
        if ((block as any).metrics) {
          block.data = (block as any).metrics;
          delete (block as any).metrics;
        }
      }

      // 2. recommendations -> must use "items"
      if (block.type === 'recommendations') {
        if ((block as any).recommendations) {
          block.items = (block as any).recommendations;
          delete (block as any).recommendations;
        }
      }

      // 3. insight_cards -> must use "items"
      if (block.type === 'insight_cards') {
        if ((block as any).insights) {
          block.items = (block as any).insights;
          delete (block as any).insights;
        }
      }

      // 4. action_plan -> steps must be objects
      if (block.type === 'action_plan') {
        if (Array.isArray(block.steps)) {
          block.steps = block.steps.map((step: any, index: number) => {
            if (typeof step === 'string') {
              return {
                step: index + 1,
                title: step,
                description: "Auto-described step content."
              };
            }
            return step;
          });
        }
      }

      // 5. decision_layer -> defaults
      if (block.type === 'decision_layer') {
        if (block.score === undefined) block.score = 0;
        if (!block.status) block.status = "In Review";
        if (!block.reason) block.reason = "Decision based on calculated logic.";
      }
    });
  });
}

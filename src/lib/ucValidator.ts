/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UCResult } from "../types/mx";

export function assertValidUcResult(result: any) {
  for (const uc of ["UC1", "UC2", "UC3"]) {
    const data = result.uc_results?.[uc];
    const summary = data?.summary_card;

    if (summary) {
      summary.title = summary.title || data.title;
      summary.subtitle = summary.subtitle || data.subtitle;
    }

    if (!summary?.title) throw new Error(`${uc}: missing summary title`);
    if (!summary?.subtitle) throw new Error(`${uc}: missing summary subtitle`);
    if (!Array.isArray(summary.stats) || summary.stats.length === 0) {
      throw new Error(`${uc}: missing stats`);
    }

    for (const stat of summary.stats) {
      if (!stat.label || !stat.value) throw new Error(`${uc}: invalid stat`);
    }

    if (!Array.isArray(data.blocks) || data.blocks.length === 0) {
      throw new Error(`${uc}: missing blocks`);
    }

    for (const block of data.blocks) {
      if (!block.type || !block.title) throw new Error(`${uc}: invalid block`);
    }
  }
}

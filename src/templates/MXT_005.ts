/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const MXT_005_TEMPLATE = `
<article class="mx-result mx-theme-{theme} MXT_005" data-template="MXT_005" data-use-case="{uc_id}">
  <header class="mx-result-header diagnostic-header">
    <div class="mx-score-badge">SCORECARD</div>
    <h1 class="mx-result-title">{title}</h1>
    <div class="mx-stats scorecard-stats">
      {stats}
    </div>
  </header>
  <main class="mx-result-body">
    {blocks}
  </main>
</article>
`;
